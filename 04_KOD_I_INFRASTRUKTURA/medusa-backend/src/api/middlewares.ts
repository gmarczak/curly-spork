import { defineMiddlewares } from "@medusajs/framework/http"
import multer from "multer"

// Zdjęcie klienta do zestawów personalizowanych (P002). Pamięć zamiast dysku — plik od razu trafia do File Module.
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 15 * 1024 * 1024, files: 1 } })

export default defineMiddlewares({
  routes: [{ method: ["POST"], matcher: "/store/carts/:id/photo", middlewares: [upload.single("photo")] }],
})
