import { proxy } from "@/lib/agents-api"

export async function POST(_req: Request, { params }: { params: Promise<{ id: string; action: string }> }) {
  const { id, action } = await params
  return proxy(`/panel/agents/${encodeURIComponent(id)}/${encodeURIComponent(action)}`, { method: "POST" })
}
