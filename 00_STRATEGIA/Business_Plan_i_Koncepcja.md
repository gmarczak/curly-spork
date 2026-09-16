# Business Plan i Koncepcja — Fabryka E-commerce AI

*Ostatnia aktualizacja: 2026-09-16*

## 1. Teza biznesowa

Nie budujemy jednego sklepu internetowego. Budujemy **silnik do szybkiego testowania i skalowania wielu pojedynczych produktów/nisz** pod osobnymi domenami, obsługiwany przez wspólny zespół agentów AI. Wygrywa nie "najlepszy sklep", a **tempo testowania** — im szybciej i taniej sprawdzimy, czy dany produkt się sprzedaje, tym szybciej znajdziemy te, które faktycznie zarabiają.

Model biznesowy nie jest przywiązany do jednej kategorii produktowej. Jest przywiązany do **procesu**: znajdź kandydata → uruchom w kilka dni → zweryfikuj małym budżetem reklamowym → skaluj zwycięzców, wygaszaj resztę.

## 2. Status decyzji produktowej

**Pierwszy produkt/nisza: NIEUSTALONY.** Folder `02_PRODUKTY/P001_Poduszka_Ergonomiczna_PRZYKLAD` to nazwa placeholder, nie decyzja. Proces wyboru pierwszego kandydata opisuje `Proces_Wyboru_Produktu.md` w tym samym folderze — to jest krok, który trzeba wykonać przed uruchomieniem pierwszej kampanii.

Grupa docelowa i rynki startowe są zależne od wybranego produktu i zostaną wypełnione w `02_PRODUKTY/_SZABLON_PRODUKTU/Specyfikacja.md` dla konkretnego kandydata. Jedyne, co jest już zdecydowane niezależnie od produktu: **Polska jako rynek startowy** (BLIK jako potwierdzona metoda płatności), z opcją ekspansji na inne kraje UE po walidacji na rynku PL.

## 3. Struktura właścicielska

Dwóch wspólników (50/50 — do potwierdzenia w umowie wspólników, patrz `01_FINANSE_I_PRAWO/Rejestracja_i_Umowy/Forma_Prawna_i_Rejestracja.md`). Forma prawna: start jako spółka cywilna / 2× JDG + umowa, docelowo przekształcenie w sp. z o.o. po walidacji.

## 4. Jak zarabia fabryka (model biznesowy)

* **Przychód:** marża na sprzedaży produktów fizycznych pod własnymi markami/domenami (D2C, ruch płatny z Meta/TikTok Ads).
* **Struktura kosztów per produkt:** koszt towaru (COGS) + koszt dostawy + prowizja bramki płatności (ok. 1,2–1,9% + 0,30–0,50 zł) + budżet reklamowy + marginalny koszt agentów AI (patrz `Architektura_Systemu/Infrastruktura.md`, część 2).
* **Koszty wspólne (nie rosną proporcjonalnie z liczbą produktów):** infrastruktura (VPS, baza danych, hosting frontendu), licencje, księgowość.
* **Efekt skali:** koszt uruchomienia *kolejnego* produktu jest bliski zera (nowa domena + wygenerowane treści), bo silnik techniczny i agenci są wspólni. To jest sedno przewagi tego modelu nad klasycznym sklepem.

## 5. Szablon jednostkowej ekonomiki (do wypełnienia per produkt)

| Pozycja | Wzór / uwaga |
|---|---|
| Cena sprzedaży (PLN) | ustalana per produkt |
| Koszt towaru (COGS) | z karty dostawcy, patrz `02_PRODUKTY/_SZABLON_PRODUKTU/Dostawcy_Fulfillment` |
| Koszt dostawy | zależny od modelu logistyki (patrz decyzja w `05_OPERACJE_I_ARCHIWUM/Procedury_SOP/SOP_Uruchomienie_Nowego_Produktu.md`) |
| Prowizja płatności | ~1,5% + 0,40 zł (Stripe/BLIK, do potwierdzenia) |
| Marża brutto | Cena − COGS − dostawa − prowizja |
| CAC (koszt akwizycji klienta) | budżet reklamowy / liczba zamówień |
| Próg rentowności | Marża brutto ≥ CAC → produkt się "broni"; poniżej → wygaszamy (patrz SOP wygaszania) |

## 6. Cele na pierwsze 6 i 12 miesięcy

*Do wypełnienia wspólnie z drugim wspólnikiem — poniżej szkielet:*

* **0–1 mc:** wybór i walidacja pierwszego kandydata produktowego (proces w `Proces_Wyboru_Produktu.md`), rejestracja formy prawnej, uruchomienie stacku technicznego.
* **1–3 mc:** pierwsza kampania testowa, pierwsze realne zamówienia, pierwsza iteracja SOP.
* **3–6 mc:** 2–3 kolejne testy produktowe równolegle, pierwszy potwierdzony "zwycięzca" przenoszony na model logistyki 3PL/PL.
* **6–12 mc:** portfel 5–10 aktywnych produktów, decyzja o przekształceniu w sp. z o.o.

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
