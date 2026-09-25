import { proxy } from "@/lib/agents-api"

export async function POST() {
  return proxy("/panel/demo/order", { method: "POST" })
}
