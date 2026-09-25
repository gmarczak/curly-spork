import { proxy } from "@/lib/agents-api"

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json().catch(() => null)
  if (!body || !("decision" in body)) {
    return Response.json({ detail: "Brak decyzji" }, { status: 400 })
  }
  return proxy(`/approvals/${encodeURIComponent(id)}`, { method: "POST", body: { decision: body.decision } })
}
