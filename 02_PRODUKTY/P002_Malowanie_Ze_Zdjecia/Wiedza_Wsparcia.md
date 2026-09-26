# Baza wiedzy Agenta Wsparcia — Z Kadru — zadanie 5

*Wygenerowano 2026-09-26 wg `Prompty_dla_Agentow/Prompty_Systemowe.md`, sekcja 2. Status: **szkic do akceptacji**. Ten plik to pole `knowledge` grafu `04_KOD_I_INFRASTRUKTURA/ai-agents-langgraph/src/fabryka_agents/graphs/support.py`. Pola `[DO UZUPEŁNIENIA]` muszą być wypełnione przed startem — agent nie może ich zgadywać.*

## A. Fakty o produkcie (wstrzykiwane do kontekstu)

- Marka: Z Kadru, sklep zkadru.pl.
- Produkt: zestaw do malowania po numerach ze zdjęcia klienta. Płótno 40×50 cm z nadrukowanym szablonem, na drewnianej ramie. Farby akrylowe na bazie wody, ponumerowane. 3 pędzle. Wydruk podglądu. Instrukcja po polsku.
- Liczba kolorów: [DO UZUPEŁNIENIA].
- Cena: 159 zł. Dostawa darmowa. Płatność: karta lub BLIK.
- Kolejność: zamówienie ze zdjęciem → podgląd e-mailem → akceptacja klienta → produkcja → wysyłka.
- Produkcja: [DO UZUPEŁNIENIA] dni od akceptacji podglądu. Dostawa: [DO UZUPEŁNIENIA] dni.
- Ostatni dzień zamówień z dostawą przed Wigilią: [DO UZUPEŁNIENIA].
- Zwroty: [DO UZUPEŁNIENIA po prawniku ⚠️]. Uszkodzenie w transporcie: zgłoszenie ze zdjęciem w ciągu [DO UZUPEŁNIENIA] dni → wymiana.
- Zdjęcie klienta: [DO UZUPEŁNIENIA po prawniku ⚠️: kto przetwarza, gdzie, kiedy usuwamy].
- Wiek: dla osób od 14 lat.
- Kontakt: [DO UZUPEŁNIENIA: e-mail]. Odpowiadamy w ciągu [DO UZUPEŁNIENIA] godzin.

## B. 15 odpowiedzi FAQ (max 3 zdania)

| # | Pytanie klienta | Odpowiedź agenta |
|---|---|---|
| 1 | Ile trwa realizacja? | Produkcja trwa [X] dni od akceptacji podglądu, a dostawa [Y] dni. Łącznie ok. [X+Y] dni. Numer przesyłki wyślemy e-mailem. |
| 2 | Zdążę przed świętami? | Zamówienia złożone i zaakceptowane do [data] powinny dotrzeć przed Wigilią. Im szybciej zaakceptujesz podgląd, tym lepiej. Nie mogę zagwarantować terminu przewoźnika. |
| 3 | Kiedy dostanę podgląd? | Podgląd wysyłamy e-mailem w ciągu [DO UZUPEŁNIENIA] dni od zamówienia. Sprawdź też folder spam. |
| 4 | Czy mogę zmienić zdjęcie? | Tak — do momentu akceptacji podglądu. Odpisz na e-mail z podglądem i dołącz nowe zdjęcie. |
| 5 | Jakie zdjęcie się nada? | Ostre, dobrze oświetlone, z głównym motywem dużym w kadrze. Najlepiej 1–3 osoby lub zwierzęta. Jeśli zdjęcie się nie nada, napiszemy przed produkcją. |
| 6 | Nie umiem malować. Dam radę? | Tak. Każde pole ma numer, każda farba też — nie trzeba mieszać kolorów ani rysować. |
| 7 | Ile czasu zajmuje malowanie? | To zależy od zdjęcia i tempa. Zwykle kilka wieczorów. Nie trzeba kończyć za jednym razem. |
| 8 | Zabrakło mi farby. | Przykro mi. Podaj numer zamówienia i numer farby, a sprawdzę możliwość dosłania. |
| 9 | Gdzie jest moja paczka? | Podaj numer zamówienia, sprawdzę status. Numer śledzenia wysłaliśmy e-mailem po nadaniu paczki. |
| 10 | Rama/płótno przyszło uszkodzone. | Przykro mi. Prześlij zdjęcie uszkodzenia i opakowania z numerem zamówienia. Po sprawdzeniu zaproponujemy wymianę. |
| 11 | Chcę zwrócić zestaw. | [DO UZUPEŁNIENIA po prawniku ⚠️]. Przyjmę Twój wniosek i przekażę go do rozpatrzenia. |
| 12 | Co z moim zdjęciem? | [DO UZUPEŁNIENIA po prawniku ⚠️]. Jeśli chcesz, żebyśmy usunęli zdjęcie wcześniej, napisz — przekażę prośbę. |
| 13 | Czy farby są bezpieczne? | To farby akrylowe na bazie wody. [DO UZUPEŁNIENIA: z karty charakterystyki.] Zestaw jest dla osób od 14 lat. |
| 14 | Czy mogę kupić 2 zestawy / większy rozmiar? | Teraz mamy jeden rozmiar: 40×50 cm na ramie. Możesz złożyć dwa zamówienia z różnymi zdjęciami. |
| 15 | Czy dostanę fakturę? | [DO UZUPEŁNIENIA ⚠️: działalność nierejestrowana wystawia rachunek na żądanie — potwierdzić z księgową.] |

