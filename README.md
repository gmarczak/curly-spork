# JaGrzep — Fabryka E-commerce AI (Multi-Tenant)

*Mapa dokumentacji. Ostatnia pełna aktualizacja: 2026-09-25.*

## Status projektu w skrócie

**Biznes jednoosobowy z AI.** Faza: **przed wyborem pierwszego produktu; firma rejestrowana dopiero po pierwszym kliencie.** Architektura techniczna i dokumentacja operacyjna są przygotowane (stack zamknięty w `ADR_001` — przyjęty 2026-09-25); brakuje decyzji o konkretnej niszy produktowej. **Następny krok:** sprint wyboru w `00_STRATEGIA/Shortlista_Kandydatow.md`.

Szkielet kodu jest w `04_KOD_I_INFRASTRUKTURA/` (agenci, Medusa, storefront, CI). Sekretów nie trzymamy w repo (root `.gitignore`, zasady w `04_KOD_I_INFRASTRUKTURA/env_backups/README.md`).

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

1. **Następny krok decyzyjny:** `00_STRATEGIA/Shortlista_Kandydatow.md` (sprint 5 dni; prompt do nowego czatu: `00_STRATEGIA/Prompt_Nowy_Czat_Sprint_Wyboru.md`) wg `00_STRATEGIA/Proces_Wyboru_Produktu.md` — tam też **jedyne źródło progów go/no-go** (sekcja 4).
2. **Kontekst biznesowy:** `00_STRATEGIA/Business_Plan_i_Koncepcja.md`
3. **Architektura techniczna:** `00_STRATEGIA/Architektura_Systemu/ADR_001_Stack_Techniczny.md` (decyzje) + `Infrastruktura.md` (tło, koszty)
4. **Forma prawna i podatki:** `01_FINANSE_I_PRAWO/Rejestracja_i_Umowy/Forma_Prawna_i_Rejestracja.md`, `01_FINANSE_I_PRAWO/Podatki_i_Ksiegowosc/Zasady_Ksiegowe_i_VAT.md` (lista pytań do księgowego)
5. **Budżet:** `01_FINANSE_I_PRAWO/Koszty_Infrastruktura/Budzet_Startowy_i_Prognoza.md` — rezerwa na pierwsze 3 miesiące ~3,5–10,1 tys. zł (bez rejestracji firmy do pierwszego klienta)
6. **Jak uruchomić nowy produkt:** `05_OPERACJE_I_ARCHIWUM/Procedury_SOP/SOP_Uruchomienie_Nowego_Produktu.md`
7. **Wzór wypełnionego produktu (DEMO):** `02_PRODUKTY/P001_Poduszka_Ergonomiczna_PRZYKLAD/`

## Otwarte decyzje wymagające działania właścicieli

- [ ] Wybór pierwszego produktu/niszy — `00_STRATEGIA/Shortlista_Kandydatow.md`
- [x] Zatwierdzenie stacku — `00_STRATEGIA/Architektura_Systemu/ADR_001_Stack_Techniczny.md` (2026-09-25)
- [x] Zatwierdzenie liczbowych celów — `00_STRATEGIA/Business_Plan_i_Koncepcja.md`, sekcja 6 (2026-09-25)
- [ ] Konsultacja z biurem rachunkowym (VAT, VAT-UE, KSeF, IOSS) i prawnikiem (regulamin, GPSR) — listy pytań w dokumentach 01_FINANSE_I_PRAWO
- [ ] Forma prawna: działalność nierejestrowana do pierwszego klienta → JDG → jednoosobowa sp. z o.o. po walidacji
- [ ] Założenie kont/kluczy API (Stripe, dostawcy modeli AI) — na bieżąco przy pierwszym produkcie; klucze tylko w menedżerze haseł
