import { defineConfig, loadEnv } from "@medusajs/framework/utils"

loadEnv(process.env.NODE_ENV || "development", process.cwd())

// Zdjęcia klientów (P002) to dane osobowe. Produkcja: prywatny bucket S3 (np. Supabase Storage, region UE).
// Lokalnie: katalog poza `static/` — dostawca lokalny serwuje `static/` publicznie, także pliki „private”.
const fileProvider = process.env.FILE_S3_BUCKET
  ? {
      resolve: "@medusajs/medusa/file-s3",
      id: "s3",
      options: {
        file_url: process.env.FILE_S3_URL,
        access_key_id: process.env.FILE_S3_ACCESS_KEY_ID,
        secret_access_key: process.env.FILE_S3_SECRET_ACCESS_KEY,
        region: process.env.FILE_S3_REGION,
        bucket: process.env.FILE_S3_BUCKET,
        endpoint: process.env.FILE_S3_ENDPOINT,
        additional_client_config: { forcePathStyle: true },
      },
    }
  : {
      resolve: "@medusajs/medusa/file-local",
      id: "local",
      options: { private_upload_dir: process.env.FILE_LOCAL_PRIVATE_DIR || "uploads-private" },
    }

// Jeden backend obsługuje wszystkie sklepy: każdy produkt = osobny Sales Channel + publishable API key
// (konfiguracja w Medusa Admin, nie w kodzie). ADR-001.
export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET!,
      cookieSecret: process.env.COOKIE_SECRET!,
    },
  },
  modules: [
    {
      resolve: "@medusajs/medusa/file",
      options: { providers: [fileProvider] },
    },
    {
      // Zdarzenia przez Redis — subscriber do agentów działa poza requestem klienta i ma ponowienia.
      resolve: "@medusajs/medusa/event-bus-redis",
      options: { redisUrl: process.env.REDIS_URL },
    },
    {
      resolve: "@medusajs/medusa/payment",
      options: {
        providers: [
          {
            // Karty, BLIK, Apple/Google Pay — dostępność BLIK potwierdzić przy aktywacji konta Stripe.
            resolve: "@medusajs/medusa/payment-stripe",
            id: "stripe",
            options: {
              apiKey: process.env.STRIPE_API_KEY,
              webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
            },
          },
        ],
      },
    },
  ],
})
