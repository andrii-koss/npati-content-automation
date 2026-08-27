# NPATI Content Automation deployment

This document covers release preparation and staging verification for the WordPress plugin. NPATI Hub and other NPATI services are deployed separately.

## Prepare the plugin

1. Confirm that the version in `npati-hub.php`, `package.json`, the README badge, and the `Stable tag` in `readme.txt` are identical.
2. Install development dependencies with `npm install` and `composer install`.
3. Run the JavaScript, functional, PHP coding-standard, and package checks documented in [CONTRIBUTING.md](../CONTRIBUTING.md).
4. Build the WordPress-ready archive:

   ```powershell
   powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\build-wordpress-plugin.ps1
   ```

5. Confirm that `dist/npati-content-automation-<version>.zip` contains the `npati-content-automation/` wrapper directory and excludes development-only files.

## Verify on staging

1. Install the generated ZIP on a clean supported WordPress site.
2. Activate **NPATI Content Automation** and open **NPATI** in WordPress admin.
3. Test both onboarding paths: connect an existing NPATI account and create a new account.
4. Create a marketplace listing with supported media and confirm that it appears in the connected NPATI account.
5. Create and schedule a Hub publication, then review it in the Calendar.
6. Create, import, edit, and schedule Content tasks.
7. If OpenAI testing is required, connect a test API key, test a compatible model, and disconnect it afterward.
8. Review the Security page, audit activity, remote publishing setting, and disconnect behavior.
9. Run activation, deactivation, uninstall, accessibility, malware, and WordPress Plugin Check reviews before public distribution.

## Publish a GitHub Release

No stable GitHub Release is currently available. Until one is published, the README correctly directs users to **Code > Download ZIP**.

When version 1.0.2 passes all release checks:

1. Create the tag `v1.0.2` from the verified `main` commit.
2. Create a GitHub Release for that tag.
3. Attach `dist/npati-content-automation-1.0.2.zip` as the installation asset.
4. Download the attached asset and repeat the clean-install smoke test.
5. Change the public installation instructions to link to the release asset only after that asset is available.

Production connections require HTTPS. PHP sodium is required for Ed25519 webhook verification. Social OAuth tokens stay in NPATI Hub and are never stored in WordPress.
