# Business Plan i Koncepcja — Fabryka E-commerce AI

*Ostatnia aktualizacja: 2026-09-25*

## 1. Teza biznesowa

Nie budujemy jednego sklepu internetowego. Budujemy **silnik do szybkiego testowania i skalowania wielu pojedynczych produktów/nisz** pod osobnymi domenami, obsługiwany przez wspólny zespół agentów AI. Wygrywa nie "najlepszy sklep", a **tempo testowania** — im szybciej i taniej sprawdzimy, czy dany produkt się sprzedaje, tym szybciej znajdziemy te, które faktycznie zarabiają.

Model biznesowy nie jest przywiązany do jednej kategorii produktowej. Jest przywiązany do **procesu**: znajdź kandydata → uruchom w kilka dni → zweryfikuj małym budżetem reklamowym → skaluj zwycięzców, wygaszaj resztę.

## 2. Status decyzji produktowej

**Pierwszy produkt/nisza: NIEUSTALONY.** Folder `02_PRODUKTY/P001_Poduszka_Ergonomiczna_PRZYKLAD` to nazwa placeholder, nie decyzja. Proces wyboru pierwszego kandydata opisuje `Proces_Wyboru_Produktu.md` w tym samym folderze — to jest krok, który trzeba wykonać przed uruchomieniem pierwszej kampanii.

Grupa docelowa i rynki startowe są zależne od wybranego produktu i zostaną wypełnione w `02_PRODUKTY/_SZABLON_PRODUKTU/Specyfikacja.md` dla konkretnego kandydata. Jedyne, co jest już zdecydowane niezależnie od produktu: **Polska jako rynek startowy** (BLIK jako wymagana metoda płatności — przez Stripe, dostępność do potwierdzenia przy aktywacji konta, patrz `Architektura_Systemu/ADR_001_Stack_Techniczny.md`), z opcją ekspansji na inne kraje UE po walidacji na rynku PL.

## 3. Struktura właścicielska

Dwóch wspólników (50/50 — do potwierdzenia w umowie wspólników, patrz `01_FINANSE_I_PRAWO/Rejestracja_i_Umowy/Forma_Prawna_i_Rejestracja.md`). Forma prawna: start jako **spółka cywilna** (rekomendacja; 2× JDG + umowa to wariant awaryjny), docelowo sp. z o.o. po walidacji.

## 4. Jak zarabia fabryka (model biznesowy)

* **Przychód:** marża na sprzedaży produktów fizycznych pod własnymi markami/domenami (D2C, ruch płatny z Meta/TikTok Ads).
* **Struktura kosztów per produkt:** koszt towaru (COGS) + koszt dostawy + prowizja bramki płatności (ok. 1,2–1,9% + 0,30–0,50 zł) + budżet reklamowy + marginalny koszt agentów AI (patrz `Architektura_Systemu/Infrastruktura.md`, część 2).
* **Koszty wspólne (nie rosną proporcjonalnie z liczbą produktów):** infrastruktura (VPS, baza danych, hosting frontendu), licencje, księgowość.
* **Efekt skali:** koszt *techniczny* uruchomienia kolejnego produktu jest bliski zera (nowa domena + wygenerowane treści), bo silnik i agenci są wspólni. To jest sedno przewagi nad klasycznym sklepem. **Nie jest za darmo sprawdzenie produktu** — każdy kandydat to ok. 750–2250 zł (test reklamowy, VAT od reklam, domena, próbka), patrz `01_FINANSE_I_PRAWO/Koszty_Infrastruktura/Budzet_Startowy_i_Prognoza.md`.

## 5. Szablon jednostkowej ekonomiki (do wypełnienia per produkt)

| Pozycja | Wzór / uwaga |
|---|---|
| Cena sprzedaży (PLN) | ustalana per produkt |
| Koszt towaru (COGS) | z karty dostawcy, patrz `02_PRODUKTY/_SZABLON_PRODUKTU/Dostawcy_Fulfillment` |
| Koszt dostawy | zależny od modelu logistyki (sekcja 5.1) |
| Prowizja płatności | ~1,5% + 0,40 zł (Stripe/BLIK, do potwierdzenia przy aktywacji konta) |
| Rezerwa na zwroty | domyślnie 5% ceny (korygować po danych) |
| **M — marża jednostkowa przed reklamą** | Cena (netto przy czynnym VAT) − COGS − dostawa − prowizja − rezerwa na zwroty |
| **CPA** (= koszt pozyskania klienta) | wydatek reklamowy / liczba zamówień |
| Próg decyzyjny | **jedno źródło:** `Proces_Wyboru_Produktu.md`, sekcja 4 (faza testu i faza skalowania) |

