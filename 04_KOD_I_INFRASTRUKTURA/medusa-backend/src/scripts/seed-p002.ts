import type { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import {
  createApiKeysWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createShippingOptionsWorkflow,
  createShippingProfilesWorkflow,
  createStockLocationsWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
} from "@medusajs/medusa/core-flows"

// P002 Z Kadru: kanał sprzedaży, region PL, darmowa dostawa, produkt 159 zł, publishable key.
// Uruchomienie: npx medusa exec ./src/scripts/seed-p002.ts  (drugi raz — pomija istniejące elementy).
// Produkcja: region z płatnością Stripe; lokalnie dochodzi pp_system_default do testów bez kluczy Stripe.
export default async function seedP002({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const link = container.resolve(ContainerRegistrationKeys.LINK)
  const fulfillment = container.resolve(Modules.FULFILLMENT)
  const store = container.resolve(Modules.STORE)

  const { data: existing } = await query.graph({ entity: "sales_channel", fields: ["id"], filters: { name: "P002_Z_Kadru" } })
  if (existing.length) {
    logger.info("P002 już istnieje — pomijam.")
    return
  }

  const [defaultStore] = await store.listStores()
  await store.updateStores(defaultStore.id, {
    supported_currencies: [{ currency_code: "pln", is_default: true }],
  })

  const { result: [channel] } = await createSalesChannelsWorkflow(container).run({
    input: { salesChannelsData: [{ name: "P002_Z_Kadru", description: "zkadru.pl" }] },
  })

  const providers = ["pp_stripe_stripe"]
  if (process.env.NODE_ENV !== "production") providers.push("pp_system_default")
  const { data: regions } = await query.graph({ entity: "region", fields: ["id"], filters: { name: "Polska" } })
  const region =
    regions[0] ??
    (await createRegionsWorkflow(container).run({
      input: { regions: [{ name: "Polska", currency_code: "pln", countries: ["pl"], payment_providers: providers }] },
    })).result[0]

  const { result: [location] } = await createStockLocationsWorkflow(container).run({
    input: { locations: [{ name: "Dostawca P002 (dropshipping)", address: { country_code: "pl", address_1: "—" } }] },
  })
  await linkSalesChannelsToStockLocationWorkflow(container).run({ input: { id: location.id, add: [channel.id] } })
  await link.create({
    [Modules.STOCK_LOCATION]: { stock_location_id: location.id },
    [Modules.FULFILLMENT]: { fulfillment_provider_id: "manual_manual" },
  })

  const { result: [profile] } = await createShippingProfilesWorkflow(container).run({
    input: { data: [{ name: "P002 zestaw", type: "default" }] },
  })
  const fset = await fulfillment.createFulfillmentSets({
    name: "P002 wysyłka PL",
    type: "shipping",
    service_zones: [{ name: "Polska", geo_zones: [{ country_code: "pl", type: "country" }] }],
  })
  await link.create({
    [Modules.STOCK_LOCATION]: { stock_location_id: location.id },
    [Modules.FULFILLMENT]: { fulfillment_set_id: fset.id },
  })
  await createShippingOptionsWorkflow(container).run({
    input: [
      {
        name: "Darmowa dostawa",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: fset.service_zones[0].id,
        shipping_profile_id: profile.id,
        type: { label: "Standard", description: "Wysyłka od dostawcy", code: "standard" },
        prices: [
          { currency_code: "pln", amount: 0 },
          { region_id: region.id, amount: 0 },
        ],
        rules: [
          { attribute: "enabled_in_store", value: "true", operator: "eq" },
          { attribute: "is_return", value: "false", operator: "eq" },
        ],
      },
    ],
  })

  await createProductsWorkflow(container).run({
    input: {
      products: [
        {
          title: "Malowanie po numerach ze zdjęcia 40×50 z ramą",
          handle: "malowanie-ze-zdjecia",
          description:
            "Zestaw do malowania po numerach wykonany ze zdjęcia klienta: płótno 40×50 cm na ramie, ponumerowane farby akrylowe, pędzle.",
          status: "published",
          shipping_profile_id: profile.id,
          options: [{ title: "Rozmiar", values: ["40×50 z ramą"] }],
          variants: [
            {
              title: "40×50 z ramą",
              sku: "P002-4050-RAMA",
              options: { Rozmiar: "40×50 z ramą" },
              manage_inventory: false,
              prices: [{ currency_code: "pln", amount: 159 }],
            },
          ],
          sales_channels: [{ id: channel.id }],
        },
      ],
    },
  })

  const { result: [key] } = await createApiKeysWorkflow(container).run({
    input: { api_keys: [{ title: "zkadru.pl", type: "publishable", created_by: "seed-p002" }] },
  })
  await linkSalesChannelsToApiKeyWorkflow(container).run({ input: { id: key.id, add: [channel.id] } })

  logger.info(`P002 gotowe. Publishable key (do stores.config.json): ${key.token}`)
}
