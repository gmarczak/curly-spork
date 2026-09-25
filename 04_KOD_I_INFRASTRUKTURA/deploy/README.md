# Wdrożenie: agenci na serwerze + panel na żywo

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
- Znane ograniczenie: stan grafów w pamięci workera — restart workera gubi zadania czekające na decyzję. Przed pierwszym realnym produktem: checkpointer Postgres (`ai-agents-langgraph/README.md`).
