# Frontend rules

- Public colours, typography, borders and glow are semantic CSS tokens; every public section uses the single `site-container` (1180px maximum, 32px insets, 20px on phones), including legacy and ad pages. Why: preserve the requested cover-inspired design and consistent alignment without independent section widths.
- Series routes compose existing sections through PageLayout; books and future characters are data-driven, with an empty character catalogue until author entries exist. Why: preserve existing content and avoid invented books or people.
- The shared header uses two desktop rows at 1280px and a tagline menu below that width; other-series links remain in the footer. Why: all nine navigation labels must fit without overlap and retain large touch targets.
- SignedCopyOrderFlow selects checkout only from the order response, loads Razorpay on demand and emits deduplicated Purchase events only after server verification; retries retain the order. Why: preserve UPI behavior and prevent double charging/counting.
- Community WhatsApp destinations use a pure pointer-based URL helper. Why: desktop readers need WhatsApp Web while touch readers retain wa.me.
