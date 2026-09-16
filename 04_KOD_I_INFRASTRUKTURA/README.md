# Kod i Infrastruktura — Mapa Repozytoriów

Ten folder zawiera trzy niezależne, ale współpracujące repozytoria kodu wspólnego silnika (patrz architektura w `00_STRATEGIA/Architektura_Systemu/Infrastruktura.md`):

| Folder | Rola | Technologia | Hosting docelowy |
|---|---|---|---|
| `medusa-backend/` | Silnik e-commerce: katalog, zamówienia, płatności (Stripe), integracja z kurierami/dostawcami | MedusaJS (Node.js/TypeScript) | Hetzner VPS |
| `storefront-nextjs/` | Frontend wielodomenowy — rozpoznaje domenę klienta i renderuje odpowiedni sklep | Next.js | Vercel |
| `ai-agents-langgraph/` | Zespół agentów AI (Onboarding/Branding, Support, Marketing, Fulfillment) | LangGraph / CrewAI (Python) | Hetzner VPS (osobny proces/worker) |
| `env_backups/` | Backupy zmiennych środowiskowych — NIGDY nie commitować do repo kodu | — | lokalnie / szyfrowany backup |

## Jak te repozytoria się łączą

1. Klient wchodzi na domenę produktową → `storefront-nextjs` rozpoznaje domenę i ładuje layout/dane danego produktu z `medusa-backend` (API).
2. Zamówienie trafia do `medusa-backend`, płatność przez Stripe.
3. Po opłaceniu zamówienia `medusa-backend` emituje event, który odbiera `ai-agents-langgraph` (Agent Fulfillmentu) i przekazuje dane do dostawcy.
4. Live-chat na storefroncie komunikuje się z Agentem Wsparcia w `ai-agents-langgraph`, który ma dostęp do bazy wektorowej (pgvector w Supabase) z wiedzą o TYLKO tym jednym produkcie.

## Status na dzień 2026-09-16

Wszystkie trzy foldery repo są obecnie puste (scaffolding katalogów, brak zainicjalizowanego kodu). Kolejny krok techniczny: inicjalizacja MedusaJS + Next.js + struktury LangGraph po wybraniu pierwszego produktu (patrz `00_STRATEGIA/Proces_Wyboru_Produktu.md`) — nie ma sensu kodować przed wyborem niszy, żeby nie zgadywać wymagań.

## Rekomendowane dodatki (patrz `Infrastruktura.md` Część 4)

- Cloudflare przed Vercel+Hetzner (DNS/WAF)
- Sentry (error tracking)
- Langfuse/Helicone (monitoring kosztów/jakości LLM)
- Redis + BullMQ (kolejka zadań agentów) — do dodania jako czwarty komponent, np. `queue-worker/` lub jako część `ai-agents-langgraph/`
