=== NPATI Content Automation ===
Contributors: npati
Tags: content automation, ai content, post scheduling, openai, editorial calendar
Requires at least: 6.4
Tested up to: 7.1
Requires PHP: 7.4
Stable tag: 1.0.2
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Create NPATI marketplace listings, schedule social posts, plan WordPress articles, import content in bulk, and optionally use OpenAI.

== Description ==

NPATI Content Automation brings marketplace listings, social media scheduling, and WordPress editorial planning into one admin workspace.

Connect your WordPress site to your NPATI account to create marketplace listings, review profile videos and Shorts, schedule content through NPATI Hub, and manage planned WordPress articles. OpenAI-assisted writing is optional and uses your own API key.

The plugin itself is free to install and use. Connected third-party services may have their own pricing and usage terms. OpenAI API charges may apply only when an administrator connects and uses an OpenAI API key.

Official plugin page: https://www.npati.com/plugins/npati-content-automation/

= Market: listings, videos, and Shorts =

Create and publish NPATI marketplace listings without leaving WordPress.

* Add a title, category, product description, price, and supported listing details.
* Upload up to six product photos and review them in the live carousel preview.
* Label individual photos by color.
* Upload a product video of up to 2 GB and create its thumbnail automatically.
* Combine six photos with a video or use the larger video-first presentation.
* View videos and Shorts from the connected NPATI profile.
* Review videos and reply to viewer comments.

Published listings appear in the plugin and in the connected NPATI account.

= Hub: social media scheduling and publishing =

NPATI Hub keeps supported publishing destinations and scheduled social content connected to WordPress.

* Overview shows upcoming publications, recent activity, calendar markers, and connected integrations.
* Create Post prepares, schedules, and edits posts for supported connected services.
* Calendar shows scheduled and published posts and reposts.
* Connections shows the services linked to the NPATI Hub account.

Social OAuth authorization takes place on the secure pages provided by NPATI and each connected service. Social access tokens remain in the NPATI Hub Token Vault and are never stored in WordPress.

= Content: WordPress article planning =

Use the Content workspace to organize SEO-focused WordPress articles and publishing schedules.

* Create article tasks with a title, description, keywords, category, publication date, and time.
* Write content manually or use optional OpenAI-assisted generation.
* Import up to 5,000 tasks from a CSV or XLSX file of up to 5 MB.
* Preview imported rows before saving them.
* Search, filter, edit, copy, reschedule, delete, or bulk-delete planned articles.
* View scheduled and published articles in the editorial calendar.
* Prepare concise social copy after publication and schedule it for a connected destination.

= Settings and security =

Administrators can choose the default WordPress author, explicitly enable the optional NPATI Store footer link, select a security mode, set audit retention, and control uninstall cleanup.

Remote publishing is disabled by default. Administrators may explicitly allow signed NPATI Hub commands to publish. When this option is disabled, incoming content is limited to drafts.

The Security page reports HTTPS availability, connection status, webhook signature support, social token storage status, and recent API, webhook, and connection activity.

= Optional OpenAI connection =

OpenAI is not required for marketplace, planning, connection, or supported scheduling features. Administrators who want AI-assisted writing can connect their own OpenAI API key, test the connection, and select a compatible model.

The API key is encrypted and stored only on the WordPress site. It is never sent to NPATI Hub. The plugin sends the key directly to OpenAI only when an administrator tests the connection or uses an AI feature.

= Requirements =

* WordPress 6.4 or later.
* PHP 7.4 or later.
* An NPATI account for connected marketplace and Hub features.
* An OpenAI API key only for optional AI-assisted features.

PHP 8.2 is currently used and recommended. The plugin has been tested with WordPress 7.1.

= External services and data disclosure =

This plugin uses external services only after an administrator takes an explicit action to connect or configure the corresponding feature. Installing or activating the plugin alone does not start NPATI pairing or OpenAI requests.

= NPATI and NPATI Hub =

NPATI Hub is the required external service for account pairing and connected NPATI workflows. It is contacted when an administrator selects Connect NPATI or Create account, and later when an authorized connected feature is used.

During pairing, the plugin sends the site URL and name, selected market, a site fingerprint, callback URL, and WordPress, PHP, and plugin versions. If an administrator creates an NPATI account from the plugin, the chosen username, email, and password are sent directly to the NPATI registration endpoint. The password is not stored by WordPress.

After connection, the plugin may send or receive only the data needed for a feature the administrator uses. Depending on that feature, this can include NPATI account and connection identifiers; WordPress post IDs, titles, content, excerpts, status, URLs, dates, and SEO fields; categories and tags; media IDs, URLs, filenames, and metadata; publication or scheduling instructions; selected marketplace, profile, address, listing, WooCommerce, or social-publishing job data; permissions; request IDs; connection status; and limited error or audit metadata.

