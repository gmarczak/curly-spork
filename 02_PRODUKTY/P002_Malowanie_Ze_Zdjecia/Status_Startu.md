# Status startu P002 Z Kadru — co zrobione, co zostało

*Stan: 2026-09-26. Cel: 5-dniowy test reklamowy zakończony do końca października 2026 (szczyt sprzedaży w XII).*

## Zrobione (agent AI)

| Obszar | Plik |
|---|---|
| Wybór produktu i decyzja | `00_STRATEGIA/Shortlista_Kandydatow.md` |
| Specyfikacja, M, ryzyka, hook | `Specyfikacja.md` |
| Marka Z Kadru, logo A, paleta | `Assety_Graficzne/Pakiet_Marki.md` |
| Treść strony | `Landing_Tresc.md` |
| Reklamy: nagłówki, teksty, 3 skrypty wideo, 3 grafiki | `Kreacje_Reklamowe.md` |
| Makieta strony i reklam | `Assety_Graficzne/Makieta_Strona_i_Reklamy.html` |
| Baza wiedzy Agenta Wsparcia + makra | `Wiedza_Wsparcia.md` |
| Procedura zamówienia ze zdjęciem | `Dostawcy_Fulfillment/Procedura_Zamowienia_Ze_Zdjeciem.md` |
| Szkic regulaminu i polityki prywatności | `Dokumenty_Prawne/Regulamin_i_Polityka_SZKIC.md` |
| Strona w storefroncie (wersja robocza) | `04_KOD_I_INFRASTRUKTURA/storefront-nextjs/stores.config.json` (P002) |
| Eskalacja RODO w Agencie Wsparcia + test | `04_KOD_I_INFRASTRUKTURA/ai-agents-langgraph/src/fabryka_agents/graphs/support.py` |
| Ewidencja sprzedaży z alarmem 70% limitu | `01_FINANSE_I_PRAWO/Raporty_Sprzedazy/Ewidencja_Sprzedazy_2026.xlsx` |
| Skrypt szablonu ze zdjęcia | `Assety_Graficzne/00_Makieta/generuj_szablon.py` |
| Zamówienie ze zdjęciem: formularz, kontrola zdjęcia, Stripe, potwierdzenie | `storefront-nextjs/src/app/zamow/`, `medusa-backend/src/api/store/carts/[id]/photo/` |
| Baner cookies + piksel Meta po zgodzie | `storefront-nextjs/src/app/consent.tsx` |
| Konfiguracja P002 w Medusie (kanał, region, produkt, dostawa, klucz) | `medusa-backend/src/scripts/seed-p002.ts` |

## Do zrobienia — właściciel (blokuje start)

| # | Zadanie | Czas | Odblokowuje |
|---|---|---|---|
| 1 | Wysłać wiadomość do dostawcy (tekst: `00_STRATEGIA/Shortlista_Kandydatow.md`, „Po sprincie”) i zamówić próbkę | 30 min + 2–3 tyg. czekania | COGS, M, próg GO, czas realizacji, termin świąteczny, grafiki |
| 2 | Konsultacja z prawnikiem (checklista w szkicu regulaminu) | 1 h | §6 zwroty, RODO zdjęć, GPSR |
| 3 | Konsultacja z księgową (pytania w `Shortlista_Kandydatow.md`) | 1 h | PKWiU, VAT od reklam, limit |
| 4 | Sprawdzić znak „Z Kadru” (UPRP, TMview) i kupić zkadru.pl | 20 min | domena, e-mail kontaktowy |
| 5 | Konto Stripe jako osoba fizyczna (karty, BLIK) | 30 min | płatności |
| 6 | Konto reklamowe Meta + strona marki na FB/IG | 30 min | kampania |
| 7 | Podać dane do stopki: imię i nazwisko, adres do korespondencji (lub skrytka) | 5 min | regulamin, stopka |
| 8 | Hosting Medusy + Postgres + Redis + bucket (decyzja kosztowa: `01_FINANSE_I_PRAWO/Koszty_Infrastruktura/Budzet_Startowy_i_Prognoza.md`) | 30 min | wdrożenie sklepu |

## Do zrobienia — agent AI (po danych od właściciela)

| # | Zadanie | Czeka na |
|---|---|---|
| A | Przeliczyć M i wpisać próg GO w `Specyfikacja.md` | 1 |
| B | Wypełnić pola `[DO UZUPEŁNIENIA]` w treściach, stopce, regulaminie, bazie wsparcia | 1, 2, 7 |
| C | Test płatności Stripe na koncie testowym (kod gotowy; zamówienie bez płatności sprawdzone lokalnie) | 5 |
| D | Wpisać ID piksela Meta; Conversions API (serwerowo) | 6 |
| D2 | Prywatny bucket na zdjęcia (np. Supabase Storage, UE) + serwer Medusy | 8 |
| E | DNS zkadru.pl → Vercel, wdrożenie strony, zdjęcie flagi `draft` | 4, B, C, D |
| F | Grafiki i montaż wideo z materiałów z próbki (zadanie 4) | 1 (próbka) |
| G | Konfiguracja kampanii wg `Kreacje_Reklamowe.md`, sekcja 5 | E, F, 6 |

**Ścieżka krytyczna:** próbka od dostawcy (2–3 tyg.). Zamówienie próbki jest najpilniejsze — każdy dzień zwłoki przesuwa test bliżej świąt.
