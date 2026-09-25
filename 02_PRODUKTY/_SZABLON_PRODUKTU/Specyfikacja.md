# Specyfikacja Produktu — SZABLON

*Skopiuj cały folder `_SZABLON_PRODUKTU` jako `P00X_Nazwa_Produktu` i wypełnij poniższe pola dla konkretnego kandydata.*

## 1. Identyfikacja

| Pole | Wartość |
|---|---|
| ID produktu | P00X |
| Nazwa robocza | |
| Kategoria | |
| Data utworzenia karty | |
| Status | kandydat / w teście / skalowany / wygaszony |

## 2. Produkt

| Pole | Wartość |
|---|---|
| Opis produktu (1–2 zdania) | |
| Problem, który rozwiązuje | |
| Cena sprzedaży (PLN) | |
| Koszt zakupu (COGS) | |
| M — marża jednostkowa przed reklamą (zł i %) | *(definicja: `00_STRATEGIA/Proces_Wyboru_Produktu.md`, sekcja 4)* |

## 3. Grupa docelowa i rynek

| Pole | Wartość |
|---|---|
| Grupa docelowa (demografia, potrzeba) | |
| Rynek startowy (kraj/kraje) | |
| Języki storefrontu | |

## 4. Dostawca i logistyka

| Pole | Wartość |
|---|---|
| Model logistyki (dropship Chiny / dropship UE / dostawca PL / 3PL) | |
| Dostawca (nazwa, link) | patrz `Dostawcy_Fulfillment/` |
| Czas dostawy do klienta | |

## 5. Ocena wg checklisty wyboru (patrz `00_STRATEGIA/Proces_Wyboru_Produktu.md`)

| Kryterium | Waga | Ocena 1–5 | Punkty |
|---|---|---|---|
| Cena sweet-spot | ×2 | | |
| Marża potencjalna | ×2 | | |
| Wow factor / demonstrowalność | ×2 | | |
| Dostępność dostawcy | ×2 | | |
| Nasycenie rynku | ×1 | | |
| Sezonowość | ×1 | | |
| Ryzyko zwrotów | ×1 | | |
| Zgodność regulacyjna PL | ×2 | | |
| **SUMA** | | | **/ 65** (próg: 45) |

Kryteria eliminujące (sekcja 1a procesu wyboru): brak / *wypisz*

## 6. Wynik testu reklamowego

| Metryka | Wartość |
|---|---|
| Budżet testowy wydany | |
| CTR kreacji | |
| Koszt za dodanie do koszyka | |
| Zamówienia | |
| CPA (koszt na zamówienie) | |
| CPA / M | |
| Decyzja go/no-go | |

## 7. Domena i branding

| Pole | Wartość |
|---|---|
| Domena | |
| Marka / ton głosu | *(wynik Agenta Onboardingu/Brandingu)* |
| Link do assetów graficznych | `Assety_Graficzne/README_Checklista_Grafik.md` |
| Link do promptów agentów | `Prompty_dla_Agentow/Prompty_Systemowe.md` |
