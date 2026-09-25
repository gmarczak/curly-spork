# Forma Prawna i Rejestracja

*Aktualizacja 2026-09-25: **biznes jednoosobowy** — jeden właściciel + agenci AI. Warianty dla wspólników (spółka cywilna, umowa wspólników) usunięte. **Firmy nie rejestrujemy przed pierwszym klientem** — start jako działalność nierejestrowana. To nie jest porada prawna — punkty ⚠️ potwierdzić z księgową/prawnikiem.*

## 1. Kontekst

Jeden właściciel, brak zarejestrowanej działalności na dzień 2026-09-25, faza: przed wyborem pierwszego produktu. Pracę operacyjną wykonują agenci AI; właściciel podejmuje decyzje i zatwierdza akcje (kolejka akceptacji w panelu `04_KOD_I_INFRASTRUKTURA/panel-biuro/`).

## 2. Porównanie form prawnych (1 osoba)

| Forma | Odpowiedzialność za długi | Koszt/złożoność | Podatki i ZUS | Ocena dla tego projektu |
|---|---|---|---|---|
| **Działalność nierejestrowana** | całym majątkiem osobistym | zerowa — bez CEIDG, bez ZUS; tylko uproszczona ewidencja sprzedaży | PIT na skali w zeznaniu rocznym; **limit przychodu: 225% minimalnego wynagrodzenia na kwartał** (2026: ok. 10 800 zł/kwartał ⚠️); VAT jak niżej | **rekomendowana do pierwszego klienta / pierwszej decyzji GO** |
| **JDG (jednoosobowa działalność gospodarcza)** | całym majątkiem osobistym | najniższa — CEIDG online, bezpłatnie; KPiR lub ryczałt | PIT: skala / liniowy 19% / ryczałt; ulga na start i preferencyjny ZUS | **po pierwszych klientach** — przed przekroczeniem limitu działalności nierejestrowanej |
| **Jednoosobowa sp. z o.o.** | ograniczona do majątku spółki | wyższa — KRS (S24), pełna księgowość, sprawozdania | CIT 9%/19% + PIT 19% od dywidendy (lub estoński CIT). **Jedyny wspólnik płaci ZUS jak przedsiębiorca, bez ulgi na start** ⚠️ | **rekomendowana po walidacji** — gdy rośnie obrót i ryzyko (reklamacje, RODO, umowy B2B) |
| Spółka cywilna / jawna | — | — | — | **niemożliwa** — wymaga min. 2 wspólników |

## 3. Rekomendowana ścieżka

1. **Faza 0 (teraz → pierwszy klient):** **działalność nierejestrowana** — zero formalności i kosztów stałych (bez ZUS, bez biura rachunkowego). Wystarcza na testy reklamowe i pierwsze sprzedaże.
   * **Limit liczy się od przychodu (sprzedaży), nie od zysku.** Przy kampaniach łatwo go przekroczyć: przy cenie 139 zł to ok. 77 zamówień na kwartał. ⚠️
   * Po przekroczeniu limitu: wpis do CEIDG w ciągu **7 dni** od dnia przekroczenia.
   * Obowiązki bez zmian: prawa konsumenta (odstąpienie, reklamacje), regulamin, RODO, rachunek na żądanie klienta, **uproszczona ewidencja sprzedaży** (dzień po dniu).
   * VAT: zwolnienie podmiotowe działa, ale import usług reklamowych (Meta/TikTok) nadal wymaga rejestracji VAT-UE ⚠️ — potwierdzić z księgową przed pierwszą kampanią.
   * Stripe i dostawcy: sprawdzić, czy przyjmują osobę fizyczną bez NIP firmy (Stripe: typ konta „individual”) ⚠️.
