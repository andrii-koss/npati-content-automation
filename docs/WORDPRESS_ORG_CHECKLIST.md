# WordPress.org checklist

- GPL-2.0-or-later declared; external NPATI services, Terms and Privacy disclosed.
- No external request on activation; no social tokens; no direct social publishing.
- Footer link off by default; no hidden backlink or telemetry.
- No remote executable code or CDN dependency.
- Capabilities, nonces, REST permission callbacks, sanitization and escaping used.
- Namespaces/constants/hooks/classes are NPATI-prefixed.
- Assets load only on NPATI admin screens/editor; dynamic blocks render server-side.
- Uninstall is explicit opt-in and never deletes WordPress posts/products.
- Translation-ready strings and privacy-policy helper included.
- Admin CSS and JavaScript use WordPress enqueue APIs and load only on NPATI admin screens. No PHP file prints direct `<style>` or `<script>` blocks.
- `assets/js/admin.js` and `assets/js/blocks.js` are readable canonical source, not generated assets. Reproduce formatting with `npm install` and `npm run format:check`.
- WordPress 7.0 AI Client is not bundled. The direct OpenAI provider remains for WordPress 6.4 compatibility and existing OpenAI-specific model/settings behavior; it uses the WordPress HTTP API and a fixed HTTPS endpoint.
- Run `composer install`, `composer lint`, `npm run format:check`, and every `npm run check:*` command before release.
- Before submission: run WordPress Plugin Check in a clean WordPress install, activation/deactivation tests, accessibility review, malware scan, dependency audit and live pairing/acceptance tests against staging.
