# Zasady Księgowe i VAT

*Do potwierdzenia z biurem księgowym przed pierwszą sprzedażą.*

## 1. VAT — kluczowe progi i zasady (do weryfikacji aktualności na moment rejestracji)

- **Limit zwolnienia z VAT:** ok. 200 000 zł obrotu rocznie — do potwierdzenia aktualnej wartości progu w momencie startu (progi bywają aktualizowane).
- **Sprzedaż B2C do innych krajów UE (jeśli/gdy nastąpi ekspansja):** obowiązek rejestracji do **VAT-OSS** (One Stop Shop) po przekroczeniu unijnego limitu 10 000 EUR łącznej sprzedaży wewnątrzunijnej — pozwala rozliczać VAT wszystkich krajów UE z jednego miejsca, bez rejestracji w każdym kraju osobno.
- **Kasa fiskalna online:** obowiązek zależy od formy przyjmowania płatności i rodzaju towaru — do zweryfikowania z księgowym per model płatności (Stripe/BLIK zazwyczaj traktowane jako przelew, co może zwalniać z obowiązku kasy fiskalnej dla czystej sprzedaży internetowej, ale wymaga potwierdzenia).

## 2. Rekomendacja obsługi księgowej

Na fazę startową (1–2 produkty, niska liczba transakcji): **biuro księgowe zewnętrzne** (koszt rzędu 200–500 zł/mc dla małej działalności) zamiast prowadzenia księgowości samodzielnie — pozwala 2-osobowemu zespołowi skupić się na produkcie/marketingu. Alternatywnie narzędzia typu inFakt/Fakturownia dla uproszczonej samoobsługi przy najniższym wolumenie.

## 3. Ewidencja kosztów specyficznych dla tego modelu biznesowego

Koszty do systematycznego księgowania jako koszty uzyskania przychodu:

- Hosting i infrastruktura (Hetzner, Vercel, Supabase) — faktury cykliczne, najlepiej na firmę od pierwszego miesiąca.
- Subskrypcje API modeli AI (Anthropic, OpenAI, DeepSeek, Fal.ai) — często płatne kartą zagraniczną, wymagają odpowiedniego księgowania kosztu w walucie/przewalutowania.
- Domeny (koszt per produkt, cykliczny rocznie).
- Budżety reklamowe (Meta/TikTok Ads) — osobna kategoria kosztowa per produkt, potrzebna do liczenia jednostkowej ekonomiki (patrz `Business_Plan_i_Koncepcja.md`, sekcja 5).
- Prowizje bramek płatności — księgowane jako koszt, nie potrącane "netto" bez ewidencji.

## 4. Do ustalenia z księgowym przed startem

- [ ] Forma opodatkowania (skala podatkowa / podatek liniowy / ryczałt) — zależna od wybranej formy prawnej
- [ ] Sposób księgowania kosztów w USD/EUR (subskrypcje AI, niektóre bramki)
- [ ] Moment powstania obowiązku VAT-OSS (monitorować kumulatywną sprzedaż UE)
- [ ] Zasady wystawiania faktur/paragonów przy sprzedaży wyłącznie online
