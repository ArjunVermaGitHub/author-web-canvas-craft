# Paid-ad campaign tracking in the visitor counter

## What you will see
- On `/owner/insights`, after "Show visitors and orders", the existing totals stay as they are. A new table, **Visits by campaign**, appears below them with these columns: Campaign, Source, Medium, Visits today, Visits all time. Example row: `diwali_sales | facebook | paid | 12 | 140`.
- Visits without campaign labels appear as one row: `(none) | direct | organic`.
- A reader who refreshes or opens more pages in the same browser tab is counted once.

## How it works
1. **Reading the labels:** When a reader arrives, the site reads `utm_source`, `utm_medium` and `utm_campaign` from the web address. These labels and a random session ID are saved in sessionStorage, so they stay the same when the reader moves between pages. If a later address has new labels, they replace the old ones and start a new session. This means one reader who taps a second ad counts once for each campaign.
2. **Logging the visit:** The visitor counter already sends one request when a page opens. That same request will also carry the session ID and the labels. The server records the campaign session only once per session ID. If the session ID is already recorded, nothing changes, so refreshes do not add visits.
3. **Cleaning the labels:** Each label is trimmed, changed to lowercase, limited to 100 characters and restricted to letters, numbers and `_ - . +`. If the labels are missing or invalid, the visit is logged as `direct / organic / (none)`.
4. **Today:** "Today" means the calendar day in India time, from midnight. Note that this differs from the existing "last 24 hours" figures.

## Files and database changes
- `src/lib/campaign.js` (new): pure helpers that read and clean UTM parameters and decide whether the session continues or starts again.
- `src/lib/campaign.test.js` (new): tests for missing labels, cleaning, keeping labels across page changes, and new labels starting a new session.
- `src/components/VisitorCounter.tsx`: reads and saves the session in sessionStorage and adds `sessionId` and `utm` to the existing visit request. The public footer text stays the same.
- `api/visits.js`:
  - When a visit is logged, it also inserts into the new `rituraj-campaign-sessions` collection. Each record has: `sessionId`, `source`, `medium`, `campaign`, `day` (India date) and `createdAt`. A unique index on `sessionId` stops a session from being counted twice. The insert uses an upsert with `$setOnInsert`.
  - For the owner-only request, it adds a `campaigns` list grouped by campaign, source and medium. Each item includes today's count and the all-time count, sorted by all-time visits.
  - The existing `rituraj-visits` and `rituraj-pageviews` collections stay as they are.
- `src/pages/OwnerInsights.tsx`: adds the campaign table under the existing totals, using the current design.
- `api/visits.test.js` (new): tests that a repeated session ID is not counted twice and that the owner code is required for the campaign list.
- `AGENTS.md` and `roadmap.md`: one rule and a task entry.

## Not touched
- The Google Tag Manager snippet in `index.html`, the Meta Pixel and purchase click tracking
- The GA4 setup
- Order flow and other API files

## Note
Campaign counts start from the day this is deployed. Earlier visits have no campaign labels, so they cannot be split by campaign.
