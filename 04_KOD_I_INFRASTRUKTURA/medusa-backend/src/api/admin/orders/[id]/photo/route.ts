import type { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys, MedusaError, Modules } from "@medusajs/framework/utils"

type Item = { id: string; metadata?: Record<string, unknown> | null }

// Zdjęcia klientów (P002) przy zamówieniu — tylko dla zalogowanego admina (trasy /admin/* wymagają sesji lub tokenu).
async function loadOrder(req: AuthenticatedMedusaRequest) {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
  const { data } = await query.graph({ entity: "order", fields: ["id", "display_id", "items.id", "items.metadata"], filters: { id: req.params.id } })
  const order = data[0] as { id: string; display_id: number; items: Item[] } | undefined
  if (!order) throw new MedusaError(MedusaError.Types.NOT_FOUND, "Nie znaleziono zamówienia.")
  return order
}

const photoId = (i: Item) => (typeof i.metadata?.photo_file_id === "string" ? (i.metadata.photo_file_id as string) : null)

// GET — pobranie zdjęcia (pierwsza pozycja ze zdjęciem albo ?item=<id pozycji>).
export async function GET(req: AuthenticatedMedusaRequest, res: MedusaResponse) {
  const order = await loadOrder(req)
  const wanted = typeof req.query.item === "string" ? req.query.item : null
  const item = order.items.find((i) => photoId(i) && (!wanted || i.id === wanted))
  const fileId = item && photoId(item)
  if (!fileId) throw new MedusaError(MedusaError.Types.NOT_FOUND, "Zamówienie nie ma zdjęcia (albo zostało usunięte).")

  const files = req.scope.resolve(Modules.FILE)
  const buffer = await files.getAsBuffer(fileId).catch(() => {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "Plik zdjęcia nie istnieje w magazynie plików.")
  })
  const ext = (fileId.split(".").pop() ?? "jpg").toLowerCase()
  const type = ext === "png" ? "image/png" : ext === "webp" ? "image/webp" : "image/jpeg"
  res.setHeader("Content-Type", type)
  res.setHeader("Content-Disposition", `attachment; filename="zamowienie-${order.display_id}.${ext}"`)
  res.setHeader("Cache-Control", "no-store")
  res.send(buffer)
}

// DELETE — usunięcie zdjęć zamówienia (krok 9 procedury P002 i żądania RODO). Zostaje data usunięcia.
export async function DELETE(req: AuthenticatedMedusaRequest, res: MedusaResponse) {
  const order = await loadOrder(req)
  const withPhoto = order.items.filter((i) => photoId(i))
  if (withPhoto.length) {
    await req.scope.resolve(Modules.FILE).deleteFiles(withPhoto.map((i) => photoId(i) as string))
    const deletedAt = new Date().toISOString()
    const orders = req.scope.resolve(Modules.ORDER)
    // Metadane pozycji są w dwóch tabelach: pozycja zamówienia (line item) i jej wersja (order item, z niej czyta panel).
    for (const i of withPhoto) {
      const metadata = { ...(i.metadata ?? {}), photo_file_id: null, photo_deleted_at: deletedAt }
      await orders.updateOrderLineItems([{ selector: { id: i.id }, data: { metadata } }])
      await orders.updateOrderItem([{ selector: { item_id: i.id }, data: { metadata } }])
    }
  }
  res.json({ deleted: withPhoto.length })
}