2. **Faza 0,5 (po pierwszym kliencie / decyzji GO, najpóźniej przed limitem):** **JDG** — ulga na start (6 mc bez składek społecznych). Nie czekać do przekroczenia limitu przy produkcie w skalowaniu.
3. **Faza 1 (po walidacji — realna sprzedaż, kilka produktów; orientacyjnie 6.–12. miesiąc, patrz `00_STRATEGIA/Business_Plan_i_Koncepcja.md`):** jednoosobowa sp. z o.o. — ochrona majątku prywatnego.
   * **Dwie ścieżki do porównania z księgową:** (a) **przekształcenie JDG w sp. z o.o.** (art. 551 § 5 KSH) — ciągłość umów, NIP i zezwoleń, ale **bez CIT 9% w roku przekształcenia i w roku następnym** (art. 19 ust. 1a ustawy o CIT); (b) **nowa sp. z o.o.** i przeniesienie działalności (marki, domeny, umowy) — CIT 9% od startu, ale więcej pracy przy przenoszeniu umów. ⚠️
   * Przed decyzją policzyć ZUS jedynego wspólnika — w wielu przypadkach wyższy niż preferencyjny ZUS w JDG. ⚠️

## 4. Checklist

**Teraz (działalność nierejestrowana):**

- [ ] Arkusz uproszczonej ewidencji sprzedaży (data, kwota, nr zamówienia) — prowadzony dzień po dniu
- [ ] Monitoring przychodu kwartalnego vs limit (alarm przy 70% limitu)
- [ ] Konsultacja z księgową: VAT-UE przy reklamach, kody PKWiU produktów
- [ ] Konto Stripe jako osoba fizyczna (weryfikacja dostępności)
- [ ] Regulamin z danymi sprzedawcy jako osoby fizycznej (imię, nazwisko, adres do korespondencji, e-mail)

**Po pierwszym kliencie (JDG):**

- [ ] Wpis do CEIDG (online, bezpłatnie) — kod PKD: 47.91.Z (sprzedaż detaliczna przez internet) ⚠️ potwierdzić przy rejestracji
- [ ] Wybór formy opodatkowania (skala / liniowy / ryczałt) — konsultacja z księgową
- [ ] Zgłoszenie do ZUS: ulga na start (tylko składka zdrowotna)
- [ ] Konto firmowe
- [ ] Rejestracja VAT-R (co najmniej VAT-UE — przed pierwszą fakturą za reklamy Meta/TikTok, patrz `01_FINANSE_I_PRAWO/Podatki_i_Ksiegowosc/Zasady_Ksiegowe_i_VAT.md`)
- [ ] Nazwa firmy w CEIDG = meta-marka operatora (musi zawierać imię i nazwisko), marki produktowe osobno — patrz `00_STRATEGIA/Brand_Book_i_Identyfikacja/Brand_Book_Globalny.md`

## 5. Ryzyka biznesu jednoosobowego (do zabezpieczenia)

- **Odpowiedzialność całym majątkiem w JDG** — ograniczyć przez szybkie wygaszanie nierentownych produktów, twarde limity budżetu reklam i kosztów AI; rozważyć ubezpieczenie OC działalności ⚠️.
- **Jedna osoba = jeden punkt awarii** — dostęp awaryjny (menedżer haseł z kontem awaryjnym zaufanej osoby), spisane SOP-y, agenci działający bez stałego nadzoru, ale z kolejką akceptacji.
- **Terminy ustawowe** (14 dni na reklamację) muszą działać, gdy właściciel jest niedostępny — przypomnienia w panelu i zastępstwo.

---

## 6. Dofinansowania i estoński CIT

Pełna analiza: `01_FINANSE_I_PRAWO/Koszty_Infrastruktura/Dofinansowania_Dotacje_i_Sprzet_na_Firme.md`. Kluczowe punkty:

- **Ulga na start / preferencyjny ZUS** — tylko JDG, nie sp. z o.o. — wzmacnia rekomendację startu jako JDG.
- **Estoński CIT** przy sp. z o.o. wymaga zatrudnienia min. 3 osób niebędących udziałowcami — przy modelu „1 osoba + AI” zwykle nieosiągalne na starcie.
- **Platformy Startowe (do 600 000 zł)** wymagają sp. z o.o. i siedziby w Polsce Wschodniej — jeśli to Twój region, argument za wcześniejszą sp. z o.o.
