const { chromium } = require('../../../frontend/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  try {
    const page = await browser.newPage({ viewport: { width: 1400, height: 1100 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const publishedAt = new Date().toISOString();
    await page.setContent('<div class="npati-hub-admin"><nav class="npati-section-nav"><a data-npati-route="hub"></a></nav><div class="npati-hub-title"><div></div><div class="npati-hub-overview-actions"><button class="npati-secondary-button" data-route="hub/connections">+ Add integration</button><button class="npati-primary-button" data-route="hub/create">Create publication</button></div></div><nav class="npati-hub-tabs"></nav><div id="npati-hub-app" data-page="npati-hub-content" data-view="overview"></div></div>');
    await page.evaluate(({ publishedAt }) => {
      const jobs = [
        { id: 'scheduled-carousel', status: 'scheduled', title: 'Carousel campaign', description: 'Two product photos prepared for publishing.', scheduledAt: '2026-09-01T12:30:00.000Z', timezone: 'Europe/Kyiv', mediaType: 'image', mediaUrls: ['https://example.com/one.webp', 'https://example.com/two.webp'], targets: [{ platform: 'instagram', accountId: 'ig-1' }] },
        { id: 'scheduled-video', status: 'queued', title: 'Video campaign', description: 'Scheduled video publication.', scheduledAt: '2026-09-02T13:30:00.000Z', timezone: 'Europe/Kyiv', mediaType: 'video', mediaUrls: ['https://example.com/video.mp4'], targets: [{ platform: 'bluesky', accountId: 'sky-1' }] },
        { id: 'published-history', status: 'published', title: 'Published campaign', description: 'Publication visible from activity history.', publishedAt, mediaType: 'image', mediaUrls: ['https://example.com/published.webp'], targets: [{ platform: 'instagram', publishedAt }] },
      ];
      window.__hubJobs = jobs;
      const accounts = [
        { id: 'ig-1', platform: 'instagram', displayName: '@npati', platformAccountId: '1784148056362', status: 'connected' },
        { id: 'sky-1', platform: 'bluesky', displayName: 'npati.com', platformAccountId: 'npati.com', status: 'connected' },
      ];
      window.NPATI_HUB_CONFIG = { nonce: 'test', market: 'UA', language: 'en', connected: true, adminBaseUrl: 'about:blank' };
      const apiFetch = async options => {
        if (options.path === '/npati/v1/hub/media/import' && options.method === 'POST') {
          window.__composerImports = (window.__composerImports || 0) + 1;
          const id = Number(options.data.attachmentId);
          return { id: `asset-${id}`, publicUrl: `https://www.npati.com/hub/media/asset-${id}/media`, mimeType: id === 3 ? 'video/mp4' : 'image/jpeg' };
        }
        if (options.path === '/npati/v1/hub/posts' && options.method === 'POST') {
          window.__createdJobRequest = structuredClone(options.data);
          jobs.unshift({ id: 'created-job', status: 'scheduled', ...options.data });
          return { job: jobs[0], targets: options.data.targets };
        }
        if (options.path === '/npati/v1/hub/posts?limit=100') return structuredClone(jobs);
        if (options.path === '/npati/v1/hub/connections') return accounts;
        if (options.path === '/npati/v1/profile') return {};
        return [];
      };
      apiFetch.use = () => {};
      apiFetch.createNonceMiddleware = () => () => {};
      window.wp = { apiFetch };
      HTMLMediaElement.prototype.play = function () { window.__overviewVideoPlayed = this.src; return Promise.resolve(); };
      HTMLMediaElement.prototype.pause = function () {};
    }, { publishedAt });
    await page.addStyleTag({ path: 'D:/npati/npati-clone/wordpress-plugin/npati-hub/assets/css/admin.css' });
    await page.addScriptTag({ path: 'D:/npati/npati-clone/wordpress-plugin/npati-hub/assets/js/admin.js' });
    await page.waitForSelector('.npati-publication-card');
    const publicationStatusStyles = await page.evaluate(() => {
      const host=document.createElement('div');
      host.innerHTML=['scheduled','queued','processing','partially_published','published','failed','cancelled','canceled'].map(status=>`<article class="npati-publication-card status-${status}"><span class="npati-scheduled-status" data-test-status="${status}">${status}</span></article>`).join('');
      document.body.append(host);
      const result=Object.fromEntries([...host.querySelectorAll('[data-test-status]')].map(node=>[node.dataset.testStatus,{background:getComputedStyle(node).backgroundColor,color:getComputedStyle(node).color,border:getComputedStyle(node).borderTopColor}]));
      host.remove();return result;
    });
    const expectedStatusStyles={scheduled:['rgb(29, 78, 216)','rgb(37, 99, 235)'],queued:['rgb(126, 34, 206)','rgb(147, 51, 234)'],processing:['rgb(194, 65, 12)','rgb(234, 88, 12)'],partially_published:['rgb(194, 65, 12)','rgb(234, 88, 12)'],published:['rgb(21, 128, 61)','rgb(22, 163, 74)'],failed:['rgb(185, 28, 28)','rgb(220, 38, 38)'],cancelled:['rgb(109, 40, 217)','rgb(124, 58, 237)'],canceled:['rgb(109, 40, 217)','rgb(124, 58, 237)']};
    for(const [status,[color,border]] of Object.entries(expectedStatusStyles)){const actual=publicationStatusStyles[status];if(actual.color!==color||actual.border!==border||actual.background!=='rgb(255, 255, 255)')throw new Error(`Publication status ${status} does not use a white background with the expected text and border colors: ${JSON.stringify(actual)}`)}
    if (await page.locator('.npati-launch-row').count()) throw new Error('Duplicate overview action row returned');
    if (await page.locator('.npati-hub-overview-actions button').count() !== 2) throw new Error('Overview actions were not moved to the Hub heading');
    if (await page.locator('#npati-hub-app .npati-primary-button[data-route="hub/create"], #npati-hub-app .npati-secondary-button[data-route="hub/connections"]').count()) throw new Error('Duplicate overview actions returned below the heading');
    if (await page.locator('.npati-hub-overview-actions').evaluate(node => getComputedStyle(node).gap) !== '12px') throw new Error('Hub heading actions are missing their 12px spacing');

    const calendar = await page.locator('.npati-activity-card').evaluate(node => ({ width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height }));
    if (calendar.width !== 700 || calendar.height !== 184) throw new Error(`Activity calendar geometry mismatch: ${JSON.stringify(calendar)}`);
    const cells = await page.locator('.npati-heatmap i').count();
    if (cells < 365 || cells > 371) throw new Error(`Unexpected activity cell count: ${cells}`);
    const activeCell = page.locator('[data-action="filter-publications-by-date"]');
    await activeCell.hover();
    if ((await activeCell.evaluate(node => getComputedStyle(node).transform)) === 'none') throw new Error('Activity hover animation is missing');

    const connection = page.locator('.npati-connection-card').first();
    const connectionSize = await connection.evaluate(node => ({ width: node.getBoundingClientRect().width, height: node.getBoundingClientRect().height }));
    if (connectionSize.width !== 150 || connectionSize.height !== 60) throw new Error(`Connection card geometry mismatch: ${JSON.stringify(connectionSize)}`);
    const connectionLogoStyle = await connection.locator('.npati-platform-logo').evaluate(node => { const style=getComputedStyle(node);return { width:style.width,height:style.height,borderRadius:style.borderRadius,boxShadow:style.boxShadow }; });
    const rightArrowPosition = await page.locator('[data-action="connections-next"]').evaluate(node => { const arrow=node.getBoundingClientRect(),section=node.closest('.npati-connected-section').getBoundingClientRect();return { center:arrow.left+arrow.width/2,sectionRight:section.right }; });
    if (rightArrowPosition.center <= rightArrowPosition.sectionRight) throw new Error(`Right integration arrow was not moved outside the cards: ${JSON.stringify(rightArrowPosition)}`);
    if (await page.locator('.npati-platform-logo.instagram').count() < 2 || !await page.locator('.npati-platform-logo.bluesky').count()) throw new Error('Real integration/platform icons are missing');

    if (await page.locator('.npati-publication-card').count() !== 2) throw new Error('Scheduled view did not filter publications correctly');
    if (!await page.locator('.npati-scheduled-slide.active').count() || !await page.locator('.npati-publication-card video').count()) throw new Error('Scheduled media did not render');
    const actionCenter = await page.locator('.npati-publication-card [data-action="edit-job"]').evaluate(node => { const icon=node.querySelector('svg').getBoundingClientRect(),button=node.getBoundingClientRect();return { x:Math.abs((icon.left+icon.width/2)-(button.left+button.width/2)),y:Math.abs((icon.top+icon.height/2)-(button.top+button.height/2)) }; });
    if (actionCenter.x > .1 || actionCenter.y > .1) throw new Error(`Scheduled action icon is not centered: ${JSON.stringify(actionCenter)}`);
    const platformCenter = await page.locator('.npati-publication-card.is-video .npati-publication-platforms .npati-platform-logo.bluesky').evaluate(node => { const svg=node.querySelector('svg'),icon=svg.getBoundingClientRect(),badge=node.getBoundingClientRect(),path=node.querySelector('path');return { x:Math.abs((icon.left+icon.width/2)-(badge.left+badge.width/2)),y:Math.abs((icon.top+icon.height/2)-(badge.top+badge.height/2)),viewBox:svg.getAttribute('viewBox'),color:getComputedStyle(node).color,fill:getComputedStyle(path).fill }; });
    if (platformCenter.x > .1 || platformCenter.y > .1 || platformCenter.viewBox !== '0 0 24 28' || platformCenter.color !== 'rgb(255, 255, 255)' || platformCenter.fill !== 'rgb(255, 255, 255)') throw new Error(`Scheduled Bluesky icon is not centered and white: ${JSON.stringify(platformCenter)}`);
    await page.locator('[data-action="publication-media-next"]').click();
    if (!(await page.locator('.npati-scheduled-slide.active').getAttribute('src')).endsWith('/two.webp')) throw new Error('Scheduled photo carousel did not advance');
    await page.locator('.npati-publication-card.is-video').hover();
    await page.waitForFunction(() => window.__overviewVideoPlayed?.includes('video.mp4'));

    await activeCell.click();
    await page.waitForSelector('.npati-publication-view button.active[data-view="archive"]');
    if (!(await page.locator('.npati-publications-heading h2').innerText()).includes('Publication history')) throw new Error('Calendar click did not open publication history');
    if (await page.locator('.npati-publication-card').count() !== 1) throw new Error('Activity date did not filter publication history');
    await page.locator('.npati-hub-overview-actions [data-route="hub/create"]').click();
    await page.waitForSelector('.npati-target-option .npati-platform-logo');
    const targetLogoStyle = await page.locator('.npati-target-option .npati-platform-logo').first().evaluate(node => { const style=getComputedStyle(node);return { width:style.width,height:style.height,borderRadius:style.borderRadius,boxShadow:style.boxShadow }; });
    if (JSON.stringify(targetLogoStyle) !== JSON.stringify(connectionLogoStyle)) throw new Error(`Publish-to icon does not match connection carousel: ${JSON.stringify({ connectionLogoStyle,targetLogoStyle })}`);
    await page.evaluate(() => {
      window.__mediaSelection = [
        { id: 1, type: 'image', subtype: 'jpeg', mime: 'image/jpeg', url: 'https://example.com/photo-one.jpg', filesizeInBytes: 120000 },
        { id: 2, type: 'image', subtype: 'png', mime: 'image/png', url: 'https://example.com/photo-two.png', filesizeInBytes: 130000 },
      ];
      window.wp.media = () => {
        let selected;
        return {
          on(event, callback) { if (event === 'select') selected = callback; },
          state() { return { get() { return { toJSON() { return window.__mediaSelection; } }; } }; },
          open() { selected?.(); },
        };
      };
    });
    await page.locator('[data-source="upload"]').click();
    const uploadCopy = await page.locator('.npati-composer-upload-drop').innerText();
    if (!uploadCopy.includes('Upload photos or video') || !uploadCopy.includes('Up to 6 photos')) throw new Error(`Hub upload copy mismatch: ${uploadCopy}`);
    await page.locator('.npati-composer-upload-drop').click();
    await page.waitForFunction(() => window.__composerImports === 2 && document.querySelectorAll('.npati-composer-upload-grid figure:not(.is-uploading)').length === 2);
    const uploadRow = await page.locator('.npati-composer-upload-grid').evaluate(node => { const button=node.querySelector('.npati-composer-upload-drop').getBoundingClientRect(),preview=node.querySelector('figure').getBoundingClientRect();return { topDifference:Math.abs(button.top-preview.top),previewBeforeButton:preview.left<button.left,buttonHeight:button.height,previewHeight:preview.height }; });
    if (uploadRow.topDifference > .1 || !uploadRow.previewBeforeButton || uploadRow.buttonHeight !== 132 || uploadRow.previewHeight !== 132) throw new Error(`Composer previews do not begin on the left before the Hub upload control: ${JSON.stringify(uploadRow)}`);
    await page.evaluate(() => { window.__mediaSelection = [{ id: 3, type: 'video', subtype: 'mp4', mime: 'video/mp4', url: 'https://example.com/video.mp4', image: { src: 'https://example.com/video-cover.jpg' }, filesizeInBytes: 2200000 }]; });
    await page.locator('.npati-composer-upload-drop').click();
    await page.waitForFunction(() => window.__composerImports === 3 && document.querySelectorAll('.npati-composer-upload-grid figure:not(.is-uploading)').length === 1 && document.querySelector('.npati-composer-upload-grid video'));
    if (await page.locator('.npati-composer-upload-drop').count()) throw new Error('Upload control remains visible after selecting the one allowed video');
    if (await page.locator('.npati-radio-row,.npati-market-readonly').count()) throw new Error('Removed publish-mode or Market control is still visible in hub/create');
    if (await page.locator('#npati-composer input[name="timezone"]').inputValue() !== 'Europe/Kyiv') throw new Error('Composer did not use the UA market timezone');
    await page.evaluate(() => { window.__composerScrolledTo = ''; Element.prototype.scrollIntoView = function () { window.__composerScrolledTo = this.dataset.composerSection || this.name || this.className; }; });
    await page.locator('#npati-composer input[name="date"]').fill('');
    await page.locator('#npati-composer [type="submit"]').click();
    await page.waitForFunction(() => document.querySelectorAll('.npati-composer-step.is-invalid').length === 3 && Boolean(window.__composerScrolledTo));
    const highlighted = await page.locator('.npati-composer-step.is-invalid').evaluateAll(nodes => nodes.map(node => node.dataset.composerSection).sort());
    if (highlighted.join(',') !== 'copy,schedule,targets') throw new Error(`Composer did not highlight the exact invalid sections: ${highlighted.join(',')}`);
    await page.locator('#npati-composer textarea[name="description"]').fill('Scheduled from the NPATI WordPress workspace.');
    await page.evaluate(() => { const date=new Date(Date.now()+86400000),input=document.querySelector('#npati-composer input[name="date"]');input.value=`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;input.dispatchEvent(new Event('input',{bubbles:true})); });
    await page.locator('#npati-composer input[name="target"][value="bluesky|sky-1"]').check();
    await page.locator('#npati-composer [type="submit"]').click();
    await page.waitForFunction(() => Boolean(window.__createdJobRequest));
    const created = await page.evaluate(() => window.__createdJobRequest);
    if (created.action !== 'publish' || created.mediaType !== 'video' || created.mediaUrls.length !== 1 || created.targets[0].accountId !== 'sky-1' || !created.scheduledAt || created.metadata.pinterestCoverImageUrl !== 'https://example.com/video-cover.jpg') throw new Error(`WordPress scheduled job payload mismatch: ${JSON.stringify(created)}`);
    await page.waitForSelector('[data-job-id="created-job"]');
    await page.evaluate(() => { const index=window.__hubJobs.findIndex(job => job.id === 'created-job');if(index >= 0)window.__hubJobs.splice(index,1); });
    await page.waitForTimeout(3100);
    await page.evaluate(() => window.dispatchEvent(new Event('focus')));
    await page.waitForFunction(() => !document.querySelector('[data-job-id="created-job"]'));
    if (errors.length) throw new Error(`Browser errors: ${errors.join(' | ')}`);
    console.log('hub/overview: calendar, integrations and scheduled publications match frontend behavior');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exit(1); });
