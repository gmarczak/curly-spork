# Zasady Backupu i Bezpieczeństwa Zmiennych Środowiskowych

*Aktualizacja: 2026-09-25. Poprzednia wersja kazała trzymać backupy „w tym folderze" — to było ryzykowne, bo folder jest częścią repozytorium git. Obecna zasada: **backupy sekretów nigdy nie leżą w repo**, nawet zaszyfrowane.*

## Zasady podstawowe

1. **Nigdy nie commitować sekretów.** Root `.gitignore` blokuje: `.env`, `.env.*`, `*.env`, `*.env.backup`, `*.backup`, `*.age`, `*.pem`, `*.key` oraz całą zawartość tego folderu poza tym README. Wyjątek: `.env.example` (same nazwy zmiennych, bez wartości) — ma być w repo.
2. **Gdzie trzymać backupy:** zespołowy menedżer haseł (np. Bitwarden/1Password — sekcja „JaGrzep / env") jako źródło prawdy. Opcjonalnie dodatkowa kopia zaszyfrowana `age` na dysku poza repo (np. `~/jagrzep-secrets/`), nigdy w katalogu projektu.
3. **Nazewnictwo backupu:** `.env.[nazwa_repo].[RRRR-MM-DD].backup` (zaczyna się od `.env`, więc łapie go także standardowy wzorzec `.env.*` w każdym przyszłym repo). Zaszyfrowany: ten sam plik + `.age`.
4. **Przed każdym commitem** z nowym kodem: `git status` i sprawdzenie, czy nie ma plików `.env*`. Po inicjalizacji kodu dodać skaner sekretów w CI (np. `gitleaks`) — patrz `00_STRATEGIA/Architektura_Systemu/ADR_001_Stack_Techniczny.md`.

## Zasada najmniejszych uprawnień (klucze a agenci AI)

- `SUPABASE_SERVICE_ROLE_KEY` **omija Row Level Security** — trafia wyłącznie do `medusa-backend` (i skryptów administracyjnych), **nigdy do procesu agentów**.
- Agenci AI komunikują się z danymi sklepu przez **API Medusy z osobnym kluczem o ograniczonym zakresie** (patrz model uprawnień w ADR_001). Bezpośredni dostęp agentów do bazy: tylko rola read-only do bazy wiedzy (pgvector), filtrowana po `product_id`.
- Klucze reklamowe (Meta/TikTok) — tokeny systemowe z minimalnymi uprawnieniami, nie osobiste konta wspólników.

## Rejestr kluczy (tylko metadane — nigdy wartości)

| Dostawca | Zmienna env | Gdzie używana (folder) | Data wygenerowania | Hard cap / limit ustawiony? |
|---|---|---|---|---|
| Stripe | `STRIPE_API_KEY`, `STRIPE_WEBHOOK_SECRET` | medusa-backend | | n/a (monitoring Radar) |
| Medusa | `JWT_SECRET`, `COOKIE_SECRET`, `DATABASE_URL`, `REDIS_URL` | medusa-backend | | n/a |
| Medusa (klucz dla agentów) | `MEDUSA_AGENT_API_KEY` (ograniczony zakres) | ai-agents-langgraph | | n/a |
| Medusa (publishable) | `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | storefront-nextjs | | n/a (klucz publiczny) |
| Supabase | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | **tylko** medusa-backend | | n/a |
| Supabase (read-only RAG) | `KNOWLEDGE_DB_URL` (rola read-only) | ai-agents-langgraph | | n/a |
| Anthropic | `ANTHROPIC_API_KEY` | ai-agents-langgraph (przez LiteLLM) | | tak/nie — patrz `01_FINANSE_I_PRAWO/Koszty_Infrastruktura/Budzet_Startowy_i_Prognoza.md` |
| OpenAI / Google (opcjonalnie) | `OPENAI_API_KEY`, `GEMINI_API_KEY` | ai-agents-langgraph (przez LiteLLM) | | |
| Fal.ai | `FAL_KEY` | ai-agents-langgraph | | |
| LiteLLM | `LITELLM_MASTER_KEY` | ai-agents-langgraph | | n/a |
| Langfuse | `LANGFUSE_PUBLIC_KEY`, `LANGFUSE_SECRET_KEY` | ai-agents-langgraph | | n/a |
| Sentry | `SENTRY_DSN`, `SENTRY_AUTH_TOKEN` | wszystkie | | n/a |
| Cloudflare | `CLOUDFLARE_API_TOKEN` (zakres: DNS wybranych stref) | skrypty infra | | n/a |
| Meta Ads | `META_SYSTEM_USER_TOKEN`, `META_PIXEL_ID`, `META_CAPI_TOKEN` | storefront-nextjs / medusa-backend | | limit dzienny na koncie reklamowym |
| TikTok Ads | `TIKTOK_ACCESS_TOKEN`, `TIKTOK_PIXEL_ID` | storefront-nextjs / medusa-backend | | limit dzienny na koncie reklamowym |
| Dostawca dropshipping (np. CJ) | `CJ_API_KEY` | ai-agents-langgraph | | n/a |
| Przelewy24 (opcjonalnie) | `P24_MERCHANT_ID`, `P24_CRC`, `P24_API_KEY` | medusa-backend | | n/a |

## Przy rotacji lub wycieku klucza

1. **Natychmiast** unieważnić klucz w panelu dostawcy (nie czekać na analizę).
2. Wygenerować nowy klucz, zaktualizować menedżer haseł i wszystkie środowiska (dev/prod), zrestartować usługi.
3. Jeśli klucz trafił do gita: usunięcie commita **nie wystarcza** — klucz traktujemy jako spalony (krok 1). Historię czyścić dopiero po rotacji.
4. Sprawdzić logi dostawcy (zużycie API, transakcje) za okres ekspozycji.
5. Wpis w rejestrze powyżej (data rotacji i powód) + zgłoszenie w `05_OPERACJE_I_ARCHIWUM/Zgloszenia_i_Bledy/` wg `Szablon_Zgloszenia_Bledu.md` (typ: techniczny, priorytet: krytyczny).
