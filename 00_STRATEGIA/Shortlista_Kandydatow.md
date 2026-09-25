# Shortlista Kandydatów Produktowych — arkusz roboczy

*Utworzono: 2026-09-25. Narzędzie do wykonania `Proces_Wyboru_Produktu.md` — to jest krok blokujący wszystko inne (kod, kampanie, cele przychodowe). Decyzję podejmują obaj wspólnicy.*

## Plan: sprint wyboru w 5 dni roboczych

| Dzień | Zadanie | Wynik |
|---|---|---|
| 1 | Research wg źródeł z sekcji 2 procesu (TikTok Creative Center, Meta Ads Library, trendy CJ/AliExpress, Google Trends, Allegro/Amazon.de). Każdy wspólnik osobno. | po 8–10 surowych pomysłów na osobę w tabeli „Lejek” |
| 2 | Odrzucenie wg kryteriów eliminujących (sekcja 1a procesu). Dla reszty: realne ceny rynkowe (Allegro), COGS + dostawa (CJ/AliExpress), wstępne M. | ≥ 10 kandydatów z wyliczoną M |
| 3 | Punktacja ważona (tabela „Ocena”) — **każdy wspólnik ocenia osobno**, potem średnia. Różnice ≥ 2 pkt w kryterium = rozmowa. | ranking |
| 4 | Wybór 3 kandydatów z ≥ 45 pkt. Dla każdego: folder `02_PRODUKTY/P00X_Nazwa` z szablonu, zamówienie próbki, pytanie do dostawcy o magazyn UE, dane GPSR i adres zwrotów. | 3 foldery produktów, próbki zamówione |
| 5 | Decyzja o kolejności testów (po kolei albo 2 równolegle — budżet: `01_FINANSE_I_PRAWO/Koszty_Infrastruktura/Budzet_Startowy_i_Prognoza.md`) i wpis w sekcji „Decyzja”. | kandydat nr 1 do testu |

## Wstępny research (agent AI, 2026-09-25) — DO WERYFIKACJI

*Tabele poniżej wypełnił agent researchu. **Dzień 1–3 sprintu nadal do wykonania ręcznie** — to punkt startowy, nie decyzja.*

- **Zweryfikowane:** tylko ceny detaliczne z fragmentów wyników wyszukiwania Allegro (snippety konkretnych ofert).
- **Niezweryfikowane:** COGS + dostawa (wszystkie to szacunki), nasycenie (bez Meta Ads Library / TikTok Creative Center — wymagają JS), Google Trends, magazyny UE u dostawców. Allegro i CJ blokowały bezpośrednie pobieranie stron.
- **Główny filtr — VAT:** przy zwolnieniu z VAT art. 113 ust. 13 wyklucza sprzedaż na odległość towarów z PKWiU 26 i 27 (elektronika, urządzenia elektryczne **i nieelektryczne urządzenia gospodarstwa domowego**), kosmetyków i części samochodowych. Wniosek: na start tylko produkty **bez prądu i baterii**. M liczone przy zwolnieniu z VAT (cena brutto = przychód); przy czynnym VAT liczyć od ceny / 1,23.
- **Odrzucone przez agenta:** grawitacyjny młynek do przypraw, lampa do topienia świec, sunset lamp, projektor galaktyki, koc elektryczny (PKWiU 26/27 + CE); kubek do mycia łap, rolka do sierści, osłona na szybę, hamak dla kota na okno (ceny poniżej sweet-spotu); deska „tytanowa” (ceny spadły, ryzyko wprowadzania w błąd); mata do akupresury, korektor postawy, plastry hydrokoloidowe (twierdzenia zdrowotne / CPNP).

**Rekomendacja agenta (top 3):**
1. Rolkowa ostrzałka do noży — najwyższa M (~90 zł), całoroczna, prezentowa, bez prądu.
2. Zestaw do wędzenia koktajli (nieelektryczny) — najlepsze wow, szczyt Q4; warunek: kreacje bez alkoholu.
3. Drewniany model mechaniczny 3D — wysoka M, Q4 + hobby; warunek: CE/EN71 i 14+ od dostawcy.
Rezerwa: mata węchowa XXL (najbezpieczniejsza regulacyjnie, niższa M).

**Przed dniem 3 sprintu:** ręcznie sprawdzić ceny i liczbę ofert na Allegro; ceny i magazyn UE w CJ/AliExpress; nasycenie w Meta Ads Library; kody PKWiU dla #1, #6, #9 z księgową.

