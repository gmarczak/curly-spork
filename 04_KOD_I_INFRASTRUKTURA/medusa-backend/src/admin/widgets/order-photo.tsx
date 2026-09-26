import { defineWidgetConfig } from "@medusajs/admin-sdk"
import type { AdminOrder, DetailWidgetProps } from "@medusajs/framework/types"
import { useState } from "react"

// Panel admina → zamówienie: pobranie / usunięcie zdjęcia klienta (P002 Z Kadru).
const OrderPhotoWidget = ({ data: order }: DetailWidgetProps<AdminOrder>) => {
  const items = order.items ?? []
  const hasPhoto = items.some((i) => typeof i.metadata?.photo_file_id === "string")
  const deletedAt = items.map((i) => i.metadata?.photo_deleted_at).find((v) => typeof v === "string") as string | undefined
  const [status, setStatus] = useState<string | null>(null)
  if (!hasPhoto && !deletedAt) return null

  async function remove() {
    setStatus("Usuwam…")
    const res = await fetch(`/admin/orders/${order.id}/photo`, { method: "DELETE", credentials: "include" })
    setStatus(res.ok ? "Zdjęcie usunięte. Odśwież stronę." : "Nie udało się usunąć zdjęcia.")
  }

  return (
    <div className="shadow-elevation-card-rest bg-ui-bg-base rounded-lg p-4 flex flex-col gap-3">
      <h2 className="font-medium">Zdjęcie klienta</h2>
      {hasPhoto ? (
        <>
          <p className="text-ui-fg-subtle text-sm">Wyślij je dostawcy. Po doręczeniu zestawu usuń zdjęcie (procedura P002, krok 9).</p>
          <div className="flex gap-2">
            <a className="underline" href={`/admin/orders/${order.id}/photo`}>
              Pobierz zdjęcie
            </a>
            <button type="button" className="underline text-ui-fg-error" onClick={remove}>
              Usuń zdjęcie
            </button>
          </div>
        </>
      ) : (
        <p className="text-ui-fg-subtle text-sm">Zdjęcie usunięte: {new Date(deletedAt as string).toLocaleString("pl-PL")}</p>
      )}
      {status && <p className="text-sm">{status}</p>}
    </div>
  )
}

export const config = defineWidgetConfig({ zone: "order.details.side.after" })

export default OrderPhotoWidget
