# panel-biuro — Biuro Agentów

Panel do podglądu i sterowania agentami AI. Status: **prototyp na danych przykładowych** (`prototyp.html`, otwórz w przeglądarce).

## Co ma robić

- **Biuro:** każdy agent to biurko ze statusem (pracuje / czeka na człowieka / błąd / wstrzymany), bieżącym zadaniem, ostatnią myślą i kosztem.
- **Szczegóły agenta:** myśli i działania na żywo, plan zadania krok po kroku, uprawnienia (ADR-001), limit kosztów.
- **Sterowanie:** wstrzymaj / wznów, ponów krok, przerwij zadanie, polecenie tekstowe, zmiana dziennego limitu.
- **Plan pracy:** tablica zadań (Do zrobienia → W trakcie → Czeka na akceptację → Zrobione).
- **Do akceptacji:** decyzje, których agent nie może podjąć sam (kampania, zwrot > 100 zł, błąd dostawcy).

## Wersja docelowa — skąd dane

| Element panelu | Źródło |
|---|---|
| Myśli, wywołania narzędzi, koszt | Langfuse (API tras) |
| Stan i plan agenta | LangGraph — checkpointer w Postgres (Supabase) |
| Kolejka i status zadań | Redis + `arq` |
| Akceptacje | przerwania LangGraph (`interrupt`) → decyzja w panelu wznawia graf |
| Wstrzymanie / limit | flaga w Redis + budżet klucza w LiteLLM |
| Plan pracy | tabela zadań w Postgres |

## Technologia

- Next.js (ten sam stack co storefront), osobna aplikacja w tym folderze.
- Dostęp tylko dla wspólników (logowanie Supabase Auth).
- Aktualizacje na żywo: Server-Sent Events z serwisu agentów.
- Wszystkie akcje sterujące idą przez API serwisu agentów — panel nie ma kluczy do Medusy ani modeli AI.

## Gotowe narzędzia opensource (uzupełniają panel, nie zastępują)

- Langfuse — szczegółowe logi i koszty.
- LangGraph Studio (`langgraph dev`) — graf agenta przy debugowaniu.
