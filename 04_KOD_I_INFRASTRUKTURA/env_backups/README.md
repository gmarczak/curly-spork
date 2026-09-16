# Zasady Backupu i Bezpieczeństwa Zmiennych Środowiskowych

## Zasady podstawowe

1. **Nigdy nie commitować `.env` do repozytorium git** — dodać `.env*` do `.gitignore` w każdym z trzech repo (`medusa-backend`, `storefront-nextjs`, `ai-agents-langgraph`).
2. Backupy `.env` przechowywać wyłącznie w tym folderze, poza kontrolą wersji, najlepiej dodatkowo zaszyfrowane (np. za pomocą `age` lub menadżera haseł zespołowego).
3. Każdy backup nazwany: `[nazwa_repo]_[data]_.env.backup` (nigdy jako gołe `.env`, żeby uniknąć przypadkowego automatycznego wczytania).

## Status kluczy API (na dzień 2026-09-16)

Konta u dostawców są zakładane na bieżąco, w miarę potrzeb — klucze API jeszcze nie wygenerowane. Kiedy powstaną, każdy klucz powinien mieć tutaj wpis w poniższej tabeli (bez samej wartości klucza — tylko metadane):

| Dostawca | Zmienna env | Gdzie używana (repo) | Data wygenerowania | Hard cap ustawiony? |
|---|---|---|---|---|
| Stripe | `STRIPE_SECRET_KEY` | medusa-backend | | |
| Anthropic | `ANTHROPIC_API_KEY` | ai-agents-langgraph | | tak/nie — patrz `01_FINANSE_I_PRAWO/Koszty_Infrastruktura/Budzet_Startowy_i_Prognoza.md` |
| OpenAI | `OPENAI_API_KEY` | ai-agents-langgraph | | |
| DeepSeek | `DEEPSEEK_API_KEY` | ai-agents-langgraph | | |
| Fal.ai / Replicate | `FAL_API_KEY` | ai-agents-langgraph | | |
| Supabase | `SUPABASE_URL`, `SUPABASE_SERVICE_KEY` | medusa-backend, ai-agents-langgraph | | n/a |
| Upstash Redis | `REDIS_URL` | ai-agents-langgraph | | n/a |

## Przy rotacji/wycieku klucza

1. Natychmiastowa rewokacja w panelu dostawcy.
2. Wygenerowanie nowego klucza, aktualizacja we wszystkich środowiskach (dev/prod).
3. Wpis w tabeli powyżej z datą rotacji i powodem.
