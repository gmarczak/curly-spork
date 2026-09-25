# Budżet Startowy i Polityka Budżetu Reklamowego

## 1. Polityka budżetu reklamowego (bez sztywnego limitu, proporcjonalna do sprzedaży)

Ustalona zasada: **budżet reklamowy skaluje się z wynikami, nie jest z góry zamrożony na sztywnej liczbie.** W praktyce dwie fazy:

| Faza | Zasada budżetowa |
|---|---|
| **Walidacja nowego kandydata produktowego** | budżet stały, niezależny od przychodu — **500–1500 zł na kandydata**, czas trwania 3–5 dni (patrz `00_STRATEGIA/Proces_Wyboru_Produktu.md`) — to koszt "kupienia informacji", nie inwestycja skalowana |
| **Skalowanie potwierdzonego produktu** | budżet = funkcja CPA względem marży jednostkowej M (progi: `00_STRATEGIA/Proces_Wyboru_Produktu.md`, sekcja 4): przy CPA ≤ 70% M → zwiększaj budżet dziennie o 20–30%; przy CPA powyżej M → redukuj lub zatrzymaj. Reinwestycja części marży brutto w reklamę, nie sztywna kwota miesięczna |

Twarde zabezpieczenie niezależnie od fazy: **dzienny limit wydatków ustawiony na koncie reklamowym** (Meta/TikTok) jako zabezpieczenie przed błędem konfiguracji, nie jako właściwy mechanizm kontroli budżetu.

## 2. Budżet startowy (przeliczony 2026-09-25)

*Poprzednia wersja (~1500–3000 zł) liczyła tylko jednego kandydata i pomijała koszty stałe firmy. Pozycje w USD przeliczone po ~3,7 zł/USD. Wszystkie kwoty orientacyjne.*

### A. Jednorazowo — start firmy

| Pozycja | Szacunek |
|---|---|
| Rejestracja spółki cywilnej (CEIDG bezpłatnie) + PCC 0,5% od wkładów | ~0–100 zł |
| Weryfikacja wzorca regulaminu i polityk przez prawnika (jednorazowo, potem reużywalny) | ~500–1500 zł ⚠️ wycena |
| Bufor (konto firmowe, drobne opłaty) | ~300–500 zł |
| **Suma A** | **~800–2100 zł** |

### B. Miesięcznie — koszty stałe (niezależne od liczby produktów)

| Pozycja | Szacunek / mc |
|---|---|
| Infrastruktura IT (20–75 USD, patrz `00_STRATEGIA/Architektura_Systemu/Infrastruktura.md`) | ~75–280 zł |
| Biuro rachunkowe | ~200–500 zł |
| Składka zdrowotna 2 wspólników (ulga na start zwalnia tylko ze składek społecznych; 2 × 432,54 zł — minimalna, zależy od formy opodatkowania) | ~865 zł |
| **Suma B** | **~1140–1645 zł / mc** |

### C. Na każdego kandydata produktowego

| Pozycja | Szacunek |
|---|---|
| Test reklamowy (3–5 dni) | 500–1500 zł |
| VAT od importu usług reklamowych (23%, jeśli jesteśmy zwolnieni z VAT — patrz `01_FINANSE_I_PRAWO/Podatki_i_Ksiegowosc/Zasady_Ksiegowe_i_VAT.md`) | 115–345 zł |
| Domena | 15–70 zł |
| Grafiki AI (2–5 USD) | ~10–20 zł |
| Próbka towaru (sprawdzenie jakości przed kampanią) | 100–300 zł |
| **Suma C (na kandydata)** | **~740–2235 zł** |

### Podsumowanie

| Wariant | Wzór | Kwota |
|---|---|---|
| Pierwszy miesiąc, 1 kandydat | A + B + 1×C | **~2,7–6,0 tys. zł** |
| Pierwszy miesiąc, 3 kandydatów równolegle (shortlista wg procesu) | A + B + 3×C | **~4,2–10,5 tys. zł** |
| **Rekomendowana rezerwa na pierwsze 3 miesiące** (3 testy, koszty stałe przez 3 mc) | A + 3×B + 3×C | **~6,5–13,7 tys. zł** |

Rekomendacja: zabezpieczyć rezerwę na 3 miesiące przed pierwszym testem, a testy prowadzić **po kolei albo po 2 równolegle**, żeby wnioski z pierwszego testu obniżyły koszt kolejnych. Każdy dodatkowy kandydat ponad 3 = kolejne ~0,7–2,2 tys. zł.

## 3. Prognoza scenariuszowa (pierwsze 3 miesiące, orientacyjna — do aktualizacji po wyborze produktu)

| Scenariusz | Wynik testów | Decyzja |
|---|---|---|
| Pesymistyczny | Żaden z 3 pierwszych kandydatów nie osiąga GO | Wnioski dopisane do `00_STRATEGIA/Proces_Wyboru_Produktu.md`; kolejna shortlista tylko jeśli zostało ≥ 2 mc kosztów stałych w rezerwie, inaczej przegląd całego modelu |
| Realistyczny | 1 z 3 testowanych produktów osiąga GO | Skalowanie tego produktu (marża z niego finansuje kolejne testy), test następnego kandydata |
| Optymistyczny | 2+ produkty z GO w pierwszych 3 miesiącach | Skalowanie obu, logistyka PL/3PL dla silniejszego (`00_STRATEGIA/Business_Plan_i_Koncepcja.md`, sekcja 5.1); decyzję o sp. z o.o. przyspieszyć, jeśli rośnie ryzyko (obrót, reklamacje) — standardowo 6.–12. mc |

## 4. Twarde limity kosztowe API AI (rekomendacja z `Infrastruktura.md`)

Ustawić w panelach dostawców (Anthropic, OpenAI) miesięczne hard capy (np. 20–50 USD na start) — zabezpieczenie przed pętlą decyzyjną agenta generującą niekontrolowany koszt. Monitorować przez Langfuse/Helicone (patrz `Architektura_Systemu/Infrastruktura.md`, Część 4).
