# Dokumentacja: Fabryka E-commerce AI (Multi-Tenant)

---

# Część 1: Architektura i Koncepcja Systemu

### Cel projektu
Jeden centralny system e-commerce i jeden zespół agentów AI, który pozwala błyskawicznie uruchamiać i prowadzić sprzedaż pojedynczych produktów (lub nisz) pod osobnymi domenami bez konieczności stawiania sklepów od zera.

### Zasada działania (Multi-Tenant Engine)
* **Wspólny silnik techniczny:** Jeden centralny kod, wspólna baza danych, te same integracje z płatnościami (np. Stripe, Przelewy24) i kurierami.
* **Wiele storefrontów:** Każdy nowy produkt otrzymuje osobną domenę i unikalny landing page generowany dynamicznie.
* **Uniwersalni agenci AI:** Ten sam kod logiczny agenta obsługuje wszystkie sklepy. Gdy klient wchodzi na daną domenę, agent wstrzykuje do kontekstu tylko wiedzę o tym jednym produkcie (specyfikacja, regulamin, persona marki).

### Otwartoźródłowy stos technologiczny (Open-Source)
1. **Silnik E-commerce (Backend):**
   * **MedusaJS (rekomendowany):** Otwarty odpowiednik Shopify w Node.js/TypeScript. Natywnie obsługuje wiele kanałów sprzedaży (*Sales Channels*), walut i cenników z jednego panelu.
   * *Alternatywa:* Saleor (Python/Django, GraphQL).
2. **Silnik Agentów AI (Orkiestracja):**
   * **LangGraph:** Kontrola deterministycznych procesów decyzyjnych i pętli zadań w oparciu o grafy stanów.
   * **CrewAI:** Definiowanie ról agentów (badacz rynku, copywriter, support) i klonowanie szablonów zespołów.
3. **Frontend (Strony sklepowe):**
   * **Next.js / Astro:** Jedna aplikacja frontowa z routingiem wielodomenowym (*multi-domain*). Rozpoznaje domenę, na którą wszedł klient, i w locie renderuje odpowiedni layout, kolory, teksty i checkout.
4. **Baza danych i Pamięć AI:**
   * **PostgreSQL / Supabase:** Centralna baza danych z mechanizmem *Row Level Security* (izolacja danych per produkt).
   * **pgvector / Qdrant:** Baza wektorowa do wyszukiwania semantycznego (RAG) – wiedza produktowa i baza FAQ dla bota obsługi.

### Główne role agentów
* **Agent Onboardingu / Brandingu:** Generuje landing page, opisy SEO, dobiera styl wizualny i konfiguruje parametry nowego produktu w bazie.
* **Agent Wsparcia (Support):** Doradca live-chat dla klienta; odpowiada wyłącznie w kontekście kupowanego przedmiotu i domyka koszyk.
* **Agent Marketingowy:** Przygotowuje warianty nagłówków i treści reklam (Meta, TikTok, Google Ads) pod testy A/B.
* **Agent Fulfillmentu:** Po opłaceniu zamówienia automatycznie przekazuje dane wysyłki do API hurtowni lub dostawcy.

---

# Część 2: Szacunek Wydatków i Realne Koszty

### 1. Stałe koszty infrastruktury IT (Miesięcznie)

| Komponent | Narzędzie (wariant oszczędny) | Start (1–3 produkty) | Skala (10–30 produktów) |
| :--- | :--- | :--- | :--- |
| **Baza danych + Wektory** | Supabase Pro / PostgreSQL na Hetzner | $0 – $25 / mc | $25 – $50 / mc |
| **Backend & Agenci** | Serwer VPS (Hetzner CX22/CX32) | $15 – $30 / mc | $60 – $120 / mc |
| **Frontend** | Vercel (Pro) lub Cloudflare Pages | $0 – $20 / mc | $20 – $40 / mc |
| **Cache / Kolejki** | Upstash Redis lub lokalny Redis na VPS | $0 / mc | $10 – $20 / mc |
| **SUMA STAŁA** | | **~$20 – $75 / mc** | **~$115 – $230 / mc** |

### 2. Koszty zmienne zużycia AI (Tokeny API)
* **Wdrożenie nowego produktu (jednorazowo):** Research, opisy, 20 wariantów reklam: **~$0.50 – $2.00 / produkt**.
* **Obsługa klienta (Support Chat):** 5–8 wymian zdań na tanim modelu (np. GPT-4o-mini): **~$0.005 – $0.02 za sesję** (~$10 – $20 / mc przy 1000 rozmów).
* **Analityka i generowanie nowych kreacji:** **~$15 – $40 / mc**.

### 3. Koszt uruchomienia kolejnego produktu
* **Domena (.pl):** ~10–15 zł w promocji na 1. rok (odnowienie ~50–70 zł/rok).
* **Generowanie grafik produktowych AI:** ~$2 – $5 jednorazowo (np. FLUX przez Fal.ai).
* **Abonament za kolejny sklep:** $0 (brak opłat za subskrypcje jak w Shopify).

### 4. Ukryte koszty w e-commerce (Rzeczywistość rynkowa)
* **Prowizje bramek płatności:** Stripe / PayU / BLIK pobierają ok. **1.2% – 1.9% + 0.30–0.50 zł** od każdej transakcji (przy 20 000 zł obrotu to ok. 300–400 zł prowizji).
* **Budżet na reklamy:** Sam system nie generuje darmowego ruchu. Minimalny budżet testowy na weryfikację popytu jednego produktu to **500 – 1 500 zł**.

---

# Część 3: Dobór Modeli AI i Optymalizacja Kosztów

