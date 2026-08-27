import { readFile, readdir } from 'node:fs/promises';
import { resolve, relative } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const compact = (value) => String(value).replace(/\s+/g, '').replace(/["'`]/g, '"');
function searchable(source) {
  return {
    includes(needle) {
      return source.includes(needle) || compact(source).includes(compact(needle));
    },
    toString() {
      return source;
    },
    [Symbol.toPrimitive]() {
      return source;
    }
  };
}
async function files(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = resolve(dir, entry.name);
    if (entry.isDirectory()) out.push(...await files(path));
    else if (/\.(php|js|css)$/.test(entry.name)) out.push(path);
  }
  return out;
}

const forbidden = [
  [/\beval\s*\(/, 'eval'], [/\bshell_exec\s*\(/, 'shell_exec'], [/\bpassthru\s*\(/, 'passthru'],
  [/wp_remote_(?:get|post|request)\s*\(\s*\$_/, 'unvalidated dynamic HTTP'],
  [/register_rest_route[\s\S]{0,500}'permission_callback'\s*=>\s*'__return_true'/, 'public REST permission bypass'],
  [/dangerouslySetInnerHTML/, 'unsafe React HTML']
];
let failed = false;
for (const file of await files(root)) {
  const source = await readFile(file, 'utf8');
  for (const [pattern, label] of forbidden) if (pattern.test(source)) {
    console.error(`${relative(root, file)}: forbidden ${label}`); failed = true;
  }
}
const admin = searchable(await readFile(resolve(root, 'includes/Admin/Admin.php'), 'utf8'));
const adminJs = searchable(await readFile(resolve(root, 'assets/js/admin.js'), 'utf8'));
const adminCss = searchable(await readFile(resolve(root, 'assets/css/admin.css'), 'utf8'));
const adminMenuCss = searchable(await readFile(resolve(root, 'assets/css/admin-menu.css'), 'utf8'));
const bootstrap = searchable(await readFile(resolve(root, 'npati-hub.php'), 'utf8'));
const settings = searchable(await readFile(resolve(root, 'includes/Core/Settings.php'), 'utf8'));
const i18n = searchable(await readFile(resolve(root, 'includes/Core/I18n.php'), 'utf8'));
const client = searchable(await readFile(resolve(root, 'includes/Api/Client.php'), 'utf8'));
const uninstall = searchable(await readFile(resolve(root, 'uninstall.php'), 'utf8'));
const webhook = searchable(await readFile(resolve(root, 'includes/Security/WebhookController.php'), 'utf8'));
const connection = searchable(await readFile(resolve(root, 'includes/Auth/ConnectionService.php'), 'utf8'));
const activator = searchable(await readFile(resolve(root, 'includes/Core/Activator.php'), 'utf8'));
if (!bootstrap.includes("'Activator.php'")) {
  console.error('npati-hub.php: activation class is not loaded explicitly'); failed = true;
}
if (/PRIMARY KEY[^\r\n]+(?:UNIQUE )?KEY/.test(activator)) {
  console.error('includes/Core/Activator.php: dbDelta indexes must be declared on separate lines'); failed = true;
}
for (const action of ['wordpress.posts.list', 'wordpress.post.get', 'wordpress.taxonomies.list', 'wordpress.category.create', 'wordpress.tag.create', 'wordpress.post.create', 'wordpress.post.update', 'wordpress.post.publish']) {
  if (!webhook.includes(action)) { console.error(`Signed WordPress command is missing: ${action}`); failed = true; }
}
for (const guard of ['expected_content_hash', 'content_hash', 'allow_remote_publish', 'wp_set_post_terms', '_yoast_wpseo_metadesc']) {
  if (!webhook.includes(guard)) { console.error(`WordPress content safety/SEO support is missing: ${guard}`); failed = true; }
}
if (!connection.includes('signing_key_fingerprint') || !connection.includes("unset( $row['hub_public_key'] )")) {
  console.error('Connection status must expose only a safe signing-key fingerprint'); failed = true;
}
if (!connection.includes("get_option( 'npati_hub_db_version', '' )") || !connection.includes("'status'    => 'disconnected'")) {
  console.error('Connection status must tolerate an uninitialized site or isolated Plugin Check prefix'); failed = true;
}
if (!uninstall.includes("/uninstall") || !uninstall.includes("X-API-Key")) {
  console.error('uninstall.php: remote WordPress integration cleanup is missing'); failed = true;
}
if (/\$items\s*=\s*array\(\s*'npati'\s*=>/.test(admin)) {
  console.error('includes/Admin/Admin.php: top-level NPATI page is registered twice'); failed = true;
}
if (!/if\s*\(\s*\$this->rendered\s*\)\s*\{?\s*return\s*;?/.test(admin)) {
  console.error('includes/Admin/Admin.php: missing duplicate render guard'); failed = true;
}
for (const removed of ['NPATI CONNECTION', 'Connect NPATI to open this workspace', 'Open connection screen']) {
  if (admin.includes(removed)) {
    console.error(`includes/Admin/Admin.php: obsolete disconnected intermediary returned: ${removed}`); failed = true;
  }
}
if (!admin.includes("if(empty($status['connected'])){$this->connection_page();}")) {
  console.error('includes/Admin/Admin.php: disconnected plugin routes do not render onboarding directly'); failed = true;
}
for (const removedSlug of ['npati-analytics']) {
  if (admin.includes(`'${removedSlug}'`)) {
    console.error(`includes/Admin/Admin.php: removed page ${removedSlug} returned`); failed = true;
  }
}
for (const required of ["'npati-content'", 'data-npati-route="content"']) {
  if (!admin.includes(required)) { console.error(`Content navigation is missing: ${required}`); failed = true; }
}
if (!admin.includes("remove_submenu_page('npati','npati')")) {
  console.error('includes/Admin/Admin.php: Dashboard submenu is still registered'); failed = true;
}
if (!admin.includes("add_menu_page('NPATI','NPATI','npati_view','npati',array($this,'page'),NPATI_HUB_URL.'assets/images/favicon.png',58)") || admin.includes("'dashicons-marker'") || !admin.includes("remove_submenu_page('npati','npati-calendar')") || !admin.includes("remove_submenu_page('npati','npati-connections')")) {
  console.error('WordPress admin menu branding or hidden Hub shortcuts are missing'); failed = true;
}
for (const required of ['width:20px!important', 'height:20px!important', 'background:#fffurl("../images/favicon.png")center/20px20pxno-repeat!important', 'display:none!important']) {
  if (!adminMenuCss.includes(required)) {
    console.error(`WordPress admin menu icon sizing is missing: ${required}`); failed = true;
  }
}
for (const removedRoute of ['data-route="dashboard"', 'data-route="hub/history"', 'data-route="analytics"', "state.route==='dashboard'", "state.route==='hub/history'", "state.route==='analytics'"]) {
  if (admin.includes(removedRoute) || adminJs.includes(removedRoute)) {
    console.error(`Removed plugin route returned: ${removedRoute}`); failed = true;
  }
}
for (const tab of ['listings', 'videos', 'shorts']) {
  if (!adminJs.includes(`${tab}:{label:`)) {
    console.error(`assets/js/admin.js: Market tab ${tab} is not wired`); failed = true;
  }
}
if (adminJs.includes('archived:{label:')) {
  console.error('assets/js/admin.js: removed Market Archive tab returned'); failed = true;
}
if (adminJs.includes('drafts:{label:') || adminJs.includes('data-market-tab="drafts"')) {
  console.error('assets/js/admin.js: removed Market Drafts tab returned'); failed = true;
}
for (const required of ["listings:{label:'Listings',status:'listings',type:'listing'}", "api('market/listings?status=pending')", "api('market/listings?status=rejected')", 'mergeListingStatuses']) {
  if (!adminJs.includes(required)) {
    console.error(`assets/js/admin.js: Listings status aggregation is missing: ${required}`); failed = true;
  }
}
for (const required of ['verificationBadgeColors', 'verificationSealPath', 'verificationBadgeType', 'verificationTooltip', 'npati-verification-tooltip', 'listingVerificationBadge(author)', 'editIcon=', 'deleteIcon=', 'enhanceListingActionMenus', 'share-listing']) {
  if (!adminJs.includes(required) && !adminCss.includes(required)) {
    console.error(`Listing verification/menu frontend parity is missing: ${required}`); failed = true;
  }
}
if (!adminJs.includes('[data-market-tab]')) {
  console.error('assets/js/admin.js: Market tab click handler is missing'); failed = true;
}
if (adminJs.includes('NPATI MARKET ·')) {
  console.error('assets/js/admin.js: redundant Market eyebrow returned'); failed = true;
}
if (!adminJs.includes('npati-market-heading')) {
  console.error('assets/js/admin.js: dedicated Market heading styles are not wired'); failed = true;
}
for (const required of ['filter-publications-by-date', 'set-publication-view', 'publicationMediaUrls', 'publication-media-next', 'npati-connected-controls', 'platformAccountId']) {
  if (!adminJs.includes(required)) {
    console.error(`assets/js/admin.js: Hub overview parity is missing: ${required}`); failed = true;
  }
}
if (!admin.includes('npati-hub-overview-actions') || admin.includes("__('New publication','npati-hub')") || adminJs.includes('class="npati-launch-row"')) {
  console.error('Hub overview actions were not moved from the lower row to the heading'); failed = true;
}
for (const required of ['npati-security-basic', 'npati-security-log', 'npati-security-table', 'npati-audit-status', 'Security status']) {
  if (!admin.includes(required)) {
    console.error(`Compact Security page is missing: ${required}`); failed = true;
  }
}
for (const required of ['npati-security-value', 'security_status_item', 'max-height:230px', 'scrollbar-color:#111 #f1f1f1']) {
  if (!admin.includes(required) && !adminCss.includes(required)) {
    console.error(`Security status/readable five-row activity UI is missing: ${required}`); failed = true;
  }
}
for (const required of ['npati-settings-basic', 'form-table', 'npati-settings-market', 'npati-settings-actions', 'Save Settings']) {
  if (!admin.includes(required)) {
    console.error(`Original Settings form structure is missing: ${required}`); failed = true;
  }
}
for (const required of ['appearance:none!important', 'content:"✓"!important', 'npati[store_link_text]', 'font-size:14px']) {
  if (!adminCss.includes(required)) {
    console.error(`Readable Settings controls are missing: ${required}`); failed = true;
  }
}
for (const required of ['input[name="npati[store_link_text]"]{box-sizing:border-box;width:min(100%,210px);height:40px', 'input[name="npati[store_link_text]"]:hover{border-color:#111}', 'border-radius:8px']) {
  if (!adminCss.includes(required)) {
    console.error(`Store-link field does not match the other Settings controls: ${required}`); failed = true;
  }
}
if (admin.includes('npati-security-heading') || admin.includes('npati-settings-panel') || !admin.includes("filemtime(NPATI_HUB_DIR.'assets/css/admin.css')") || !admin.includes("wp_enqueue_style('npati-hub-admin-menu',NPATI_HUB_URL.'assets/css/admin-menu.css'")) {
  console.error('Broken Security/Settings redesign or stale asset caching returned'); failed = true;
}
if (admin.includes("add_action('admin_head'") || /echo\s+['\"]<style/i.test(admin)) {
  console.error('includes/Admin/Admin.php: direct admin CSS output returned'); failed = true;
}
for (const required of ['width:700px', 'height:184px', 'grid-auto-columns:10px', 'width:150px', '.npati-scheduled-media']) {
  if (!((await readFile(resolve(root, 'assets/css/admin.css'), 'utf8')).includes(required))) {
    console.error(`assets/css/admin.css: Hub overview frontend sizing is missing: ${required}`); failed = true;
  }
}
for (const required of ['status-queued .npati-scheduled-status', 'status-processing .npati-scheduled-status', 'status-partially_published .npati-scheduled-status', 'status-published .npati-scheduled-status', 'status-failed .npati-scheduled-status', 'status-cancelled .npati-scheduled-status', 'status-canceled .npati-scheduled-status']) {
  if (!adminCss.includes(required)) {
    console.error(`assets/css/admin.css: NPATI Hub publication status color is missing: ${required}`); failed = true;
  }
}
if (adminJs.includes("state.marketTab==='listings'?'<button class=\"npati-primary-button\" data-route=\"market/create\">Create listing</button>':''")) {
  console.error('assets/js/admin.js: duplicate Create listing empty-state button returned'); failed = true;
}
if (!adminJs.includes("location.assign(result.authorization_url)")) {
  console.error('assets/js/admin.js: NPATI sign-in redirect is missing'); failed = true;
}
if (!adminJs.includes("fetch(pairing.registration_url")) {
  console.error('assets/js/admin.js: direct Hub registration is missing'); failed = true;
}
if (!admin.includes('id="npati-registration-form"')) {
  console.error('includes/Admin/Admin.php: inline registration form is missing'); failed = true;
}
if (admin.includes('npati-onboarding-logo') || admin.includes('NPATI HUB FOR WORDPRESS')) {
  console.error('includes/Admin/Admin.php: redundant onboarding icon or label returned'); failed = true;
}
if (admin.includes('name="npati[market]"')) {
  console.error('includes/Admin/Admin.php: WordPress market selector must be profile-controlled'); failed = true;
}
if (settings.includes("$input['market']")) {
  console.error('includes/Core/Settings.php: admin input can override the NPATI profile market'); failed = true;
}
if (!adminJs.includes("cfg.language === 'uk'") || !i18n.includes("'UA' === strtoupper")) {
  console.error('English/Ukrainian market localization is missing'); failed = true;
}
if (/class="npati-secondary-button"[^>]+href="https:\/\/www\.npati\.com\/register/.test(admin)) {
  console.error('includes/Admin/Admin.php: onboarding still redirects registration away from WordPress'); failed = true;
}
if (admin.includes('npati-header-title') || admin.includes('npati-icon-button')) {
  console.error('includes/Admin/Admin.php: removed header title or plus button returned'); failed = true;
}
for (const required of ['npati-profile-trigger', 'data-profile-action="avatar"', "'/profile/avatar'"]) {
  if (!admin.includes(required) && !((await readFile(resolve(root, 'includes/Api/RestController.php'), 'utf8')).includes(required))) {
    console.error(`NPATI profile header integration is missing: ${required}`); failed = true;
  }
}
if (!adminJs.includes("api('profile/avatar'") || !adminJs.includes("api('profile')")) {
  console.error('assets/js/admin.js: NPATI profile load/update is not wired'); failed = true;
}
if (!adminJs.includes('profileTrigger&&cfg.connected')) {
  console.error('assets/js/admin.js: offline pages can still request the protected profile'); failed = true;
}
for (const required of ["get_transient('npati_hub_profile')", "'profile'=>$profile", "'connectionId'=>$status['connection_id']??''"]) {
  if (!admin.includes(required)) {
    console.error(`includes/Admin/Admin.php: stable cached profile configuration is missing: ${required}`); failed = true;
  }
}
for (const required of ['hydrateWorkspaceCache()', 'saveWorkspaceCache()', 'workspaceCacheFresh', 'sessionStorage']) {
  if (!adminJs.includes(required)) {
    console.error(`assets/js/admin.js: workspace request cache is missing: ${required}`); failed = true;
  }
}
for (const required of ['invalidateWorkspaceCache()', 'refreshHubJobs(', "api('hub/posts?limit=100')", "window.addEventListener('focus'", "document.addEventListener('visibilitychange'", 'await loadData(true)']) {
  if (!adminJs.includes(required)) {
    console.error(`assets/js/admin.js: Hub publication cache revalidation is missing: ${required}`); failed = true;
  }
}
if (!admin.includes('data-profile-action="disconnect"') || !adminJs.includes("api('disconnect'")) {
  console.error('NPATI profile menu sign-out action is missing'); failed = true;
}
for (const required of ["'invalid_api_key' === $code", 'invalidate_connection', "status='disconnected'", "delete_transient( 'npati_hub_profile' )"]) {
  if (!client.includes(required)) {
    console.error(`includes/Api/Client.php: invalid API key recovery is missing: ${required}`); failed = true;
  }
}
if (!adminJs.includes("startsWith('npatiHubWorkspace:')") || !adminJs.includes("location.assign(cfg.adminBaseUrl")) {
  console.error('assets/js/admin.js: invalid API key does not return the user to NPATI sign-in'); failed = true;
}
if (!client.includes('$is_pairing_request') || !client.includes("'/wordpress/pairings'")) {
  console.error('includes/Api/Client.php: pairing cannot bypass a stale circuit breaker'); failed = true;
}
for (const required of ['npati-listing-author', 'npati-listing-likes', 'listing-media-next', 'npati-listing-open', 'toggle-listing-menu', 'edit-listing', 'delete-listing', 'toggle-listing-like', 'viewsCount', 'discountPrice']) {
  if (!adminJs.includes(required)) {
    console.error(`Frontend-compatible Market card is missing: ${required}`); failed = true;
  }
}
if (adminJs.includes('class="npati-video-play"')) {
  console.error('assets/js/admin.js: listing video still renders the removed centered Play button'); failed = true;
}
for (const required of ['maxlength="60"', 'maxlength="2000"', 'listing-photos', 'listing-video', 'listing-thumbnail', 'enableColors', 'enableSizes', 'shippingAddressId', 'packageSizePreset', 'toggle-listing-schedule', 'Product Preview']) {
  if (!adminJs.includes(required)) {
    console.error(`create-product parity is missing: ${required}`); failed = true;
  }
}
for (const required of ['form.elements.disableBuy.disabled = true', 'form.elements.shippingAvailable.disabled = true', 'disableBuy: true', 'shippingAvailable: false']) {
  if (!adminJs.includes(required)) {
    console.error(`Temporary purchase/delivery restriction is missing: ${required}`); failed = true;
  }
}
for (const required of ['generateListingVideoThumbnail', 'createAutomaticListingThumbnail', "path:'/wp/v2/media'", 'is-thumbnail-video', 'is-media-carousel', "dataset.cardVariant=thumbnailVideoMode?'tall':'short'", "if(mediaCarouselMode&&activeItem?.videoUrl)"]) {
  if (!adminJs.includes(required)) {
    console.error(`create-product video thumbnail parity is missing: ${required}`); failed = true;
  }
}
for (const required of ['listingAddressCountry', 'listingMarketAddresses', 'listingAddressModal', 'open-address-modal', "api('market/addresses'", 'nova_poshta']) {
  if (!adminJs.includes(required)) {
    console.error(`create-product address parity is missing: ${required}`); failed = true;
  }
}
if (adminJs.includes('Transferring ${')) {
  console.error('assets/js/admin.js: technical media transfer counter returned'); failed = true;
}
for (const required of ['Upload photos or video', 'Up to 6 photos (JPEG, PNG, WebP, GIF) or 1 video up to 250 MB', 'composerUploadArea', 'importComposerMedia', "api('hub/media/import'", "api('hub/posts'"]) {
  if (!adminJs.includes(required)) {
    console.error(`Hub composer media and publishing flow is missing: ${required}`); failed = true;
  }
}
for (const required of ['composerTimezone', 'dataset.composerSection', 'showComposerError', 'failComposer', 'Check the highlighted fields.', "publishMode:'schedule'"]) {
  if (!adminJs.includes(required)) {
    console.error(`Hub composer scheduling validation is missing: ${required}`); failed = true;
  }
}
if (adminJs.includes('class="npati-radio-row"><label><input type="radio" name="mode"') || adminJs.includes('class="npati-market-readonly"><span>Market</span>')) {
  console.error('assets/js/admin.js: removed hub/create publish-mode or Market control returned'); failed = true;
}
if (adminJs.includes("<p class=\"npati-eyebrow\">${editing?'EDIT LISTING':'CREATE LISTING'}")) {
  console.error('Removed create-listing eyebrow returned'); failed = true;
}
for (const required of ['npati-market-video-card', 'npati-video-viewer', 'openMarketVideo', 'bindMarketVideoPlayers']) {
  if (!adminJs.includes(required)) {
    console.error(`Frontend-compatible Videos tab is missing: ${required}`); failed = true;
  }
}
const restController = searchable(await readFile(resolve(root, 'includes/Api/RestController.php'), 'utf8'));
if (!restController.includes("$this->client->put( $path, array( 'status' => 'archived' ) )")) {
  console.error('Listing deletion must archive the advert instead of permanently deleting it'); failed = true;
}
for (const required of ["$body['disableBuy'] = true", "$body['shippingAvailable'] = false", "unset( $body[ $delivery_key ] )"]) {
  if (!restController.includes(required)) {
    console.error(`Server-side purchase/delivery restriction is missing: ${required}`); failed = true;
  }
}
for (const required of ["'/content/ai'", "'/content/import'", "'/content/tasks'", 'content_social']) {
  if (!restController.includes(required)) { console.error(`Content REST flow is missing: ${required}`); failed = true; }
}
for (const required of ['create_address', 'address_options', "'/listings/addresses'"]) {
  if (!restController.includes(required)) {
    console.error(`Protected NPATI address REST bridge is missing: ${required}`); failed = true;
  }
}
for (const required of ['video_viewer', 'video_action', 'video_comment', 'video_comment_like']) {
  if (!restController.includes(required)) {
    console.error(`Protected video viewer REST bridge is missing: ${required}`); failed = true;
  }
}
if (failed) process.exit(1);
console.log('Static security checks passed.');
