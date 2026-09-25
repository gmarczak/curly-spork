# Proces Wyboru Pierwszego Produktu / Niszy

*Cel: przejść od "musimy znaleźć coś co się sprzeda" do konkretnego kandydata gotowego do testu reklamowego — w ciągu kilku dni, nie tygodni.*

## 1. Kryteria kandydata (checklist punktowa)

Oceń każdego kandydata w skali 1–5 na poniższych kryteriach. **Wynik = Σ (ocena × waga)**, gdzie waga wysoka = **2**, średnia = **1**. Maksimum: 5 kryteriów × 2 × 5 + 3 kryteria × 1 × 5 = **65 pkt**.

* **Próg shortlisty: ≥ 45 pkt** i brak kryterium eliminującego (sekcja 1a).
* Arkusz do porównania kandydatów: `00_STRATEGIA/Shortlista_Kandydatow.md`.

| Kryterium | Co sprawdzamy | Waga |
|---|---|---|
| Cena sweet-spot | 60–250 zł — wystarczająco drogo na marżę, wystarczająco tanio na zakup impulsowy bez długiego namysłu | wysoka (×2) |
| Marża potencjalna | COGS + dostawa ≤ 30–35% ceny sprzedaży | wysoka (×2) |
| "Wow factor" / demonstrowalność wideo | Da się pokazać efekt/problem-rozwiązanie w 15–30 sek. na TikToku/Reels | wysoka (×2) |
| Dostępność dostawcy | Jest dostępny przez dropshipping (CJ Dropshipping, AliExpress, BigBuy) z rozsądnym czasem dostawy | wysoka (×2) |
| Nasycenie rynku | Nie jest już "wypalony" (sprawdź Meta Ads Library / TikTok Creative Center — jeśli reklamy trwają >6 mc bez zmian, ryzyko wysokie) | średnia (×1) |
| Sezonowość | Zrozumiana i uwzględniona (czy produkt sprzedaje się cały rok, czy tylko w sezonie) | średnia (×1) |
| Ryzyko zwrotów/reklamacji | Produkt prosty, nie elektronika z dużym ryzykiem usterek, nie ubrania z problemem rozmiarówki | średnia (×1) |
| Zgodność z rynkiem PL na start | Brak barier regulacyjnych (certyfikaty, CE dla elektroniki, kosmetyki wymagające rejestracji) | wysoka (×2) |

## 1a. Kryteria eliminujące (dowolne „tak” = odrzucamy kandydata, niezależnie od punktów)

- Produkt wymaga certyfikacji/rejestracji, której nie jesteśmy w stanie szybko potwierdzić (wyroby medyczne, kosmetyki bez notyfikacji CPNP, elektronika bez CE, zabawki dla dzieci bez dokumentacji).
- Sprzedaż produktu wymagałaby twierdzeń zdrowotnych/leczniczych (zakaz w `00_STRATEGIA/Brand_Book_i_Identyfikacja/Brand_Book_Globalny.md`).
- Kategoria wyłączona ze zwolnienia z VAT (art. 113 ust. 13 ustawy o VAT), **o ile** działamy jako podmiot zwolniony — patrz `01_FINANSE_I_PRAWO/Podatki_i_Ksiegowosc/Zasady_Ksiegowe_i_VAT.md`.
- Ocena „Marża potencjalna” lub „Zgodność z rynkiem PL” poniżej 3.

## 2. Źródła research (w tej kolejności)

1. **TikTok Creative Center** i **Meta Ads Library** — szukaj reklam z wysokim zaangażowaniem, uruchomionych niedawno (sygnał świeżego trendu, nie wypalonej niszy).
2. **Bestsellery na platformach dropshipping** (CJ Dropshipping trending products, AliExpress bestsellery kategorii).
3. **Google Trends** — potwierdzenie, że zainteresowanie rośnie lub jest stabilne, nie spada.
4. **Marketplace'y (Allegro, Amazon.de)** — sprawdzenie realnych cen rynkowych i liczby ofert (zbyt duża liczba = wysoka konkurencja).

