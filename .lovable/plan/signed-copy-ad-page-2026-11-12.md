# Signed-copy ad page

- Add `/signed-copy` with a minimal author link, compact cover/title/hook and ₹335 offer, three linked reviewer names, the order form, a quiet Amazon alternative and privacy-only footer.
- Keep the form within the first two mobile screens. Preserve the homepage appearance and behaviour.
- Reuse the existing order/payment flow in a shared component; add mobile autofill attributes without changing validation, payment links, API requests or existing events.
- Keep campaign visit logging active but hide the public counter on this page.
- Set the requested title, description, self-referencing canonical and noindex with Helmet. Leave the sitemap, GTM and order API untouched.

## Technical details
- Extract `SignedCopyOrderFlow.tsx` from `BuySection.tsx`, with default `buy`/`buy_payment` placements and `landing`/`landing_payment` on the new page.
- Add `SignedCopy.tsx` and register it in `App.tsx` above the catch-all. The existing Vercel filesystem/API-first SPA fallback needs no change.
- Add a pure review selector and colocated Bun tests for the first three entries having both Amazon and Goodreads links. The homepage currently has no `#reviews` anchor, so the total will be unlinked.
- Add a hidden-display option to `VisitorCounter`; do not alter its logging.
- Update `AGENTS.md` and `roadmap.md`; run the existing tests and check desktop/mobile flow, metadata, tracking labels and refreshes.

## Verification limit
Real database writes and real UPI-app handoff cannot be verified in the sandbox; preview flow checks will use a simulated order response. Nothing will be published or deployed.