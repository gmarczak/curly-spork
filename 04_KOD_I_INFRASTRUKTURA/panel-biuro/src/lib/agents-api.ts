import { NextResponse } from "next/server"
import { isAuthed } from "./auth"

// Wszystkie wywołania API agentów idą przez serwer Next.js — token nigdy nie trafia do przeglądarki.
export async function proxy(path: string, init?: { method?: string; body?: unknown }) {
  if (!(await isAuthed())) {
    return NextResponse.json({ detail: "Zaloguj się" }, { status: 401 })
  }
  const base = process.env.AGENTS_API_URL ?? "http://localhost:8000"
  try {
    const res = await fetch(base + path, {
      method: init?.method ?? "GET",
      headers: {
        Authorization: `Bearer ${process.env.PANEL_API_TOKEN ?? ""}`,
        ...(init?.body !== undefined ? { "content-type": "application/json" } : {}),
      },
      body: init?.body !== undefined ? JSON.stringify(init.body) : undefined,
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    })
    const data = await res.json().catch(() => ({}))
    return NextResponse.json(data, { status: res.status })
  } catch {
    return NextResponse.json({ detail: "Serwis agentów nie odpowiada" }, { status: 502 })
  }
}
