import { NextResponse } from "next/server"
import { SESSION_COOKIE, newSession, passwordMatches } from "@/lib/auth"

export async function POST(req: Request) {
  const form = await req.formData()
  const ok = passwordMatches(String(form.get("password") ?? ""))
  const res = NextResponse.redirect(new URL(ok ? "/" : "/login?blad=1", req.url), 303)
  if (ok) {
    const s = newSession()
    res.cookies.set(SESSION_COOKIE, s.value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: s.maxAge,
      path: "/",
    })
  }
  return res
}
