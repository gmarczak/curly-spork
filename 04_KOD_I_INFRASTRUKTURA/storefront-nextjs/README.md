# storefront-nextjs

Next.js 16 — jeden deploy obsługuje wszystkie domeny produktowe. Status: **szkielet — typecheck i `next build` przechodzą**; domena → sklep sprawdzona lokalnie (nieznana domena = 404).

## Jak działa

- `stores.config.json` — lista sklepów: domeny, publishable key Medusy, marka, kolory, dane sprzedawcy, dostawa; opcjonalnie `landing` (treść strony produktu), `draft` (baner „nie publikować”) i `withdrawal` (tekst o zwrotach w stopce).
- `src/lib/current-store.ts` — nagłówek `host` → konfiguracja sklepu.
- `src/lib/medusa.ts` — klient Medusy z publishable key sklepu (dane tylko z jego sales channel).
- Stopka ze standardami zaufania z Brand Booka (sprzedawca, regulamin, 14 dni na odstąpienie).

## Zamówienie (P002 Z Kadru)

- `/zamow` — zdjęcie (kontrola formatu, rozmiaru i rozdzielczości: min. 1000 px, zalecane 1500 px na krótszym boku), dane wysyłki, akceptacja regulaminu, płatność Stripe (Payment Element), potwierdzenie.
- Przepływ w `src/lib/checkout.ts`: koszyk → `POST /store/carts/:id/photo` (Medusa) → pozycja z `metadata.photo_file_id` → adres → dostawa → sesja płatności → `complete`.
- Baner cookies (`src/app/consent.tsx`): piksel Meta (`metaPixelId` w konfiguracji) ładuje się dopiero po zgodzie; „Ustawienia cookies” w stopce.
- Test lokalny bez Stripe: `CHECKOUT_TEST_MODE=1` + seed `medusa-backend/src/scripts/seed-p002.ts`. Sprawdzone 2026-09-26: zamówienie ze zdjęciem przechodzi do Medusy; ścieżka Stripe — typecheck, bez testu na prawdziwym koncie.

## Uruchomienie

```bash
cp .env.example .env.local
npm install
npm run dev      # http://localhost:3000 = sklep Demo
```

## Do zrobienia

- Test płatności Stripe na koncie testowym (po założeniu konta), w tym BLIK.
- Omnibus (najniższa cena z 30 dni) — przy pierwszej promocji; funkcja „odstąp od umowy” — po decyzji prawnika (P002 może być wyłączony); czat z Agentem Wsparcia.
- Conversions API (serwerowe zdarzenia Meta) i piksel TikTok.
