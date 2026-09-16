# Budżet Startowy i Polityka Budżetu Reklamowego

## 1. Polityka budżetu reklamowego (bez sztywnego limitu, proporcjonalna do sprzedaży)

Ustalona zasada: **budżet reklamowy skaluje się z wynikami, nie jest z góry zamrożony na sztywnej liczbie.** W praktyce dwie fazy:

| Faza | Zasada budżetowa |
|---|---|
| **Walidacja nowego kandydata produktowego** | budżet stały, niezależny od przychodu — **500–1500 zł na kandydata**, czas trwania 3–5 dni (patrz `00_STRATEGIA/Proces_Wyboru_Produktu.md`) — to koszt "kupienia informacji", nie inwestycja skalowana |
| **Skalowanie potwierdzonego produktu** | budżet = funkcja ROAS/CAC: przy ROAS ponad zakładany próg rentowności → zwiększaj budżet dziennie o 20–30%; przy spadku ROAS pod próg → redukuj lub zatrzymaj. Reinwestycja części marży brutto w reklamę, nie sztywna kwota miesięczna |

Twarde zabezpieczenie niezależnie od fazy: **dzienny limit wydatków ustawiony na koncie reklamowym** (Meta/TikTok) jako zabezpieczenie przed błędem konfiguracji, nie jako właściwy mechanizm kontroli budżetu.

## 2. Budżet startowy (jednorazowy, przed pierwszą sprzedażą)

| Pozycja | Szacunek |
|---|---|
| Rejestracja formy prawnej (spółka cywilna) | ~100–300 zł (opłaty, ewentualny notariusz jeśli wymagany) |
| Infrastruktura IT (pierwszy miesiąc, patrz `Infrastruktura.md`) | ~20–75 USD |
| Domena pierwszego produktu | ~15–70 zł |
| Test reklamowy pierwszego kandydata | 500–1500 zł |
| Generowanie grafik produktowych AI (FLUX/Fal.ai) | ~2–5 USD |
| Bufor na nieprzewidziane (konto biznesowe, drobne opłaty) | ~300–500 zł |
| **SUMA orientacyjna na pierwszy miesiąc** | **~1500–3000 zł** |

## 3. Prognoza scenariuszowa (pierwsze 3 miesiące, orientacyjna — do aktualizacji po wyborze produktu)

| Scenariusz | Zwrot z pierwszego testu | Decyzja |
|---|---|---|
| Pesymistyczny | Brak produktu przechodzącego próg go/no-go w 2 pierwszych testach | Kontynuacja procesu wyboru, dopisanie wniosków do `Proces_Wyboru_Produktu.md` |
| Realistyczny | 1 z 3 testowanych produktów przechodzi próg rentowności | Skalowanie tego produktu, równoległy test kolejnego kandydata |
| Optymistyczny | 2+ produkty rentowne w pierwszym miesiącu | Przygotowanie do przekształcenia w sp. z o.o., inwestycja w 3PL dla zwycięzców |

## 4. Twarde limity kosztowe API AI (rekomendacja z `Infrastruktura.md`)

Ustawić w panelach dostawców (Anthropic, OpenAI) miesięczne hard capy (np. 20–50 USD na start) — zabezpieczenie przed pętlą decyzyjną agenta generującą niekontrolowany koszt. Monitorować przez Langfuse/Helicone (patrz `Architektura_Systemu/Infrastruktura.md`, Część 4).
