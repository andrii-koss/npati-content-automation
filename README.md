# NPATI Content Automation for WordPress

**Create marketplace listings, schedule social media posts, plan WordPress articles, and use optional AI-assisted content creation from one WordPress dashboard.**

[NPATI Content Automation](https://github.com/andrii-koss/npati-content-automation) connects WordPress to the [Npati marketplace](https://www.npati.com/) and [NPATI Hub](https://www.npati.com/hub/). It gives sellers, creators, publishers, and small businesses a practical workspace for marketplace listings, video content, social media scheduling, editorial planning, and content automation.

The plugin is **free to install and use**. OpenAI is optional. If you connect your own OpenAI API key, OpenAI may charge your account for API usage according to its pricing and terms.

## Table of contents

- [Who is this plugin for?](#who-is-this-plugin-for)
- [What makes it different?](#what-makes-it-different)
- [Getting started](#getting-started)
- [Market: listings, videos, and shorts](#market-listings-videos-and-shorts)
- [Hub: social media publishing](#hub-social-media-publishing)
- [Content: WordPress article planning](#content-wordpress-article-planning)
- [Settings](#settings)
- [Security](#security)
- [Requirements and installation](#requirements-and-installation)
- [Frequently asked questions](#frequently-asked-questions)
- [Useful links](#useful-links)
- [Development](#development)
- [License](#license)

## Who is this plugin for?

|     | Best for                               | How it helps                                                                      |
| --- | -------------------------------------- | --------------------------------------------------------------------------------- |
| 🛍️  | **Local sellers and online stores**    | Create rich product listings in WordPress and publish them to your Npati account. |
| 🏪  | **Small businesses**                   | Manage marketplace content and connected social channels from one workspace.      |
| 🎬  | **Creators and video marketers**       | Work with videos, Shorts, photo carousels, and video-first listings.              |
| ✍️  | **Bloggers and publishers**            | Plan SEO-focused WordPress articles manually or with optional AI assistance.      |
| 📣  | **Social media managers and agencies** | Schedule posts for connected services and review activity in a shared calendar.   |
| ⚙️  | **WordPress administrators and teams** | Control publishing permissions, integrations, security status, and audit history. |

## What makes it different?

| Feature                                       | Why it matters                                                                                          |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Marketplace + content + social publishing** | Manage several publishing workflows without leaving WordPress.                                          |
| **Direct Npati listing workflow**             | Build a listing in the plugin and publish it to the connected Npati profile.                            |
| **Rich photo and video listings**             | Upload up to six product photos, label colors, add video, and preview the result before publishing.     |
| **NPATI Hub integrations**                    | Connect supported services through secure provider authorization and schedule content from WordPress.   |
| **Editorial planner and bulk import**         | Create tasks manually or import CSV/XLSX files, then edit, reschedule, copy, or remove planned content. |
| **Optional bring-your-own OpenAI key**        | Choose an available model and generate content only when you decide to use AI features.                 |
| **Privacy-focused connection model**          | Social access tokens stay in NPATI Hub and are never stored in WordPress.                               |

## Getting started

After installing and activating the plugin:

1. Open **NPATI** in the WordPress admin menu.
2. Sign in to your existing Npati account or create a new account.
3. Review and approve the requested connection permissions.
4. Return to WordPress and start using the **Market**, **Hub**, and **Content** workspaces.

An Npati account is required for connected marketplace and Hub features. An OpenAI account and API key are needed only for optional AI-assisted writing.

## Market: listings, videos, and shorts

The **Market** workspace has three sections:

- **Listings** — create and manage marketplace listings.
- **Videos** — watch videos from your Npati profile and respond to comments.
- **Shorts** — view the Shorts published in your Npati profile.

### Create a listing

Open **Market → Listings** and select **Create listing**. Start with the core product information:

- **Title** — write a clear product name of up to 60 characters.
- **Category** — select the category that best matches the item.
- **Product description** — explain the item's features, condition, and important details in up to 2,000 characters.

<p align="center">
  <img src="docs/Market-1.gif" alt="Creating an Npati marketplace listing with a title, category, and product description in WordPress">
</p>

### Add product photos and preview the listing

The **Product photos** area accepts up to six images. Drag files into the upload area or select them from your device. The live preview on the right shows how the listing will appear, and its carousel controls let you review every uploaded image before publication.

<p align="center">
  <img src="docs/Market-2-photo.gif" alt="Uploading product photos to an Npati listing from WordPress">
</p>

<p align="center">
  <img src="docs/Market-3-photo.gif" alt="Reviewing product photos in the Npati listing preview carousel">
</p>

### Label photos by color

Enable **Label photos by color** to add a color label to each image. This helps shoppers understand which product color or variation is shown in each photo.

<p align="center">
  <img src="docs/Market-3-photo%2Bcolor.gif" alt="Adding color labels to individual Npati product photos">
</p>

### Combine six photos with a product video

In **Video and thumbnail**, upload a product video of up to 2 GB. The plugin creates a thumbnail automatically. You can build a listing with six photos plus one video; shoppers first see the photo carousel, followed by the video, which starts when reached in the preview carousel.

<p align="center">
  <img src="docs/Market-4-6%20photos%20%2B%20video.gif" alt="Creating an Npati listing with six product photos and a video">
</p>

### Create a larger video-first listing

For a video-focused presentation, remove the product photos and keep the video and thumbnail. The preview switches to a larger video layout. Choose either a photo-rich listing with video or a larger video-first card based on the product and your preferred presentation.

<p align="center">
  <img src="docs/Market-5-larger%20video.gif" alt="Creating a larger video-first Npati marketplace listing">
</p>

### Set the price and publish

Add the price, review the listing preview, and publish. The new listing appears in the plugin and in your connected Npati account.

<p align="center">
  <img src="docs/Market-6-price%20and%20publication.gif" alt="Setting a product price and publishing an Npati listing from WordPress">
</p>

For more listing tips, read [How to Create a Listing on Npati](https://en.npati.com/how-to-create-a-listing-on-npati/).

### Videos

The **Videos** section displays videos uploaded to your Npati profile. Watch them inside the WordPress workspace and reply when viewers leave comments.

<p align="center">
  <img src="docs/Market-7-video%20section.gif" alt="Viewing Npati profile videos and video comments in WordPress">
</p>

### Shorts

The **Shorts** section brings the short-form videos from your Npati profile into the plugin, so you can review your marketplace video content from WordPress.

## Hub: social media publishing

The **Hub** workspace brings connected publishing destinations and scheduled social media content into WordPress. It includes **Overview**, **Create Post**, **Calendar**, and **Connections**.

### Overview

Use **Overview** to see upcoming publications, recent activity, calendar markers, and the integrations connected to your NPATI Hub account.

<p align="center">
  <img src="docs/Hub-Overview-8.gif" alt="Reviewing scheduled publications, calendar activity, and integrations in NPATI Hub for WordPress">
</p>

### Create Post

Use **Create Post** to prepare, schedule, and edit a publication for a supported social service connected to your NPATI Hub account. Select the destination, add the content, and choose the publication date and time.

<p align="center">
  <img src="docs/Hub-Create%20Post-9.gif" alt="Creating and scheduling a social media post from the NPATI Hub WordPress workspace">
</p>

### Calendar and Connections

The expanded **Calendar** shows when posts and reposts are scheduled or published. **Connections** displays the services linked to your NPATI Hub account.

To add another integration, open [NPATI Hub](https://www.npati.com/hub/) and complete the provider's secure authorization flow. Facebook, Instagram, and other providers open their own login pages; after approval, you return to the WordPress workspace and the connection becomes available in the plugin.

<p align="center">
  <img src="docs/Hub-Calendar-Connections-10.gif" alt="Using the NPATI Hub publication calendar and connected social media services in WordPress">
</p>

## Content: WordPress article planning

The **Content** workspace is a WordPress content planner for SEO articles and scheduled publishing. You can:

- Add an article brief with a title, description, keywords, category, date, and time.
- Write content manually or use optional OpenAI-assisted generation.
- Import up to 5,000 tasks from a CSV or XLSX file of up to 5 MB.
- Preview imported rows before saving them.
- Search, filter, edit, copy, reschedule, delete, or bulk-delete planned articles.
- View scheduled and published articles in the content calendar.
- Prepare concise social media copy after an article is published and schedule it for a connected destination.

<p align="center">
  <img src="docs/Content-11.gif" alt="Planning, importing, editing, and scheduling WordPress articles with NPATI Content Automation">
</p>

To use AI writing or automated text generation, connect your own OpenAI API key and select a compatible model under **Settings**. All non-AI planning and scheduling features remain available without OpenAI.

## Settings

The **Settings** page gives administrators control over the WordPress and NPATI Hub connection:

- **Default WordPress author** — choose the default author for created content.
- **Store link** — explicitly opt in to showing a link to your Npati store in the site footer.
- **Security mode** — select the preferred security level.
- **Hub → WordPress** — allow signed commands to publish; when disabled, incoming content is limited to drafts.
- **Audit retention** — keep activity records for 7, 30, or 90 days.
- **Uninstall cleanup** — choose whether uninstalling removes plugin settings and local integration tables.

### OpenAI connection

OpenAI integration is optional and uses your own API key. The key is encrypted and stored only on your WordPress site; it is never sent to NPATI Hub. From **Settings**, you can:

- Connect or replace an OpenAI API key.
- Test the connection and load compatible models.
- Select the model you want to use.
- Save the configuration or disconnect OpenAI.

<p align="center">
  <img src="docs/Hub-Settings-12.gif" alt="Configuring WordPress publishing settings and an optional OpenAI model in NPATI Content Automation">
</p>

## Security

The **Security** page provides a clear status view for:

- HTTPS availability.
- The NPATI Hub connection.
- Webhook signature verification.
- Social token storage — social access tokens are never stored in WordPress.
- Recent activity, including successful and failed connection, API, and webhook events.

Remote publishing is disabled by default. Administrators can explicitly allow signed NPATI Hub commands to publish; otherwise, incoming content remains in draft status.

## Requirements and installation

### Requirements

- WordPress 6.4 or later.
- PHP 7.4 or later.
- An Npati account for marketplace and connected Hub features.
- An OpenAI API key only for optional AI features.

### Install from a release package

1. Download the latest plugin ZIP from the [GitHub repository](https://github.com/andrii-koss/npati-content-automation).
2. In WordPress, open **Plugins → Add New Plugin → Upload Plugin**.
3. Select the ZIP file, install it, and activate **NPATI Content Automation**.
4. Open **NPATI** in the WordPress admin menu and connect your account.

### Install a development checkout

Place this repository in:

```text
wp-content/plugins/npati-content-automation
```

Then activate **NPATI Content Automation** from the WordPress Plugins page.

## Frequently asked questions

### Is NPATI Content Automation free?

Yes. The plugin itself is free and does not require a subscription payment. If you choose to connect your own OpenAI API key, OpenAI API usage may be billed separately by OpenAI. Other connected third-party services remain subject to their own terms and pricing.

### Is OpenAI required?

No. OpenAI is optional and is contacted only after an administrator configures and uses an AI feature. Marketplace, connection, planning, and supported publishing features do not require an OpenAI key unless AI-generated text is requested.

### Where is my OpenAI API key stored?

The key is encrypted and stored locally on the WordPress site. It is sent directly to OpenAI only when testing the connection or using an AI feature, and it is never sent to NPATI Hub.

### Are social media access tokens stored in WordPress?

No. Social credentials remain protected in the NPATI Hub Token Vault and are never stored in WordPress.

### Can NPATI Hub publish directly to WordPress?

Only when a WordPress administrator explicitly enables signed remote publishing. With that option disabled, remote content is limited to drafts.

### Where can I connect social media services?

Open [NPATI Hub](https://www.npati.com/hub/), choose an integration, and complete the provider's secure authorization process. The connected service will then appear in the plugin's **Connections** section.

## Useful links

- [Npati marketplace](https://www.npati.com/)
- [NPATI Hub](https://www.npati.com/hub/)
- [Npati Blog](https://en.npati.com/)
- [How to Create a Listing on Npati](https://en.npati.com/how-to-create-a-listing-on-npati/)
- [Source code and releases](https://github.com/andrii-koss/npati-content-automation)

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

Create a WordPress.org-ready distribution package from the repository root:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\build-wordpress-plugin.ps1
```

The archive is written to `dist/npati-content-automation-<version>.zip`. Development dependencies, tests, documentation, and repository metadata are excluded automatically.

## License

NPATI Content Automation is licensed under the [GNU General Public License v2.0 or later](LICENSE).
