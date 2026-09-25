# Zasady Księgowe i VAT

*Aktualizacja: 2026-09-25. To nie jest porada podatkowa — każdy punkt oznaczony ⚠️ potwierdzić z biurem rachunkowym przed pierwszą sprzedażą (lista pytań w sekcji 6).*

## 0. Faza bez firmy (działalność nierejestrowana — do pierwszego klienta)

- Biuro rachunkowe niepotrzebne na stałe — wystarczy **jednorazowa konsultacja** (VAT-UE przy reklamach, PKWiU produktów, limit przychodu).
- Uproszczona ewidencja sprzedaży zamiast KPiR; przychód wykazywany w rocznym PIT-36 ⚠️.
- Limit przychodu i obowiązek rejestracji: `01_FINANSE_I_PRAWO/Rejestracja_i_Umowy/Forma_Prawna_i_Rejestracja.md`, sekcja 3.

## 1. VAT — progi i zasady

- **Limit zwolnienia podmiotowego z VAT (art. 113 ustawy o VAT):** **240 000 zł** obrotu rocznie od 1.01.2026 (wcześniej 200 000 zł). ⚠️ W pierwszym roku limit liczy się proporcjonalnie do okresu działalności.
- **Wyłączenia ze zwolnienia (art. 113 ust. 13)** — niektóre towary i rodzaje sprzedaży wykluczają zwolnienie niezależnie od obrotu (m.in. sprzedaż wysyłkowa/na odległość wybranych kategorii, np. elektroniki, części samochodowych, perfum i kosmetyków). ⚠️ **Sprawdzić przy każdym nowym kandydacie produktowym** — dodano jako kryterium w `00_STRATEGIA/Proces_Wyboru_Produktu.md`.
- **Reklamy Meta/TikTok = import usług.** Faktury wystawiają spółki z Irlandii → w Polsce rozliczamy VAT metodą odwrotnego obciążenia. **Nawet podmiot zwolniony z VAT musi przed pierwszą taką usługą zarejestrować się jako podatnik VAT-UE (VAT-R)** i rozliczać ten VAT (bez prawa do odliczenia, gdy jest zwolniony). Dotyczy też części narzędzi SaaS z UE. To realny koszt ~23% budżetu reklamowego dla podmiotu zwolnionego — uwzględniony w `01_FINANSE_I_PRAWO/Koszty_Infrastruktura/Budzet_Startowy_i_Prognoza.md`.
- **Usługi spoza UE (np. API modeli AI z USA):** również import usług z odwrotnym obciążeniem. ⚠️ Sposób ujęcia potwierdzić z księgowym.
- **JPK_V7:** obowiązkowy miesięczny plik dla czynnych podatników VAT. Podmiot zwolniony składa informacje o imporcie usług na zasadach dla VAT-UE (⚠️ forma i terminy do potwierdzenia).

## 2. Sprzedaż zagraniczna i dropshipping spoza UE

- **Sprzedaż B2C do innych krajów UE (po ekspansji):** po przekroczeniu łącznie **10 000 EUR** rocznie sprzedaży na odległość do UE → VAT kraju klienta, rozliczany przez **VAT-OSS**.
- **Dropshipping z Chin (wysyłka spoza UE bezpośrednio do klienta):** przesyłki do 150 EUR — procedura **IOSS** (VAT pobierany przy sprzedaży, szybka odprawa) albo VAT i opłaty celne płaci klient przy odbiorze (duże ryzyko odmowy przyjęcia paczki i zwrotów). ⚠️ Kto jest importerem i kto płaci VAT/cło, zależy od warunków dostawcy (CJ/AliExpress) — ustalić przed pierwszym testem. **Uwaga:** UE znosi zwolnienie celne dla przesyłek do 150 EUR (zmiany wchodzą etapami od 2026) — ⚠️ sprawdzić stan na dzień startu.
- **GPSR (bezpieczeństwo produktów, od 13.12.2024):** przy sprzedaży produktu spoza UE musi być wskazany **podmiot odpowiedzialny w UE**; przy dropshippingu łatwo stać się nim samemu. Patrz `01_FINANSE_I_PRAWO/Rejestracja_i_Umowy/Wzorce_Regulaminow_i_Polityk.md`.

