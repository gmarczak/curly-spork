# SOP: Obsługa Zwrotów i Reklamacji

*Model docelowy: Agent Wsparcia jako pierwsza linia, eskalacja do wspólnika w określonych przypadkach (potwierdzone w wywiadzie projektowym).*

## 1. Zwrot w ramach 14-dniowego prawa odstąpienia (konsument UE)

1. Klient zgłasza zwrot przez formularz kontaktowy/e-mail lub czat.
2. **Agent Wsparcia** weryfikuje, czy zgłoszenie jest w terminie 14 dni od otrzymania towaru.
3. Agent wysyła instrukcję zwrotu (adres, informacja kto pokrywa koszt przesyłki — zgodnie z regulaminem, patrz `01_FINANSE_I_PRAWO/Rejestracja_i_Umowy/Wzorce_Regulaminow_i_Polityk.md`).
4. Po potwierdzeniu odesłania towaru — zwrot środków w ciągu maksymalnie 14 dni (ustawowo).
5. Agent aktualizuje status zamówienia w `medusa-backend`.

## 2. Reklamacja (towar niezgodny z opisem/uszkodzony)

1. Klient opisuje problem, najlepiej ze zdjęciem.
2. **Agent Wsparcia** ocenia typ problemu na bazie wiedzy o produkcie (RAG z pgvector).
3. **Eskalacja do wspólnika (człowieka), gdy:**
   - klient jest niezadowolony po 2 wymianach z agentem,
   - żądana kwota zwrotu/rekompensaty przekracza ustalony próg (np. 100 zł — do potwierdzenia),
   - zgłoszenie dotyczy potencjalnego problemu bezpieczeństwa/zdrowia,
   - klient grozi działaniami prawnymi/publicznymi (media, UOKiK).
4. Przypadki eskalowane trafiają do `05_OPERACJE_I_ARCHIWUM/Zgloszenia_i_Bledy/` z wypełnionym `Szablon_Zgloszenia_Bledu.md`.
5. Jeśli problem wynika z winy dostawcy — kontakt z dostawcą wg jego polityki zwrotów (karta dostawcy w folderze produktu).

## 3. Zasada ogólna eskalacji (potwierdzona z właścicielem)

Model: **agent + eskalacja do człowieka.** Agent obsługuje pierwszą linię (odpowiedzi na pytania, standardowe zwroty w terminie), człowiek (wspólnik) rozstrzyga przypadki niestandardowe, kosztowe lub reputacyjnie ryzykowne.
