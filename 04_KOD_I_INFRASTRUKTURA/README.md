# Kod i Infrastruktura — Mapa Repozytoriów

Ten folder zawiera trzy współpracujące komponenty kodu wspólnego silnika — jako **podfoldery jednego repozytorium (monorepo)**, nie osobne repo ani submoduły (decyzja: `00_STRATEGIA/Architektura_Systemu/ADR_001_Stack_Techniczny.md`; tło: `Infrastruktura.md`):

| Folder | Rola | Technologia | Hosting docelowy |
|---|---|---|---|
| `medusa-backend/` | Silnik e-commerce: katalog, zamówienia, płatności (Stripe), integracja z kurierami/dostawcami | MedusaJS (Node.js/TypeScript) | Hetzner VPS |
| `storefront-nextjs/` | Frontend wielodomenowy — rozpoznaje domenę klienta i renderuje odpowiedni sklep | Next.js | Vercel |
| `ai-agents-langgraph/` | Zespół agentów AI (Onboarding/Branding, Support, Marketing, Fulfillment) | LangGraph (Python) + kolejka Redis/`arq` + LiteLLM | Hetzner VPS (osobny proces/worker) |
| `panel-biuro/` | Biuro Agentów: podgląd myśli i planu agentów, sterowanie, akceptacje (obecnie: `biuro.html`) | Next.js | Vercel (dostęp tylko dla właściciela) |
| `env_backups/` | Tylko README z zasadami — same backupy trzymamy w menedżerze haseł, poza repo (blokuje to root `.gitignore`) | — | menedżer haseł / szyfrowany backup poza repo |

## Jak te repozytoria się łączą

1. Klient wchodzi na domenę produktową → `storefront-nextjs` rozpoznaje domenę i ładuje layout/dane danego produktu z `medusa-backend` (API).
2. Zamówienie trafia do `medusa-backend`, płatność przez Stripe.
3. Po opłaceniu zamówienia subscriber w `medusa-backend` wysyła podpisany webhook do `ai-agents-langgraph`; serwis agentów wrzuca zadanie do kolejki, a Agent Fulfillmentu przekazuje dane do dostawcy i zapisuje numer przesyłki przez API Medusy (klucz o ograniczonym zakresie — model uprawnień w ADR_001).
4. Live-chat na storefroncie komunikuje się z Agentem Wsparcia w `ai-agents-langgraph`, który ma dostęp do bazy wektorowej (pgvector w Supabase) z wiedzą o TYLKO tym jednym produkcie.

## Status na dzień 2026-09-25

Szkielet kodu gotowy (2026-09-25): serwis agentów (21 testów), Medusa (typecheck + build), storefront (typecheck + build + routing domen), `docker-compose.yml`, CI w `.github/workflows/ci.yml`. Brakuje elementów zależnych od produktu: dostawca, checkout, baza wiedzy, treści — patrz README w podfolderach.

## Rekomendowane dodatki (patrz `Infrastruktura.md` Część 4)

- Cloudflare przed Vercel+Hetzner (DNS/WAF)
- Sentry (error tracking)
- Langfuse Cloud (monitoring kosztów/jakości LLM)
- LiteLLM (brama modeli z budżetem per agent)
- Redis + `arq` (kolejka zadań agentów) — jako część `ai-agents-langgraph/` (worker)
- GitHub Actions: lint, testy, gitleaks