## Lejek (surowe pomysły)

| # | Pomysł | Kto znalazł | Źródło (link) | Kryterium eliminujące? | Dalej? |
|---|---|---|---|---|---|
| 1 | Rolkowa ostrzałka do noży z magnesem (kuchnia) | agent research | Allegro (snippet): 139,99 zł | klony HORL w DE od lat; cena 140 zł w PL do uzasadnienia; PKWiU (nożownictwo, nie 27) ⚠️ potwierdzić | tak |
| 2 | Zestaw do wędzenia koktajli (nieelektryczny) (prezent dla niego) | agent research | Allegro (snippet): 95,99–199 zł | zakaz reklamy alkoholu (poza piwem): kreacje z kawą/mocktailem/deserem, 18+; palnik bez gazu | tak |
| 3 | Steel tongue drum 12–13" (hobby muzyczne) | agent research | Allegro (snippet): 122,99–183,99 zł | C 38% (ponad próg); ~2 kg, wgniecenia; bez twierdzeń „redukcja stresu” | tak |
| 4 | Plakat-zdrapka „100 randek” (prezent dla par) | agent research | Allegro (snippet): 61–109 zł | wymaga druku PL (POD), nie klasyczny dropshipping; rynek nasycony | tak |
| 5 | Drewniany mechaniczny model 3D dla dorosłych (hobby / prezent) | agent research | Allegro (snippet): 79,99–249,90 zł | dyrektywa zabawkowa: bez CE/EN71 i oznaczenia 14+ od dostawcy = eliminacja | tak |
| 6 | Hamak ochronny dla psa na kanapę auta (pies + auto) | agent research | Allegro (snippet): 61,99–139,75 zł | dopasowanie do auta; czy to nie „część pojazdu” (art. 113 ust. 13) ⚠️ | tak |
| 7 | Mata węchowa XXL premium (pies) | agent research | Allegro (snippet): 40–99 zł | tania konkurencja od 40 zł — wyróżnić rozmiarem/jakością/marką | tak |
| 8 | Wałek stoper przeciągów, zestaw 2 szt. (dom / zima) | agent research | Allegro (snippet): 45–64 zł/szt. | sezon X–II; niska M; bez liczb oszczędności na ogrzewaniu | tak |
| 9 | Organizer XXL do bagażnika (auto / porządek) | agent research | Allegro (snippet): 99,90–147,99 zł | słabsze wow; kategoria samochodowa jak hamak ⚠️ | tak |
| 10 | Duży obraz z ruchomym piaskiem (dekoracja) | agent research | Allegro (snippet): 15–65 zł | rynek zakotwiczony dużo niżej; szkło — stłuczki | tak |
| 11 | Kalimba 17 klawiszy (instrument (alternatywa/bundle do tongue drum)) | agent research | Allegro (snippet): 51,99–179 zł | kierować do dorosłych (ryzyko klasyfikacji jako zabawka) | tak |
| 12 | Zestaw do kiszenia (słoiki z zaworem + obciążniki) (kuchnia PL) | agent research | Allegro (snippet): 89,99 zł | szkło, ciężar, stłuczki; deklaracja kontaktu z żywnością | nie (<45) |

## Ekonomika wstępna (tylko kandydaci bez kryteriów eliminujących)

M = cena − COGS − dostawa − prowizja (~1,5% + 0,40 zł) − rezerwa na zwroty (5% ceny). Definicje: `Proces_Wyboru_Produktu.md`, sekcja 4.

