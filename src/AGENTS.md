# Frontend rules

- Public colours, typography, borders and glow are semantic CSS tokens; every public section uses the single `site-container` (1180px maximum, 32px insets, 20px on phones), including legacy and ad pages. Why: preserve the requested cover-inspired design and consistent alignment without independent section widths.
- Series routes compose existing sections through PageLayout; books and future characters are data-driven, with an empty character catalogue until author entries exist. Why: preserve existing content and avoid invented books or people.
- The shared header shows Reviews, Wiki, World, Author and ordering on desktop, with remaining pages under More; mobile retains all pages in its menu. Resolve page configuration by path. Why: keep ordering focused and page identities independent of navigation order.
- OtherBooksSection shares the existing LPH and pen-name catalogue data across Home, Books and Other Books; optional metadata is used only when supplied, verified LPH covers retain their intrinsic aspect ratio beside text from 640px, and home teasers explicitly exclude Other Books. Why: promote the author's catalogue without invented assets, cropped covers or a ninth teaser.
- SignedCopyOrderFlow selects checkout only from the order response, loads Razorpay on demand and emits deduplicated Purchase events only after server verification; retries retain the order. Why: preserve UPI behavior and prevent double charging/counting.
- Community WhatsApp destinations use a pure pointer-based URL helper. Why: desktop readers need WhatsApp Web while touch readers retain wa.me.
- Instagram exit intent uses a shared router-mounted dialog, sessionStorage plus an in-memory once-per-visit guard, and pure eligibility rules; exclude checkout and private routes and never intercept navigation. Why: invite follows without obstructing payments or leaving the site.
- `/signed-copy-story` is a single-component six-screen ladder with hash-based back navigation; hook copy keyed by utm_content and once-per-load Ladder events live in `src/lib/storyLadder.ts`. Why: test ad copy variants without double-counting funnel steps.

- Start Here uses PageLayout and shared band/button styles; Book 2 progress lives on Books, with values in `src/config/book2Progress.ts` and signup at `/shop#sample`; community lives on Author. Why: keep these sections reachable without distracting from homepage ordering.

- Homepage conversion sections reuse SignedCopyOrderFlow and SampleSection; optional initialMessage follows gift updates only until manually edited. Pure rules in `src/lib/homeConversion.ts` cover prefill, navigation and sticky visibility. Why: preserve shared payment/signup behavior and never overwrite buyer input.
