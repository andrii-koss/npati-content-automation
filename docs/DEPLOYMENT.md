# NPATI Hub WordPress deployment

The current source adds lifecycle-managed WordPress integrations and explicit ChatGPT access. Deploy NPATI Hub, the NPATI backend MCP service, and the WordPress plugin from the same revision.

1. Generate a random internal key of at least 32 characters. Set the exact same secret as `NPATI_HUB_INTERNAL_KEY` in both the NPATI backend and NPATI Hub environments. Do not put this key in WordPress.
2. Keep `WORDPRESS_SIGNING_PUBLIC_KEY` and `WORDPRESS_SIGNING_PRIVATE_KEY_PEM_B64` in the NPATI Hub secret environment. Generate the signing pair from the source checkout with `npm run wordpress:key`. The private value signs WordPress commands and is never sent to WordPress or the MCP backend; WordPress receives only the public verification key. Hub now refuses to start in production if either key is missing, malformed, or mismatched. A slim production container may not contain `scripts/`, so do not run that command inside such a container.
3. Run `npm run db:migrate` in `npati Hub` and apply all migrations through `019_wordpress_chatgpt_default_enabled.sql`.
4. Build and deploy NPATI Hub and the NPATI backend MCP service, then restart both services.
5. Install `artifacts/npati-hub.zip` in WordPress. The archive is intentionally flat so WordPress creates the canonical `wp-content/plugins/npati-hub/npati-hub.php` path. If an older broken copy exists, remove its exact directory from `wp-content/plugins/` in cPanel first, then install the new ZIP.
6. Open NPATI in wp-admin and pair the site. After authorization, confirm that the WordPress website appears in the integration carousel on `npati.com/hub/`. ChatGPT access is enabled by default and can be disabled at any time from the integration dialog.
7. Test both onboarding paths: Connect NPATI must open the NPATI authorization page, while Create account must reveal the WordPress form and return to the connected Dashboard after registration.
8. Then test: create a listing with media, create a draft Hub publication, schedule it, and test Publish now.
9. Open the avatar menu in the plugin header, select a WordPress Media Library image no larger than 5 MB, and confirm that the same photo appears on npati.com.

Production requires HTTPS and PHP sodium for Ed25519 verification. Social OAuth tokens stay only in NPATI Hub and are never stored in WordPress.
