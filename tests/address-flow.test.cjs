const { chromium } = require('../../../frontend/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setContent('<div class="npati-hub-admin"><button id="npati-profile-trigger"></button><div id="npati-hub-app" data-page="npati-market"></div></div>');
    await page.evaluate(() => {
      location.hash = 'market/create';
      window.NPATI_HUB_CONFIG = { nonce: 'test', market: 'UA', language: 'uk', connected: true, adminBaseUrl: 'about:blank' };
      const apiFetch = async options => {
        if (options.path === '/npati/v1/profile') return { username: 'anastasia', firstName: 'Анастасія', lastName: 'Ковальчук', email: 'test@example.com' };
        if (options.path === '/npati/v1/market/listing-schema') return { categories: [], addresses: [] };
        if (options.path === '/npati/v1/market/addresses' && !options.method) return [{ id: 'address-default', firstName: 'Анастасія', lastName: 'Ковальчук', city: 'Львів', state: 'Львівська область', zip: '79034', country: 'Ukraine', phone: '+380 67 111 22 33', isDefault: true }];
        if (options.path.includes('address-options?type=cities')) return [{ ref: 'city-ref', name: 'Львів', area: 'Львівська область', deliveryCityRef: 'delivery-city-ref' }];
        if (options.path.includes('address-options?type=warehouses')) return [{ ref: 'warehouse-ref', number: '1', name: 'Відділення №1', address: 'вул. Городоцька, 10' }];
        if (options.path === '/npati/v1/market/addresses' && options.method === 'POST') {
          window.__createdAddress = options.data;
          return { id: 'address-new', ...options.data };
        }
        return [];
      };
      apiFetch.use = () => {};
      apiFetch.createNonceMiddleware = () => () => {};
      window.wp = { apiFetch, media: () => ({ on: () => {}, open: () => {} }) };
    });
    await page.addStyleTag({ path: 'D:/npati/npati-clone/wordpress-plugin/npati-hub/assets/css/admin.css' });
    await page.addScriptTag({ path: 'D:/npati/npati-clone/wordpress-plugin/npati-hub/assets/js/admin.js' });
    await page.waitForSelector('#npati-listing-form');
    if (await page.locator('[name="shippingAddressId"]').inputValue() !== 'address-default') throw new Error('Default NPATI address was not selected automatically');
    if (!(await page.locator('[name="location"]').inputValue()).includes('Львів')) throw new Error('Default address location was not synchronized');
    await page.locator('[data-action="open-address-modal"]').click();
    const modal = page.locator('[data-address-modal]');
    if (!await modal.isVisible()) throw new Error('Address modal did not open inside WordPress');
    const modalVisual = await modal.locator('.npati-address-dialog').evaluate(node => ({ width: node.getBoundingClientRect().width, bottom: node.getBoundingClientRect().bottom, viewport: innerHeight, columns: getComputedStyle(node.querySelector('.npati-address-fields')).gridTemplateColumns.split(' ').length, checks: node.querySelectorAll('.npati-address-check').length }));
    if (modalVisual.width < 850 || modalVisual.bottom > modalVisual.viewport || modalVisual.columns !== 3 || modalVisual.checks !== 2) throw new Error(`Frontend-style address dialog layout mismatch: ${JSON.stringify(modalVisual)}`);
    await modal.locator('[name="addressFirstName"]').fill('Олена');
    await modal.locator('[name="addressLastName"]').fill('Петренко');
    await modal.locator('[name="addressPhone"]').fill('+380 67 555 44 33');
    await modal.locator('[name="addressZip"]').fill('79000');
    await modal.locator('[name="addressCitySearch"]').fill('Льв');
    await page.waitForSelector('.npati-address-city-results [data-city-ref="city-ref"]');
    await modal.locator('.npati-address-city-results [data-city-ref="city-ref"]').click();
    await page.waitForSelector('[name="addressWarehouse"] option[value="warehouse-ref"]', { state: 'attached' });
    await modal.locator('[name="addressWarehouse"]').selectOption('warehouse-ref');
    if (!await modal.locator('.npati-address-warehouse-details').isVisible()) throw new Error('Selected Nova Poshta branch details are missing');
    await modal.locator('[data-action="save-address"]').click();
    await page.waitForFunction(() => window.__createdAddress?.deliveryMetadata?.nova_poshta?.warehouse_ref === 'warehouse-ref');
    if (await page.locator('[name="shippingAddressId"]').inputValue() !== 'address-new') throw new Error(`New address was not selected immediately: ${JSON.stringify(await page.locator('[name="shippingAddressId"]').evaluate(node => ({ value: node.value, options: [...node.options].map(option => option.value), error: document.querySelector('.npati-address-error')?.textContent })))}`);
    if (!(await page.locator('[name="location"]').inputValue()).includes('Львів')) throw new Error('New address was not applied to the listing');
    if (errors.length) throw new Error(`Browser errors: ${errors.join(' | ')}`);
    console.log('market/create: NPATI default address and in-plugin address creation passed');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exit(1); });