## C. Makra (gotowe wiadomości)

**M1 — słabe zdjęcie (wysyła Agent Fulfillmentu przez Wsparcie):**
> Dzień dobry, dziękujemy za zamówienie [nr]. Przesłane zdjęcie jest [nieostre / za ciemne / motyw jest za mały], więc obraz nie wyjdzie dobrze. Prosimy o inne zdjęcie: ostre, w dziennym świetle, z głównym motywem dużym w kadrze. Wystarczy odpisać na tę wiadomość.

**M2 — podgląd do akceptacji:**
> Dzień dobry, oto podgląd Twojego obrazu do zamówienia [nr]. Jeśli wszystko pasuje, odpisz „Akceptuję” — ruszamy z produkcją. Chcesz coś zmienić? Odpisz z nowym zdjęciem.

**M3 — przypomnienie o akceptacji (po 48 h):**
> Dzień dobry, czekamy na akceptację podglądu do zamówienia [nr]. Produkcja rusza dopiero po Twojej odpowiedzi. [Jeśli przed świętami: Żeby zdążyć przed Wigilią, prosimy o odpowiedź do [data].]

**M4 — wysłano:**
> Twój zestaw Z Kadru jest w drodze. Numer przesyłki: [nr], śledzenie: [link]. Szacowana dostawa: [data].

**M5 — uszkodzenie w transporcie:**
> Przykro nam. Prosimy o zdjęcie uszkodzenia i opakowania. Po sprawdzeniu zaproponujemy wymianę — zwykle bez odsyłania uszkodzonego zestawu.

## D. Eskalacja do człowieka

Zgodnie z `05_OPERACJE_I_ARCHIWUM/Procedury_SOP/SOP_Obsluga_Zwrotow_i_Reklamacji.md` oraz:
- klient niezadowolony po 2 wymianach,
- zwrot lub rekompensata > 100 zł,
- zagrożenie prawne/publiczne, bezpieczeństwo lub zdrowie,
- **żądanie usunięcia danych lub zdjęcia (RODO)** — patrz uwaga niżej,
- brak doręczenia w terminie + 5 dni,
- każda reklamacja: zapisać datę wpływu (14 dni ustawowo na odpowiedź).

**Kod:** `escalation_reason()` w `support.py` eskaluje żądania RODO (słowa: RODO, dane osobowe, usuń/usunąć, wymaż) — test `test_privacy_requests_escalate`.

## E. Zakazy

- Bez obietnic zdrowotnych („odstresowuje”, „terapia”).
- Bez obietnic terminów spoza sekcji A.
- Agent nie zatwierdza zwrotów pieniędzy — tylko przyjmuje wniosek.
- Nie przesyła zdjęć klientów poza procesem zamówienia; nie rozmawia o cudzych zamówieniach.
- Przedstawia się jako asystent AI.
