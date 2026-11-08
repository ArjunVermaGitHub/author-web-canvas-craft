# AGENTS.md

- Backend: Vercel serverless functions in `api/` (ES modules, `micro` buffer for body parsing, CORS headers on every response) backed by MongoDB Atlas via `MONGODB_URI` env and the cached connection in `api/utils/mongodb.js`. Do not add Lovable Cloud/Supabase — the user runs their own MongoDB. Why: user manages their own Vercel deployment and Atlas cluster.
- Prices and payee name live in `src/config/book.ts` as the single source of truth. Why: the user changes the book price when the Amazon price changes.
- Amazon stores live in `src/config/amazon.ts`; purchase buttons share browser-region selection and optional Meta click tracking through `src/lib/purchase.ts`. Why: all purchase placements must use consistent destinations without geo-IP requests or checkout changes.
- Owner-only tools live under /owner/* and call /api endpoints gated by the OWNER_ACCESS_CODE env var; AI calls run in Vercel functions using LOVABLE_API_KEY env. Why: no Lovable Cloud backend, keep keys server-side.
- Keep quiz question data separate from its interactive component and build share links (author video embed, Pinterest pin) with pure URL helpers in `src/lib`; colocated Bun tests cover these rules. Why: scoring, embed visibility and share destinations remain independently verifiable.
- Store the sample PDF via Lovable Assets; preserve its existing public address with matching Vite-preview and Vercel redirects to the hosted asset. Why: existing reading links and welcome emails must continue to work without committing binary media.
- Use VideoFacade for trailer embeds, mounting third-party iframes only after activation without embed scripts. Why: video providers must not slow the initial page load.
- Use OrderBar at all homepage widths with shared PurchaseButtons and IntersectionObserver visibility; reserve bottom space at every width. Why: consistent ordering access must not cover the footer.
