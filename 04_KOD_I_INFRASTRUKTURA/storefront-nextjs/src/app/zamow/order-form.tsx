"use client"

import { useEffect, useMemo, useState, type FormEvent } from "react"
import { loadStripe } from "@stripe/stripe-js/pure"
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { completeOrder, prepareOrder, type Address, type CheckoutConfig } from "@/lib/checkout"
import { track } from "@/lib/pixel"

// Progi jakości zdjęcia (procedura P002, krok 2) — do korekty po próbce od dostawcy.
const MIN_SHORT_SIDE = 1000
const GOOD_SHORT_SIDE = 1500
const MAX_BYTES = 15 * 1024 * 1024
const TYPES = ["image/jpeg", "image/png", "image/webp"]

type PhotoCheck = { file: File; url: string; width: number; height: number; error?: string; warning?: string }

async function checkPhoto(file: File): Promise<PhotoCheck> {
  const url = URL.createObjectURL(file)
  const base = { file, url, width: 0, height: 0 }
  if (!TYPES.includes(file.type)) return { ...base, error: "Wybierz zdjęcie JPG, PNG lub WEBP." }
  if (file.size > MAX_BYTES) return { ...base, error: "Zdjęcie jest większe niż 15 MB." }
  const img = new Image()
  img.src = url
  await img.decode().catch(() => undefined)
  const { naturalWidth: width, naturalHeight: height } = img
  if (!width) return { ...base, error: "Nie udało się odczytać zdjęcia. Wybierz inne." }
  const short = Math.min(width, height)
  if (short < MIN_SHORT_SIDE) {
    return { ...base, width, height, error: `Zdjęcie jest za małe (${width}×${height} px). Potrzebujemy min. ${MIN_SHORT_SIDE} px na krótszym boku.` }
  }
  if (short < GOOD_SHORT_SIDE) {
    return { ...base, width, height, warning: "Zdjęcie nada się, ale drobne szczegóły mogą wyjść mniej wyraźnie. Masz większe?" }
  }
  return { ...base, width, height }
}

type Props = {
  cfg: CheckoutConfig
  price: number
  accent: string
  stripeKey: string | null
  // Dostawca płatności: Stripe w produkcji; pp_system_default tylko lokalnie, bez kluczy Stripe.
  providerId: string
}

type Stage = { kind: "form" } | { kind: "pay"; cartId: string; clientSecret: string; total: number } | { kind: "done"; orderNo: number }

const input = { width: "100%", padding: "10px 12px", borderRadius: 6, border: "1px solid rgb(0 0 0 / .25)", fontSize: 16, background: "#fff" }

