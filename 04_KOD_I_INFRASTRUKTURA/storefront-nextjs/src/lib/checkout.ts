// Klient Store API Medusy używany w przeglądarce (strona /zamow). Publishable key ogranicza dane do kanału sklepu.
export type CheckoutConfig = { backendUrl: string; publishableKey: string; productHandle: string }

export type Address = {
  first_name: string
  last_name: string
  address_1: string
  postal_code: string
  city: string
  phone: string
  country_code: "pl"
}

async function call<T>(cfg: CheckoutConfig, path: string, init: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = { "x-publishable-api-key": cfg.publishableKey }
  if (init.body && !(init.body instanceof FormData)) headers["content-type"] = "application/json"
  const res = await fetch(`${cfg.backendUrl}${path}`, { ...init, headers, credentials: "include" })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data?.message ?? `Błąd serwera (${res.status})`)
  return data as T
}

type Cart = { id: string; total: number; items: { id: string }[] }

// Koszyk → zdjęcie → pozycja z file_id → dane klienta → dostawa → sesja płatności.
export async function prepareOrder(cfg: CheckoutConfig, photo: File, email: string, address: Address, providerId: string) {
  const { regions } = await call<{ regions: { id: string }[] }>(cfg, "/store/regions")
  if (!regions.length) throw new Error("Sklep nie ma skonfigurowanego regionu.")
  const regionId = regions[0].id

  const { products } = await call<{ products: { variants: { id: string }[] }[] }>(
    cfg,
    `/store/products?handle=${encodeURIComponent(cfg.productHandle)}&region_id=${regionId}`,
  )
  const variantId = products[0]?.variants[0]?.id
  if (!variantId) throw new Error("Produkt jest niedostępny.")

  const { cart } = await call<{ cart: Cart }>(cfg, "/store/carts", { method: "POST", body: JSON.stringify({ region_id: regionId }) })

  const form = new FormData()
  form.append("photo", photo)
  const { file_id } = await call<{ file_id: string }>(cfg, `/store/carts/${cart.id}/photo`, { method: "POST", body: form })

  await call(cfg, `/store/carts/${cart.id}/line-items`, {
    method: "POST",
    body: JSON.stringify({ variant_id: variantId, quantity: 1, metadata: { photo_file_id: file_id } }),
  })
  await call(cfg, `/store/carts/${cart.id}`, {
    method: "POST",
    body: JSON.stringify({ email, shipping_address: address, billing_address: address }),
  })
  const { shipping_options } = await call<{ shipping_options: { id: string }[] }>(cfg, `/store/shipping-options?cart_id=${cart.id}`)
  if (!shipping_options.length) throw new Error("Brak dostępnej metody dostawy.")
  const { cart: priced } = await call<{ cart: Cart }>(cfg, `/store/carts/${cart.id}/shipping-methods`, {
    method: "POST",
    body: JSON.stringify({ option_id: shipping_options[0].id }),
  })

  const { payment_collection } = await call<{ payment_collection: { id: string } }>(cfg, "/store/payment-collections", {
    method: "POST",
    body: JSON.stringify({ cart_id: cart.id }),
  })
  const session = await call<{
    payment_collection: { payment_sessions?: { provider_id: string; data?: { client_secret?: string } }[] }
  }>(cfg, `/store/payment-collections/${payment_collection.id}/payment-sessions`, {
    method: "POST",
    body: JSON.stringify({ provider_id: providerId }),
  })
  const clientSecret = session.payment_collection.payment_sessions?.find((s) => s.provider_id === providerId)?.data?.client_secret

  return { cartId: cart.id, total: priced.total, clientSecret }
}

export async function completeOrder(cfg: CheckoutConfig, cartId: string) {
  const res = await call<{ type: string; order?: { display_id: number; total: number }; error?: { message?: string } }>(
    cfg,
    `/store/carts/${cartId}/complete`,
    { method: "POST" },
  )
  if (res.type !== "order" || !res.order) throw new Error(res.error?.message ?? "Nie udało się złożyć zamówienia.")
  return res.order
}
