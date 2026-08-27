const { chromium } = require('../../../frontend/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  try {
    const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });
    const publicationDate = new Date().toISOString();
    await page.setContent('<div class="npati-hub-admin"><nav class="npati-section-nav"><a data-npati-route="content" data-route="content">Content</a><a data-npati-route="hub" data-route="hub/calendar">Calendar</a></nav><div class="npati-hub-title"></div><nav class="npati-hub-tabs"></nav><div id="npati-hub-app" data-page="npati-content"></div></div>');
    await page.evaluate(({ publicationDate }) => {
      const tasks = [
        { id: '11111111-1111-4111-8111-111111111111', status: 'published', title: 'Published WordPress article', scheduledFor: publicationDate, wordpressPostId: 42, wordpressPostUrl: 'https://example.com/article' },
        { id: '22222222-2222-4222-8222-222222222222', status: 'processing', title: 'Article being published', scheduledFor: publicationDate },
      ];
      const jobs = [{ id: '33333333-3333-4333-8333-333333333333', status: 'published', title: 'Published social post', publishedAt: publicationDate }];
      window.__contentTasks = tasks;
      window.NPATI_HUB_CONFIG = { nonce: 'test', market: 'US', language: 'en', connected: true, adminBaseUrl: 'about:blank' };
      window.confirm = () => true;
      const apiFetch = async options => {
        if (options.path === '/npati/v1/content/tasks?limit=500') return structuredClone(tasks);
        if (options.path === '/npati/v1/content/categories') return [];
        if (options.path === '/npati/v1/hub/posts?limit=100') return structuredClone(jobs);
        if (options.path === '/npati/v1/profile') return {};
        if (options.method === 'DELETE' && options.path === '/npati/v1/content/tasks/11111111-1111-4111-8111-111111111111/permanent') {
          window.__deletedPublishedTask = options.path;
          tasks.splice(tasks.findIndex(task => task.status === 'published'), 1);
          return { deleted: true };
        }
        return [];
      };
      apiFetch.use = () => {};
      apiFetch.createNonceMiddleware = () => () => {};
      window.wp = { apiFetch };
    }, { publicationDate });
    await page.addStyleTag({ path: 'D:/npati/npati-clone/wordpress-plugin/npati-hub/assets/css/admin.css' });
    await page.addScriptTag({ path: 'D:/npati/npati-clone/wordpress-plugin/npati-hub/assets/js/admin.js' });

    await page.waitForSelector('[data-content-task="11111111-1111-4111-8111-111111111111"]');
    if (!await page.locator('[data-content-task="11111111-1111-4111-8111-111111111111"] [data-action="delete-content"]').count()) throw new Error('Published Content task has no Delete action');
    if (await page.locator('[data-content-task="22222222-2222-4222-8222-222222222222"] [data-action="delete-content"]').count()) throw new Error('Processing Content task must not expose Delete');

    const statusStyles = await page.evaluate(() => {
      const host = document.createElement('div');
      host.className = 'npati-content-task-title';
      host.innerHTML = ['scheduled', 'processing', 'published', 'failed', 'cancelled'].map(status => `<span class="npati-content-status is-${status}" data-test-status="${status}">${status}</span>`).join('');
      document.body.append(host);
      const result = [...host.children].map(node => {
        const style = getComputedStyle(node);
        return [node.dataset.testStatus, style.color, style.backgroundColor, style.borderTopColor];
      });
      host.remove();
      return result;
    });
    if (statusStyles.some(style => style[2] !== 'rgb(255, 255, 255)')) throw new Error(`Content status backgrounds are not white: ${JSON.stringify(statusStyles)}`);
    if (new Set(statusStyles.map(style => `${style[1]}|${style[3]}`)).size !== statusStyles.length) throw new Error(`Content status text and border colors are not distinct: ${JSON.stringify(statusStyles)}`);

    await page.locator('[data-route="hub/calendar"]').click();
    await page.waitForSelector('.npati-calendar-event.is-article.is-published');
    if (!await page.locator('.npati-calendar-event.is-published[data-id="33333333-3333-4333-8333-333333333333"]').count()) throw new Error('Published Hub publication is missing from Calendar');
    if (!(await page.locator('.npati-calendar-event.is-article.is-published').innerText()).includes('Published WordPress article')) throw new Error('Published Content article is missing from Calendar');

    await page.locator('.npati-section-nav [data-route="content"]').click();
    await page.locator('[data-content-task="11111111-1111-4111-8111-111111111111"] [data-action="delete-content"]').click();
    await page.waitForFunction(() => Boolean(window.__deletedPublishedTask) && !document.querySelector('[data-content-task="11111111-1111-4111-8111-111111111111"]'));
    console.log('content: semantic statuses, published task deletion and Calendar history passed');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exit(1); });
