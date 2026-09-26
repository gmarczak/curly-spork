import type { Landing as LandingData, StoreConfig } from "@/lib/stores"

const serif = "Georgia, 'Times New Roman', serif"

// Strona jednoproduktowa sterowana konfiguracją (stores.config.json → landing).
export function Landing({ store, landing, price }: { store: StoreConfig; landing: LandingData; price: number }) {
  const t = store.theme
  const muted = { opacity: 0.75 }
  return (
    <article style={{ display: "grid", gap: 56 }}>
      <section style={{ display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center" }}>
        <div style={{ flex: "1 1 320px" }}>
          <p style={{ textTransform: "uppercase", letterSpacing: "0.12em", fontSize: 12, fontWeight: 700, color: t.accent }}>
            {landing.eyebrow}
          </p>
          <h1 style={{ fontFamily: serif, fontWeight: 400, fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.05, margin: "8px 0" }}>
            {store.headline}
          </h1>
          <p style={{ fontSize: 17, ...muted }}>{landing.sub}</p>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16, marginTop: 20 }}>
            <p style={{ fontFamily: serif, fontSize: 30, margin: 0 }}>
              {price.toFixed(0)} zł
              <span style={{ display: "block", fontFamily: "inherit", fontSize: 13, ...muted }}>
                {store.delivery.costPln === 0 ? "darmowa dostawa" : `dostawa ${store.delivery.costPln} zł`}
              </span>
            </p>
            {/* Upload zdjęcia + checkout Stripe — do zrobienia (README, „Do zrobienia”). */}
            <button
              type="button"
              style={{ background: t.accent, color: "#fff", border: 0, borderRadius: 8, padding: "14px 22px", fontSize: 16, fontWeight: 700 }}
            >
              {landing.cta}
            </button>
          </div>
          <p style={{ fontSize: 13, ...muted }}>{landing.fineprint}</p>
        </div>
        <img
          src={landing.heroImage.src}
          alt={landing.heroImage.alt}
          style={{ flex: "1 1 280px", maxWidth: 420, width: "100%", border: "8px solid #8A6A4A", boxShadow: "0 18px 30px rgb(60 40 20 / .25)" }}
        />
      </section>

      <section>
        <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 30 }}>Jak to działa</h2>
        <ol style={{ listStyle: "none", padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {landing.steps.map((s, i) => (
            <li key={s.title} style={{ display: "grid", gap: 8 }}>
              <img src={s.image} alt={s.title} style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover", borderRadius: 6 }} />
              <strong>
                {i + 1}. {s.title}
              </strong>
              <span style={{ fontSize: 14, ...muted }}>{s.text}</span>
            </li>
          ))}
        </ol>
      </section>

      <section style={{ display: "flex", flexWrap: "wrap", gap: 32 }}>
        <div style={{ flex: "1 1 300px" }}>
          <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 30 }}>Co jest w zestawie</h2>
          <ul>{landing.kit.map((k) => <li key={k}>{k}</li>)}</ul>
          <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 30 }}>Jakie zdjęcie wybrać</h2>
          <ul>{landing.photoTips.map((k) => <li key={k}>{k}</li>)}</ul>
        </div>
        <div style={{ flex: "1 1 300px", display: "grid", gap: 24, alignContent: "start" }}>
          {landing.notice && (
            <div style={{ background: t.ink, color: t.background, borderRadius: 8, padding: 20 }}>
              <strong style={{ fontFamily: serif, fontWeight: 400, fontSize: 22 }}>{landing.notice.title}</strong>
              <p style={{ margin: "8px 0 0" }}>{landing.notice.text}</p>
            </div>
          )}
          <div>
            <h2 style={{ fontFamily: serif, fontWeight: 400, fontSize: 30 }}>Pytania</h2>
            {landing.faq.map((f) => (
              <details key={f.q} style={{ borderBottom: "1px solid rgb(0 0 0 / .12)", padding: "10px 0" }}>
                <summary style={{ fontWeight: 600, cursor: "pointer" }}>{f.q}</summary>
                <p style={{ fontSize: 14, ...muted }}>{f.a}</p>
              </details>
            ))}
          </div>
          {landing.ageNote && <p style={{ fontSize: 13, ...muted }}>{landing.ageNote}</p>}
        </div>
      </section>
    </article>
  )
}
