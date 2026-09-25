# Budżet Startowy i Polityka Budżetu Reklamowego

## 1. Polityka budżetu reklamowego (bez sztywnego limitu, proporcjonalna do sprzedaży)

Ustalona zasada: **budżet reklamowy skaluje się z wynikami, nie jest z góry zamrożony na sztywnej liczbie.** W praktyce dwie fazy:

| Faza | Zasada budżetowa |
|---|---|
| **Walidacja nowego kandydata produktowego** | budżet stały, niezależny od przychodu — **500–1500 zł na kandydata**, czas trwania 3–5 dni (patrz `00_STRATEGIA/Proces_Wyboru_Produktu.md`) — to koszt "kupienia informacji", nie inwestycja skalowana |
| **Skalowanie potwierdzonego produktu** | budżet = funkcja CPA względem marży jednostkowej M (progi: `00_STRATEGIA/Proces_Wyboru_Produktu.md`, sekcja 4): przy CPA ≤ 70% M → zwiększaj budżet dziennie o 20–30%; przy CPA powyżej M → redukuj lub zatrzymaj. Reinwestycja części marży brutto w reklamę, nie sztywna kwota miesięczna |

Twarde zabezpieczenie niezależnie od fazy: **dzienny limit wydatków ustawiony na koncie reklamowym** (Meta/TikTok) jako zabezpieczenie przed błędem konfiguracji, nie jako właściwy mechanizm kontroli budżetu.

## 2. Budżet startowy (przeliczony 2026-09-25)

*Biznes jednoosobowy. **Do pierwszego klienta bez rejestracji firmy** (działalność nierejestrowana) — brak ZUS i stałego biura rachunkowego. Pozycje w USD po ~3,7 zł/USD. Kwoty orientacyjne.*

### A. Jednorazowo — start

| Pozycja | Szacunek |
|---|---|
| Rejestracja firmy | 0 zł (dopiero po pierwszym kliencie) |
| Weryfikacja wzorca regulaminu i polityk przez prawnika | ~500–1500 zł ⚠️ wycena |
| Konsultacja z księgową (VAT-UE, PKWiU, limit przychodu) | ~200–500 zł |
| Bufor (drobne opłaty) | ~300–500 zł |
| **Suma A** | **~1000–2500 zł** |

### B. Miesięcznie — koszty stałe

| Pozycja | Faza bez firmy | Po rejestracji JDG |
|---|---|---|
| Infrastruktura IT — serwer agentów Hetzner CPX22 24,59 €/mc (≈ 105 zł) + reszta 0–50 USD (patrz `00_STRATEGIA/Architektura_Systemu/Infrastruktura.md`) | ~105–290 zł | ~105–290 zł |
| Biuro rachunkowe | 0 zł | ~200–500 zł |
| Składka zdrowotna (ulga na start zwalnia tylko ze społecznych) | 0 zł | ~433 zł |
| **Suma B** | **~105–290 zł / mc** | **~740–1225 zł / mc** |

### C. Na każdego kandydata produktowego

| Pozycja | Szacunek |
|---|---|
| Test reklamowy (3–5 dni) | 500–1500 zł |
| VAT od importu usług reklamowych (23%, przy zwolnieniu z VAT — patrz `01_FINANSE_I_PRAWO/Podatki_i_Ksiegowosc/Zasady_Ksiegowe_i_VAT.md`) | 115–345 zł |
| Domena | 15–70 zł |
| Grafiki AI (2–5 USD) | ~10–20 zł |
| Próbka towaru (sprawdzenie jakości przed kampanią) | 100–300 zł |
| **Suma C (na kandydata)** | **~740–2235 zł** |

### Podsumowanie (faza bez firmy)

| Wariant | Wzór | Kwota |
|---|---|---|
| Pierwszy miesiąc, 1 kandydat | A + B + 1×C | **~1,8–5,0 tys. zł** |
| Pierwszy miesiąc, 3 kandydatów równolegle | A + B + 3×C | **~3,3–9,5 tys. zł** |
| **Rekomendowana rezerwa na pierwsze 3 miesiące** (3 testy) | A + 3×B + 3×C | **~3,5–10,0 tys. zł** |

Po rejestracji JDG koszty stałe rosną o ~635–935 zł/mc (ZUS zdrowotny + biuro rachunkowe) — rejestrować dopiero, gdy jest pierwszy klient i produkt po GO. Testy prowadzić **po kolei albo po 2 równolegle** (ograniczeniem jest też czas właściciela na akceptacje). Każdy kolejny kandydat = ~0,7–2,2 tys. zł.

## 3. Prognoza scenariuszowa (pierwsze 3 miesiące, orientacyjna — do aktualizacji po wyborze produktu)

| Scenariusz | Wynik testów | Decyzja |
|---|---|---|
| Pesymistyczny | Żaden z 3 pierwszych kandydatów nie osiąga GO | Wnioski dopisane do `00_STRATEGIA/Proces_Wyboru_Produktu.md`; kolejna shortlista tylko jeśli zostało ≥ 2 mc kosztów stałych w rezerwie, inaczej przegląd całego modelu |
| Realistyczny | 1 z 3 testowanych produktów osiąga GO | Skalowanie tego produktu (marża z niego finansuje kolejne testy), test następnego kandydata |
| Optymistyczny | 2+ produkty z GO w pierwszych 3 miesiącach | Skalowanie obu, logistyka PL/3PL dla silniejszego (`00_STRATEGIA/Business_Plan_i_Koncepcja.md`, sekcja 5.1); rejestracja JDG od razu po pierwszym kliencie; decyzję o sp. z o.o. przyspieszyć, jeśli rośnie ryzyko (obrót, reklamacje) — standardowo 6.–12. mc |

## 4. Twarde limity kosztowe API AI (rekomendacja z `Infrastruktura.md`)

Ustawić w panelach dostawców (Anthropic, OpenAI) miesięczne hard capy (np. 20–50 USD na start) — zabezpieczenie przed pętlą decyzyjną agenta generującą niekontrolowany koszt. Monitorować przez Langfuse/Helicone (patrz `Architektura_Systemu/Infrastruktura.md`, Część 4).
