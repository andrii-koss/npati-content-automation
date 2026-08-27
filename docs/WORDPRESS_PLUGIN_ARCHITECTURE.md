# WordPress plugin architecture

`NPATI\Hub\Core\Plugin` composes small modules. WordPress owns UI, local capability checks, posts/products, cached read models, four integration tables, SEO checks and signed webhook verification. NPATI Hub owns login, social OAuth/tokens, publishing policy, scheduler, queues, adapters, media processing, remote analytics and security quarantine.

The browser calls authenticated local `/wp-json/npati/v1/*` routes. PHP calls only allowlisted NPATI hosts. Hub calls the single signed `/wp-json/npati/v1/webhook` endpoint. Heavy or mass operations become Hub jobs.

Modules are optional and defensive: Yoast is selected only when active, WooCommerce code is instantiated only when WooCommerce exists, and NPATI outages never hook into normal frontend or post rendering paths except explicitly inserted cached blocks/shortcodes.

Multisite state uses per-site options and prefixed tables. No network site shares another site's credential.
