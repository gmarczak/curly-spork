# ADR-001: Stack techniczny — zamknięcie otwartych wyborów

| Pole | Wartość |
|---|---|
| Data | 2026-09-25 |
| Status | **PRZYJĘTA — 2026-09-25** (akceptacja: właściciel / gmarczak) |
| Zastępuje | „Status stacku" w `Infrastruktura.md`, Część 4 (tam nadal zostawały pary „X / Y") |

## Kontekst

Dokumenty architektury opisywały stack jako „potwierdzony", ale zostawiały otwarte alternatywy (Next.js / Astro, LangGraph / CrewAI, Supabase / Postgres na Hetzner, Langfuse / Helicone, Vercel / Cloudflare Pages), a n8n pojawiało się tylko w jednym dokumencie. Przy dwuosobowym zespole każda alternatywa to podwójna dokumentacja, podwójne prompty dla Claude Code i ryzyko rozjazdu. Ten ADR wybiera **jedną** opcję w każdym punkcie.

## Decyzje

| Obszar | Decyzja | Odrzucone | Uzasadnienie |
|---|---|---|---|
| Silnik e-commerce | **MedusaJS v2** (Node.js/TypeScript) | Saleor | Sales Channels + publishable API key per sklep = gotowy multi-tenant; gotowy Medusa Admin; natywny moduł Stripe |
| Frontend | **Next.js** (na bazie oficjalnego Medusa Next.js Starter) | Astro | Starter daje gotowy checkout z Medusą; jeden framework = mniej kodu do utrzymania |
| Routing wielodomenowy | Middleware Next.js: `host` → konfiguracja sklepu (publishable key, sales channel, motyw, teksty) | osobny deploy per domena | Jeden deploy obsługuje N domen — sedno modelu fabryki |
| Hosting frontendu | **Vercel** (Hobby na testy, Pro przy komercyjnym ruchu) | Cloudflare Pages | Najlepsza obsługa Next.js; wiele domen w jednym projekcie |
| Baza danych | **PostgreSQL w Supabase** (+ rozszerzenie **pgvector**) | Postgres self-host na Hetzner, Qdrant | Zero administracji bazą na starcie, backupy w pakiecie; pgvector wystarczy do RAG na dziesiątki produktów. Migracja na self-host możliwa później (to zwykły Postgres) |
| Silnik agentów | **LangGraph (Python)** | CrewAI | Deterministyczne przepływy (fulfillment, zwroty) są ważniejsze niż „swobodna współpraca ról"; jeden framework agentów |
| Kolejka zadań agentów | **Redis + `arq`** (Python) po stronie agentów | BullMQ | BullMQ jest biblioteką Node — agenci są w Pythonie. Medusa i tak potrzebuje Redisa (event bus), więc jeden Redis na VPS |
| Integracja Medusa → agenci | Subscriber Medusy na zdarzenie (np. `order.placed`) → **podpisany webhook HTTP** do serwisu agentów → zadanie w kolejce | bezpośredni dostęp agentów do bazy Medusy | Wyraźny kontrakt, idempotencja po ID zdarzenia, brak sprzężenia na poziomie schematu bazy |
| Brama modeli AI | **LiteLLM proxy** z osobnym „virtual key" i budżetem per agent | bezpośrednie wywołania SDK | Twardy limit kosztów per agent w jednym miejscu, routing tanich/drogich modeli |
| Monitoring LLM | **Langfuse Cloud** (darmowy plan na start) | Langfuse self-host, Helicone | Self-host Langfuse v3 wymaga ClickHouse + Redis + S3 — za ciężkie na mały VPS. Przejście na self-host rozważyć przy skali |
| Error tracking | **Sentry** (darmowy plan) | — | Bez zmian względem `Infrastruktura.md` |
| DNS / domeny | **Cloudflare** jako DNS dla wszystkich domen; proxy (WAF) włączone dla API na Hetzner; dla domen na Vercel **tryb DNS-only** | proxy Cloudflare przed Vercel | Vercel odradza proxowanie przez Cloudflare (konflikty cache/certyfikatów); Vercel ma własny firewall |
| Backend + agenci | **Hetzner VPS** (Docker Compose: Medusa, worker agentów, LiteLLM, Redis) | — | Bez zmian |
| Płatności | **Stripe** (karty, BLIK, Apple/Google Pay); Przelewy24 dopiero jako test A/B po pierwszym GO | PayU | Jedna integracja; dostępność BLIK potwierdzić przy aktywacji konta Stripe |
| Panel „Biuro Agentów” | **Własna aplikacja Next.js** (`04_KOD_I_INFRASTRUKTURA/panel-biuro/`): podgląd myśli, plan, sterowanie, akceptacje; dane z Langfuse, LangGraph, Redis | tylko Langfuse / LangGraph Studio | Gotowe narzędzia pokazują logi, ale nie dają sterowania ani kolejki akceptacji dla właściciela. Dodane 2026-09-25 |
| Automatyzacje no-code (n8n) | **Nie w MVP** | — | Wraca do rozważenia, gdy pojawi się powtarzalny przepływ, którego nie opłaca się kodować |
| Repozytorium | **Monorepo** (to repo): `04_KOD_I_INFRASTRUKTURA/medusa-backend`, `storefront-nextjs`, `ai-agents-langgraph` | 3 osobne repo / submoduły | Jedna historia zmian, prostsza praca z Claude Code |
| CI | GitHub Actions: lint + testy + **gitleaks** (skan sekretów) na każdym PR | — | Tania, automatyczna ochrona przed wyciekiem kluczy |

