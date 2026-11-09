# Roadmap

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
