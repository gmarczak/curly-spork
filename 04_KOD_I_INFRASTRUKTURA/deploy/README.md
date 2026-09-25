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
- Domena API: subdomena istniejącej domeny — 0 zł.

## Krok 1 — serwer (ok. 30 min)

1. Konto Hetzner Cloud → nowy serwer: Ubuntu 24.04, CX22, **klucz SSH** (bez hasła).
2. Rekord DNS A: `agenci.twojadomena.pl` → IP serwera (w Cloudflare: tryb DNS-only na czas pierwszego certyfikatu).
3. Na serwerze:
   ```bash
   apt update && apt install -y docker.io docker-compose-v2 git ufw
   ufw allow OpenSSH && ufw allow 80 && ufw allow 443 && ufw enable
   git clone https://github.com/gmarczak/curly-spork.git && cd curly-spork/04_KOD_I_INFRASTRUKTURA/deploy
   cp .env.example .env                  # AGENTS_DOMAIN
   ```
4. Sekrety (wartości z menedżera haseł; pliki są w `.gitignore`):
   - `deploy/.env.agents` — na bazie `ai-agents-langgraph/.env.example`: `WEBHOOK_SECRET`, `PANEL_API_TOKEN` (losowy, 40+ znaków), klucze LiteLLM agentów.
   - `deploy/.env.litellm` — `ANTHROPIC_API_KEY`, `LITELLM_MASTER_KEY`, opcjonalnie `LANGFUSE_PUBLIC_KEY`, `LANGFUSE_SECRET_KEY`.
5. Start: `docker compose -f docker-compose.prod.yml up -d --build`
6. Test: `curl https://agenci.twojadomena.pl/health` → `{"ok":true}`.

## Krok 2 — panel na Vercel (ok. 10 min)

1. Vercel → „Add New Project” → repo `gmarczak/curly-spork` → **Root Directory: `04_KOD_I_INFRASTRUKTURA/panel-biuro`**.
2. Zmienne środowiskowe:
   - `AGENTS_API_URL=https://agenci.twojadomena.pl`
   - `PANEL_API_TOKEN` = ten sam co na serwerze
   - `PANEL_PASSWORD` = Twoje hasło do panelu
   - `SESSION_SECRET` = losowe 32+ znaki
3. Deploy → adres np. `https://biuro-xyz.vercel.app`.
4. Test: zaloguj się → „Wyślij testowe zamówienie” → po kilku sekundach Agent Fulfillmentu prosi o decyzję.

## Krok 3 — ikona na pulpicie

- Chrome: otwórz panel → ⋮ → „Przesyłaj, zapisuj i udostępniaj” → „Utwórz skrót…” → „Otwórz jako okno”.
- Edge: … → „Aplikacje” → „Zainstaluj tę witrynę jako aplikację”.

## Aktualizacja po zmianach w repo

```bash
cd curly-spork && git pull && cd 04_KOD_I_INFRASTRUKTURA/deploy
docker compose -f docker-compose.prod.yml up -d --build
```

Panel na Vercel aktualizuje się sam po scaleniu do `main`.

## Bezpieczeństwo

- API agentów: webhook tylko z podpisem HMAC, endpointy panelu tylko z tokenem; token zna wyłącznie serwer Vercel.
- Panel: hasło + podpisana sesja (httpOnly, SameSite=Strict); strona niewidoczna dla wyszukiwarek.
- Serwer: tylko porty 22/80/443, logowanie kluczem SSH.
- Znane ograniczenie: stan grafów w pamięci workera — restart workera gubi zadania czekające na decyzję. Przed pierwszym realnym produktem: checkpointer Postgres (`ai-agents-langgraph/README.md`).
