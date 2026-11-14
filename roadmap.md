# Roadmap

- [ ] Add the visually verified Amazon LPH cover via hosted JPEG/legacy redirects, display it uncropped in catalogue cards and the alternate-endings index, and run all tests plus six page-size checks.

- [x] Set the supplied LPH Kindle edition, show its availability and primary link across catalogue/LPH pages, and retain the unset cover. All 168 tests pass, automatic build is clean, and both public Kindle links are verified in the preview. No Lovable publish used.

- [x] Feature the existing other books on Home, Books and `/other-books`, update navigation without adding a ninth teaser, and verify tests and three screen widths. All 167 tests and automatic build pass; nine page-size checks confirm shared alignment, loaded covers, no overflow, desktop navigation fit and mobile navigation. Production auto-deployment and external Amazon checkout remain unverified; no Lovable publish used.

- [x] Add opt-in Razorpay orders, verification/webhook, retry state and owner payment details while preserving keyless UPI fallback.
- [x] Use WhatsApp Web for fine-pointer devices and wa.me for touch devices.
- [x] Run payment tests and browser checks; document Vercel/Razorpay setup and verification limits. Live Razorpay/Atlas transactions and webhook delivery await owner environment/dashboard setup; browser flows use simulated provider responses.

- [x] Build approved multi-page series structure, www canonicals and legacy hash redirects.
- [x] Apply night-sky/firelight/gold theme and shared public-page alignment.
- [x] Run all tests and verify all public routes at 390, 768 and 1280px; preserve live order and tracking behavior. Completed in prior request (149 tests, 153 page-size checks); real order storage and UPI-app handoff remain unverified.

- [x] Fix desktop header purchase buttons wrapping across the header border; keep all purchase destinations and tracking unchanged.

- [x] Add compact `/signed-copy` ad page with shared order flow, landing tracking placements, silent campaign logging, noindex metadata and mobile autofill. All 115 tests pass; preview order/payment/done, refresh, canonical, campaign session persistence and homepage tracking regression verified at phone/desktop sizes. Form starts at 820px on 390×844 and 928px on 320×740. Real order persistence and UPI-app handoff remain unverified; no publishing or deployment.

- [x] Add owner-only Meta/GA4 comparison at /owner/insights with matching dates, scope and timezone, validated counts, ratios and streamed AI diagnosis. 92 tests pass; actual Vercel handler/AI call verified with synthetic counts and local owner code, UI checked through a test bridge at desktop/mobile, automatic build clean. Unpublished. Production verification awaits the owner's Vercel deployment and LOVABLE_API_KEY environment setup; no real campaign reports supplied.

- [x] Add the final story, The pursuit of perfection, verbatim (12/8/12 paragraphs), four sitemap URLs and nine-active/zero-coming-soon tests; 85 tests pass and automatic build is clean. Navigation, refreshed endings, paragraph counts, canonicals, hidden labels/purchases and no overflow verified at 390px, 768px and 1280px. Existing per-story Coming soon fallback remains available without an empty section. No helpline note; nothing published or deployed.

- [x] Add The night of the affair verbatim with three endings (13/10/17 paragraphs), four sitemap URLs and eight-active/one-coming-soon tests; 84 tests pass, automatic build clean, and navigation, refreshed slash variants, titles, canonicals and hidden labels/purchases verified at 390px, 768px and 1280px. No helpline note; nothing published or deployed.

- [x] Add The Facebook stalker verbatim with three endings, four sitemap URLs and seven-active/two-coming-soon tests; 83 tests pass, automatic build clean, and navigation, refreshed slash variants, titles, canonicals and hidden labels/purchases verified at 390px, 768px and 1280px. No helpline note; nothing published or deployed.

- [x] Add The soul mate theorist verbatim with three endings only, four sitemap URLs and six-active/three-coming-soon tests; 82 tests pass and pages, refreshed slash variants, canonicals, hidden labels/purchases and 4-2 returning 404 verified at 390px, 768px and 1280px. Nothing published or deployed.

- [x] Add the fifth story, The victim of many loves, verbatim under printed slug `victim-of-many-loves`; add hub and three sitemap URLs and five-active/four-coming-soon tests. No publishing or deployment.

- [x] Add the three verbatim endings for The practitioner of austerity, four sitemap URLs and updated four-story/five-coming-soon tests; 80 tests pass, automatic build clean, and story navigation, direct loads/refreshes, canonicals, internal-only labels and hidden header purchases verified at 390px, 768px and 1280px without publishing.

- [x] Add the three verbatim endings for The intimacy of space, four sitemap URLs and updated three-story/six-coming-soon tests; 79 tests pass, automatic build clean, and index, hub, ending navigation, canonicals, label-free metadata and direct loads/refreshes with both slash variants verified at 390px, 768px and 1280px without publishing.

- [x] Add the three verbatim endings for The emotional cripple, four sitemap URLs and updated data/route tests; 78 tests pass, automatic build clean, and index, hub, ending navigation, direct loads/refreshes and label-free metadata verified at 390px, 768px and 1280px without publishing.

- [x] Add "Love, Peace & Happiness: Alternate endings" to the Other books menu data (desktop dropdown and mobile menu), linking to /lph/alternate-endings/ with active highlighting on /lph paths; 76 tests pass and both entries verified at 390px, 768px and 1280px. Nothing published.

- [x] Restore the data-driven Love, Peace & Happiness pilot ending pages, story hub and indexes; direct loads/refreshes with both slash variants, canonicals, ending navigation, header exclusions and unknown-path 404s verified at 390px, 768px and 1280px without publishing. Existing Vercel SPA fallback retained.

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
- [x] Paid-ad campaign tracking (UTM per session) in owner visitor view
- [x] Owner order log with paid/pending/cancelled statuses
