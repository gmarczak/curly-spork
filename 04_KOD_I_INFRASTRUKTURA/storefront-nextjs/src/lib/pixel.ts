// Piksel Meta ładuje się dopiero po zgodzie marketingowej (baner cookies). Bez zgody — nic nie wysyłamy.
type Fbq = ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown }

declare global {
  interface Window {
    fbq?: Fbq
    _fbq?: Fbq
  }
}

export const CONSENT_KEY = "cookie-consent" // "all" | "necessary"

export function readConsent(): string | null {
  try {
    return localStorage.getItem(CONSENT_KEY)
  } catch {
    return null
  }
}

export function loadPixel(pixelId: string) {
  if (typeof window === "undefined" || window.fbq) return
  const fbq: Fbq = function (...args: unknown[]) {
    ;(fbq.queue = fbq.queue ?? []).push(args)
  }
  fbq.loaded = true
  fbq.version = "2.0"
  window.fbq = window._fbq = fbq
  const s = document.createElement("script")
  s.async = true
  s.src = "https://connect.facebook.net/en_US/fbevents.js"
  document.head.appendChild(s)
  fbq("init", pixelId)
  fbq("track", "PageView")
}

export function track(event: string, params?: Record<string, unknown>) {
  if (readConsent() === "all") window.fbq?.("track", event, params)
}
