# Local database schema

- `{prefix}npati_connections`: one site-scoped connection, opaque site credential, Hub public key and non-sensitive identity/status fields. No social tokens.
- `{prefix}npati_content_map`: WordPress/remote IDs, versions, hash and conflict/sync state.
- `{prefix}npati_event_inbox`: webhook request IDs and payload hashes for replay/idempotency. Seven-day housekeeping.
- `{prefix}npati_audit_log`: sanitized operational/security events. Default retention is 30 days.

Settings are stored in the non-autoloaded `npati_hub_settings` option. Schema migrations use `dbDelta` and `npati_hub_db_version`.
