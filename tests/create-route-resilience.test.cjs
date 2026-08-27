const { chromium } = require('../../../frontend/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setContent('<div class="npati-hub-admin"><div id="npati-hub-app" data-page="npati-market"></div></div>');
    await page.evaluate(() => {
      location.hash = 'market/create';
      window.NPATI_HUB_CONFIG = { nonce: 'test', market: 'UA', language: 'uk', connected: true, adminBaseUrl: 'about:blank' };
      const apiFetch = async options => {
        if (options.path === '/npati/v1/market/listing-schema') throw new Error('NPATI is temporarily unavailable. Your WordPress content is safe.');
        return [];
      };
      apiFetch.use = () => {};
      apiFetch.createNonceMiddleware = () => () => {};
      window.wp = { apiFetch, media: () => ({ on: () => {}, open: () => {} }) };
    });
    await page.addScriptTag({ path: 'D:/npati/npati-clone/wordpress-plugin/npati-hub/assets/js/admin.js' });
    await page.waitForSelector('#npati-listing-form');
    if (await page.locator('.npati-error').count()) throw new Error('Create route was replaced by the generic Hub error panel');
    if (!await page.locator('[name="title"]').count() || !await page.locator('[name="categoryId"]').count()) throw new Error('Create form fields are missing after a schema failure');
    if (errors.length) throw new Error(`Browser errors: ${errors.join(' | ')}`);
    console.log('market/create: remains usable when Hub schema is unavailable');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exit(1); });
