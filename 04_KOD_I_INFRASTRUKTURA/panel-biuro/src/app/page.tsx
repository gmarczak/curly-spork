import { redirect } from "next/navigation"
import Dashboard from "@/components/Dashboard"
import { isAuthed } from "@/lib/auth"

export const dynamic = "force-dynamic"

export default async function Home() {
  if (!(await isAuthed())) redirect("/login")
  return <Dashboard />
}