### Złota zasada routingu
**Nigdy nie używaj jednego modelu do wszystkiego.** 90% zadań w sklepie to proste operacje. Używanie flagowych modeli (np. GPT-4o, Claude 3.5 Sonnet) do kategoryzacji zapytań to 20-krotne przepłacanie.

### Podział modeli na 3 poziomy (Tiers)

1. **Poziom Tani i Błyskawiczny (90% ruchu):**
   * **Modele:** GPT-4o-mini, Gemini 1.5/2.0 Flash, DeepSeek-V3.
   * **Koszt:** ~$0.15 – $0.30 za 1 mln tokenów wejściowych.
   * **Zastosowanie:** Czat na żywo z klientem, FAQ, kategoryzacja e-maili, wstępne filtrowanie danych.
2. **Poziom Zaawansowany i Kreatywny (8% ruchu):**
   * **Modele:** Claude 3.5 Sonnet, GPT-4o.
   * **Koszt:** ~$2.50 – $3.00 za 1 mln tokenów wejściowych.
   * **Zastosowanie:** Perswazyjny copywriting na landing page, skrypty wideo na TikToka/Reels, rozwiązywanie skomplikowanych sporów z klientami.
3. **Poziom Logiczny i Analityczny (2% ruchu):**
   * **Modele:** DeepSeek-R1, o3-mini / o4-mini.
   * **Koszt:** Modele rozumujące (średni/wyższy koszt za tokeny myślenia).
   * **Zastosowanie:** Dynamiczna optymalizacja cenowa, analiza marży, wykrywanie anomalii w magazynie i zamówieniach.
4. **Grafika Produktowa:**
   * **Model:** FLUX.1 (przez API Fal.ai lub Replicate). Tańszy od Midjourney i idealny do powtarzalnych, fotorealistycznych mockupów.

### 4 reguły optymalizacji wydajności i kosztów
* **LiteLLM (Open-Source Proxy Router):** Zainstaluj LiteLLM na swoim serwerze. Cały system wysyła zapytania pod jeden adres, a proxy automatycznie kieruje proste pytania do taniego modelu, a trudne do drogiego.
* **Prompt Caching:** Informacje o sklepie, specyfikacja i regulaminy są stałe. Dostawcy (Anthropic, OpenAI, DeepSeek) dają do 80–90% rabatu na powtarzający się kontekst w nagłówku promptu.
* **Ograniczenie długości odpowiedzi (`max_tokens`):** Tokeny wyjściowe (output) są 3–4x droższe od wejściowych. Ustaw bota supportu na maksymalnie 2–3 zwięzłe zdania – obniża to koszty o ~70% i przyspiesza interakcję.
* **Twarde limity budżetowe (Hard Caps):** Ustaw w panelach dostawców (OpenAI, Anthropic) limity miesięczne (np. max $20–$50). Zapobiega to wydrenowaniu karty w razie zapętlenia się skryptu agenta w nieskończoną pętlę decyzyjną.
---

# Część 4: Weryfikacja i Rekomendacje (Aktualizacja 2026-09-16)

### Status stacku
Stack opisany w Częściach 1–3 zostaje **potwierdzony** jako punkt startowy: MedusaJS + LangGraph/CrewAI + Next.js/Astro + Supabase (PostgreSQL + pgvector), hosting Hetzner VPS (backend + agenci) + Vercel/Cloudflare Pages (frontend).

### Rekomendowane uzupełnienia (braki wykryte przy weryfikacji)

1. **Obserwowalność wywołań LLM (krytyczne przy agentach działających bez nadzoru):**
   * **Langfuse** (open-source, self-hostowalny na tym samym VPS) lub **Helicone** — monitoring kosztów, latencji i jakości odpowiedzi per agent/model.
   * Bez tego "budżet bez limitu, ale proporcjonalny do sprzedaży" (patrz `01_FINANSE_I_PRAWO/Koszty_Infrastruktura/Budzet_Startowy_i_Prognoza.md`) nie da się w praktyce kontrolować — pętla decyzyjna agenta, która się zapętli, może wygenerować koszt niezauważony do końca miesiąca.
2. **Error tracking:** **Sentry** (darmowy tier wystarczający na start) dla backendu Medusa, agentów i frontendu Next.js.
3. **Warstwa DNS/WAF przed Vercel + Hetzner:** **Cloudflare** (darmowy plan) — ochrona przed botami/scraperami przy ruchu płatnym z reklam, dodatkowa warstwa cache, zarządzanie wieloma domenami produktowymi z jednego miejsca.
4. **Kolejka zadań agentów:** już zasygnalizowana w Części 2 (Upstash Redis) — potwierdzam jako wymagane, nie opcjonalne, od pierwszego produktu: przetwarzanie zamówień i generowanie treści przez agentów powinno iść przez kolejkę (np. BullMQ na Redisie), nie synchronicznie, żeby błąd jednego zadania nie blokował całego systemu.

### Decyzja: płatności
**Stripe jako główny procesor** (BLIK, karty, Apple/Google Pay, lokalne metody UE takie jak iDEAL/Bancontact/Giropay z jednej integracji, natywny plugin do MedusaJS) — zgodne z zasadą "jeden silnik, wiele sklepów". **Przelewy24** jako opcjonalny fallback PL-only do testu A/B konwersji BLIK. Dostępność konkretnych metod płatności u dostawców zmienia się — zweryfikować przy faktycznej integracji.

### Status kluczy API
Konta u dostawców AI/płatności są zakładane na bieżąco, w miarę potrzeb produktowych — nie blokuje to prac architektonicznych. Zasady przechowywania kluczy: patrz `04_KOD_I_INFRASTRUKTURA/env_backups/README.md`.
