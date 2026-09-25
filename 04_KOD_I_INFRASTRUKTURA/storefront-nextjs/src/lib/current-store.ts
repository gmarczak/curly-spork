import { headers } from "next/headers"
import { notFound } from "next/navigation"
import { storeForHost, type StoreConfig } from "./stores"

// Bez wyjątku — dla layoutu, który renderuje też stronę 404.
export async function maybeStore(): Promise<StoreConfig | null> {
  const h = await headers()
  return storeForHost(h.get("x-forwarded-host") ?? h.get("host"))
}

// Dla stron: nieznana domena → 404.
export async function currentStore(): Promise<StoreConfig> {
  const store = await maybeStore()
  if (!store) notFound()
  return store
}
