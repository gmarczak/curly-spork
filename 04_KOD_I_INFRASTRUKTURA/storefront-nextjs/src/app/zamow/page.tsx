import { notFound } from "next/navigation"
import { currentStore } from "@/lib/current-store"
import { OrderForm } from "./order-form"

export const metadata = { robots: { index: false } }

export default async function Zamow() {
  const store = await currentStore()
  if (!store.landing) notFound()

  const stripeKey = process.env.STRIPE_PUBLISHABLE_KEY ?? null
  // Bez klucza Stripe formularz jest ukryty. CHECKOUT_TEST_MODE=1 (tylko lokalnie) — zamówienie bez płatności (pp_system_default).
  const providerId = stripeKey ? "pp_stripe_stripe" : process.env.CHECKOUT_TEST_MODE === "1" ? "pp_system_default" : null

  return (
    <article style={{ display: "grid", gap: 24 }}>
      <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 400, fontSize: 36, margin: 0 }}>Zamówienie · {store.brand}</h1>
      {providerId ? (
        <OrderForm
          cfg={{
            backendUrl: process.env.MEDUSA_PUBLIC_URL ?? process.env.MEDUSA_BACKEND_URL ?? "http://localhost:9000",
            publishableKey: store.publishableKey,
            productHandle: store.productHandle,
          }}
          price={store.landing.pricePln}
          accent={store.theme.accent}
          stripeKey={stripeKey}
          providerId={providerId}
        />
      ) : (
        <p>Zamówienia będą dostępne wkrótce.</p>
      )}
    </article>
  )
}
