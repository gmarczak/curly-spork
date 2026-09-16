# Wzorce Regulaminów i Polityk — Szkielet Roboczy

*Uwaga: to szkielet elementów wymaganych, nie gotowy dokument prawny. Finalna treść regulaminu i polityk MUSI być zweryfikowana przez prawnika przed publikacją — błędy tutaj = realne ryzyko sankcji UOKiK/RODO i problemy z bramkami płatności.*

## 1. Dokumenty wymagane dla każdego sklepu (multi-tenant — każda domena potrzebuje własnej wersji)

1. **Regulamin sklepu internetowego**
2. **Polityka Prywatności** (RODO)
3. **Polityka Cookies**
4. **Informacja o prawie odstąpienia od umowy** (formularz zwrotu — 14 dni, konsument w UE)
5. **Zasady reklamacji**

## 2. Kluczowe klauzule — Regulamin

- Dane sprzedawcy: nazwa podmiotu, adres, NIP, dane kontaktowe (e-mail, telefon).
- Sposób składania i realizacji zamówień, moment zawarcia umowy.
- Ceny — informacja, że są cenami brutto (z VAT) lub netto + VAT, w zależności od statusu VAT operatora.
- Metody i koszty dostawy — zgodne z aktualnym modelem logistyki danego produktu.
- Metody płatności (Stripe/BLIK).
- **Prawo odstąpienia od umowy w ciągu 14 dni** bez podania przyczyny (obowiązkowe dla B2C w UE) — kto pokrywa koszt odesłania.
- Procedura reklamacji i czas odpowiedzi (ustawowo do 14 dni na odpowiedź).
- Zasady rozstrzygania sporów (możliwość ODR — unijna platforma internetowego rozstrzygania spraw).

## 3. Kluczowe elementy — Polityka Prywatności (RODO)

- Administrator danych (podmiot operujący sklepem).
- Cel i podstawa prawna przetwarzania danych (realizacja zamówienia, marketing za zgodą).
- Odbiorcy danych — **istotne w architekturze multi-tenant:** wskazać, że dane mogą być przetwarzane przez wspólną infrastrukturę techniczną (Supabase, agentów AI) obsługującą wiele marek operatora.
- Czas przechowywania danych.
- Prawa osoby, której dane dotyczą (dostęp, sprostowanie, usunięcie, przenoszenie).
- Informacja o ewentualnym przekazywaniu danych poza EOG (np. jeśli używane są modele AI hostowane poza UE — do zweryfikowania per dostawca API).

## 4. Cookies

- Rozróżnienie cookies niezbędnych (działanie sklepu, koszyk) od analitycznych/marketingowych (Meta Pixel, TikTok Pixel) — te drugie wymagają zgody (banner cookie) przed załadowaniem.

## 5. Do zrobienia przed uruchomieniem pierwszego sklepu

- [ ] Wersja szablonowa regulaminu zweryfikowana przez prawnika (jednorazowy koszt, potem reużywalna dla każdego nowego produktu ze zmianą tylko nazwy/adresu)
- [ ] Konfiguracja banera cookie z podziałem na kategorie zgody
- [ ] Zarejestrowanie działalności jako administrator danych (obowiązek informacyjny w polityce prywatności)