NPATI Hub uses these data for authentication, compatibility checks, content and marketplace synchronization, authorized publishing or scheduling, media workflows, social workflows, diagnostics, and security. Social-platform tokens remain in NPATI Hub rather than WordPress.

Disconnecting from the plugin asks NPATI Hub to revoke the site connection, clears the active local credential, and stops future synchronization. It does not delete existing WordPress or remote content. Account or remote-data deletion can be requested through the NPATI Privacy Request page.

Service: https://www.npati.com/
Privacy: https://www.npati.com/privacy
Terms: https://www.npati.com/terms
Privacy requests: https://www.npati.com/privacy/request

= OpenAI API (optional) =

OpenAI is contacted only when a WordPress administrator enters an OpenAI API key and tests or uses an AI content feature. The key is sent directly from the WordPress site to OpenAI and is stored locally in WordPress using authenticated encryption. It is not sent to NPATI Hub. The administrator can disconnect OpenAI, which removes the locally stored OpenAI option.

To generate an article, the plugin may send an editorial title, description, keywords, category, and generation instructions to OpenAI. To generate social copy, it may send an article title, URL, and text. OpenAI returns generated content and response metadata. OpenAI may process request content and technical data under the terms and privacy documentation applicable to the administrator's OpenAI account. OpenAI API charges may apply.

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

User documentation: https://github.com/andrii-koss/npati-content-automation/tree/main/docs

The human-readable JavaScript source used by the plugin is stored directly in `assets/js/` in that repository. The distributed `admin.js` and `blocks.js` files are the canonical source files. They are not minified, bundled, generated, or compiled, and there is no separate production JavaScript build step.

For a development checkout, run `npm install` in the repository root, then run `npm run format:check` to verify source formatting and `npm run check` for the static security checks. Run `npm run format` only when intentionally formatting JavaScript source. `package.json` and `package-lock.json` pin the development formatter. No third-party JavaScript or PHP libraries are bundled in the distributed plugin.

== Installation ==

1. Upload the `npati-content-automation` folder to `/wp-content/plugins/` or install a ZIP archive of the plugin.
2. Activate NPATI Content Automation.
3. Open NPATI in WordPress admin, select the market, and choose Connect NPATI.
4. Sign in to an existing NPATI account or create an account.
5. Review and approve the requested connection permissions.

== Frequently Asked Questions ==

= Is NPATI Content Automation free? =

Yes. The plugin itself is free to install and use. Connected third-party services may have their own terms and pricing. OpenAI may bill your account separately only when you connect and use your own API key.

= Does WordPress store my social-network tokens? =

No. Social tokens remain in the NPATI Hub Token Vault.

= Is OpenAI required? =

No. OpenAI is optional. The plugin contacts OpenAI only after an administrator configures and uses an AI feature.

= Where is my OpenAI API key stored? =

The key is encrypted and stored locally on the WordPress site. It is sent directly to OpenAI only when testing the connection or using an AI feature, and it is never sent to NPATI Hub.

= How do I connect social media services? =

Open NPATI Hub, choose an integration, and complete the provider's secure authorization process. The connected service then appears in the plugin's Connections section.

= How do I disconnect external services? =

Use Disconnect in the NPATI connection settings to revoke the site connection, or Disconnect in the OpenAI settings to remove the locally stored OpenAI configuration. Disconnecting does not delete content already published or synchronized.

= Does deactivation delete content? =

No. Deactivation keeps settings, mappings, posts, products, listings, and remote publications.

= Does it work without Yoast or WooCommerce? =

Yes. Both integrations are optional and loaded only when available.

== Screenshots ==

1. Create NPATI marketplace listings with product details, photos, video, and live preview.
2. Review NPATI profile videos, Shorts, and viewer comments.
3. View scheduled publications and connected services in NPATI Hub.
4. Create and schedule social media posts for supported connected destinations.
5. Manage scheduled and published posts and reposts in the calendar.
6. Import, create, edit, and schedule WordPress article tasks.
7. Configure publishing, security, and optional OpenAI settings.

== Changelog ==

= 1.0.2 =
* Expanded user-facing documentation for existing Market, Hub, Content Planner, security, and optional OpenAI workflows.
* Replaced direct admin CSS output with the WordPress enqueue and inline-style APIs, limited assets to NPATI admin screens, published readable JavaScript source and development instructions, and documented WordPress 7.0 AI Client compatibility.

= 1.0.1 =
* Added distinct Content Planner status colors, published-task removal, and published-article Calendar visibility checks.

= 1.0.0 =
* Initial public release of NPATI Content Automation.
