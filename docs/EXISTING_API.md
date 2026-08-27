# Existing NPATI API audit

Audit date: 2026-08-12. Sources: `frontend`, `backend`, and `npati Hub` in this repository.

## Markets

| Market | Country | Public prefix | Default currency |
|---|---|---|---|
| United States | US | `/` | USD |
| Ukraine | UA | `/ua/` | UAH |
| Canada | CA | `/ca/` | CAD |
| United Kingdom | GB | `/gb/` | GBP |

The frontend market configuration is the source for routing. Hub schemas already accept `US`, `UA`, `CA`, and `GB`. Store/profile URLs must be returned by the API; the plugin does not derive usernames into URLs.

## Reusable Hub API

All protected Hub routes accept an NPATI user Bearer token or `X-API-Key`. Same-domain production aliases use `/hub/api/v1`.

| Method | Route | Existing behavior | WordPress use |
|---|---|---|---|
| GET | `/accounts` | Connected social accounts | Connections UI |
| GET/POST/PATCH | `/jobs`, `/jobs/:id` | Drafts, history, updates | Hub posts and calendar |
| POST | `/jobs/:id/schedule` | Hub-side scheduling | Schedule |
| POST | `/jobs/:id/publish` | Queue a confirmed draft | Explicit publish |
| DELETE | `/jobs/:id` | Cancel scheduled content | Calendar cancel |
| POST | `/jobs/:id/retry` | Retry failed targets | History retry |
| GET | `/dashboard/summary` | Counts, account status, activity | Dashboard/analytics |
| GET/POST/DELETE | `/assets` | Hub media library | Media selection/upload |
| GET | `/listings`, `/listings/:slug` | Current user's listings/videos/shorts | Market and blocks |
| GET | `/oauth/{provider}/start|status` | Hub-owned OAuth | Explicit external navigation only |

Social tokens are encrypted by the existing Hub Token Vault. The existing publisher worker, scheduler worker, queues, adapters and idempotent `repost_jobs` table are reused.

## Gaps found during the pre-implementation audit

The original audited Hub did not provide WordPress site pairing, site-scoped credentials, remote publishing policy, capability discovery, signed Hub→WordPress delivery, WordPress category discovery, WordPress destination jobs, WooCommerce draft mapping, traffic analytics, or server-side anomaly/quarantine rules for a compromised WordPress credential.

This change set adds pairing, site-scoped credentials, capability discovery and a strict draft-only WordPress credential boundary. Remaining endpoints are defined in `API_CONTRACT.md`. Until Hub advertises them, the plugin hides or degrades the corresponding UI and never falls back to direct social API calls.