## 3. Proces walidacji (od kandydata do decyzji)

1. **Shortlist:** wybierz 3–5 kandydatów spełniających checklistę z pkt 1.
2. **Wypełnij `02_PRODUKTY/_SZABLON_PRODUKTU/Specyfikacja.md`** dla każdego (kopiuj folder szablonu jako nowy `P00X_Nazwa`).
3. **Agent Onboardingu/Brandingu** generuje markę i landing page, a **Agent Marketingowy** 3–5 wariantów kreacji reklamowych dla każdego kandydata (patrz `02_PRODUKTY/_SZABLON_PRODUKTU/Prompty_dla_Agentow/Prompty_Systemowe.md`).
4. **Mini-test reklamowy:** budżet testowy zgodnie z `01_FINANSE_I_PRAWO/Koszty_Infrastruktura/Budzet_Startowy_i_Prognoza.md` (500–1500 zł na kandydata), czas trwania 3–5 dni.
5. **Decyzja go/no-go** na podstawie: CTR kreacji, koszt za dodanie do koszyka, koszt za zamówienie (CPA) względem marży jednostkowej (definicje w sekcji 4).
6. **Zwycięzca** przechodzi do pełnego uruchomienia — patrz `05_OPERACJE_I_ARCHIWUM/Procedury_SOP/SOP_Uruchomienie_Nowego_Produktu.md`.

## 4. Kryteria go/no-go — jedyne źródło progów

*Inne dokumenty (Business Plan, SOP wygaszania, KPI) odwołują się do tej sekcji zamiast powtarzać progi.*

**Definicje (używamy tylko tych terminów):**

* **M — marża jednostkowa przed reklamą** = cena sprzedaży (netto, jeśli jesteśmy czynnym podatnikiem VAT) − COGS − koszt dostawy − prowizja płatności − rezerwa na zwroty (domyślnie 5% ceny).
* **CPA** = wydatek reklamowy (z VAT od importu usług, jeśli jesteśmy zwolnieni z VAT) / liczba zamówień. W tym modelu (jeden produkt, pierwszy zakup) CPA = koszt pozyskania klienta — **nie używamy osobnego terminu CAC**.
* **Zysk na zamówieniu** = M − CPA.

**Faza testu (3–5 dni, budżet 500–1500 zł):**

| Wynik testu | Decyzja |
|---|---|
| CPA ≤ 100% M | **GO** — pełne uruchomienie (SOP uruchomienia), skalowanie wg polityki budżetu |
| CPA 100–150% M, CTR w normie kanału | **WARUNKOWO** — jedna iteracja kreacji/targetowania, potem ponowna ocena wg tej tabeli; drugi wynik > 100% M = NO-GO |
| CPA > 150% M lub niski CTR po 2 iteracjach kreacji | **NO-GO** — wygaszenie, patrz `05_OPERACJE_I_ARCHIWUM/Procedury_SOP/SOP_Wygaszanie_Nierentownego_Produktu.md` |

**Faza skalowania (produkt po GO):**

| Wynik | Decyzja |
|---|---|
| CPA (średnia 7-dniowa) ≤ 70% M | zwiększaj budżet o 20–30% dziennie (polityka budżetu) |
| CPA 70–100% M | utrzymaj budżet, testuj nowe kreacje |
| CPA > 100% M przez 14 kolejnych dni mimo optymalizacji | **wygaszenie** (produkt przestał się „bronić”) |

*Przy CPA = 100% M zysk na pierwszym zamówieniu wynosi 0 — to próg rentowności, nie cel. GO przy tym poziomie ma sens tylko dlatego, że test jest krótki i nieoptymalizowany.*

## 5. Uwaga

Ten proces jest cykliczny — nie kończy się na pierwszym produkcie. Każdy kolejny kandydat przechodzi tę samą ścieżkę, co pozwala testować równolegle kilka nisz przy stałym, przewidywalnym koszcie.
