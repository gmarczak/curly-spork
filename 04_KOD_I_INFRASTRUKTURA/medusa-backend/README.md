# medusa-backend

Medusa v2 (2.21.1). Status: **szkielet — typecheck i `medusa build` przechodzą**; wymaga Postgresa i Redisa do uruchomienia.

## Co jest

- `medusa-config.ts` — Postgres, event bus Redis, płatności Stripe.
- `src/subscribers/order-placed.ts` — opłacone zamówienie → podpisany webhook do serwisu agentów.
- `src/lib/agent-webhook.ts` — podpis HMAC zgodny z `ai-agents-langgraph` (test: `npm run test:webhook`).

## Uruchomienie lokalne

```bash
docker compose -f ../docker-compose.yml up -d postgres redis
cp .env.example .env        # uzupełnij sekrety
npm install
npx medusa db:migrate
npx medusa user -e ty@example.com -p <hasło>
npm run dev                 # API :9000, panel /app
```

## Nowy produkt (sklep) — w Medusa Admin, bez kodu

1. Sales Channel „P00X_Nazwa”.
2. Publishable API key przypisany do tego kanału → wpis w `storefront-nextjs/stores.config.json`.
3. Produkt (najpierw szkic) w tym kanale, cena w PLN, region Polska z płatnością Stripe.
