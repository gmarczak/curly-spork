# CLAUDE.md

## Styl odpowiedzi

- Odpowiadaj po polsku.
- Tylko istotne dane. Bez wstępów, podsumowań-powtórek i grzeczności.
- Krótkie, proste zdania. Jedna myśl na zdanie.
- Najpierw wynik lub odpowiedź, potem (jeśli trzeba) uzasadnienie w 1–2 punktach.
- Listy punktowane zamiast akapitów. Tabele tylko gdy porównujesz ≥ 3 pozycje.
- Nie opisuj, co zamierzasz zrobić — zrób i podaj efekt.
- Niepewność zaznaczaj wprost: „do weryfikacji", „szacunek".
- Pytaj tylko, gdy decyzja należy do właściciela i blokuje pracę.

## Kontekst projektu

- **Biznes jednoosobowy z AI:** jeden właściciel decyduje i zatwierdza, agenci AI wykonują pracę operacyjną.
- **Firma dopiero po pierwszym kliencie:** start jako działalność nierejestrowana; JDG po pierwszych sprzedażach lub przed przekroczeniem limitu przychodu.
- Fabryka e-commerce AI: wiele sklepów jednoproduktowych na wspólnym silniku. Mapa dokumentów: `README.md`.
- Repo to na razie dokumentacja (Markdown). Kod: `04_KOD_I_INFRASTRUKTURA/` (jeszcze pusty).
- Stack: `00_STRATEGIA/Architektura_Systemu/ADR_001_Stack_Techniczny.md`.
- Progi go/no-go i definicje M/CPA — jedyne źródło: `00_STRATEGIA/Proces_Wyboru_Produktu.md`, sekcja 4. Nie powtarzaj progów w innych plikach — odsyłaj.

## Zasady pracy w repo

- Nigdy nie commituj sekretów ani danych osobowych klientów (patrz `.gitignore`, `04_KOD_I_INFRASTRUKTURA/env_backups/README.md`).
- Kwestie prawne/podatkowe oznaczaj ⚠️ do weryfikacji z księgowym/prawnikiem.
- Zmieniając nazwę pliku, popraw wszystkie odwołania w dokumentach.
