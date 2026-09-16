# Strategia SEO i Content — poziom Fabryki

## 1. Podejście do SEO w modelu multi-tenant

Każdy storefront produktowy ma własną domenę i własny content SEO (opis produktu, FAQ, blog jeśli dotyczy) generowany przez Agenta Onboardingu/Brandingu na bazie `Specyfikacja.md` danego produktu. Ten dokument definiuje wspólne standardy, nie treść per produkt.

## 2. Standardy techniczne SEO (wspólne dla wszystkich storefrontów)

- Meta title/description generowane automatycznie, unikalne per produkt (nie duplikowane między domenami — ryzyko kanibalizacji/duplicate content).
- Structured data (schema.org Product, Offer, AggregateRating jeśli dostępne opinie).
- Szybkość ładowania — Next.js/Astro z SSR/SSG, obrazy zoptymalizowane (WebP/AVIF).
- Sitemap.xml i robots.txt generowane automatycznie per domena.

## 3. Content marketing — rola w tym modelu

Przy modelu opartym głównie na ruchu płatnym (Meta/TikTok Ads), SEO/content organiczny jest **wtórny w fazie testowej** (za wolny, żeby zweryfikować popyt w kilka dni) i **komplementarny w fazie skalowania** (dla produktów, które się sprawdziły — budowa contentu blogowego/FAQ obniża długoterminowo CAC).

## 4. Baza wiedzy FAQ dla RAG (agent Support)

Dla każdego produktu wygenerować bazę FAQ (min. 10-15 pytań/odpowiedzi) zasilającą pgvector — patrz `00_STRATEGIA/Architektura_Systemu/Infrastruktura.md`. Pliki FAQ per produkt przechowywać w `02_PRODUKTY/[ID]/` (nie w tym folderze — ten folder jest na strategię ogólną, nie treści per produkt).

## 5. Do zrobienia

- [ ] Szablon promptu do generowania meta title/description per produkt (dodać do `02_PRODUKTY/_SZABLON_PRODUKTU/Prompty_dla_Agentow/`)
- [ ] Decyzja, czy blog per produkt jest wart inwestycji (po pierwszych 2-3 walidacjach)