## Izolacja danych między produktami

- Dane sklepu (produkty, zamówienia, klienci) izoluje **Medusa**: sales channel i publishable key per produkt. Tabele Medusy **nie** korzystają z Row Level Security Supabase — Medusa łączy się jako jeden użytkownik bazy.
- **Baza wiedzy agentów** (pgvector) to osobna tabela z kolumną `product_id`; agent łączy się rolą read-only, a zapytania są zawsze filtrowane po `product_id` bieżącej domeny (opcjonalnie wymuszone przez RLS na tej jednej tabeli).

## Model uprawnień agentów (co agent może zrobić w Medusie)

| Agent | Odczyt | Zapis | Czego NIE może | Eskalacja do człowieka |
|---|---|---|---|---|
| Wsparcia | status zamówienia (po nr zamówienia + e-mail klienta), baza wiedzy produktu | utworzenie **wniosku** o zwrot (status oczekujący) | zatwierdzić zwrotu pieniędzy, zmienić ceny, zobaczyć inne zamówienia | wg `05_OPERACJE_I_ARCHIWUM/Procedury_SOP/SOP_Obsluga_Zwrotow_i_Reklamacji.md` |
| Fulfillmentu | opłacone zamówienia swojego sales channel | przekazanie do dostawcy, numer przesyłki, status realizacji | anulować zamówienie, zwracać pieniądze | błąd API dostawcy 2× z rzędu, brak towaru |
| Onboardingu / Brandingu | specyfikacja produktu | produkt w statusie **draft** + treści landing page | opublikować produktu (publikuje człowiek) | — |
| Marketingowy | wyniki kampanii (read-only) | brak zapisu w Medusie; kreacje jako pliki/szkice | uruchomić ani zwiększyć budżetu kampanii | każde uruchomienie kampanii |

Każdy agent ma własny klucz API Medusy o powyższym zakresie i własny virtual key w LiteLLM z miesięcznym budżetem.

## Modele AI (poziomy) — stan 2026-09

Nazwy i ceny modeli zmieniają się co kilka miesięcy — **przed wdrożeniem sprawdzić aktualne cenniki**; przez LiteLLM zmiana modelu to zmiana konfiguracji, nie kodu.

| Poziom | Przykładowy model | Zastosowanie |
|---|---|---|
| Tani / szybki (~90% ruchu) | Claude Haiku 4.5 (lub aktualny tani model Google/OpenAI) | czat supportu, FAQ, klasyfikacja zgłoszeń |
| Kreatywny (~8%) | Claude Sonnet 5 | copy na landing page, skrypty wideo, trudne rozmowy z klientem |
| Analityczny (~2%) | Claude Opus 5.5 lub model rozumujący innego dostawcy | analiza marży, anomalie w zamówieniach, research kandydatów |
| Grafika | FLUX (przez Fal.ai) | zdjęcia produktowe i lifestyle |

## Konsekwencje

- Dwa języki (TypeScript w backendzie/frontendzie, Python w agentach) — świadomy koszt; granica między nimi to webhook + API Medusy, więc zespoły/sesje Claude Code mogą pracować niezależnie.
- Zależność od Supabase i Langfuse Cloud (SaaS) — dane klientów w Supabase: wybrać region UE (Frankfurt) i uwzględnić w polityce prywatności.
- `Infrastruktura.md` i `Panel_Zarzadzania_i_Podzial_Rol.md` odwołują się do tego ADR zamiast powtarzać listę alternatyw.

## Do zatwierdzenia

- [x] Właściciel (gmarczak): akceptuję — 2026-09-25
