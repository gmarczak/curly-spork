# Procedura zamówienia ze zdjęciem — P002 Z Kadru — zadanie 6

*Wygenerowano 2026-09-26 wg `../Prompty_dla_Agentow/Prompty_Systemowe.md`, sekcja 4. Status: **szkic do akceptacji** — do zatwierdzenia po odpowiedzi dostawcy i prawnika ⚠️.*

## 1. Przepływ

| Krok | Kto | Co | Czas / limit | Gdy coś nie tak |
|---|---|---|---|---|
| 1 | Klient | Płaci i przesyła zdjęcie na zkadru.pl | — | — |
| 2 | Agent Fulfillmentu | Kontrola zdjęcia: min. [DO UZUPEŁNIENIA, np. 1500 px] krótszy bok, ostrość, motyw ≥ 1/3 kadru | do 12 h | słabe → makro M1 (Wsparcie), czekamy na nowe |
| 3 | Agent Fulfillmentu | Przekazuje dostawcy [DO UZUPEŁNIENIA po prawniku: zdjęcie ALBO nasz szablon] + wariant 40×50, rama, [liczba] kolorów | do 24 h od kroku 2 | błąd dostawcy 2× → eskalacja (jak dziś w kodzie) |
| 4 | Dostawca | Przysyła podgląd szablonu | [DO UZUPEŁNIENIA] | brak 48 h → eskalacja |
| 5 | Agent Fulfillmentu | Kontrola podglądu (czy twarze/zwierzę czytelne) i wysyłka klientowi — makro M2 | do 12 h | wyraźnie zły → eskalacja przed wysyłką |
| 6 | Klient | Akceptuje lub zmienia zdjęcie | 48 h → makro M3; 5 dni → eskalacja | zmiana → wracamy do kroku 2 |
| 7 | Agent Fulfillmentu | Potwierdza produkcję u dostawcy, zapisuje nr referencyjny w Medusie | do 12 h | — |
| 8 | Agent Fulfillmentu | Monitoruje wysyłkę, wysyła nr śledzenia — makro M4 | codziennie | status bez zmian > 5 dni → eskalacja |
| 9 | Agent Fulfillmentu | Usuwa zdjęcie z naszych systemów i prosi dostawcę o usunięcie | [DO UZUPEŁNIENIA po prawniku] dni po doręczeniu | brak potwierdzenia dostawcy → notatka dla właściciela |

**Termin świąteczny:** zamówienia bez akceptacji podglądu na [DO UZUPEŁNIENIA: data − czas produkcji − dostawa] dostają makro M3 z datą. Nie obiecujemy dostawy przed Wigilią po tej dacie.

## 2. Eskalacje do właściciela

- Błąd dostawcy 2× z rzędu (już w kodzie).
- Dostawca nie odpowiada 48 h.
- Podgląd złej jakości.
- Brak akceptacji klienta w 5 dni.
- Przesyłka stoi > 5 dni.
- Koszt u dostawcy > [DO UZUPEŁNIENIA: COGS z wyceny] zł.

## 3. Dane osobowe (RODO) ⚠️ do weryfikacji z prawnikiem

- Zdjęcie przechowywane tylko w storage sklepu (Medusa), nie w repo i nie w logach agentów.
- Do dostawcy trafia tylko to, co zatwierdzi prawnik (zdjęcie lub anonimowy szablon).
- Po kroku 9 zdjęcie usunięte; w zamówieniu zostaje tylko informacja „zdjęcie usunięte [data]”.
- Żądanie usunięcia od klienta → eskalacja do właściciela (patrz `../Wiedza_Wsparcia.md`, sekcja D).

## 4. Różnice względem obecnego kodu

Obecny graf `04_KOD_I_INFRASTRUKTURA/ai-agents-langgraph/src/fabryka_agents/graphs/fulfillment.py` robi tylko: złóż zamówienie u dostawcy → zapisz numer (z eskalacją po 2 błędach). Dla P002 brakuje:

1. Kroku kontroli zdjęcia (2).
2. Pętli podglądu: odbiór od dostawcy → wysyłka klientowi → oczekiwanie na akceptację z przypomnieniem 48 h i eskalacją 5 dni (4–6).
3. Osobnego potwierdzenia produkcji po akceptacji (7).
4. Monitoringu wysyłki i usuwania zdjęcia (8–9).
5. Implementacji `Supplier` dla wybranego dostawcy (dziś tylko interfejs w `clients/supplier.py`).

Kolejność prac: po wyborze dostawcy (API CJ vs ręcznie przez AliExpress). Przy ręcznej obsłudze na teście (szacunek: ~10–20 zamówień) kroki 3–7 może robić właściciel według tej tabeli.
