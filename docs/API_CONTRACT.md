# API contract

Base: `/hub/api/v1`. Responses use `{ "data": ... }` or `{ "error": { "code", "message", "request_id" } }`. All private responses are `Cache-Control: private, no-store`.

## Pairing additions implemented in NPATI Hub

### `POST /wordpress/pairings`

Unauthenticated, rate-limited by IP and site fingerprint. Accepts `site_url`, `site_name`, `market`, hashed state, PKCE S256 challenge, callback URL, fingerprint and version handshake. Callback URLs must have the same origin as `site_url`. Returns `pairing_id`, short-lived opaque `poll_token`, `authorization_url`, `registration_url`, and expiry. Idempotency required.

### `POST /wordpress/pairings/:id/register`

Accepts nickname, email, password and the short-lived registration token directly from the paired WordPress browser origin. The origin must match the pairing site, attempts are rate-limited, and the password is forwarded only to NPATI registration; it is never returned to or stored by WordPress. A successful registration approves the pairing and returns its WordPress callback URL.

### `GET /wordpress/pairings/:id`

Requires an interactive NPATI user session. Returns the pending WordPress site name, URL, market and permissions for the authorization card.

### `POST /wordpress/pairings/:id/approve`

Requires an interactive NPATI user session and recent authentication. Records consent, tenant/user, market, approved scopes and the site. Never returns a site credential to the browser URL.

### `POST /wordpress/pairings/exchange`

Accepts pairing ID, poll token and PKCE verifier. One-time exchange returns `connection_id`, `site_id`, market, username, scoped credential, Hub Ed25519 public key and scopes. Replay returns 409.

### `POST /wordpress/connections/:id/disconnect`

Requires the matching site credential and `wordpress.connection.disconnect`. Revokes credentials and pauses site-sourced jobs without deleting content.

### `GET /capabilities`

Requires a site credential. Returns `api_version`, supported plugin range, features, scopes, allowed markets and limits. The plugin displays only advertised features.

## Reused contracts

`GET /listings?country=US|UA|CA|GB&status=active`, `GET/POST /jobs`, and the existing job mutation routes are reused. Site credentials need server-side adapters that inject the connected NPATI user context without exposing the user's bearer token.

## Hub → WordPress

`POST /wp-json/npati/v1/webhook` requires the signature headers documented in `SECURITY_MODEL.md`. Allowed v1 actions are post create/update/publish, healthcheck and enumerated security events. Unknown actions return 403; replay returns 409; conflicts return 422/409 in a later contract revision.
