# Security model

WordPress is treated as a higher-risk client. Its site credential is intended to carry only WordPress event/content scopes and must never retrieve social tokens, change server publishing limits, or bypass the Hub policy engine.

Inbound Hub commands use Ed25519 over `METHOD + PATH + TIMESTAMP + REQUEST_ID + SHA256(BODY)`. WordPress stores only the Hub public key. Requests outside a five-minute window, duplicate request IDs, unknown sites, invalid signatures, unknown actions and content conflicts are rejected before mutation.

Admin operations require a WordPress capability plus REST/admin nonce. API data is sanitized on input and escaped on output. HTTP is restricted to `www.npati.com`, `api.npati.com`, and developer-only local endpoints. Five consecutive failures open a five-minute circuit breaker. Logs redact credentials, secrets, tokens, authorization and signatures.

High Security mode converts signed remote publish requests into drafts. Deleting WordPress content never deletes remote content. Social credentials never enter WordPress.