export function OrderForm({ cfg, price, accent, stripeKey, providerId }: Props) {
  const [photo, setPhoto] = useState<PhotoCheck | null>(null)
  const [stage, setStage] = useState<Stage>({ kind: "form" })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const stripePromise = useMemo(() => (stripeKey ? loadStripe(stripeKey) : null), [stripeKey])

  // Powrót z płatności z przekierowaniem (np. bank): Stripe dokleja redirect_status do return_url.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search)
    const cartId = q.get("cart")
    if (!cartId || q.get("redirect_status") !== "succeeded") return
    completeOrder(cfg, cartId)
      .then((order) => {
        track("Purchase", { value: order.total, currency: "PLN" })
        setStage({ kind: "done", orderNo: order.display_id })
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Nie udało się złożyć zamówienia."))
  }, [cfg])

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    if (!photo || photo.error) return setError("Dodaj zdjęcie, które spełnia wymagania.")
    const f = new FormData(e.currentTarget)
    const get = (k: string) => String(f.get(k) ?? "").trim()
    const postal = get("postal_code")
    if (!/^\d{2}-\d{3}$/.test(postal)) return setError("Kod pocztowy wpisz w formacie 00-000.")
    const address: Address = {
      first_name: get("first_name"),
      last_name: get("last_name"),
      address_1: get("address_1"),
      postal_code: postal,
      city: get("city"),
      phone: get("phone"),
      country_code: "pl",
    }
    setBusy(true)
    try {
      track("InitiateCheckout", { value: price, currency: "PLN" })
      const prepared = await prepareOrder(cfg, photo.file, get("email"), address, providerId)
      if (stripePromise) {
        if (!prepared.clientSecret) throw new Error("Płatność jest chwilowo niedostępna. Spróbuj za kilka minut.")
        setStage({ kind: "pay", cartId: prepared.cartId, clientSecret: prepared.clientSecret, total: prepared.total })
      } else {
        const order = await completeOrder(cfg, prepared.cartId)
        track("Purchase", { value: order.total, currency: "PLN" })
        setStage({ kind: "done", orderNo: order.display_id })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Coś poszło nie tak. Spróbuj ponownie.")
    } finally {
      setBusy(false)
    }
  }

  if (stage.kind === "done") {
    return (
      <section role="status" style={{ display: "grid", gap: 8 }}>
        <h2 style={{ margin: 0 }}>Dziękujemy! Zamówienie nr {stage.orderNo} przyjęte.</h2>
        <p style={{ margin: 0 }}>Podgląd obrazu wyślemy e-mailem. Produkcja ruszy po Twojej akceptacji.</p>
      </section>
    )
  }

  if (stage.kind === "pay" && stripePromise) {
    return (
      <Elements stripe={stripePromise} options={{ clientSecret: stage.clientSecret, locale: "pl" }}>
        <StripePay cfg={cfg} cartId={stage.cartId} total={stage.total} accent={accent} onDone={(n) => setStage({ kind: "done", orderNo: n })} />
      </Elements>
    )
  }

  return (
    <form onSubmit={onSubmit} style={{ display: "grid", gap: 20, maxWidth: 560 }} noValidate={false}>
      <fieldset style={{ border: 0, padding: 0, margin: 0, display: "grid", gap: 10 }}>
        <legend style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>1. Twoje zdjęcie</legend>
        <input
          id="photo"
          name="photo"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          required
          onChange={async (e) => {
            const file = e.target.files?.[0]
            setPhoto(file ? await checkPhoto(file) : null)
          }}
        />
        <span style={{ fontSize: 13, opacity: 0.75 }}>
          Ostre, dobrze oświetlone, główny motyw duży w kadrze. JPG, PNG lub WEBP, do 15 MB.
        </span>
        {photo && (
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <img src={photo.url} alt="Wybrane zdjęcie" style={{ width: 96, height: 96, objectFit: "cover", borderRadius: 6 }} />
            <span role={photo.error ? "alert" : undefined} style={{ fontSize: 14, color: photo.error ? "#A12A12" : "inherit" }}>
              {photo.error ?? photo.warning ?? `Zdjęcie wygląda dobrze (${photo.width}×${photo.height} px).`}
            </span>
          </div>
        )}
      </fieldset>

      <fieldset style={{ border: 0, padding: 0, margin: 0, display: "grid", gap: 10 }}>
        <legend style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>2. Dane do wysyłki</legend>
        <label>
          E-mail (tu wyślemy podgląd)
          <input id="email" name="email" type="email" autoComplete="email" required style={input} />
        </label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          <label style={{ flex: "1 1 200px" }}>
            Imię
            <input id="first_name" name="first_name" autoComplete="given-name" required style={input} />
          </label>
          <label style={{ flex: "1 1 200px" }}>
            Nazwisko
            <input id="last_name" name="last_name" autoComplete="family-name" required style={input} />
          </label>
        </div>
        <label>
          Ulica i numer
          <input id="address_1" name="address_1" autoComplete="address-line1" required style={input} />
        </label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          <label style={{ flex: "0 1 140px" }}>
            Kod pocztowy
            <input id="postal_code" name="postal_code" autoComplete="postal-code" placeholder="00-000" required style={input} />
          </label>
          <label style={{ flex: "1 1 200px" }}>
            Miasto
            <input id="city" name="city" autoComplete="address-level2" required style={input} />
          </label>
        </div>
        <label>
          Telefon (dla kuriera)
          <input id="phone" name="phone" type="tel" autoComplete="tel" required style={input} />
        </label>
      </fieldset>

      <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14 }}>
        <input id="terms" name="terms" type="checkbox" required style={{ marginTop: 3 }} />
        <span>
          Akceptuję <a href="/regulamin">regulamin</a> i <a href="/regulamin#prywatnosc">politykę prywatności</a>, w tym informację, jak
          przetwarzamy przesłane zdjęcie.
        </span>
      </label>

      {error && (
        <p role="alert" style={{ margin: 0, color: "#A12A12" }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        style={{ background: accent, color: "#fff", border: 0, borderRadius: 8, padding: "14px 22px", fontSize: 16, fontWeight: 700, opacity: busy ? 0.6 : 1 }}
      >
        {busy ? "Przygotowuję zamówienie…" : stripeKey ? `Przejdź do płatności · ${price} zł` : `Złóż zamówienie (tryb testowy) · ${price} zł`}
      </button>
    </form>
  )
}

function StripePay({ cfg, cartId, total, accent, onDone }: { cfg: CheckoutConfig; cartId: string; total: number; accent: string; onDone: (orderNo: number) => void }) {
  const stripe = useStripe()
  const elements = useElements()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function pay(e: FormEvent) {
    e.preventDefault()
    if (!stripe || !elements) return
    setBusy(true)
    setError(null)
    const { error: payError } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: { return_url: `${window.location.origin}/zamow?cart=${cartId}` },
    })
    if (payError) {
      setError(payError.message ?? "Płatność nie powiodła się.")
      setBusy(false)
      return
    }
    try {
      const order = await completeOrder(cfg, cartId)
      track("Purchase", { value: order.total, currency: "PLN" })
      onDone(order.display_id)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nie udało się złożyć zamówienia.")
      setBusy(false)
    }
  }

  return (
    <form onSubmit={pay} style={{ display: "grid", gap: 16, maxWidth: 560 }}>
      <h2 style={{ margin: 0 }}>3. Płatność · {total} zł</h2>
      <PaymentElement />
      {error && (
        <p role="alert" style={{ margin: 0, color: "#A12A12" }}>
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={busy || !stripe}
        style={{ background: accent, color: "#fff", border: 0, borderRadius: 8, padding: "14px 22px", fontSize: 16, fontWeight: 700, opacity: busy ? 0.6 : 1 }}
      >
        {busy ? "Płacę…" : `Zapłać ${total} zł`}
      </button>
    </form>
  )
}
