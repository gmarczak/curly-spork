import config from "../../stores.config.json"

export type StoreConfig = (typeof config.stores)[number]

// Domena → sklep. Nieznana domena = null (strona 404), nigdy „domyślny” sklep innego produktu.
export function storeForHost(host: string | null): StoreConfig | null {
  if (!host) return null
  const normalized = host.toLowerCase().replace(/^www\./, "")
  return config.stores.find((s) => s.hosts.includes(normalized)) ?? null
}
