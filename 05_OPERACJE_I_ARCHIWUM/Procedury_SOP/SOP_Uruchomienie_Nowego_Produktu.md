# SOP: Uruchomienie Nowego Produktu

*Krok po kroku, od wybranego kandydata do żywej kampanii testowej.*

## Warunek wejścia
Kandydat przeszedł ocenę w `00_STRATEGIA/Proces_Wyboru_Produktu.md` (checklist punktowa wypełniona, wynik powyżej progu).

## Kroki

1. **Utwórz folder produktu:** skopiuj `02_PRODUKTY/_SZABLON_PRODUKTU` jako `02_PRODUKTY/P00X_Nazwa`.
2. **Wypełnij `Specyfikacja.md`** dla tego produktu.
3. **Znajdź i zweryfikuj dostawcę:** wypełnij `Dostawcy_Fulfillment/Szablon_Karty_Dostawcy.md`. Domyślny model startowy: dropshipping (patrz tabela w decyzji logistycznej, `00_STRATEGIA/Business_Plan_i_Koncepcja.md` sekcja 5).
4. **Skonkretyzuj prompty agentów:** wypełnij `Prompty_dla_Agentow/Szablon_Promptow_Systemowych.md` na bazie Specyfikacji.
5. **Uruchom Agenta Onboardingu/Brandingu:** wygenerowanie nazwy marki, landing page, assetów graficznych (checklist w `Assety_Graficzne/README_Checklista_Grafik.md`).
6. **Rejestracja domeny** i konfiguracja w `storefront-nextjs` (routing wielodomenowy).
7. **Konfiguracja produktu w `medusa-backend`:** cena, opis, integracja z dostawcą.
8. **Przygotuj brief kreacji:** `03_MARKETING_I_CONTENT/Szablony_Reklam/Szablon_Briefu_Kreacji.md`.
9. **Uruchom kampanię testową** (Meta i/lub TikTok) z budżetem zgodnym z polityką testową (`01_FINANSE_I_PRAWO/Koszty_Infrastruktura/Budzet_Startowy_i_Prognoza.md`).
10. **Monitoruj KPI** codziennie w `Analityka_Wyniki/Szablon_KPI_Produktu.md`.
11. **Po 3-5 dniach:** decyzja go/no-go wg kryteriów z `Proces_Wyboru_Produktu.md`.

## Warunek wyjścia
Produkt oznaczony jako "w teście" ze zdefiniowanym budżetem i aktywną kampanią, lub przejście do SOP wygaszania jeśli test negatywny od razu.
