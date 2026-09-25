import { createHmac, timingSafeEqual } from "node:crypto"
import { cookies } from "next/headers"

export const SESSION_COOKIE = "biuro_session"
const MAX_AGE_S = 60 * 60 * 24 * 30

function secret(): string {
  const s = process.env.SESSION_SECRET
  if (!s || s.length < 32) throw new Error("SESSION_SECRET musi mieć min. 32 znaki")
  return s
}

function sign(value: string): string {
  return createHmac("sha256", secret()).update(value).digest("hex")
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a)
  const bb = Buffer.from(b)
  return ab.length === bb.length && timingSafeEqual(ab, bb)
}

export function passwordMatches(input: string): boolean {
  const expected = process.env.PANEL_PASSWORD
  return Boolean(expected) && safeEqual(input, expected!)
}

export function newSession(): { value: string; maxAge: number } {
  const expires = Math.floor(Date.now() / 1000) + MAX_AGE_S
  const payload = `owner.${expires}`
  return { value: `${payload}.${sign(payload)}`, maxAge: MAX_AGE_S }
}

export async function isAuthed(): Promise<boolean> {
  const raw = (await cookies()).get(SESSION_COOKIE)?.value
  if (!raw) return false
  const i = raw.lastIndexOf(".")
  const payload = raw.slice(0, i)
  const expires = Number(payload.split(".")[1])
  return safeEqual(raw.slice(i + 1), sign(payload)) && expires > Date.now() / 1000
}
