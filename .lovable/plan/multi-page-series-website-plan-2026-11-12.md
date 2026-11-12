# Multi-page series website — plan

## Decisions on your open questions
- **"Other books" dropdown: moves to the footer** (as a short "Other books" link list). Desktop header then holds only the brand, 8 labels and the "Shop the Book" button. On phones it also appears at the bottom of the menu.
- **Header at desktop widths:** 8 labels plus a button will not fit on one row below ~1280px. Below that width the header uses the same menu button as phones (labels + taglines). Full labels-only nav shows from wide screens up.

## Things you may have missed (please confirm)
1. **Canonical domain.** Every existing canonical, og:url and sitemap entry uses `https://riturajverma.com/` (no www), while your request says `https://www.riturajverma.com`. Mixing them splits search ranking. Plan: switch **all** of them (homepage, new pages, `/james-furrington`, `/lph/*`, sitemap, index.html og/twitter tags) to `www`, since that is the address Vercel actually serves. Say if you'd rather keep non-www everywhere.
2. **TestimonialsSection should not be used.** It is an old unused component with quotes credited to "Book Lover Magazine", "Literary Review" etc. that are not real reviews and use the old colour scheme. Your rule is never to show invented reviews. Plan: `/reviews` shows only ReviewsSection (the real reader reviews); TestimonialsSection is left unused. Note the Reviews page will be short while few real reviews exist.
3. **Hero book facts:** they move to `/books` but the hero currently shows them. Plan: remove the facts list from the hero (Home) and render it on `/books` from shared data, so it isn't duplicated.
4. **Other anchors** in old links: `/#wiki`, `/#news`, `/#quiz`, `/#video`, `/#sample` also exist. Plan adds: `#wiki` → `/wiki`, `#news`/`#quiz`/`#video` → `/world#…`, `#sample` → `/shop#sample`, `#top` stays.
5. **OrderBar on Home** currently hides itself when the order form is on screen. Home no longer has the form, so it will always show (and bottom space stays reserved). Should `/shop` also get the bar? Plan: no, since the form is right there.
6. **Pinterest Save button and "Read the first two chapters free"** stay in the hero untouched.
7. Header purchase buttons: the existing small "Order a signed copy" header button is replaced by "Shop the Book" (links to `/shop`), tracked as `OrderClick` with existing placement `header`. Still hidden on `/lph` and `/james-furrington`.
8. `/signed-copy` remains without the shared header, so the rebrand doesn't touch it.

## Pages
- `/` Home: Hero (copy unchanged), 8 teaser cards (label + tagline, thick top-border style), Community, Final CTA, OrderBar. Keeps Book JSON-LD.
- `/books`: Story section + book facts. Future books from `src/data/books.ts` (Book 1 only; no invented later books).
- `/wiki`: search box (filters term and blurb, case/accents ignored) + A–Z groups with letter jump links; "No terms match" message when empty.
- `/characters`: page header only while `src/data/characters.ts` is empty; cards (name, role, description, optional image) once filled.
- `/reviews`: ReviewsSection.
- `/world`: ScriptBand, Indus quiz, News, trailer.
- `/author`: Author section + author video.
- `/media`: Press section.
- `/shop`: Buy section (`id="buy"`) + Sample section.
Each page: H1 = label, subtitle = tagline, Helmet title "<Page> — Raghav Kartikeya: Fantasy with Roots", description, canonical, og:url.

## Links and redirects
- All "Order a signed copy" buttons (PurchaseButtons) → `/shop#buy` (or `#buy` when already on `/shop`), scrolling to the form after navigation.
- Home hash redirect: `#buy`→`/shop#buy`, `#story`→`/books`, `#press`→`/media`, `#author`→`/author`, `#community` stays, plus the extras in item 4. Uses `replace` so Back isn't broken.

## Unchanged
`/signed-copy`, SignedCopyOrderFlow, order API, GTM, Meta event names, existing placement names, campaign visit logging, owner pages, `/privacy`, `/lph/*`, `/james-furrington` content.

## Technical details
Create:
- `src/config/site.ts` — site name, tagline, ordered NAV_PAGES (label, tagline, path, description), canonical base.
- `src/lib/hashRedirect.ts` + `hashRedirect.test.js` — pure map from hash to target.
- `src/lib/wikiFilter.ts` + `wikiFilter.test.js` — pure filter + A–Z grouping.
- `src/data/books.ts` (+ test: one book, facts match current hero values), `src/data/characters.ts` (empty array, + test asserting empty).
- `src/components/PageHeader.tsx` (H1 + tagline), `PageLayout.tsx` (Header, Helmet, Footer), `TeaserGrid.tsx`, `CharacterList.tsx`, `ScrollToHash.tsx` (scroll to `#buy` etc. after route change).
- `src/pages/Books.tsx`, `Wiki.tsx`, `Characters.tsx`, `Reviews.tsx`, `World.tsx`, `Author.tsx`, `Media.tsx`, `Shop.tsx`.
- `src/pages/pages.test.js` — each nav route has unique title/canonical and is in the sitemap; `/signed-copy` absent.
Change:
- `src/App.tsx` (8 routes above catch-all), `src/pages/Index.tsx` (new composition + hash redirect), `src/components/Header.tsx` (brand, nav, active state, mobile taglines, Shop button), `Footer.tsx` (author name, Other books links), `HeroSection.tsx` (facts from `books.ts`, list removed), `PurchaseButtons.tsx` (`/shop#buy`), `WikiSection.tsx` (search + grouping), `src/lib/headerPurchase.ts` if needed, `index.html` (title/description/og to new site name; canonical domain per item 1), `JamesFurrington.tsx`/`AlternateEnding*.tsx` canonical domain only if item 1 approved, `public/sitemap.xml`, `src/pages/metadata.test.js`, `AGENTS.md`, `roadmap.md`.
Not moved/deleted: TestimonialsSection, Navigation, BuyModal, CtaSection (all unused).
Verify: full Bun test suite, build log, Playwright at 390/768/1280 for each page, nav highlight, old-anchor redirects and the order flow on `/shop`.
