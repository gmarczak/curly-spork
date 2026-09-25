# Shortlista Kandydatów Produktowych — arkusz roboczy

*Utworzono: 2026-09-25. Narzędzie do wykonania `Proces_Wyboru_Produktu.md` — to jest krok blokujący wszystko inne (kod, kampanie, cele przychodowe). Decyzję podejmuje właściciel.*

## Plan: sprint wyboru w 5 dni roboczych

| Dzień | Zadanie | Wynik |
|---|---|---|
| 1 | Research wg źródeł z sekcji 2 procesu (TikTok Creative Center, Meta Ads Library, trendy CJ/AliExpress, Google Trends, Allegro/Amazon.de). Właściciel + agent researchu. | ≥ 15 surowych pomysłów w tabeli „Lejek” |
| 2 | Odrzucenie wg kryteriów eliminujących (sekcja 1a procesu). Dla reszty: realne ceny rynkowe (Allegro), COGS + dostawa (CJ/AliExpress), wstępne M. | ≥ 10 kandydatów z wyliczoną M |
| 3 | Punktacja ważona (tabela „Ocena”) — **właściciel ocenia sam, agent AI daje drugą ocenę niezależnie**, potem porównanie. Różnice ≥ 2 pkt w kryterium = rozmowa. | ranking |
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

## Weryfikacja rynku — top 5 (agent AI, 2026-09-25, dane z sieci)

*Top 5 z sesji rankingowej (spoza tego arkusza): malowanie po numerach ze zdjęcia, ostrzałka rolkowa, mata węchowa XXL, punch needle, kalimba 17.*

**Dostęp do źródeł:**
- **Allegro:** listing blokowany (DataDome, 403 z IP chmury). Liczby ofert i min/typowa/max z top 10 **nie zebrane**. Ceny i „X osób kupiło” tylko ze snippetów wyszukiwarki.
- **AliExpress:** strony wyników OK (ceny PLN dla PL, z VAT). Strony produktów blokowane (captcha) — czasu dostawy z Chin nie odczytano; tam gdzie brak, szacunek 7–14 dni.
- **Meta Ads Library (PL, aktywne, wszystkie reklamy):** OK. „Najstarsza” = najstarsza wśród pierwszych 30 wyników.
- **Google Trends (PL, 12 mc):** OK.

### Dane zebrane

| Kandydat | Allegro (snippety) | AliExpress (cena PLN, sprzedane) | Magazyn UE | Meta Ads PL | Google Trends PL 12 mc |
|---|---|---|---|---|---|
| Malowanie po numerach ze zdjęcia | 30×40: 149–174,89 zł; 40×50: 45–204,90 zł; „na ramie” od 209 zł (8 sprzedawców); kupiło: 2–8 os. na ofertę | 23,59–42,59 zł najmniejszy wariant (1–3 tys.+); 129,59 zł wariant premium (5 tys.+); wysyłka od 40 zł darmowa | brak | fraza ogólna: 80 reklam, najstarsza 2024-10-30 (IPicasso), 6+ reklamodawców; „ze zdjęcia”: 11 reklam, 1 reklamodawca (Wymalujtosam.pl, od 2026-08-09) | najwyższy wolumen z 5 (śr. 52); r/r −21%; szczyt XII (2,5× lato) |
| Ostrzałka rolkowa + magnes | cylindryczna z magnesem 79 zł; zestawy 69,90–79 zł; kupiło: do 58 os. | 61,99 zł bestseller (10 tys.+); 24,39 zł wariant podstawowy (5 tys.+); 78,39 zł 4 kąty drewno (5 tys.+) | DE: 112,99 zł, dostawa 3–7 dni | „ostrzałka rolkowa”: 27 reklam, **wszystkie od IX 2026** (Morvix 21, NaOstro 6); EN: 70 (Hatori, HORL) | „ostrzałka do noży” śr. 28,5; r/r −26%; szczyt XII (1,5×); „ostrzałka rolkowa” ≈ 0 wyszukiwań |
| Mata węchowa XXL | XXL 40,01–54,99 zł; 49 zł supercena; kupiło: 3–41 os. | 62,59 zł duża (800+); 27–30 zł małe; 166,99 zł filcowa składana (4 tys.+) | PL: 58,79–89,79 zł, dostawa 3–7 dni (nowe oferty, 1–5 sprzedanych) | 3 reklamy (od 2026-07-14) | niski wolumen (śr. 4,2); stabilnie; szczyt XII |
| Punch needle | 58,90–89,99 zł; 79,99 zł — kupiło 83 os. | 32,79–34,69 zł zestawy 20×20 (1 tys.+) | brak (filtr PL zwraca inne produkty) | 47 reklam, najstarsza 2025-11-26, lider Miicreative (13) | najniższy wolumen (śr. 3,1); tygodnie z zerem III–VIII; szczyt II |
| Kalimba 17 | od 58,99 zł (model: 257 os. w 30 dni); drewniane do 119 zł; kupiło: 11–39 os. na ofertę | 52,57 zł Hluru (2 tys.+); 56,59 zł Lydesy; 75–81 zł mahoń | PL: 68,81–73,99 zł (Zenwire), dostawa 2–4 dni | 14 reklam, najstarsza 2026-08-12 | śr. 13,6; r/r ≈ 0%; szczyt XII (2×) |

