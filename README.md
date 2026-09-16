# JaGrzep — Fabryka E-commerce AI (Multi-Tenant)

*Mapa dokumentacji. Ostatnia pełna aktualizacja: 2026-09-16.*

## Status projektu w skrócie

Faza: **przed wyborem pierwszego produktu.** Architektura techniczna i dokumentacja operacyjna są przygotowane; brakuje decyzji o konkretnej niszy produktowej (patrz `00_STRATEGIA/Proces_Wyboru_Produktu.md` — to jest następny krok).

## Struktura folderów

| Folder | Zawartość |
|---|---|
| `00_STRATEGIA/` | Business plan (model fabryki), proces wyboru produktu, brand book globalny, architektura systemu i stack techniczny |
| `01_FINANSE_I_PRAWO/` | Forma prawna, regulaminy, VAT/księgowość, budżet i polityka wydatków reklamowych, szablon raportu miesięcznego |
| `02_PRODUKTY/` | Szablon karty produktu (`_SZABLON_PRODUKTU/`) + folder per uruchomiony produkt (`P00X_Nazwa/`) |
| `03_MARKETING_I_CONTENT/` | Szablony briefów kreacji, strategia SEO, struktura kampanii Meta/TikTok |
| `04_KOD_I_INFRASTRUKTURA/` | Repozytoria kodu: medusa-backend, storefront-nextjs, ai-agents-langgraph, backupy env |
| `05_OPERACJE_I_ARCHIWUM/` | SOP (uruchomienie/zwroty/wygaszanie produktu), zgłoszenia błędów, archiwum nieaktywnych produktów |

## Kluczowe dokumenty — od czego zacząć

1. **Następny krok decyzyjny:** `00_STRATEGIA/Proces_Wyboru_Produktu.md` — wybór pierwszego kandydata produktowego.
2. **Kontekst biznesowy:** `00_STRATEGIA/Business_Plan_i_Koncepcja.md`
3. **Architektura techniczna:** `00_STRATEGIA/Architektura_Systemu/Infrastruktura.md`
4. **Forma prawna:** `01_FINANSE_I_PRAWO/Rejestracja_i_Umowy/Forma_Prawna_i_Rejestracja.md`
5. **Jak uruchomić nowy produkt:** `05_OPERACJE_I_ARCHIWUM/Procedury_SOP/SOP_Uruchomienie_Nowego_Produktu.md`
6. **Wzór wypełnionego produktu (DEMO):** `02_PRODUKTY/P001_Poduszka_Ergonomiczna_PRZYKLAD/`

## Otwarte decyzje wymagające działania właścicieli

- [ ] Wybór pierwszego produktu/niszy
- [ ] Podpisanie umowy wspólników i rejestracja formy prawnej (rekomendacja: spółka cywilna → sp. z o.o. po walidacji)
- [ ] Założenie kont/kluczy API (Stripe, dostawcy modeli AI) — na bieżąco przy pierwszym produkcie
