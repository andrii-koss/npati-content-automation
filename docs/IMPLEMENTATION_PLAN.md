# Implementation plan and status

1. Foundation — implemented: bootstrap, autoload, capabilities, settings, API client, tables, logging, circuit breaker and static checks.
2. Authentication — implemented end to end: Hub PKCE pairing, interactive NPATI approval, one-time exchange, site-scoped credential and disconnect.
3. Security core — inbound signatures, replay/idempotency, audit, high-security draft fallback and local kill/disconnect behavior implemented. Remote policy/rate-limit/quarantine remains Hub work.
4. Market — read/listing display implemented against existing API. Remote create/edit/archive API is not currently available.
5. Store integration — opt-in footer, shortcode and two server-rendered blocks implemented.
6–7. Hub/history/calendar — existing jobs are displayed; creation/scheduling contracts are proxied. Rich composer/calendar UI is future UI work.
8. WordPress publishing channel — signed draft/publish/update and conflict hash implemented.
9. Gutenberg — blocks implemented; editor publishing sidebar remains.
10–11. SEO — deterministic analyzer and optional Yoast metadata adapter implemented without duplicate frontend tags.
12. Automations — deferred until the Hub policy API exists.
13. WooCommerce — explicit draft export and delete protection implemented; category/sync API remains.
14. Analytics — capability/API dependent.
15. Diagnostics — Site Health HTTPS check, Security UI and sanitized audit view implemented.
16. WordPress.org — readme disclosure, GPL, opt-in footer, no remote code/CDN/telemetry implemented; final Plugin Check/WPCS must run in a PHP/WordPress CI environment.
