# Roadmap

- [x] Hide Raghav purchase buttons in the shared header on pen-name pages via `shouldShowPurchaseButtons(pathname)` driven by OTHER_BOOK_SERIES paths; 70 tests pass and header balance verified at 390px, 768px and 1280px on `/james-furrington` (buttons gone, menu/dropdown intact) and `/` (buttons present). Nothing published.

- [x] Catalogue now has 11 entries: add Amazon India ISBN 9363555208 immediately after the .com India book. Both supplied pages confirm “Cute cats in india”, Perfect Paperback, 90 pages and publisher; no description was exposed, so the blurb uses confirmed author/publisher only. Matching cover visually verified and hosted via `/books/9363555208.jpg`; optional format/pages/store metadata added. All 68 tests and automatic build pass; refreshed layouts verified at 390px, 768px and 1280px without overflow. Nothing published or deployed.

- [x] Fetch and visually verify all ten pen-name covers, including distinct Japan editions; optimize to quality-82 JPEGs stored via project asset pointers with local `/books/<ASIN>.jpg` redirects. Optional cover metadata and fallback cards added; 67 tests pass and all ten images load at 390px, 768px and 1280px with no overflow and bottom-aligned order buttons. No publishing.

- [x] Add Other books navigation and `/james-furrington` catalogue (now 11 typed book entries), linked pen-name note, page metadata and sitemap; direct loads/refreshes and mouse/keyboard menus verified at 390px, 768px and 1280px without overflow. Tablet uses the compact menu. Existing Vercel fallback and API routes unchanged; nothing published.
- [x] Correct homepage and pen-name canonical/sitemap URLs to the owner's real domain; 66 tests pass and cache-disabled refreshes load content/assets on `/`, `/james-furrington` and `/james-furrington/`. Keep root-relative Vite assets for trailing-slash deep links. Nothing published.

- [x] Build community signup after reviews with shared validation, WhatsApp contact and MongoDB `test.rituraj-community`; 59 tests pass and browser validation/success/duplicate/failure/navigation checks pass at 390px and 1280px without overflow. No publishing; real database read-back unavailable because MONGODB_URI is absent in the sandbox.

- [x] Add "Raghav Kartikeya's Wiki" section (69 Wikipedia term cards after the story section, plain page-flow list, no tracking) with data file and tests; verified at 1280×800 and 390×844 without publishing

- [x] Add on-demand latest news with cached Vercel RSS endpoint and editor-picks fallback; 40 tests pass, success/empty/error/refetch/restore verified at 1280×800 and 390×844 with no initial news request or overflow. Direct handler returned 15 live results; Vite does not execute serverless endpoints. Not published.

- [x] Add "The Indus Valley in the news" section (15 external link cards, newest first, no scroll trap or tracking) between the quiz and story sections; verified at 1280×800 and 390×844 without publishing

- [x] Extend the fixed order bar to desktop and resolve reproduced desktop scrolling/anchor issues; verified 48px buttons, sticky_bar tracking, buy-section hiding, footer clearance, wheel scrolling and no horizontal overflow at 1280×800, 1920×1080 and 390×844 without publishing

- [x] Correct trailer shapes (Instagram and Drive 1 tall, Drive 2 wide), use an Instagram link instead of embed; verified uncropped posters, no initial provider requests, correct Drive iframe activation and no overflow at 390px and 1280px

- [x] Add the owner-supplied sample PDF at the existing free-sample address and verify it opens without publishing

- [x] Conversion step 1: shared OrderBar (mobile and desktop), country-aware Amazon links, paired purchase buttons and optional Meta click tracking; verified without publishing
- [x] Mobile conversion step 2: UPI tap-to-pay button on the payment step (mobile only), copy-UPI fallback, PayClick tracking; verified without publishing

- [x] Add compact header and post-review buy links without duplicating the existing desktop link
- [x] Add hidden author video slot and four-question Indus quiz
- [x] Update sharing metadata, Book schema, robots and homepage-only sitemap; verify accessibility and interactions
- [x] Pinterest Save button under the hero cover (pins the cover, links to the site)

- [x] PhonePe order flow, order API, prices (₹408 incl. shipping)
- [x] Homepage redesign (stone/lapis/carnelian, Rozha One + Hind)
- [x] Fixes: QR payment wording, store email in orders, Amazon link, hide reviews
