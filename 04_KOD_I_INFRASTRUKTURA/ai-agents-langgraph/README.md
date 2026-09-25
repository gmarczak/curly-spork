# ai-agents-langgraph

Serwis agentów AI (Python, LangGraph). Status: **szkielet działa i jest przetestowany** (24 testy), bez podłączonego dostawcy i modeli.

## Co jest

| Plik | Rola |
|---|---|
| `src/fabryka_agents/api.py` | FastAPI: `POST /webhooks/medusa` (podpis HMAC, deduplikacja, kolejka), `GET/POST /approvals` dla panelu (token) |
| `src/fabryka_agents/worker.py` | worker `arq`: zdarzenie → graf agenta; decyzja właściciela → wznowienie grafu |
| `src/fabryka_agents/graphs/fulfillment.py` | zamówienie → dostawca → nr w Medusie; po 2 błędach pauza i pytanie do właściciela |
| `src/fabryka_agents/graphs/support.py` | eskalacje deterministyczne (zwrot > 100 zł, groźby prawne, zdrowie); odpowiedź tanim modelem, maks. 3 zdania |
| `src/fabryka_agents/graphs/draft_approve.py` | Onboarding i Marketing: szkic → akceptacja właściciela (publikacja / start kampanii) |
| `src/fabryka_agents/activity.py`, `narration.py` | statusy agentów, dziennik „myśli i działań”, pauza — dla panelu (`GET /panel/state`, `POST /panel/agents/{id}/pause\|resume`, `POST /panel/demo/order`) |
| `src/fabryka_agents/permissions.py` | tabela uprawnień z ADR-001; akcje tylko dla człowieka |
| `litellm.config.yaml` | poziomy modeli: `tani`, `kreatywny`, `analityczny` |

## Uruchomienie lokalne

```bash
python -m venv .venv && . .venv/bin/activate
pip install -e ".[dev]" redis
pytest -q                                  # testy bez sieci i kluczy
cp .env.example .env                       # uzupełnij z menedżera haseł
uvicorn fabryka_agents.api:app --reload    # API
arq fabryka_agents.worker.WorkerSettings   # worker
```

Pełne środowisko: `docker compose up -d` w `04_KOD_I_INFRASTRUKTURA/`.

## Do zrobienia po wyborze produktu

- Klient dostawcy (np. CJ Dropshipping API) w `clients/supplier.py` — do tego czasu każde zamówienie trafia do właściciela.
- Checkpointer Postgres (`pip install -e ".[postgres]"`) zamiast pamięci — pauza musi przetrwać restart.
- Baza wiedzy produktu (pgvector) dla Agenta Wsparcia; endpoint czatu dla storefrontu.
- Potwierdzenie endpointów Admin API Medusy w `clients/medusa.py`.
