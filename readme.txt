=== NPATI Content Automation ===
Contributors: npati
Tags: content automation, ai content, post scheduling, openai, chatgpt
Requires at least: 6.4
Tested up to: 7.1
Requires PHP: 7.4
Stable tag: 1.0.2
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Automate WordPress content with NPATI Hub: create, edit, schedule and publish posts, manage media, and optionally generate content with OpenAI.

== Description ==

NPATI Content Automation is a WordPress integration client for NPATI Hub. An NPATI account is required for connected Hub features. A WordPress administrator chooses when to connect the site and which supported actions to enable.

The plugin supports PHP 7.4 and has been tested successfully on PHP 7.4. PHP 8.2 is currently used and recommended. The plugin has been tested with WordPress 7.1.

Official plugin page: https://www.npati.com/plugins/npati-content-automation/

The plugin can create and update WordPress drafts, work with supported publishing and scheduling workflows, manage selected media, categories and tags, and provide optional OpenAI-assisted content generation. Remote publishing is disabled by default.

Social scheduling, queues, social OAuth and social credentials remain in NPATI Hub. The plugin does not store Facebook, Instagram, Telegram, Pinterest or other social access tokens in WordPress and does not publish directly to a social API.

= External services and data disclosure =

This plugin uses external services only after an administrator takes an explicit action to connect or configure the corresponding feature. Installing or activating the plugin alone does not start NPATI pairing or OpenAI requests.

= NPATI and NPATI Hub =

NPATI Hub is the required external service for account pairing and connected NPATI workflows. It is contacted when an administrator selects Connect NPATI or Create account, and later when an authorized connected feature is used.

During pairing, the plugin sends the site URL and name, selected market, a site fingerprint, callback URL, and WordPress, PHP and plugin versions. If an administrator creates an NPATI account from the plugin, the chosen username, email and password are sent directly to the NPATI registration endpoint; the password is not stored by WordPress.

After connection, the plugin may send or receive only the data needed for a feature the administrator uses. Depending on that feature, this can include NPATI account and connection identifiers; WordPress post IDs, titles, content, excerpts, status, URLs, dates and SEO fields; categories and tags; media IDs, URLs, filenames and metadata; publication or scheduling instructions; selected marketplace, profile, address, listing, WooCommerce or social-publishing job data; permissions; request IDs; connection status; and limited error or audit metadata.

NPATI Hub uses these data for authentication, compatibility checks, content and marketplace synchronization, authorized publishing or scheduling, media workflows, social workflows, diagnostics and security. Social-platform tokens remain in NPATI Hub rather than WordPress.

Disconnecting from the plugin asks NPATI Hub to revoke the site connection, clears the active local credential and stops future synchronization. It does not delete existing WordPress or remote content. Account or remote-data deletion can be requested through the NPATI Privacy Request page.

Service: https://www.npati.com/
Privacy: https://www.npati.com/privacy
Terms: https://www.npati.com/terms
Privacy requests: https://www.npati.com/privacy/request

= OpenAI API (optional) =

OpenAI is contacted only when a WordPress administrator enters an OpenAI API key and tests or uses an AI content feature. The key is sent directly from the WordPress site to OpenAI and is stored locally in WordPress using authenticated encryption; it is not sent to NPATI Hub. The administrator can disconnect OpenAI, which removes the locally stored OpenAI option.

To generate an article, the plugin may send an editorial title, description, keywords, category and generation instructions to OpenAI. To generate social copy, it may send an article title, URL and text. OpenAI returns generated content and response metadata. OpenAI may process request content and technical data under the terms and privacy documentation applicable to the administrator's OpenAI account. OpenAI API charges may apply.

Service: https://openai.com/
Terms: https://openai.com/policies/services-agreement/
Privacy: https://openai.com/policies/privacy-policy/
API data documentation: https://developers.openai.com/api/docs/guides/your-data#default-usage-policies-by-endpoint

No hidden telemetry is included. The optional frontend NPATI Store link is off by default.

= WordPress AI Client compatibility =

WordPress 7.0 and later include the provider-agnostic WordPress AI Client. NPATI Content Automation does not bundle the WordPress AI Client or the underlying PHP AI Client, so it cannot load duplicate SDK classes on WordPress 7.0 and later.

The current optional OpenAI feature intentionally keeps its existing direct provider for backward compatibility with WordPress 6.4 and later and to preserve its OpenAI-specific API-key connection, model discovery, Responses API structured output, and existing user settings. Requests use the WordPress HTTP API, never execute remote code, and send the encrypted key only to the fixed `https://api.openai.com/v1` service when an administrator tests or uses the feature. A future provider-agnostic migration should be made only when it can preserve these capabilities and existing settings without a functional regression.

= Source code and development =

Public source repository: https://github.com/andrii-koss/npati-content-automation

The human-readable JavaScript source used by the plugin is stored directly in `assets/js/` in that repository. The distributed `admin.js` and `blocks.js` files are the canonical source files: they are not minified, bundled, generated, or compiled, and there is no separate production JavaScript build step.

For a development checkout, run `npm install` in the repository root, then run `npm run format:check` to verify source formatting and `npm run check` for the static security checks. Run `npm run format` only when intentionally formatting JavaScript source. `package.json` and `package-lock.json` pin the development formatter. No third-party JavaScript or PHP libraries are bundled in the distributed plugin.

== Installation ==

1. Upload the `npati-content-automation` folder to `/wp-content/plugins/` or install its ZIP.
2. Activate NPATI Content Automation.
3. Open NPATI in wp-admin, select the market, and choose Connect NPATI.
4. Approve the website in NPATI Hub.

== Frequently Asked Questions ==

= Does WordPress store my social-network tokens? =

No. Social tokens remain in the NPATI Hub Token Vault.

= Is OpenAI required? =

No. OpenAI is optional. The plugin contacts OpenAI only after an administrator configures and uses the OpenAI feature.

= How do I disconnect external services? =

Use Disconnect in the NPATI connection settings to revoke the site connection, or Disconnect in the OpenAI settings to remove the locally stored OpenAI configuration. Disconnecting does not delete content already published or synchronized.

= Does deactivation delete content? =

No. Deactivation keeps settings, mappings, posts, products, listings, and remote publications.

= Does it work without Yoast or WooCommerce? =

Yes. Both integrations are optional and loaded only when available.

== Screenshots ==

1. NPATI marketplace content management with listings, videos and shorts.
2. Connect WordPress to NPATI Hub.
3. Plan and schedule WordPress content.
4. Configure optional OpenAI content generation.
5. Manage connected WordPress publishing workflows.

== Changelog ==

= 1.0.2 =
* Replaced direct admin CSS output with the WordPress enqueue and inline-style APIs, limited assets to NPATI admin screens, published readable JavaScript source and development instructions, and documented WordPress 7.0 AI Client compatibility.

= 1.0.1 =
* Added distinct Content Planner status colors, published-task removal, and published-article Calendar visibility checks.

= 1.0.0 =
* Initial public release of NPATI Content Automation.
