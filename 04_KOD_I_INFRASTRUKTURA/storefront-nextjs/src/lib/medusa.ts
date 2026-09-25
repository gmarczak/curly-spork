import Medusa from "@medusajs/js-sdk"
import type { StoreConfig } from "./stores"

// Klient per sklep: publishable key ogranicza dane do sales channel tego produktu (izolacja — ADR-001).
export function medusaFor(store: StoreConfig) {
  return new Medusa({
    baseUrl: process.env.MEDUSA_BACKEND_URL ?? "http://localhost:9000",
    publishableKey: store.publishableKey,
  })
}

export async function getProduct(store: StoreConfig) {
  try {
    const { products } = await medusaFor(store).store.product.list({ handle: store.productHandle, limit: 1 })
    return products[0] ?? null
  } catch {
    // Backend niedostępny → strona renderuje się bez ceny zamiast błędu 500.
    return null
  }
}
