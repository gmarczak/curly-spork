# Wdrożenie: agenci i sklep na serwerze + panel i storefront na Vercel

Efekt końcowy: ikona na pulpicie → panel „Biuro Agentów” (Vercel) → dane na żywo z agentów na serwerze (Hetzner).

```
[Ty] → panel (Vercel, hasło) → HTTPS → Caddy → agents-api ─┐
                                                          ├─ Redis (kolejka, statusy, dziennik)
                     Medusa → webhook → agents-api        └─ agents-worker → LiteLLM → Claude
```

## Koszt (szacunek)

- Hetzner CX22: ok. 5 €/mc.
- Vercel Hobby: 0 zł na start ⚠️ przy komercyjnym użyciu warunki planu do sprawdzenia.
- Domena: **niepotrzebna na start.** Panel: link z Vercel. API agentów: adres `https://<IP-z-myślnikami>.sslip.io` (darmowy DNS wskazujący na IP serwera; Caddy dostaje dla niego certyfikat HTTPS).

## Krok 1 — serwer (ok. 15 min)

**Najprościej:** załóż serwer (Ubuntu 24.04, klucz SSH), zaloguj się `ssh root@IP` i wklej:

```bash
curl -fsSL https://raw.githubusercontent.com/gmarczak/curly-spork/main/04_KOD_I_INFRASTRUKTURA/deploy/bootstrap.sh | bash
```

Skrypt instaluje Dockera i zaporę, pobiera kod, pyta o `PANEL_API_TOKEN` (i opcjonalnie klucz Anthropic), ustawia adres `IP.sslip.io` i uruchamia usługi. Na końcu wypisuje adres API agentów.

**Ręcznie (to samo krok po kroku):**

1. Konto Hetzner Cloud → nowy serwer: Ubuntu 24.04, CX22, **klucz SSH** (bez hasła).
2. Adres API bez domeny: IP `1.2.3.4` → `1-2-3-4.sslip.io` (działa od razu, bez konfiguracji DNS). Z własną domeną: rekord A `agenci.twojadomena.pl` → IP serwera.
3. Na serwerze:
   ```bash
   apt update && apt install -y docker.io docker-compose-v2 git ufw
   ufw allow OpenSSH && ufw allow 80 && ufw allow 443 && ufw enable
   git clone https://github.com/gmarczak/curly-spork.git /opt/curly-spork && cd /opt/curly-spork/04_KOD_I_INFRASTRUKTURA/deploy
   cp .env.example .env                  # AGENTS_DOMAIN=1-2-3-4.sslip.io (Twoje IP z myślnikami)
   ```
4. Sekrety (wartości z menedżera haseł; pliki są w `.gitignore`):
   - `deploy/.env.agents` — na bazie `ai-agents-langgraph/.env.example`: `WEBHOOK_SECRET`, `PANEL_API_TOKEN` (losowy, 40+ znaków), klucze LiteLLM agentów.
   - `deploy/.env.litellm` — `ANTHROPIC_API_KEY`, `LITELLM_MASTER_KEY`, opcjonalnie `LANGFUSE_PUBLIC_KEY`, `LANGFUSE_SECRET_KEY`.
5. Start: `docker compose -f docker-compose.prod.yml up -d --build`
6. Test: `curl https://1-2-3-4.sslip.io/health` → `{"ok":true}`.

## Krok 2 — panel na Vercel (zrobione 2026-09-25)

- Projekt Vercel `biuro-agentow` (konto gmarczak), root: `04_KOD_I_INFRASTRUKTURA/panel-biuro`.
- Adres: `https://biuro-agentow.vercel.app`. Po scaleniu zmian do `main` Vercel wdraża panel automatycznie.
- Zmienne ustawione: `PANEL_PASSWORD`, `SESSION_SECRET`, `PANEL_API_TOKEN` (wartości tylko w Vercel i menedżerze haseł).
- **Po postawieniu serwera:** w Vercel → Settings → Environment Variables zmień `AGENTS_API_URL` na `https://1-2-3-4.sslip.io` i zrób Redeploy. Ten sam `PANEL_API_TOKEN` wpisz do `deploy/.env.agents`.
- Test: zaloguj się → „Wyślij testowe zamówienie” → po kilku sekundach Agent Fulfillmentu prosi o decyzję.