| # | Kandydat | Cena rynkowa (Allegro) | COGS | Dostawa | (COGS+dostawa)/cena | M (zł) | Maks. akceptowalny CPA (= M) |
|---|---|---|---|---|---|---|---|
| 1 | Rolkowa ostrzałka do noży z magnesem | 139,99 zł → przyjęte 139,99 zł | 40 zł (szac. łącznie) | — | 29% | 90,5 | 90,5 |
| 2 | Zestaw do wędzenia koktajli (nieelektryczny) | 95,99–199 zł → przyjęte 119 zł | 35 zł (szac. łącznie) | — | 29% | 75,9 | 75,9 |
| 3 | Steel tongue drum 12–13" | 122,99–183,99 zł → przyjęte 159 zł | 60 zł (szac. łącznie) | — | 38% | 88,3 | 88,3 |
| 4 | Plakat-zdrapka „100 randek” | 61–109 zł → przyjęte 99 zł | 22 zł (szac. łącznie) | — | 22% | 70,2 | 70,2 |
| 5 | Drewniany mechaniczny model 3D dla dorosłych | 79,99–249,90 zł → przyjęte 149 zł | 50 zł (szac. łącznie) | — | 34% | 88,9 | 88,9 |
| 6 | Hamak ochronny dla psa na kanapę auta | 61,99–139,75 zł → przyjęte 129 zł | 45 zł (szac. łącznie) | — | 35% | 75,2 | 75,2 |
| 7 | Mata węchowa XXL premium | 40–99 zł → przyjęte 89 zł | 25 zł (szac. łącznie) | — | 28% | 57,8 | 57,8 |
| 8 | Wałek stoper przeciągów, zestaw 2 szt. | 45–64 zł/szt. → przyjęte 69 zł | 20 zł (szac. łącznie) | — | 29% | 44,1 | 44,1 |
| 9 | Organizer XXL do bagażnika | 99,90–147,99 zł → przyjęte 119 zł | 40 zł (szac. łącznie) | — | 34% | 70,9 | 70,9 |
| 10 | Duży obraz z ruchomym piaskiem | 15–65 zł → przyjęte 89 zł | 30 zł (szac. łącznie) | — | 34% | 52,8 | 52,8 |
| 11 | Kalimba 17 klawiszy | 51,99–179 zł → przyjęte 79 zł | 22 zł (szac. łącznie) | — | 28% | 51,5 | 51,5 |
| 12 | Zestaw do kiszenia (słoiki z zaworem + obciążniki) | 89,99 zł → przyjęte 89 zł | 35 zł (szac. łącznie) | — | 39% | 47,8 | 47,8 |

## Ocena ważona (maks. 65, próg 45)

| # | Kandydat | Cena ×2 | Marża ×2 | Wow ×2 | Dostawca ×2 | Nasycenie ×1 | Sezonowość ×1 | Zwroty ×1 | Zgodność PL ×2 | **Suma** |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Rolkowa ostrzałka do noży z magnesem | 5 | 4 | 4 | 4 | 3 | 4 | 5 | 4 | **54** |
| 2 | Zestaw do wędzenia koktajli (nieelektryczny) | 5 | 4 | 5 | 4 | 3 | 4 | 4 | 3 | **53** |
| 3 | Steel tongue drum 12–13" | 5 | 3 | 5 | 3 | 4 | 4 | 3 | 4 | **51** |
| 4 | Plakat-zdrapka „100 randek” | 5 | 5 | 4 | 2 | 2 | 4 | 5 | 5 | **53** |
| 5 | Drewniany mechaniczny model 3D dla dorosłych | 5 | 4 | 4 | 4 | 3 | 5 | 4 | 3 | **52** |
| 6 | Hamak ochronny dla psa na kanapę auta | 5 | 3 | 4 | 4 | 3 | 4 | 4 | 4 | **51** |
| 7 | Mata węchowa XXL premium | 4 | 4 | 4 | 4 | 3 | 4 | 5 | 5 | **54** |
| 8 | Wałek stoper przeciągów, zestaw 2 szt. | 3 | 4 | 4 | 4 | 4 | 3 | 4 | 5 | **51** |
| 9 | Organizer XXL do bagażnika | 5 | 4 | 3 | 4 | 3 | 4 | 5 | 4 | **52** |
| 10 | Duży obraz z ruchomym piaskiem | 3 | 3 | 5 | 4 | 2 | 4 | 3 | 5 | **49** |
| 11 | Kalimba 17 klawiszy | 4 | 4 | 4 | 4 | 3 | 4 | 4 | 4 | **51** |
| 12 | Zestaw do kiszenia (słoiki z zaworem + obciążniki) | 4 | 3 | 3 | 3 | 4 | 3 | 3 | 4 | **44** |

*W komórkach wpisuj ocenę 1–5; suma = Σ ocena × waga. Przykład wypełnienia: `02_PRODUKTY/P001_Poduszka_Ergonomiczna_PRZYKLAD/Specyfikacja.md`, sekcja 5 (54/65).*

## Decyzja

| Pole | Wartość |
|---|---|
| Data decyzji | |
| Shortlista (3 kandydatów, ID folderów) | |
| Kandydat nr 1 do testu | |
| Tryb testów (po kolei / 2 równolegle) | |
| Budżet testu kandydata nr 1 | 500–1500 zł |
| Akceptacja wspólnika 1 / wspólnika 2 | |
