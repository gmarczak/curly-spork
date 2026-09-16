# Panel Zarządzania — Gdzie Jest Dashboard, a Gdzie Trzeba Grzebać w Kodzie

*Dodano: 2026-09-16. Odpowiedź na pytanie: co w tym systemie da się obsłużyć klikaniem w interfejsie, a co wymaga wejścia w pliki/kod (samodzielnie albo przez asystenta typu Claude Code).*

## Warstwy systemu i dostępność GUI

| Warstwa | Ma gotowy dashboard/GUI? | Jak to obsłużyć / zmienić |
|---|---|---|
| **Medusa Admin** (katalog, zamówienia, ceny, klienci, rabaty, magazyn) | **TAK** — pełny, gotowy panel webowy dostarczany razem z MedusaJS | Klikanie w panelu, zero kodu |
| **Storefront wielodomenowy** (Next.js, routing per domena) | NIE — to kod (routing na podstawie domeny klienta, layout, treści) | Edycja plików/konfiguracji w repo `storefront-nextjs` — ręcznie (trzeba znać kod) albo przez asystenta typu **Claude Code**, który wprowadza zmiany na podstawie polecenia w języku naturalnym |
| **Agenci AI** (LangGraph/CrewAI: Onboarding, Support, Marketing, Fulfillment) | NIE — z natury frameworka, to orkiestracja w kodzie Python, brak wizualnego edytora | Edycja promptów/logiki w plikach repo `ai-agents-langgraph` — ręcznie albo przez Claude Code |
| **Langfuse** (monitoring kosztów i działań agentów) | TAK — dashboard z logami, kosztami per agent/model | **Tylko podgląd** — widać co się stało i ile kosztowało, ale samej logiki agenta tu nie zmienisz |
| **(Opcjonalnie) n8n** dla prostszych automatyzacji (powiadomienia, feed dostawcy, proste przepływy) | TAK — wizualny edytor przepływów z węzłami AI | Klikanie/przeciąganie węzłów, bez kodu — dobra opcja dla przepływów, które nie muszą być w LangGraph |

## W praktyce

* **Codzienna operacja sklepu** (dodanie produktu, zmiana ceny, obsługa zamówienia, odpowiedź na eskalację z Agenta Wsparcia — patrz `05_OPERACJE_I_ARCHIWUM/Procedury_SOP/SOP_Obsluga_Zwrotow_i_Reklamacji.md`) — **w całości w Medusa Admin, bez dotykania kodu.**
* **Zmiana czegokolwiek w tym, jak działają agenci** (inny prompt, inna logika decyzyjna, nowy typ zadania) — **wymaga wejścia w pliki repo**. Nie ma tu skrótu w postaci klikalnego panelu — LangGraph i CrewAI po prostu nie mają takiego interfejsu. Dwie ścieżki: albo robi to osoba znająca kod, albo robi to przez **Claude Code / podobnego asystenta AI**, opisując po ludzku, co ma się zmienić, a on edytuje pliki za Ciebie.
* **Zmiana routingu domen / layoutu storefrontu** — analogicznie: kod w `storefront-nextjs`, samodzielnie albo przez Claude Code.
* **Sprawdzenie, co robią agenci i ile to kosztuje** — Langfuse, bez potrzeby czytania kodu, ale to wyłącznie widok "co się stało", nie miejsce do wprowadzania zmian.

## Rekomendacja

Jeśli chcesz, żeby więcej rzeczy dało się zmieniać bez grzebania w plikach, rozważ **n8n** dla prostszych, powtarzalnych automatyzacji (np. powiadomienie do dostawcy, prosty przepływ treści marketingowych) — ma realny wizualny edytor. Bardziej złożoną logikę agentów (Support, decyzje) i tak trzeba trzymać w LangGraph/CrewAI, bo n8n nie da tu porównywalnej kontroli — a zmiany w tej warstwie zawsze będą wymagały pracy na plikach, ręcznie albo przez Claude Code.

## Źródła

- [Medusa Admin](https://medusajs.com/admin)
- [Medusa V2 Overview](https://medusajs.com/v2-overview)
- [Langfuse — Custom Dashboards](https://langfuse.com/docs/metrics/features/custom-dashboards)
- [Langfuse — Token & Cost Tracking](https://langfuse.com/docs/observability/features/token-and-cost-tracking)
