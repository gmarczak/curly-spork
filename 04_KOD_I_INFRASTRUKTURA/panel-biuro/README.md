# panel-biuro — Biuro Agentów na żywo

Aplikacja Next.js 16. Status: **działa lokalnie z prawdziwym serwisem agentów**. Sprawdzone w przeglądarce: logowanie, testowe zamówienie, decyzja „Ponów”, dziennik na żywo.

## Co pokazuje

- **Zespół:** 4 agentów, status (pracuje / czeka na Ciebie / błąd / wolny / wstrzymany), bieżące zadanie, ostatnia myśl.
- **Myśli i działania:** dziennik kroków agentów, odświeżany co 3 s.
- **Czeka na Ciebie:** decyzje z przyciskami (Ponów / Obsłużę ręcznie; odpowiedź dla klienta; Zatwierdź / Popraw / Odrzuć).
- **Sterowanie:** Wstrzymaj / Wznów agenta; „Wyślij testowe zamówienie” (prawdziwy przepływ przez worker).

## Jak działa

- Przeglądarka → API Next.js (`src/app/api/*`) → serwis agentów (`/panel/state`, `/approvals`, `/panel/agents/...`). Token API zostaje na serwerze.
- Logowanie hasłem właściciela (`PANEL_PASSWORD`), sesja podpisana `SESSION_SECRET`.

## Lokalnie

```bash
# agenci (patrz ai-agents-langgraph/README.md)
redis-server &
cd ../ai-agents-langgraph && PANEL_API_TOKEN=dev uvicorn fabryka_agents.api:app --port 8000 &
PANEL_API_TOKEN=dev arq fabryka_agents.worker.WorkerSettings &
# panel
cd ../panel-biuro && cp .env.example .env.local   # AGENTS_API_URL, PANEL_API_TOKEN=dev, hasło, sekret
npm install && npm run dev                          # http://localhost:3100
```

Wdrożenie na serwer i Vercel: `../deploy/README.md`.

`biuro.html` — statyczny zrzut stanu z sesji Claude Code (25.09), zostaje jako historia.