## Krok 2a — sklep (Medusa) na tym samym serwerze

Uruchamia go ten sam `bootstrap.sh` (także ponownie na serwerze, który ma już agentów):

- pyta o klucze Stripe (Secret key i Webhook secret; Enter = później — wtedy płatności nie działają),
- stawia Postgres + Medusę pod `https://sklep.<IP-z-myślnikami>.sslip.io` (panel admina: `/app`),
- tworzy sklep P002 Z Kadru (seed) i konto admina — na końcu wypisuje **login, hasło, publishable key i adres API sklepu**.

Sekrety: `deploy/.env.medusa`, `deploy/.env.postgres` (tylko na serwerze). Zdjęcia klientów:
- bez bucketu — prywatny wolumen Dockera `medusa_uploads` (niedostępny z internetu),
- docelowo — prywatny bucket S3 w UE (np. Supabase Storage): uzupełnij `FILE_S3_*` w `.env.medusa` i `docker compose -f docker-compose.prod.yml up -d`.

Webhook Stripe (po założeniu konta): Stripe → Developers → Webhooks → `https://sklep.<IP>.sslip.io/hooks/payment/stripe_stripe`, zdarzenia `payment_intent.*`; sekret `whsec_…` do `STRIPE_WEBHOOK_SECRET`.

Pamięć: CX22 (4 GB) mieści agentów + Medusę na test (szacunek); przy skalowaniu — większy serwer.

## Krok 2b — storefront (sklepy) na Vercel

1. Nowy projekt Vercel z tego repo, root: `04_KOD_I_INFRASTRUKTURA/storefront-nextjs`.
2. Zmienne: `MEDUSA_BACKEND_URL=https://sklep.<IP>.sslip.io`, `STRIPE_PUBLISHABLE_KEY=pk_live_…` (albo `pk_test_…` na próbę). **Nie** ustawiaj `CHECKOUT_TEST_MODE`.
3. Publishable key z bootstrapu → `stores.config.json` (pozycja P002) — podaj go Claude.
4. Domena: Vercel → Settings → Domains → `zkadru.pl` i `www.zkadru.pl`; u rejestratora rekordy DNS, które pokaże Vercel.
5. Test: `https://zkadru.pl` → „Prześlij zdjęcie” → zamówienie kartą testową Stripe `4242 4242 4242 4242`.

## Krok 3 — ikona na pulpicie

- Chrome: otwórz panel → ⋮ → „Przesyłaj, zapisuj i udostępniaj” → „Utwórz skrót…” → „Otwórz jako okno”.
- Edge: … → „Aplikacje” → „Zainstaluj tę witrynę jako aplikację”.

## Aktualizacja po zmianach w repo

Kod na serwerze leży w `/opt/curly-spork` (tam instaluje go `bootstrap.sh`).

```bash
cd /opt/curly-spork && git pull && cd 04_KOD_I_INFRASTRUKTURA/deploy
docker compose -f docker-compose.prod.yml up -d --build
docker compose -f docker-compose.prod.yml ps   # wszystkie usługi: Up
curl https://1-2-3-4.sslip.io/health           # {"ok":true}
```

- Przed restartem sprawdź w panelu „Czeka na Ciebie: 0” — restart workera gubi zadania czekające na decyzję.

Panel na Vercel aktualizuje się sam po scaleniu do `main`.

## Bezpieczeństwo

- API agentów: webhook tylko z podpisem HMAC, endpointy panelu tylko z tokenem; token zna wyłącznie serwer Vercel.
- Panel: hasło + podpisana sesja (httpOnly, SameSite=Strict); strona niewidoczna dla wyszukiwarek.
- Serwer: tylko porty 22/80/443, logowanie kluczem SSH.
- Sklep: Postgres i Medusa bez portów na zewnątrz — ruch tylko przez Caddy (HTTPS). Zdjęcia klientów nie są serwowane publicznie; upload tylko do koszyka z kanału danego klucza, max 15 MB.
- Znane ograniczenie: stan grafów w pamięci workera — restart workera gubi zadania czekające na decyzję. Przed pierwszym realnym produktem: checkpointer Postgres (`ai-agents-langgraph/README.md`).
