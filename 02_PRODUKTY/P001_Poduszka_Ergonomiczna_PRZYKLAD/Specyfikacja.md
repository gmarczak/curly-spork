# Specyfikacja Produktu — P001 (PRZYKŁAD DEMONSTRACYJNY)

*Dane fikcyjne/ilustracyjne — patrz `_UWAGA_DEMO.md`. Wypełnione zgodnie z `02_PRODUKTY/_SZABLON_PRODUKTU/Specyfikacja.md` (wszystkie pola).*

## 1. Identyfikacja

| Pole | Wartość |
|---|---|
| ID produktu | P001 (DEMO) |
| Nazwa robocza | Poduszka Ergonomiczna "NeckEase" (fikcyjna nazwa) |
| Kategoria | Komfort / praca biurowa (akcesoria ergonomiczne — nie wyrób medyczny) |
| Data utworzenia karty | 2026-09-16 |
| Status | w teście *(wartość przykładowa — to DEMO)* |

## 2. Produkt

| Pole | Wartość |
|---|---|
| Opis produktu (1–2 zdania) | Ergonomiczna poduszka podpierająca kark, która poprawia komfort podczas wielogodzinnej pracy siedzącej |
| Problem, który rozwiązuje | Dyskomfort i zmęczenie karku przy pracy przy biurku 8h/dzień |
| Cena sprzedaży (PLN) | 129 zł (brutto; w DEMO zakładamy zwolnienie z VAT) |
| Koszt zakupu (COGS) | 28 zł (dropship Chiny, przykładowa cena) |
| Marża brutto (%) | **M = 77 zł (60% ceny)** — wyliczenie poniżej |

**Wyliczenie M (marża jednostkowa przed reklamą, definicja: `00_STRATEGIA/Proces_Wyboru_Produktu.md`, sekcja 4):**

| Pozycja | Kwota |
|---|---|
| Cena | 129,00 zł |
| − COGS | −28,00 zł |
| − Dostawa do klienta (z karty dostawcy) | −15,00 zł |
| − Prowizja płatności (~1,5% + 0,40 zł) | −2,34 zł |
| − Rezerwa na zwroty (5% ceny) | −6,45 zł |
| **= M** | **77,21 zł ≈ 77 zł** |

Kontrola checklisty: COGS + dostawa = 43 zł = 33% ceny → mieści się w progu 30–35%.

**Ograniczenia komunikacji:** opisujemy komfort i wygodę, **nie** „redukcję bólu”, „leczenie” ani efekty zdrowotne (Brand Book, sekcja 2). Ton marki: spokojny/ekspercki (Brand Book, sekcja 3 — produkt z pogranicza zdrowia).

## 3. Grupa docelowa i rynek

| Pole | Wartość |
|---|---|
| Grupa docelowa (demografia, potrzeba) | Pracownicy biurowi 28–50 lat, praca zdalna/hybrydowa, szukają wygody przy biurku |
| Rynek startowy (kraj/kraje) | Polska |
| Języki storefrontu | PL |

## 4. Dostawca i logistyka

| Pole | Wartość |
|---|---|
| Model logistyki (dropship Chiny / dropship UE / dostawca PL / 3PL) | Dropship Chiny (faza testowa) → docelowo 3PL PL po walidacji (tabela: `00_STRATEGIA/Business_Plan_i_Koncepcja.md`, sekcja 5.1) |
| Dostawca (nazwa, link) | CJ Dropshipping — `Dostawcy_Fulfillment/Dostawca_CJ_Dropshipping.md` |
| Czas dostawy do klienta | 10–14 dni (faza testowa) |

## 5. Ocena wg checklisty wyboru (patrz `00_STRATEGIA/Proces_Wyboru_Produktu.md`)

| Kryterium | Waga | Ocena 1–5 | Punkty |
|---|---|---|---|
| Cena sweet-spot | ×2 | 4 | 8 |
| Marża potencjalna | ×2 | 5 | 10 |
| Wow factor / demonstrowalność | ×2 | 3 | 6 |
| Dostępność dostawcy | ×2 | 5 | 10 |
| Nasycenie rynku | ×1 | 2 (kategoria dość wysycona) | 2 |
| Sezonowość | ×1 | 4 (całoroczna) | 4 |
| Ryzyko zwrotów | ×1 | 4 | 4 |
| Zgodność regulacyjna PL | ×2 | 5 | 10 |
| **SUMA** | | | **54 / 65** (próg shortlisty: 45) |

Kryteria eliminujące: brak (nie wyrób medyczny, sprzedaż bez twierdzeń zdrowotnych).

## 6. Wynik testu reklamowego (dane fikcyjne)

| Metryka | Wartość |
|---|---|
| Budżet testowy wydany | 800 zł |
| CTR kreacji | 1,8% |
| Koszt za dodanie do koszyka | 4,20 zł |
| Zamówienia | 19 |
| CPA (koszt na zamówienie) | 42 zł (800 zł / 19) |
| CPA / M | 55% |
| Decyzja go/no-go | **GO** — CPA ≤ 100% M (zysk ~35 zł na zamówieniu przed kosztami stałymi) |

## 7. Domena i branding

| Pole | Wartość |
|---|---|
| Domena | neckease-przyklad.pl (fikcyjna) |
| Marka / ton głosu | NeckEase — spokojny, ekspercki, rzeczowy |
| Link do assetów graficznych | `Assety_Graficzne/README_Checklista_Grafik.md` |
| Link do promptów agentów | `Prompty_dla_Agentow/Prompty_Systemowe.md` |
