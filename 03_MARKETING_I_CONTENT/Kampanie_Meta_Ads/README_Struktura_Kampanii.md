# Struktura Kampanii — Meta Ads

## Konwencja nazewnictwa

`[ID_produktu]_[faza: TEST/SCALE]_[data_start]` np. `P002_TEST_2026-10-01`

## Struktura konta (rekomendowana)

- Jedna kampania per produkt per faza (TEST / SCALE) — nie miksować faz w jednej kampanii, bo utrudnia czytanie CPA.
- Faza TEST: budżet zgodny z `01_FINANSE_I_PRAWO/Koszty_Infrastruktura/Budzet_Startowy_i_Prognoza.md` (500-1500 zł), CBO (Campaign Budget Optimization) wyłączone lub ograniczone do 2-3 zestawów reklam, żeby dane były czytelne.
- Faza SCALE: CBO włączone, budżet skalowany wg reguły ROAS z polityki budżetowej.

## Pliki do przechowywania per kampania

- Zrzut wyników końcowych testu (eksport CSV) — nazwa: `[ID_produktu]_wyniki_[data].csv`
- Link do brief kreacji użytej: patrz `03_MARKETING_I_CONTENT/Szablony_Reklam/`

## Piksel i zdarzenia

Meta Pixel wspólny na poziomie kodu frontendu (Next.js), ale zdarzenia konwersji śledzone per domena/produkt — kluczowe dla poprawnego przypisania w architekturze multi-tenant.