### Realne M (przy zwolnieniu z VAT)

M = 0,935 × cena − COGS − 0,40 zł. COGS = cena detaliczna AliExpress z VAT i dostawą (górna granica; oferta CJ/hurt zwykle niższa — do sprawdzenia).

| Kandydat | Cena | COGS przyjęty | Udział | M (zł) | M wcześniej | Uwaga |
|---|---|---|---|---|---|---|
| Malowanie ze zdjęcia | 159 | 60 (szac.: 40×50 z ramą, wariant nieodczytany) | 38% | 88,3 | 98,3 | przy COGS 45 zł: M 103 |
| Ostrzałka rolkowa | 119 | 40 (szac.: środek 24–62) | 34% | 70,9 | 70,9–90,5 | przy COGS 62 zł: M 48,9, udział 52% → eliminacja |
| Mata węchowa XXL | 79 | 62,59 | 79% | 10,9 | 48,5 | Allegro 40–55 zł — cena 79 nie do obrony |
| Punch needle | 89 | 34,50 | 39% | 48,3 | 60,8 | |
| Kalimba 17 | 79 | 56,59 (CN) / 68,81 (PL) | 72–87% | 16,9 / 4,7 | 51,5 | Allegro od 58,99 zł |

### Punktacja po weryfikacji

| Kandydat | Cena ×2 | Marża ×2 | Wow ×2 | Dostawca ×2 | Nasycenie ×1 | Sezonowość ×1 | Zwroty ×1 | Zgodność PL ×2 | **Suma** |
|---|---|---|---|---|---|---|---|---|---|
| Ostrzałka rolkowa (119 zł) | 4 | 4 | 4 | 4 | 3 | 4 | 5 | 4 | **52** |
| Malowanie ze zdjęcia (159 zł) | 5 | 3 | 5 | 3 | 3 | 3 | 4 | 4 | **50** |
| Punch needle (89 zł) | 4 | 3 | 4 | 3 | 4 | 2 | 4 | 4 | **46** |
| Mata węchowa XXL (79 zł) | 2 | 1 | 3 | 3 | 5 | 4 | 5 | 5 | 42 ✗ |
| Kalimba 17 (79 zł) | 3 | 1 | 4 | 4 | 5 | 3 | 4 | 3 | 42 ✗ |

✗ = eliminacja (Marża < 3).

