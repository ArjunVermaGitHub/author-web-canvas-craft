# AGENTS.md

- Backend: Vercel serverless functions in `api/` (ES modules, `micro` buffer for body parsing, CORS headers on every response) backed by MongoDB Atlas via `MONGODB_URI` env and the cached connection in `api/utils/mongodb.js`. Do not add Lovable Cloud/Supabase — the user runs their own MongoDB. Why: user manages their own Vercel deployment and Atlas cluster.
- Prices and payee name live in `src/config/book.ts` as the single source of truth. Why: the user changes the book price when the Amazon price changes.
- Owner-only tools live under /owner/* and call /api endpoints gated by the OWNER_ACCESS_CODE env var; AI calls run in Vercel functions using LOVABLE_API_KEY env. Why: no Lovable Cloud backend, keep keys server-side.
- Keep quiz question data separate from its interactive component and validate author video links with a pure URL helper; colocated Bun tests cover these rules. Why: scoring and embed visibility remain independently verifiable.
