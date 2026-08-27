# Archived implementation plan

> This file preserves the original implementation plan for project history. It is not the current feature or release-status reference. See the [main README](../README.md), [user documentation](README.md), and [deployment guide](DEPLOYMENT.md) for current behavior and release preparation.

- **1. Foundation:** Bootstrap, autoload, capabilities, settings, API client, tables, logging, circuit breaker, and static checks implemented.
- **2. Authentication:** Hub PKCE pairing, interactive NPATI approval, one-time exchange, site-scoped credential, and disconnect implemented.
- **3. Security core:** Inbound signatures, replay protection, idempotency, audit, high-security draft fallback, and local disconnect behavior implemented. Remote policy, rate limits, and quarantine remain NPATI Hub work.
- **4. Market:** Listing, video, and Shorts display, listing creation and updates, archive-on-delete behavior, and media import implemented against the NPATI API.
- **5. Store integration:** Opt-in footer, shortcode, and two server-rendered blocks implemented.
- **6–7. Hub, history, and calendar:** Overview, composer, scheduling, publication history, calendar, and connections UI implemented against the NPATI Hub job and account APIs.
- **8. WordPress publishing channel:** Signed draft, publish, update, and conflict-hash handling implemented.
- **9. Gutenberg:** Blocks implemented; editor publishing sidebar remains.
- **10–11. SEO:** Deterministic analyzer and optional Yoast metadata adapter implemented without duplicate frontend tags.
- **12. Automations:** Deferred until the NPATI Hub policy API exists.
- **13. WooCommerce:** Explicit draft export and delete protection implemented; category and synchronization API work remains.
- **14. Analytics:** Capability and API dependent.
- **15. Diagnostics:** Site Health HTTPS check, Security UI, and sanitized audit view implemented.
- **16. WordPress.org:** Service disclosure, GPL, opt-in footer, and no remote code, CDN, or telemetry implemented. Final Plugin Check and WPCS must run in a PHP and WordPress CI environment.
