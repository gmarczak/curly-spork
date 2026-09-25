"use client"

import { useCallback, useEffect, useState } from "react"

type AgentState = {
  id: string
  name: string
  status: "working" | "waiting" | "error" | "idle"
  task: string
  thread_id: string
  updated_at: number | null
  paused: boolean
}
type Approval = {
  thread_id: string
  graph: string
  payload: { title?: string; detail?: string; why?: string; type?: string; options?: unknown[] }
}
type Activity = { ts: number; agent: string; kind: string; text: string; thread_id: string }
type PanelState = { agents: AgentState[]; approvals: Approval[]; activity: Activity[]; server_time: number }

const POLL_MS = 3000
const STATUS: Record<string, [string, string]> = {
  working: ["pracuje", "s-work"],
  waiting: ["czeka na Ciebie", "s-wait"],
  error: ["błąd", "s-err"],
  idle: ["wolny", "s-idle"],
}
const INITIALS: Record<string, string> = { onboarding: "ON", support: "WS", marketing: "MK", fulfillment: "FU" }

function ago(ts: number | null, now: number): string {
  if (!ts) return "—"
  const s = Math.max(0, Math.round(now - ts))
  if (s < 60) return `${s} s temu`
  if (s < 3600) return `${Math.round(s / 60)} min temu`
  return `${Math.round(s / 3600)} h temu`
}

function time(ts: number): string {
  return new Date(ts * 1000).toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
}

async function post(url: string, body?: unknown) {
  const res = await fetch(url, {
    method: "POST",
    headers: body !== undefined ? { "content-type": "application/json" } : undefined,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })
  if (res.status === 401) window.location.href = "/login"
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).detail ?? `Błąd ${res.status}`)
}