### 5.1 Decyzja logistyczna (model dostawy wg etapu produktu)

*Progi orientacyjne — do potwierdzenia przez wspólników po pierwszych danych.*

| Etap produktu | Model logistyki | Warunek przejścia na kolejny etap |
|---|---|---|
| Test (kandydat) | Dropshipping (CJ Dropshipping / AliExpress; **preferowane magazyny w UE**, jeśli produkt jest tam dostępny) | decyzja GO wg `Proces_Wyboru_Produktu.md` |
| Po GO, wczesne skalowanie | Dropshipping z magazynu UE/PL lub hurtownia PL (krótsza dostawa = wyższa konwersja, prostsze zwroty) | stabilne zamówienia ≥ ~5/dzień przez 2 tygodnie przy CPA ≤ 100% M |
| Zwycięzca | **3PL w Polsce** z własnym zapasem (zamówienie hurtowe, niższy COGS, dostawa 1–2 dni) | ≥ ~15–20 zamówień/dzień przez 2 tygodnie i zapas finansowany z marży, nie z kapitału startowego |

Zwroty w każdym modelu: adres zwrotów w PL/UE (patrz `05_OPERACJE_I_ARCHIWUM/Procedury_SOP/SOP_Obsluga_Zwrotow_i_Reklamacji.md`).

## 6. Cele na pierwsze 6 i 12 miesięcy

*PROPOZYCJA liczbowych celów (2026-09-25) — do zatwierdzenia lub korekty przez wspólników. Cele przychodowe dopisać po pierwszym teście, gdy znana będzie realna M i CPA.*

| Okres | Cele procesowe (mierzalne) | Cele finansowe |
|---|---|---|
| **0–1 mc** | ≥ 10 kandydatów ocenionych w `Shortlista_Kandydatow.md`, 3 na shortliście (≥ 45 pkt); s.c. zarejestrowana; ADR_001 zatwierdzony; stack uruchomiony (storefront + Medusa + Stripe w trybie testowym) | wydatki w granicach budżetu startowego |
| **1–3 mc** | ≥ 3 testy reklamowe zakończone decyzją; ≥ 1 decyzja GO; pierwsze realne zamówienia i pierwsza iteracja SOP | CPA ≤ 100% M dla produktu po GO |
| **3–6 mc** | łącznie ≥ 8 testów; 1–2 produkty w fazie skalowania; pierwszy zwycięzca na logistyce PL/3PL (sekcja 5.1) | produkt(y) po GO na plusie po kosztach reklamy; ≥ 50% kosztów stałych pokryte z marży |
| **6–12 mc** | portfel 3–5 aktywnych produktów rentownych (z 15–25 przetestowanych); decyzja o sp. z o.o. | koszty stałe i wynagrodzenia wspólników pokryte z marży (wartość docelowa: do ustalenia) |

## 7. Kluczowe ryzyka

* Brak zdecydowanego produktu = brak przychodu do momentu zamknięcia procesu wyboru — priorytet #1.
* Koncentracja na jednym kanale reklamowym (ryzyko blokady konta Meta/TikTok).
* Koszty AI/infrastruktury rosnące bez kontroli przy błędach agentów — patrz wymóg monitoringu LLM w `Architektura_Systemu/Infrastruktura.md`.
* Odpowiedzialność osobista wspólników w fazie przed sp. z o.o.

## 8. Otwarte decyzje (checklist)

- [ ] Wybór pierwszego produktu/niszy (patrz `Proces_Wyboru_Produktu.md`)
- [ ] Grupa docelowa i rynek startowy dla tego produktu
- [ ] Podpisanie umowy wspólników
- [ ] Rejestracja formy prawnej
- [ ] Wybór dostawcy/modelu logistyki dla pierwszego produktu
- [ ] Konfiguracja kont API (Stripe, dostawcy modeli AI) — patrz `04_KOD_I_INFRASTRUKTURA/env_backups/README.md`
