import { currentStore } from "@/lib/current-store"
import { getProduct } from "@/lib/medusa"

export default async function Home() {
  const store = await currentStore()
  const product = await getProduct(store)
  const price = product?.variants?.[0]?.calculated_price?.calculated_amount

  return (
    <article>
      <h1 style={{ fontSize: 36, lineHeight: 1.1 }}>{store.headline}</h1>
      <p>{product?.description ?? "Opis produktu pojawi się po konfiguracji w Medusie."}</p>
      {price != null && (
        <p style={{ fontSize: 28, fontWeight: 700 }}>
          {price.toFixed(2).replace(".", ",")} zł
          {/* Przy promocji: najniższa cena z 30 dni (Omnibus) — do dodania z historią cen. */}
        </p>
      )}
      <p>
        Dostawa: {store.delivery.days},{" "}
        {store.delivery.costPln === 0 ? "gratis" : `${store.delivery.costPln} zł`}
      </p>
      <button
        type="button"
        style={{ background: store.theme.accent, color: "#fff", border: 0, borderRadius: 8, padding: "12px 20px", fontSize: 16 }}
      >
        Kupuję
      </button>
    </article>
  )
}
