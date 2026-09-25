import { createHmac } from "node:crypto"

// Format podpisu zgodny z ai-agents-langgraph/src/fabryka_agents/security.py:
// nagłówek x-signature = "t=<unix>,v1=<hex(HMAC-SHA256(secret, `${t}.${body}`))>"
export function sign(body: string, secret: string, timestamp = Math.floor(Date.now() / 1000)): string {
  const mac = createHmac("sha256", secret).update(`${timestamp}.${body}`).digest("hex")
  return `t=${timestamp},v1=${mac}`
}

export type AgentEvent = { id: string; name: string; data: Record<string, unknown> }

export async function sendToAgents(event: AgentEvent): Promise<void> {
  const url = process.env.AGENTS_WEBHOOK_URL
  const secret = process.env.AGENTS_WEBHOOK_SECRET
  if (!url || !secret) {
    throw new Error("Brak AGENTS_WEBHOOK_URL lub AGENTS_WEBHOOK_SECRET")
  }
  const body = JSON.stringify(event)
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json", "x-signature": sign(body, secret) },
    body,
    signal: AbortSignal.timeout(10_000),
  })
  // Błąd rzuca wyjątek → event bus Redis ponowi zdarzenie; serwis agentów deduplikuje po event.id.
  if (!res.ok) {
    throw new Error(`Serwis agentów odpowiedział ${res.status}`)
  }
}
