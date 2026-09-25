# Wzorce Regulaminów i Polityk — Szkielet Roboczy

*Uwaga: to szkielet elementów wymaganych, nie gotowy dokument prawny. Finalna treść regulaminu i polityk MUSI być zweryfikowana przez prawnika przed publikacją — błędy tutaj = realne ryzyko sankcji UOKiK/RODO i problemy z bramkami płatności.*

*Aktualizacja 2026-09-25: usunięto odesłanie do platformy ODR (zamknięta), dodano Omnibus, GPSR, przycisk odstąpienia od umowy, BDO. Punkty z ⚠️ — do potwierdzenia z prawnikiem.*

## 1. Dokumenty wymagane dla każdego sklepu (multi-tenant — każda domena potrzebuje własnej wersji)

1. **Regulamin sklepu internetowego**
2. **Polityka Prywatności** (RODO)
3. **Polityka Cookies**
4. **Informacja o prawie odstąpienia od umowy** (formularz zwrotu — 14 dni, konsument w UE)
5. **Zasady reklamacji**

## 2. Kluczowe klauzule — Regulamin

- Dane sprzedawcy: do pierwszego klienta — **osoba fizyczna w działalności nierejestrowanej** (imię, nazwisko, adres do korespondencji, e-mail, telefon; bez NIP firmy); po rejestracji JDG — firma z CEIDG, adres, NIP. ⚠️ Adres do doręczeń — rozważyć skrytkę/wirtualne biuro zamiast adresu domowego.
- Sposób składania i realizacji zamówień, moment zawarcia umowy.
- Ceny — informacja, że są cenami brutto (z VAT) lub netto + VAT, w zależności od statusu VAT operatora.
- Metody i koszty dostawy — zgodne z aktualnym modelem logistyki danego produktu.
- Metody płatności (Stripe/BLIK).
- **Prawo odstąpienia od umowy w ciągu 14 dni** bez podania przyczyny (obowiązkowe dla B2C w UE) — kto pokrywa koszt odesłania.
- Procedura reklamacji i czas odpowiedzi: **14 dni na odpowiedź — brak odpowiedzi w terminie oznacza uznanie reklamacji** (art. 43d ustawy o prawach konsumenta).
- Zasady pozasądowego rozstrzygania sporów: rzecznicy konsumentów, Inspekcja Handlowa (WIIH). **Nie odsyłać do platformy ODR** — unijna platforma ODR została zamknięta 20.07.2025 (rozporządzenie (UE) 2024/3228), a obowiązek linku zniknął.
- **Dyrektywa Omnibus:** przy każdej obniżce ceny pokazujemy **najniższą cenę z 30 dni przed obniżką**; informacja, czy i jak weryfikujemy opinie klientów.
- **Przycisk / funkcja „odstąp od umowy”** dostępna online przez cały okres na odstąpienie — wymóg dyrektywy (UE) 2023/2673, stosowany od **19.06.2026**. ⚠️ Sprawdzić stan wdrożenia w polskiej ustawie; technicznie: formularz w storefroncie → wniosek o zwrot w Medusie.
- **GPSR (rozporządzenie (UE) 2023/988):** na karcie produktu dane producenta i **podmiotu odpowiedzialnego w UE**, identyfikator produktu, ostrzeżenia i informacje o bezpieczeństwie w języku polskim. Przy dropshippingu spoza UE — ustalić, kto jest tym podmiotem (często sprzedawca). ⚠️

## 2a. Inne obowiązki sprzedawcy

- **BDO:** wprowadzanie produktów w opakowaniach na rynek PL → wpis do rejestru BDO i sprawozdawczość opakowaniowa. ⚠️ Zakres przy dropshippingu spoza UE — do potwierdzenia.
- **Dane z Brand Booka** (stopka, koszt dostawy, czas dostawy) — patrz `00_STRATEGIA/Brand_Book_i_Identyfikacja/Brand_Book_Globalny.md`.

## 3. Kluczowe elementy — Polityka Prywatności (RODO)

- Administrator danych (podmiot operujący sklepem).
- Cel i podstawa prawna przetwarzania danych (realizacja zamówienia, marketing za zgodą).
- Odbiorcy danych — **istotne w architekturze multi-tenant:** wskazać, że dane mogą być przetwarzane przez wspólną infrastrukturę techniczną (Supabase, agentów AI) obsługującą wiele marek operatora.
- Czas przechowywania danych.
- Prawa osoby, której dane dotyczą (dostęp, sprostowanie, usunięcie, przenoszenie).
- Informacja o przekazywaniu danych poza EOG (modele AI z USA, Langfuse, Sentry, Stripe) — podstawa: EU-US Data Privacy Framework lub standardowe klauzule umowne; lista podmiotów przetwarzających.
- **Umowy powierzenia (DPA)** ze wszystkimi dostawcami przetwarzającymi dane klientów (Supabase, Stripe, Vercel, dostawcy AI, Langfuse, dostawca dropshipping).
- Czat z Agentem Wsparcia: informacja, że rozmowa jest prowadzona przez AI (obowiązek przejrzystości z AI Act, art. 50 — stosowany od 2.08.2026). ⚠️

## 4. Cookies

- Rozróżnienie cookies niezbędnych (działanie sklepu, koszyk) od analitycznych/marketingowych (Meta Pixel, TikTok Pixel) — te drugie wymagają zgody (banner cookie) przed załadowaniem.

## 5. Do zrobienia przed uruchomieniem pierwszego sklepu

- [ ] Wersja szablonowa regulaminu zweryfikowana przez prawnika (jednorazowy koszt, potem reużywalna dla każdego nowego produktu ze zmianą tylko nazwy/adresu)
- [ ] Konfiguracja banera cookie z podziałem na kategorie zgody
- [ ] Rejestr czynności przetwarzania + umowy powierzenia (DPA) z dostawcami (nie ma „rejestracji administratora danych” w urzędzie — obowiązek to dokumentacja i klauzule informacyjne)
- [ ] Mechanizm Omnibus (najniższa cena z 30 dni) w storefroncie
- [ ] Funkcja „odstąp od umowy” online
- [ ] Dane GPSR na karcie produktu

## 6. Pytania do prawnika

- [ ] Czy jeden wzorzec regulaminu może obsługiwać wiele domen/marek jednego operatora (i jak oznaczać operatora przy „niewidocznej” meta-marce)
- [ ] Kto jest podmiotem odpowiedzialnym GPSR i importerem przy dropshippingu z Chin
- [ ] Koszt i procedura zwrotu towaru wysłanego z Chin (kto płaci odesłanie, adres zwrotów w PL)
- [ ] Stan wdrożenia przycisku odstąpienia od umowy w polskim prawie
- [ ] Twierdzenia o produktach zdrowotnych/ergonomicznych — granica między opisem a zakazanym „leczniczym” claimem
