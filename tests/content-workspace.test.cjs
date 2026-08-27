const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const admin = fs.readFileSync(path.join(root, 'assets/js/admin.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'assets/css/admin.css'), 'utf8');
const php = fs.readFileSync(path.join(root, 'includes/Admin/Admin.php'), 'utf8');
const rest = fs.readFileSync(path.join(root, 'includes/Api/RestController.php'), 'utf8');
const contentService = fs.readFileSync(path.join(root, 'includes/Content/ContentService.php'), 'utf8');
const uninstall = fs.readFileSync(path.join(root, 'uninstall.php'), 'utf8');
const compact = value => String(value).replace(/\s+/g, '').replace(/["'`]/g, '"');
const has = (source, needle) => source.includes(needle) || compact(source).includes(compact(needle));

const contentBody = admin.slice(admin.indexOf('function content()'), admin.indexOf('function render()'));
assert.ok(contentBody.includes('data-action="add-content"'), 'manual Content task button is missing');
assert.ok(admin.includes('npati-article-dialog-main') && admin.includes('npati-article-dialog-side'), 'article modal columns are missing');
assert.ok(admin.indexOf('Title') < admin.indexOf('npati-article-dialog-side'), 'Title must be in the left column');
assert.ok(admin.indexOf('Category',admin.indexOf('npati-article-dialog-side')) > admin.indexOf('npati-article-dialog-side'), 'Category must be in the right column');
assert.ok(css.includes('width:min(1040px,calc(100vw - 40px))'), 'article modal must use the Hub composer width');
assert.ok(css.includes('linear-gradient(90deg,#3b82f6'), 'article modal must use the Hub accent line');
assert.ok(contentBody.includes('npati-content-task-dialog'), 'manual task dialog is missing');
assert.ok(contentBody.includes('data-content-search'), 'planner search is missing');
assert.ok(contentBody.includes('data-content-status'), 'status filter is missing');
assert.ok(contentBody.includes('data-content-day'), 'date filter is missing');
assert.ok(css.includes('[data-content-task][hidden]') && css.includes('display:none!important'), 'filtered task cards must actually be hidden');
assert.ok(contentBody.includes('bulk-reschedule') && contentBody.includes('bulk-delete-content'), 'bulk actions are missing');
assert.ok(admin.includes('data-action="edit-content"') && admin.includes('data-action="duplicate-content"'), 'edit/duplicate actions are missing');
assert.ok(has(admin, "deletable=status!=='processing'"), 'published Content tasks must expose the Delete action');
assert.ok(has(admin, "tasks.some((task)=>task.status==='processing')"), 'only processing Content tasks must block bulk deletion');
for (const status of ['scheduled', 'processing', 'published', 'failed', 'cancelled']) {
  assert.ok(css.includes(`npati-content-status.is-${status}`), `Content status ${status} is missing its semantic badge color`);
}
assert.ok(admin.includes('is-article is-${esc(status)}'), 'Content article status must be exposed in Calendar markup');
assert.ok(css.includes('.npati-calendar-event.is-article.is-published'), 'published Content articles need a distinct Calendar color');
assert.ok(has(admin, "parentDialog?.open") && has(admin, "frame.on('close'"), 'WordPress Media Library must open above the article dialog and restore it on close');
assert.ok(admin.includes('list="npati-content-categories"') && admin.includes('content/categories'), 'WordPress category suggestions with free text are missing');
assert.ok(admin.includes('npati-preview-file-button') && admin.includes('npati-save-content-page'), 'refined import actions are missing');
assert.ok(!admin.includes('data-content-file-name') && css.includes('::file-selector-button'), 'native file chooser must be restored');
assert.ok(css.includes('.npati-save-content-page{border-color:#e32c26!important') && css.includes('animation:none!important'), 'Save Tasks must be static red without animation');
assert.ok(css.includes('input[type=checkbox]{appearance:none!important') && css.includes('width:20px!important'), 'Social Post checkboxes must be compact and custom styled');
assert.ok(!contentBody.includes('npati-ai-form'), 'OpenAI form must not remain on Content');

assert.ok(has(php, '$this->settings_page();$this->ai_settings_page();'));
assert.ok(php.includes('id="npati-settings-ai-form"'));
assert.ok(css.includes('.npati-settings-ai-control') && css.includes('.npati-content-dialog'));
assert.ok(rest.includes("'/content/tasks/batch'") && rest.includes("'/content/tasks/(?P<id>[0-9a-f-]+)/permanent'"));
assert.ok(rest.includes("'/content/categories'") && rest.includes('get_categories('), 'local WordPress categories endpoint is missing');
assert.ok(contentService.includes('wp_insert_term( $category') && contentService.includes("'post_category'"), 'manually entered categories must be created and assigned to generated posts');

const preservationGuard = uninstall.indexOf("if ( empty( $npati_settings['delete_on_uninstall'] ) )");
const remoteRemoval = uninstall.indexOf("'/uninstall'");
assert.ok(preservationGuard > -1 && remoteRemoval > preservationGuard, 'uninstall must preserve Hub tasks by default');
assert.ok(uninstall.indexOf("delete_option( 'npati_hub_ai_openai' )") > remoteRemoval, 'OpenAI credential is removed only during explicit full cleanup');
console.log('content: manual planner, bulk actions, Settings AI and reinstall preservation passed');
