import type { ReactNode } from "react"
import { maybeStore } from "@/lib/current-store"

export async function generateMetadata() {
  const store = await maybeStore()
  return store ? { title: store.brand, description: store.headline } : { title: "Nie znaleziono" }
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const store = await maybeStore()
  if (!store) {
    return (
      <html lang="pl">
        <body>{children}</body>
      </html>
    )
  }
  const t = store.theme
  return (
    <html lang="pl">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: t.background, color: t.ink }}>
        <main style={{ maxWidth: 960, margin: "0 auto", padding: "24px 16px" }}>{children}</main>
        {/* Standardy zaufania z Brand Booka: dane operatora, regulamin, dostawa, odstąpienie od umowy */}
        <footer style={{ maxWidth: 960, margin: "0 auto", padding: "24px 16px", fontSize: 13, opacity: 0.8 }}>
          <p>
            Sprzedawca: {store.operator.name}, {store.operator.address}, {store.operator.email}
          </p>
          <p>
            <a href="/regulamin">Regulamin</a> · <a href="/regulamin#prywatnosc">Polityka prywatności</a> · Prawo
            odstąpienia od umowy: 14 dni
          </p>
        </footer>
      </body>
    </html>
  )
}
