# storefront-nextjs

Next.js 16 — jeden deploy obsługuje wszystkie domeny produktowe. Status: **szkielet — typecheck i `next build` przechodzą**; domena → sklep sprawdzona lokalnie (nieznana domena = 404).

## Jak działa

- `stores.config.json` — lista sklepów: domeny, publishable key Medusy, marka, kolory, dane sprzedawcy, dostawa.
- `src/lib/current-store.ts` — nagłówek `host` → konfiguracja sklepu.
- `src/lib/medusa.ts` — klient Medusy z publishable key sklepu (dane tylko z jego sales channel).
- Stopka ze standardami zaufania z Brand Booka (sprzedawca, regulamin, 14 dni na odstąpienie).

## Uruchomienie

```bash
cp .env.example .env.local
npm install
npm run dev      # http://localhost:3000 = sklep Demo
```

## Do zrobienia

- Koszyk i checkout Stripe (na bazie Medusa Next.js Starter).
- Omnibus (najniższa cena z 30 dni), funkcja „odstąp od umowy”, baner cookies, czat z Agentem Wsparcia.
- Pixel Meta/TikTok + Conversions API (po zgodzie cookies).
