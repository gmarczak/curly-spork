import { proxy } from "@/lib/agents-api"

export const dynamic = "force-dynamic"

export async function GET() {
  return proxy("/panel/state")
}
