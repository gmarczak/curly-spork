# Zasady Archiwizacji

## Kiedy przenosić produkt do archiwum

Zgodnie z `05_OPERACJE_I_ARCHIWUM/Procedury_SOP/SOP_Wygaszanie_Nierentownego_Produktu.md`: 30 dni bez nowych zamówień po wygaszeniu kampanii.

## Co przenieść

Cały folder produktu z `02_PRODUKTY/P00X_Nazwa/` → `05_OPERACJE_I_ARCHIWUM/Archiwum_Nieaktywne/P00X_Nazwa/` (bez zmian w strukturze wewnętrznej — zachowujemy historię dla przyszłej analizy).

## Co zrobić technicznie

- [ ] Wyłączyć domenę (DNS/hosting) lub przekierować na stronę informacyjną
- [ ] Wyłączyć produkt w `medusa-backend` (status: nieaktywny, nie usuwać danych zamówień)
- [ ] Zatrzymać wszelkie automatyczne procesy agentów dla tego produktu

## Wartość archiwum

Archiwalne produkty to dane wejściowe do przyszłych decyzji — jaka kategoria/cena/dostawca nie zadziałał i czemu, patrz wnioski w `Analityka_Wyniki/` każdego archiwizowanego produktu.
