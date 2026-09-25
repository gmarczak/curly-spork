# SOP: Obsługa Zwrotów i Reklamacji

*Model docelowy: Agent Wsparcia jako pierwsza linia, eskalacja do właściciela w określonych przypadkach (potwierdzone w wywiadzie projektowym).*

## 1. Zwrot w ramach 14-dniowego prawa odstąpienia (konsument UE)

1. Klient zgłasza zwrot przez formularz kontaktowy/e-mail lub czat.
2. **Agent Wsparcia** weryfikuje, czy zgłoszenie jest w terminie 14 dni od otrzymania towaru.
3. Agent wysyła instrukcję zwrotu (adres, informacja kto pokrywa koszt przesyłki — zgodnie z regulaminem, patrz `01_FINANSE_I_PRAWO/Rejestracja_i_Umowy/Wzorce_Regulaminow_i_Polityk.md`). **Adres zwrotu musi być w Polsce/UE** — przy dropshippingu z Chin nie odsyłamy klienta do Chin; adres zwrotów ustalić przed startem produktu (zanotować w karcie dostawcy).
4. Agent tworzy w Medusie **wniosek o zwrot** (status oczekujący). Zwrot pieniędzy zatwierdza człowiek w Medusa Admin — agent nie ma uprawnień do zwrotu środków (model uprawnień: `00_STRATEGIA/Architektura_Systemu/ADR_001_Stack_Techniczny.md`).
5. Zwrot środków **najpóźniej 14 dni od otrzymania oświadczenia o odstąpieniu**; sprzedawca może wstrzymać się ze zwrotem do otrzymania towaru lub dowodu jego odesłania.

## 2. Reklamacja (towar niezgodny z opisem/uszkodzony)

0. **Termin ustawowy: 14 dni na odpowiedź na reklamację. Brak odpowiedzi w terminie = reklamacja uznana.** Data wpływu reklamacji zapisywana w zamówieniu w Medusie; przypomnienie dla właściciela po 7 dniach (i po 12 dniach — ostatnia szansa), jeśli sprawa nie jest zamknięta.
1. Klient opisuje problem, najlepiej ze zdjęciem.
2. **Agent Wsparcia** ocenia typ problemu na bazie wiedzy o produkcie (RAG z pgvector).
3. **Eskalacja do właściciela (człowieka), gdy:**
   - klient jest niezadowolony po 2 wymianach z agentem,
   - żądana kwota zwrotu/rekompensaty przekracza **100 zł** (próg domyślny; właściciel może go zmienić — wtedy zaktualizować też prompt Agenta Wsparcia),
   - zgłoszenie dotyczy potencjalnego problemu bezpieczeństwa/zdrowia,
   - klient grozi działaniami prawnymi/publicznymi (media, UOKiK).
4. **Decyzję w eskalacji podejmuje się w Medusa Admin** (notatka przy zamówieniu, tam zostają dane klienta). Dodatkowo, dla wniosków procesowych, wpis w `05_OPERACJE_I_ARCHIWUM/Zgloszenia_i_Bledy/` wg `Szablon_Zgloszenia_Bledu.md` — **bez danych osobowych** (tylko nr zamówienia, typ problemu, decyzja). Repo git nie jest miejscem na dane klientów (RODO).
5. Jeśli problem wynika z winy dostawcy — kontakt z dostawcą wg jego polityki zwrotów (karta dostawcy w folderze produktu).

## 3. Zasada ogólna eskalacji (potwierdzona z właścicielem)

Model: **agent + eskalacja do człowieka.** Agent obsługuje pierwszą linię (odpowiedzi na pytania, standardowe zwroty w terminie), człowiek (właściciel) rozstrzyga przypadki niestandardowe, kosztowe lub reputacyjnie ryzykowne.
