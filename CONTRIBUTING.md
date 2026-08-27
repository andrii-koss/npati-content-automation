# Contributing to NPATI Content Automation

Thank you for helping improve NPATI Content Automation. Contributions may include bug fixes, accessibility improvements, documentation updates, security hardening, tests, and focused feature changes that match the existing plugin scope.

## Before you start

1. Search the existing issues and pull requests to avoid duplicate work.
2. Open an issue before starting a large or behavior-changing contribution.
3. Use the repository's [security policy](SECURITY.md) for vulnerabilities. Do not report security issues publicly.
4. Keep changes focused. Avoid unrelated formatting or refactoring.

## Development requirements

- WordPress 6.4 or later.
- PHP 7.4 or later.
- Node.js and npm.
- Composer.

Install development dependencies from the repository root:

```bash
npm install
composer install
```

## Development checks

Run the checks that apply to your change:

```bash
npm run format:check
npm run check
composer lint
composer test
```

Additional functional checks are available through the `check:*` scripts in `package.json`.

To create a WordPress-ready test package on Windows:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\build-wordpress-plugin.ps1
```

The generated archive is written to `dist/npati-content-automation-<version>.zip`.

## Coding guidelines

- Follow the WordPress Coding Standards for PHP.
- Use WordPress capabilities, nonces, sanitization, escaping, and HTTP APIs.
- Keep JavaScript in `assets/js/` human-readable.
- Do not commit generated dependencies such as `vendor/` or `node_modules/`.
- Do not add secrets, API keys, tokens, credentials, personal data, or production logs.
- Preserve backward compatibility with WordPress 6.4 and PHP 7.4 unless a version change is explicitly approved.
- Add or update tests for behavior changes.
- Update user documentation when a visible workflow changes.

## Pull requests

A pull request should:

- Explain the problem and the chosen solution.
- Reference the related issue when one exists.
- Describe how the change was tested.
- Include screenshots or short demonstrations for visible interface changes.
- Keep the plugin version, `Stable tag`, changelog, and package metadata synchronized when preparing a release.
- Pass the relevant JavaScript, PHP, functional, and packaging checks.

By contributing, you agree that your contribution is licensed under the [GNU General Public License v2.0 or later](LICENSE).
