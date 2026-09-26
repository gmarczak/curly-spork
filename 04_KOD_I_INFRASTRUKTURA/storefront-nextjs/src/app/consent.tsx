"use client"

import { useEffect, useState } from "react"
import { CONSENT_KEY, loadPixel, readConsent } from "@/lib/pixel"

// Baner cookies: niezbędne zawsze, marketingowe (piksel Meta) dopiero po zgodzie. Zgodę można zmienić w stopce.
export function Consent({ pixelId, accent }: { pixelId?: string; accent: string }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const c = readConsent()
    if (c === "all" && pixelId) loadPixel(pixelId)
    if (!c) setOpen(true)
    const reopen = () => setOpen(true)
    window.addEventListener("open-cookie-settings", reopen)
    return () => window.removeEventListener("open-cookie-settings", reopen)
  }, [pixelId])

  function choose(value: "all" | "necessary") {
    try {
      localStorage.setItem(CONSENT_KEY, value)
    } catch {}
    setOpen(false)
    if (value === "all" && pixelId) loadPixel(pixelId)
    // Wycofanie zgody: przeładowanie usuwa załadowany piksel z tej sesji.
    if (value === "necessary" && window.fbq) window.location.reload()
  }

  if (!open) return null
  return (
    <div
      role="dialog"
      aria-label="Ustawienia cookies"
      style={{ position: "fixed", left: 16, right: 16, bottom: "calc(16px + env(safe-area-inset-bottom, 0px))", maxWidth: 560, margin: "0 auto", background: "#fff", color: "#222", borderRadius: 10, boxShadow: "0 10px 30px rgb(0 0 0 / .2)", padding: 16, display: "grid", gap: 12, fontSize: 14, zIndex: 50 }}
    >
      <p style={{ margin: 0 }}>
        Używamy cookies niezbędnych do działania sklepu. Za Twoją zgodą także marketingowych (piksel Meta), żeby mierzyć skuteczność reklam.{" "}
        <a href="/regulamin#prywatnosc">Szczegóły</a>
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "flex-end" }}>
        <button type="button" onClick={() => choose("necessary")} style={{ background: "transparent", border: "1px solid #999", borderRadius: 6, padding: "8px 14px", fontSize: 14 }}>
          Tylko niezbędne
        </button>
        <button type="button" onClick={() => choose("all")} style={{ background: accent, color: "#fff", border: 0, borderRadius: 6, padding: "8px 14px", fontSize: 14, fontWeight: 700 }}>
          Akceptuję wszystkie
        </button>
      </div>
    </div>
  )
}

export function CookieSettingsLink() {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))} style={{ background: "none", border: 0, padding: 0, color: "inherit", textDecoration: "underline", font: "inherit", cursor: "pointer" }}>
      Ustawienia cookies
    </button>
  )
}
