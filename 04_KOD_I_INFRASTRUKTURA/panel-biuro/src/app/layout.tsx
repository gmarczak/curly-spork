import type { ReactNode } from "react"
import "./globals.css"

export const metadata = {
  title: "Biuro Agentów",
  description: "Agenci AI fabryki JaGrzep na żywo",
  robots: { index: false, follow: false },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  )
}