## 3. Faktury, paragony i KSeF

- **KSeF (Krajowy System e-Faktur):** e-faktury B2B obowiązkowe od **1.02.2026** (najwięksi podatnicy) i od **1.04.2026** (pozostali). ⚠️ Dla najmniejszych podmiotów obowiązują okresy przejściowe — potwierdzić, czy i od kiedy nas obejmują. Przy sprzedaży B2C faktury wystawiamy na żądanie klienta; od kiedy przez KSeF — do potwierdzenia.
- **Kasa fiskalna online:** sprzedaż wysyłkowa opłacona w całości przelewem/przez operatora płatności (Stripe) i z ewidencją, z której wynika, czego dotyczyła płatność, zwykle jest zwolniona z kasy. ⚠️ Potwierdzić dla konkretnej konfiguracji płatności (np. płatność za pobraniem = brak zwolnienia).

## 4. Rekomendacja obsługi księgowej

Od rejestracji JDG: **zewnętrzne biuro rachunkowe** (ok. 200–500 zł/mc przy małej działalności; więcej przy VAT i imporcie usług). Samoobsługa (inFakt/Fakturownia) ma sens tylko przy bardzo małej liczbie transakcji — przy imporcie usług, OSS/IOSS i wielu domenach ryzyko błędu jest za duże.

## 5. Ewidencja kosztów specyficznych dla tego modelu

- Hosting i infrastruktura (Hetzner, Vercel, Supabase) — faktury cykliczne, na firmę od pierwszego miesiąca.
- Subskrypcje API modeli AI (Anthropic, OpenAI, Fal.ai) — płatne w USD, import usług (sekcja 1), przewalutowanie wg kursu NBP.
- Domeny (koszt per produkt, cykliczny rocznie).
- Budżety reklamowe (Meta/TikTok) — osobna kategoria kosztów **per produkt** (do jednostkowej ekonomiki w `00_STRATEGIA/Business_Plan_i_Koncepcja.md`, sekcja 5) + import usług.
- Prowizje bramek płatności — księgowane jako koszt, nie potrącane „netto" bez ewidencji.

## 6. Pytania do biura rachunkowego (przed pierwszą sprzedażą)

- [ ] Forma opodatkowania (skala / liniowy / ryczałt — jaka stawka ryczałtu dla handlu) przy JDG (po fazie działalności nierejestrowanej)
- [ ] Zwolnienie z VAT czy od razu czynny VAT? (import usług reklamowych, odliczenie VAT od kosztów, wymogi Stripe/dostawców, wyłączenia z art. 113 ust. 13 dla planowanych kategorii)
- [ ] Rejestracja VAT-UE przed pierwszą fakturą od Meta/TikTok — kto i kiedy składa VAT-R
- [ ] Dropshipping z Chin: IOSS czy DDP po stronie dostawcy; kto jest importerem; zmiany w zwolnieniu celnym 150 EUR
- [ ] Od kiedy obowiązuje nas KSeF i jak wystawiać faktury B2C na żądanie
- [ ] Kasa fiskalna przy płatnościach przez Stripe — potwierdzenie zwolnienia
- [ ] Księgowanie kosztów w USD/EUR (subskrypcje AI, reklamy)
- [ ] Moment powstania obowiązku VAT-OSS (monitoring sprzedaży do UE)
- [ ] Przy przyszłym przekształceniu w sp. z o.o.: dostępność CIT 9% i estońskiego CIT (patrz `01_FINANSE_I_PRAWO/Rejestracja_i_Umowy/Forma_Prawna_i_Rejestracja.md`)
