import type { MedusaResponse, MedusaStoreRequest } from "@medusajs/framework/http"
import { ContainerRegistrationKeys, MedusaError } from "@medusajs/framework/utils"
import { uploadFilesWorkflow } from "@medusajs/medusa/core-flows"

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"])

type UploadedFile = { originalname: string; mimetype: string; buffer: Buffer; size: number }

// POST /store/carts/:id/photo — zdjęcie klienta do koszyka. Zwraca file_id, który storefront zapisuje
// w metadanych pozycji koszyka (przechodzą do zamówienia). Plik prywatny: nie ma publicznego URL.
export async function POST(req: MedusaStoreRequest, res: MedusaResponse) {
  const file = (req as MedusaStoreRequest & { file?: UploadedFile }).file
  if (!file) throw new MedusaError(MedusaError.Types.INVALID_DATA, "Brak pliku w polu „photo”.")
  if (!ALLOWED.has(file.mimetype)) {
    throw new MedusaError(MedusaError.Types.INVALID_DATA, "Dozwolone formaty: JPG, PNG, WEBP.")
  }

  // Upload tylko do istniejącego koszyka w kanale sprzedaży tego sklepu — ogranicza nadużycia endpointu.
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)
  const { data: carts } = await query.graph({ entity: "cart", fields: ["id", "sales_channel_id"], filters: { id: req.params.id } })
  const cart = carts[0]
  const channels = req.publishable_key_context?.sales_channel_ids ?? []
  if (!cart || (channels.length > 0 && !channels.includes(cart.sales_channel_id as string))) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "Nie znaleziono koszyka.")
  }

  const { result } = await uploadFilesWorkflow(req.scope).run({
    input: {
      files: [
        {
          filename: `cart-${cart.id}-${Date.now()}-${file.originalname.replace(/[^\w.-]/g, "_")}`,
          mimeType: file.mimetype,
          content: file.buffer.toString("base64"),
          access: "private",
        },
      ],
    },
  })

  res.status(201).json({ file_id: result[0].id })
}