**Najważniejsze ryzyka:**
- Ostrzałka: 2 polskie marki (Morvix, NaOstro) testują ten sam produkt od IX 2026. Allegro kotwiczy cenę na 79 zł. Wynik zależy od COGS — zapytać CJ o wariant z magnetyczną podstawą.
- Malowanie ze zdjęcia: brak magazynu UE; personalizacja wydłuża dostawę. Personalizacja może wyłączać prawo odstąpienia ⚠️ do weryfikacji z prawnikiem. Nie kierować do dzieci (EN71).
- Punch needle: bardzo mały wolumen wyszukiwań i martwy sezon III–VIII.

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

## Dzień 5 — porównanie finalistów (agent AI, 2026-09-25)

| Kryterium | P002 Malowanie ze zdjęcia | P003 Punch needle |
|---|---|---|
| M (= maks. CPA) | 88,3 zł (szac., COGS 60 zł) | 48,3 zł |
| Punkty | 50 | 46 |
| Popyt (Google Trends, śr. 12 mc) | 52 — najwyższy z top 5 | 3,1 — najniższy |
| Siła hooka | bardzo wysoka (zdjęcie → obraz) | wysoka (ASMR), węższa grupa |
| Ryzyko prawne | średnie: RODO (zdjęcia do Chin) ⚠️, zwroty personalizacji ⚠️ | niskie |
| Czas dostawy | 12–20 dni (szac.) | 7–14 dni (szac.) |
| Okno sezonu | IX–XII, szczyt XII | X–II |

**Rekomendacja agenta:** P002 jako nr 1. Wyższa M daje 1,8× więcej miejsca na CPA. Popyt jest ok. 17× większy. Szczyt przypada na XII — test musi ruszyć do końca X.
P003 jako nr 2, zaraz po decyzji dla P002. Sezon trwa do II, więc start w XI nic nie traci.

**Warunki przed startem P002:**
- Realny COGS z wyceny ≤ 63 zł. Przeliczyć M i wpisać próg GO w sekcji 6 `02_PRODUKTY/P002_Malowanie_Ze_Zdjecia/Specyfikacja.md` **przed** startem.
- Rozwiązana kwestia RODO (patrz lista niżej).

### Lista przed pierwszą kampanią

- [ ] Konsultacja z księgową: PKWiU P002/P003, VAT-UE i 23% VAT od reklam Meta, limit działalności nierejestrowanej ⚠️.
- [ ] Konsultacja z prawnikiem: przekazanie zdjęć klientów do dostawcy w Chinach (albo własny szablon), wyłączenie zwrotu dla personalizacji ⚠️.
- [ ] Regulamin i polityka prywatności z danymi osoby fizycznej.
- [ ] Konto Stripe jako osoba fizyczna (karty, BLIK).
- [ ] Arkusz ewidencji sprzedaży z alarmem przy 70% limitu kwartalnego.
- [ ] Próbka P002 odebrana: zdjęcia i wideo do kreacji.
- [ ] Domena, landing, piksel Meta + Conversions API.
- [ ] Na stronie: czas realizacji i ostatni dzień zamówień z dostawą przed świętami, dane GPSR.

## Decyzja

| Pole | Wartość |
|---|---|
| Data decyzji | *(rekomendacja agenta 2026-09-25 — czeka na akceptację)* |
| Shortlista (3 kandydatów, ID folderów) | P002 Malowanie ze zdjęcia, P003 Punch needle; ostrzałka rolkowa czeka na wycenę CJ (warunek: COGS ≤ 45 zł) |
| Kandydat nr 1 do testu | P002 Malowanie ze zdjęcia (rekomendacja) |
| Tryb testów (po kolei / 2 równolegle) | po kolei: P002 → P003 (rekomendacja) |
| Budżet testu kandydata nr 1 | 1000 zł reklam + VAT 23% = 1230 zł; 5 dni × 200 zł (rekomendacja) |
| Próg GO | CPA ≤ M P002 po realnej wycenie (dziś 88,3 zł, szac.); progi: `Proces_Wyboru_Produktu.md`, sekcja 4 |
| Akceptacja właściciela | |
