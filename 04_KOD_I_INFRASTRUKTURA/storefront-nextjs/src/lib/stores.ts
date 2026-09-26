import config from "../../stores.config.json"

export type Landing = {
  eyebrow: string
  sub: string
  pricePln: number
  cta: string
  fineprint: string
  heroImage: { src: string; alt: string }
  steps: { title: string; text: string; image: string }[]
  kit: string[]
  photoTips: string[]
  notice?: { title: string; text: string }
  faq: { q: string; a: string }[]
  ageNote?: string
}

export type StoreConfig = {
  hosts: string[]
  productId: string
  brand: string
  headline: string
  publishableKey: string
  productHandle: string
  theme: { accent: string; background: string; ink: string }
  operator: { name: string; address: string; email: string }
  delivery: { days: string; costPln: number }
  // Wersja robocza: baner „nie publikować” — dopóki są pola [DO UZUPEŁNIENIA].
  draft?: boolean
  // Tekst o odstąpieniu od umowy w stopce; domyślnie 14 dni (Brand Book Globalny, sekcja 2).
  withdrawal?: string
  landing?: Landing
  // ID piksela Meta; ładowany tylko po zgodzie marketingowej.
  metaPixelId?: string
}

const stores = config.stores as StoreConfig[]

// Domena → sklep. Nieznana domena = null (strona 404), nigdy „domyślny” sklep innego produktu.
export function storeForHost(host: string | null): StoreConfig | null {
  if (!host) return null
  const normalized = host.toLowerCase().replace(/^www\./, "")
  return stores.find((s) => s.hosts.includes(normalized)) ?? null
}
