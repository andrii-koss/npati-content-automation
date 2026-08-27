# NPATI Content Automation

NPATI Content Automation is a WordPress plugin for connecting a site to NPATI Hub, managing supported content and publishing workflows, and optionally generating content with OpenAI.

The public source repository is:

https://github.com/andrii-koss/npati-content-automation

## Requirements

- WordPress 6.4 or later
- PHP 7.4 or later
- An NPATI account for connected Hub features
- An OpenAI API key only when the optional AI features are used

## Development

The plugin runtime source is stored directly in this repository. JavaScript in `assets/js/` is human-readable and is not generated, minified, bundled, or compiled.

Install development dependencies and run the checks:

```bash
npm install
npm run format:check
npm run check
composer install
composer lint
```

Additional functional checks are available through the `check:*` npm scripts in `package.json`.

## WordPress installation

For a local development checkout, place the repository in `wp-content/plugins/npati-content-automation`, then activate **NPATI Content Automation** in WordPress.

The WordPress.org distribution ZIP is produced from the private integration workspace by its release script. Development dependencies, tests, and repository metadata are excluded from that ZIP.

## License

NPATI Content Automation is licensed under the GNU General Public License v2.0 or later. See [LICENSE](LICENSE).