export default function Dashboard() {
  const [state, setState] = useState<PanelState | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [lastOk, setLastOk] = useState<number>(0)
  const [now, setNow] = useState(() => Date.now() / 1000)
  const [toast, setToast] = useState<string | null>(null)

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/state", { cache: "no-store" })
      if (res.status === 401) {
        window.location.href = "/login"
        return
      }
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail ?? `Błąd ${res.status}`)
      setState(data)
      setError(null)
      setLastOk(Date.now() / 1000)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Brak połączenia")
    }
  }, [])

  useEffect(() => {
    load()
    const poll = setInterval(load, POLL_MS)
    const tick = setInterval(() => setNow(Date.now() / 1000), 1000)
    return () => {
      clearInterval(poll)
      clearInterval(tick)
    }
  }, [load])

  const act = async (fn: () => Promise<void>, done: string) => {
    try {
      await fn()
      setToast(done)
      load()
    } catch (e) {
      setToast(e instanceof Error ? e.message : "Nie udało się")
    }
    setTimeout(() => setToast(null), 2500)
  }

  const agents = state?.agents ?? []
  const approvals = state?.approvals ?? []
  const activity = state?.activity ?? []
  const lastByAgent = (id: string) => activity.find((a) => a.agent === id)
  const live = !error && lastOk > 0 && now - lastOk < 10

  return (
    <div className="wrap">
      <header className="top">
        <div>
          <h1>Biuro Agentów</h1>
          <p className="sub">
            <span className={`dot ${live ? "on" : "off"}`} />
            {live ? `na żywo · odświeżono ${ago(lastOk, now)}` : error ? `brak połączenia: ${error}` : "łączenie…"}
          </p>
        </div>
        <div className="stats">
          <div className="stat">
            <span className="lbl">Pracuje</span>
            <b>{agents.filter((a) => a.status === "working").length}</b>
          </div>
          <div className={`stat ${approvals.length ? "hot" : ""}`}>
            <span className="lbl">Czeka na Ciebie</span>
            <b>{approvals.length}</b>
          </div>
          <div className="stat">
            <span className="lbl">Wstrzymani</span>
            <b>{agents.filter((a) => a.paused).length}</b>
          </div>
        </div>
        <div className="actions">
          <button className="btn" onClick={() => act(() => post("/api/demo"), "Wysłano testowe zamówienie")}>
            Wyślij testowe zamówienie
          </button>
          <form method="post" action="/api/logout">
            <button className="btn ghost" type="submit">
              Wyloguj
            </button>
          </form>
        </div>
      </header>

      <div className="layout">
        <main className="main">
          <section>
            <h2>Zespół</h2>
            <div className="floor">
              {agents.map((a) => {
                const [label, cls] = a.paused ? ["wstrzymany", "s-idle"] : STATUS[a.status] ?? STATUS.idle
                const last = lastByAgent(a.id)
                return (
                  <div key={a.id} className={`desk ${cls}`}>
                    <div className="who">
                      <div className={`av ${cls}`}>{INITIALS[a.id] ?? a.id.slice(0, 2).toUpperCase()}</div>
                      <div>
                        <b>{a.name}</b>
                        <span className={`pill ${cls}`}>{label}</span>
                      </div>
                    </div>
                    <div className="task">
                      <span className="lbl">Zadanie</span>
                      {a.task || "brak — czeka na zdarzenie"}
                    </div>
                    <div className={`say ${a.status === "working" && !a.paused ? "typing" : ""}`}>
                      {last ? last.text : "Jeszcze nic dziś nie zrobił."}
                    </div>
                    <div className="meta">
                      <span>{ago(a.updated_at, now)}</span>
                      <button
                        className="btn small"
                        onClick={() =>
                          act(
                            () => post(`/api/agents/${a.id}/${a.paused ? "resume" : "pause"}`),
                            a.paused ? "Wznowiono" : "Wstrzymano",
                          )
                        }
                      >
                        {a.paused ? "Wznów" : "Wstrzymaj"}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          <section>
            <h2>Myśli i działania</h2>
            <div className="feed">
              {activity.length === 0 && <p className="empty">Brak zdarzeń. Wyślij testowe zamówienie, żeby zobaczyć pracę agenta.</p>}
              {activity.map((e, i) => (
                <div key={`${e.ts}-${i}`} className={`row k-${e.kind}`}>
                  <time>{time(e.ts)}</time>
                  <span className="tag">{INITIALS[e.agent] ?? e.agent}</span>
                  <span>{e.text}</span>
                </div>
              ))}
            </div>
          </section>
        </main>

        <aside className="inbox">
          <h2>Czeka na Ciebie</h2>
          {approvals.length === 0 && <p className="empty">Nic nie czeka na decyzję.</p>}
          {approvals.map((p) => (
            <ApprovalCard
              key={p.thread_id}
              item={p}
              onDecide={(decision, msg) =>
                act(() => post(`/api/approvals/${encodeURIComponent(p.thread_id)}`, { decision }), msg)
              }
            />
          ))}
        </aside>
      </div>
      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}

function ApprovalCard({ item, onDecide }: { item: Approval; onDecide: (d: unknown, msg: string) => void }) {
  const [text, setText] = useState("")
  const p = item.payload
  const isRetry = Array.isArray(p.options) && p.options.includes("retry")
  return (
    <div className="ask">
      <div className="t">{p.title ?? "Decyzja"}</div>
      {p.detail && <pre className="detail">{p.detail}</pre>}
      {p.why && <div className="why">{p.why}</div>}
      {isRetry && (
        <div className="row-btns">
          <button className="btn primary" onClick={() => onDecide("retry", "Agent ponawia")}>
            Ponów
          </button>
          <button className="btn" onClick={() => onDecide("manual", "Oznaczono: obsługa ręczna")}>
            Obsłużę ręcznie
          </button>
        </div>
      )}
      {p.type === "escalation" && (
        <>
          <textarea
            aria-label="Odpowiedź dla klienta"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Odpowiedź, którą agent wyśle klientowi"
          />
          <button className="btn primary" disabled={!text.trim()} onClick={() => onDecide(text, "Wysłano odpowiedź")}>
            Wyślij odpowiedź
          </button>
        </>
      )}
      {p.type === "approval" && (
        <>
          <textarea
            aria-label="Uwagi do poprawy"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Uwagi (jeśli do poprawy)"
          />
          <div className="row-btns">
            <button className="btn primary" onClick={() => onDecide({ approved: true }, "Zatwierdzono")}>
              Zatwierdź
            </button>
            <button
              className="btn"
              disabled={!text.trim()}
              onClick={() => onDecide({ approved: false, notes: text }, "Wysłano do poprawy")}
            >
              Popraw
            </button>
            <button className="btn danger" onClick={() => onDecide({ approved: false }, "Odrzucono")}>
              Odrzuć
            </button>
          </div>
        </>
      )}
    </div>
  )
}
