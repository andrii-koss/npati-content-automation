const { chromium } = require('../../../frontend/node_modules/playwright');

const listing = {
  type: 'listing', id: '11111111-1111-4111-8111-111111111111', title: 'Зелений жакет', description: 'Editable listing description for WordPress', status: 'active', categoryId: 'category-fashion',
  photos: Array.from({ length: 6 }, (_, index) => `https://example.com/photo-${index + 1}.webp`),
  photoIds: Array.from({ length: 6 }, (_, index) => `photo-file-${index + 1}`), video: 'https://example.com/listing.mp4', videoId: 'listing-video-file', thumbnail: 'https://example.com/video-poster.webp',
  price: 7000, discountPrice: 2900, currency: 'UAH', country: 'UA',
  location: 'Львів, 79034', viewsCount: 310, likesCount: 1,
  createdAt: '2026-02-28T10:00:00.000Z', showAuthor: true,
  author: { username: 'anastasia', avatar: 'https://example.com/avatar.webp', isVerified: true, verificationBadgeType: 'sat-violet', verificationTooltip: 'Verified NPATI creator', profileUrl: 'https://www.npati.com/ua/@anastasia' },
  linkUrl: 'https://www.npati.com/ua/odyag/zelenyi-zhaket',
};

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setContent('<div class="npati-hub-admin"><button id="npati-profile-trigger"></button><div id="npati-hub-app" data-page="npati-market"></div></div>');
    await page.evaluate(sample => {
      window.NPATI_HUB_CONFIG = { nonce: 'test', market: 'UA', language: 'uk', connected: true, adminBaseUrl: 'about:blank' };
      const apiFetch = async options => {
        window.__marketCalls = [...(window.__marketCalls || []), options.path];
        if (options.path.endsWith('/viewer')) return { stats: { counters: { likes: 9, comments: 3, reposts: 2, saves: 4 }, userState: { isLiked: false, isSaved: false } }, comments: [{ id: '44444444-4444-4444-8444-444444444444', comment: 'Frontend modal comment', likesCount: 2, dateCreated: '2026-03-02T10:00:00.000Z', author: { ...sample.author, displayName: 'Lenka Siker', avatar: 'https://example.com/comment-avatar.webp' }, replies: [{ id: '66666666-6666-4666-8666-666666666666', comment: 'Existing frontend reply', likesCount: 1, dateCreated: '2026-03-02T11:00:00.000Z', author: sample.author }] }] };
        if (options.path.endsWith('/action')) { window.__videoActions = [...(window.__videoActions || []), options.data?.action]; return options.data?.action === 'save' ? { action: 'saved', isSaved: true, counts: { likes: 10, comments: 3, reposts: 2, saves: 5 } } : { action: options.data?.action === 'like' ? 'liked' : 'reposted', isLiked: true, counts: { likes: 10, comments: 3, reposts: 3, saves: 5 } }; }
        if (options.path.endsWith('/comments') && options.method === 'POST') { window.__lastCommentParent = options.data?.parentId || ''; return { id: '55555555-5555-4555-8555-555555555555' }; }
        if (options.path.endsWith('/like')) return { data: { isLiked: true, likesCount: 2 } };
        if (options.path === '/wp/v2/media' && options.method === 'POST') { window.__generatedThumbnailUpload = options.body?.get('file'); return { id: 904, source_url: 'https://example.com/generated-thumbnail.webp' }; }
        if (options.path === '/npati/v1/profile') return { username: 'anastasia', displayName: 'Lenka Siker', avatar: 'https://example.com/avatar.webp' };
        if (options.path === '/npati/v1/market/listing-schema') return { categories: [{ id: 'category-fashion', name: 'Fashion', subcategories: [] }], addresses: [] };
        if (options.path === '/npati/v1/market/media/import') { const id=options.data?.attachmentId;window.__importedAttachment=id;window.__importedAttachments=[...(window.__importedAttachments||[]),id];if(id===902){await new Promise(resolve=>setTimeout(resolve,650));return {fileId:'npati-file-902',previewUrl:'https://example.com/new-video.mp4',publicUrl:'https://example.com/new-video.mp4',mimeType:'video/mp4'}}if(id===904)return {fileId:'npati-file-904',previewUrl:'https://example.com/generated-thumbnail.webp',publicUrl:'https://example.com/generated-thumbnail.webp',mimeType:'image/webp'};return { fileId: `npati-file-${id}`, previewUrl: 'https://example.com/new-photo.webp', publicUrl: 'https://example.com/new-photo.webp', mimeType: 'image/webp' }; }
        if (/\/npati\/v1\/market\/listings\/[0-9a-f-]+$/.test(options.path) && options.method === 'PUT') { window.__updatedListing = options.data; return { id: options.path.split('/').pop() }; }
        if (/\/npati\/v1\/market\/listings\/[0-9a-f-]+$/.test(options.path) && options.method === 'DELETE') { window.__deletedListing = options.path.split('/').pop(); return { status: 'archived' }; }
        if (options.path.includes('/npati/v1/market/listings?status=pending')) return [{ ...sample, id: '88888888-8888-4888-8888-888888888888', title: 'Pending listing', status: 'pending' }];
        if (options.path.includes('/npati/v1/market/listings?status=rejected')) return [{ ...sample, id: '99999999-9999-4999-8999-999999999999', title: 'Rejected listing', status: 'rejected' }];
        if (options.path.startsWith('/npati/v1/market/listings')) return [
          sample,
          { ...sample, id: '22222222-2222-4222-8222-222222222222', title: 'Second video listing', photos: [], video: 'https://example.com/second.mp4', thumbnail: 'https://example.com/second-poster.webp' },
          { type: 'video', id: '33333333-3333-4333-8333-333333333333', title: 'Frontend video card', description: 'Video description', status: 'active', photos: [], video: 'https://example.com/video-feed.mp4', thumbnail: 'https://example.com/video-feed.webp', viewsCount: 125, likesCount: 9, commentsCount: 3, createdAt: '2026-03-01T10:00:00.000Z', author: sample.author },
          { type: 'short', id: '77777777-7777-4777-8777-777777777777', title: 'Frontend Short', status: 'active', video: 'https://example.com/short-feed.mp4', thumbnail: 'https://example.com/short-feed.webp', viewsCount: 10, createdAt: '2026-02-28T10:00:00.000Z', linkUrl: 'https://www.npati.com/ua/s/77777777-7777-4777-8777-777777777777' },
        ];
        if (options.path.startsWith('/npati/v1/hub/summary')) return {};
        return [];
      };
      apiFetch.use = () => {};
      apiFetch.createNonceMiddleware = () => () => {};
      window.wp = { apiFetch, media: options => { const handlers={},isVideo=options.library?.type==='video',selection=isVideo?{id:902,mime:'video/mp4',type:'video',url:'https://example.com/new-video.mp4'}:{id:901,mime:'image/webp',type:'image',url:'https://example.com/new-photo.webp'};return { on:(name,callback)=>{handlers[name]=callback},state:()=>({get:()=>({toJSON:()=>[selection]})}),open:()=>{window.__mediaOptions=options;handlers.select?.()} } } };
      Object.defineProperties(HTMLVideoElement.prototype,{videoWidth:{configurable:true,get:()=>800},videoHeight:{configurable:true,get:()=>608},duration:{configurable:true,get:()=>5}});
      HTMLVideoElement.prototype.requestVideoFrameCallback = function(callback) { setTimeout(()=>callback(performance.now(),{}),0);return 1; };
      HTMLMediaElement.prototype.load = function() { if(!this.src)return;setTimeout(()=>{this.dispatchEvent(new Event('loadedmetadata'));this.dispatchEvent(new Event('loadeddata'));setTimeout(()=>this.dispatchEvent(new Event('seeked')),0)},0); };
      HTMLCanvasElement.prototype.getContext = function() { return { drawImage() {} }; };
      HTMLCanvasElement.prototype.toBlob = function(callback,type) { callback(new Blob(['generated-thumbnail'],{type:type||'image/webp'})); };
      HTMLMediaElement.prototype.play = function() { Object.defineProperty(this, 'paused', { configurable: true, value: false }); this.dispatchEvent(new Event('play')); window.__playedVideo = this.src; return Promise.resolve(); };
      HTMLMediaElement.prototype.pause = function() { Object.defineProperty(this, 'paused', { configurable: true, value: true }); this.dispatchEvent(new Event('pause')); window.__pausedVideo = this.src; };
    }, listing);
    await page.addStyleTag({ path: 'D:/npati/npati-clone/wordpress-plugin/npati-hub/assets/css/admin.css' });
    await page.addScriptTag({ path: 'D:/npati/npati-clone/wordpress-plugin/npati-hub/assets/js/admin.js' });
    await page.waitForTimeout(1200);
    if (!await page.locator('.npati-listing-card').count()) {
      const diagnostics = await page.evaluate(() => ({ html: document.body.innerHTML, calls: window.__marketCalls || [] }));
      throw new Error(`Listing card did not render. Browser errors: ${errors.join(' | ')}\n${JSON.stringify(diagnostics)}`);
    }
    if (await page.locator('[data-market-tab="drafts"]').count()) throw new Error('Removed Drafts tab is still visible');
    if (await page.locator('.npati-listing-card').count() !== 4) throw new Error('Listings tab does not combine active, pending and rejected listings');
    if (await page.locator('.npati-listing-card').nth(0).locator('.npati-listing-status').count()) throw new Error('Active listing incorrectly displays a status badge');
    const listingStatuses=await page.locator('.npati-listing-status').evaluateAll(nodes=>nodes.map(node=>node.dataset.listingStatus));
    if (!listingStatuses.includes('pending') || !listingStatuses.includes('rejected')) throw new Error(`Pending/rejected listing badges are missing: ${listingStatuses.join(', ')}`);

    const firstCard = page.locator('.npati-listing-card').first();
    const secondCard = page.locator('.npati-listing-card').nth(1);
    if (await firstCard.locator('.npati-listing-slide').count() !== 7) throw new Error('Six photos and one video were not placed in the carousel');
    if (await firstCard.locator('.npati-listing-dots button').count() !== 7) throw new Error('Carousel indicators do not match media count');
    const copy = await firstCard.innerText();
    for (const expected of ['@anastasia', 'Зелений жакет', '2 900 грн', '7 000 грн', 'Львів, 79034', '310']) {
      if (!copy.includes(expected)) throw new Error(`Listing card is missing ${expected}:\n${copy}`);
    }
    if (!await firstCard.locator('.npati-listing-open').isVisible()) throw new Error('Red product arrow is missing');
    const authorHref = await firstCard.locator('a.npati-listing-author').getAttribute('href');
    if (authorHref !== 'https://www.npati.com/ua/@anastasia') throw new Error(`Author profile link mismatch: ${authorHref}`);
    const verificationBadge=firstCard.locator('.npati-verification-badge');
    const verificationVisual=await verificationBadge.evaluate(node=>({filter:getComputedStyle(node).filter,fill:getComputedStyle(node.querySelector('path')).fill,check:getComputedStyle(node.querySelector('polyline')).stroke,path:node.querySelector('path').getAttribute('d')}));
    if(verificationVisual.filter==='none'||verificationVisual.fill!=='rgb(138, 43, 226)'||verificationVisual.check!=='rgb(255, 255, 255)'||!verificationVisual.path.includes(' Q '))throw new Error(`NPATI verification seal mismatch: ${JSON.stringify(verificationVisual)}`);
    await verificationBadge.hover();await page.waitForSelector('.npati-verification-tooltip');
    if((await page.locator('.npati-verification-tooltip').innerText())!=='Verified NPATI creator')throw new Error('NPATI verification tooltip is missing the profile text');
    for (let index = 0; index < 6; index += 1) await firstCard.locator('.npati-listing-carousel-button.is-next').click();
    if (!await firstCard.locator('video.npati-listing-slide.is-active').isVisible()) throw new Error('Video slide cannot be reached through the carousel');
    if (await firstCard.locator('video.npati-listing-slide.is-active').getAttribute('controls') !== null) throw new Error('Native browser video controls were not replaced');
    if (await firstCard.locator('.npati-video-play').count()) throw new Error('Listing video still displays the removed centered Play button');
    await page.hover('.npati-market-tabs');
    await page.evaluate(() => { window.__playedVideo = ''; window.__pausedVideo = ''; });
    await firstCard.locator('.npati-listing-body').hover();
    await page.waitForFunction(() => window.__playedVideo?.includes('listing.mp4'));
    if (!await firstCard.locator('.npati-listing-video-ui.is-active.is-playing .npati-video-sound').isVisible()) throw new Error('Frontend-style video controls did not appear when the white card body was hovered');
    await secondCard.locator('.npati-listing-body').hover();
    await page.waitForFunction(() => window.__playedVideo?.includes('second.mp4') && window.__pausedVideo?.includes('listing.mp4'));
    await firstCard.locator('.npati-listing-likes').click();
    await page.waitForFunction(() => document.querySelector('.npati-listing-card .npati-listing-likes')?.getAttribute('aria-pressed') === 'true');
    if ((await firstCard.locator('.npati-listing-likes span').textContent()) !== '2') throw new Error('Like counter did not synchronize');
    await firstCard.hover();
    await page.waitForTimeout(350);
    const visual = await firstCard.evaluate(node => {
      const centerDelta = selector => { const button=node.querySelector(selector),icon=button.querySelector('svg'),a=button.getBoundingClientRect(),b=icon.getBoundingClientRect();return{x:Math.abs((a.left+a.width/2)-(b.left+b.width/2)),y:Math.abs((a.top+a.height/2)-(b.top+b.height/2))} };
      return { transform:getComputedStyle(node).transform,shadow:getComputedStyle(node).boxShadow,radius:getComputedStyle(node).borderRadius,heart:getComputedStyle(node.querySelector('.npati-listing-likes svg')).width,heartBackground:getComputedStyle(node.querySelector('.npati-listing-likes')).backgroundColor,arrow:getComputedStyle(node.querySelector('.npati-listing-open')).width,carouselCenter:centerDelta('.npati-listing-carousel-button.is-next'),productCenter:centerDelta('.npati-listing-open') };
    });
    if (visual.transform === 'none' || visual.shadow === 'none' || visual.radius !== '8px' || visual.heart !== '18px' || visual.heartBackground !== 'rgba(31, 31, 31, 0.9)' || visual.arrow !== '32px' || visual.carouselCenter.x>.1 || visual.carouselCenter.y>.1 || visual.productCenter.x>.1 || visual.productCenter.y>.1) throw new Error(`Frontend card geometry mismatch: ${JSON.stringify(visual)}`);
    await firstCard.locator('[data-action="toggle-listing-menu"]').click();
    if (!await firstCard.locator('.npati-listing-actions-menu').isVisible() || await firstCard.locator('[data-action="share-listing"]').count() !== 1 || await firstCard.locator('[data-action="edit-listing"]').count() !== 1 || await firstCard.locator('[data-action="delete-listing"]').count() !== 1) throw new Error('Listing actions menu is missing Share, Edit or Delete');
    const listingMenuVisual=await firstCard.locator('.npati-listing-actions-menu').evaluate(node=>({width:getComputedStyle(node).width,radius:getComputedStyle(node).borderRadius,padding:getComputedStyle(node).padding,shadow:getComputedStyle(node).boxShadow,icons:node.querySelectorAll('button svg').length,editSize:getComputedStyle(node.querySelector('button')).fontSize,labels:[...node.querySelectorAll('button span')].map(label=>label.textContent)}));
    if(listingMenuVisual.width!=='160px'||listingMenuVisual.radius!=='16px'||listingMenuVisual.padding!=='12px'||listingMenuVisual.shadow==='none'||listingMenuVisual.icons!==3||listingMenuVisual.editSize!=='16px'||!['Share|Edit|Delete','Поділитися|Редагувати|Видалити'].includes(listingMenuVisual.labels.join('|')))throw new Error(`NPATI listing menu mismatch: ${JSON.stringify(listingMenuVisual)}`);
    await firstCard.locator('[data-action="edit-listing"]').click();
    await page.waitForSelector('#npati-listing-form[data-listing-id="11111111-1111-4111-8111-111111111111"]');
    if (await page.locator('.npati-create-heading .npati-eyebrow').count()) throw new Error('Removed CREATE LISTING eyebrow returned');
    if (await page.locator('[name="title"]').getAttribute('maxlength') !== '60' || await page.locator('[name="description"]').getAttribute('maxlength') !== '2000') throw new Error('Frontend title/description limits are not preserved');
    for (const name of ['enableColors','enableSizes','isPost','isFree','showAuthor','disableBuy','shippingAddressId','phone','email','tagInput','shippingAvailable','packageSizePreset','packageLength','packageWidth','packageHeight','weight','scheduleEnabled']) if (!await page.locator(`[name="${name}"]`).count()) throw new Error(`Create-product field is missing: ${name}`);
    if (!await page.locator('[name="disableBuy"]').isDisabled() || !await page.locator('[name="disableBuy"]').isChecked()) throw new Error('Disable Buy must be locked in the enabled state');
    if (!await page.locator('[name="shippingAvailable"]').isDisabled() || await page.locator('[name="shippingAvailable"]').isChecked()) throw new Error('Delivery must be locked in the disabled state');
    for (const id of ['npati-listing-photos','npati-listing-video','npati-listing-thumbnail']) if (!await page.locator(`#${id}`).count()) throw new Error(`Dedicated media area is missing: ${id}`);
    await page.locator('[data-action="toggle-category-picker"]').click();
    if (!await page.locator('.npati-category-menu').isVisible() || await page.locator('.npati-category-option').count() !== 1) throw new Error('Frontend category selector did not open with market categories');
    await page.locator('.npati-category-option').click();
    if (await page.locator('[name="categoryId"]').inputValue() !== 'category-fashion') throw new Error('Frontend category selector did not select a category');
    const categoryClear = page.locator('.npati-category-clear');
    if (!await categoryClear.isVisible() || (await categoryClear.evaluate(node => getComputedStyle(node).color)) !== 'rgb(227, 44, 38)') throw new Error('Selected category is missing the frontend red reset control');
    await categoryClear.click();
    if (await page.locator('[name="categoryId"]').inputValue() !== '' || await categoryClear.isVisible()) throw new Error('Category reset control did not clear the selected category');
    await page.locator('[data-action="toggle-category-picker"]').click();await page.locator('.npati-category-option').click();
    const preview = page.locator('.npati-create-preview');
    await page.waitForFunction(() => document.querySelector('.npati-preview-author strong')?.textContent === '@anastasia');
    const previewVisual = await preview.evaluate(node => { const centered=selector=>{const button=node.querySelector(selector),icon=button?.querySelector('svg'),a=button?.getBoundingClientRect(),b=icon?.getBoundingClientRect();return a&&b?{x:Math.abs((a.left+a.width/2)-(b.left+b.width/2)),y:Math.abs((a.top+a.height/2)-(b.top+b.height/2))}:{x:99,y:99}};return { width:getComputedStyle(node).width,mediaHeight:getComputedStyle(node.querySelector('.npati-preview-media')).height,radius:getComputedStyle(node.querySelector('.npati-preview-card')).borderRadius,heart:getComputedStyle(node.querySelector('.npati-preview-like')).backgroundColor,title:node.querySelector('.npati-preview-title')?.textContent,avatar:node.querySelector('.npati-preview-author img')?.getAttribute('src'),price:node.querySelector('.npati-preview-price')?.textContent,location:node.querySelector('.npati-preview-location')?.textContent,previousCenter:centered('.npati-preview-carousel.is-prev'),nextCenter:centered('.npati-preview-carousel.is-next') }});
    if (previewVisual.width !== '316px' || previewVisual.mediaHeight !== '240px' || previewVisual.radius !== '8px' || previewVisual.heart !== 'rgba(31, 31, 31, 0.9)' || previewVisual.title !== listing.title || !previewVisual.avatar?.includes('avatar.webp') || !previewVisual.price.includes('2') || !previewVisual.location.includes('79034') || previewVisual.previousCenter.x>.1 || previewVisual.previousCenter.y>.1 || previewVisual.nextCenter.x>.1 || previewVisual.nextCenter.y>.1) throw new Error(`Create-product preview mismatch: ${JSON.stringify(previewVisual)}`);
    await page.locator('#npati-listing-photos [data-action="remove-listing-upload"]').first().click();
    await page.locator('#npati-listing-photos').locator('..').locator('[data-target="listing-photos"]').click();
    await page.waitForTimeout(500);
    if (!await page.evaluate(() => window.__importedAttachment === 901)) throw new Error(`Photo import did not call REST: ${JSON.stringify(await page.evaluate(() => ({ options:window.__mediaOptions,calls:window.__marketCalls })))}, errors: ${errors.join('; ')}`);
    if (!await page.locator('#npati-listing-photos img[src*="new-photo.webp"]').count()) throw new Error('WordPress Media Library photo was not imported and rendered');
    if (!await page.locator('#npati-listing-photos > figure img[src*="new-photo.webp"]').count()) throw new Error('Uploaded photo was rendered below the upload slot instead of inside the frontend grid square');
    const removeCenter=await page.locator('#npati-listing-photos > figure').last().evaluate(node=>{const button=node.querySelector('[data-action="remove-listing-upload"]'),icon=button.querySelector('svg'),a=button.getBoundingClientRect(),b=icon.getBoundingClientRect();return{x:Math.abs((a.left+a.width/2)-(b.left+b.width/2)),y:Math.abs((a.top+a.height/2)-(b.top+b.height/2))}});
    if(removeCenter.x>.1||removeCenter.y>.1)throw new Error(`Uploaded-media remove icon is not centered: ${JSON.stringify(removeCenter)}`);
    if ((await page.evaluate(() => window.__mediaOptions?.library?.type)) !== 'image') throw new Error('Photo picker did not restrict the WordPress Media Library to images');
    await page.locator('#npati-listing-video [data-action="remove-listing-upload"]').click();
    if (await page.locator('#npati-listing-thumbnail figure').count()) throw new Error('Removing the video did not clear its thumbnail like the frontend');
    await page.locator('#npati-listing-video [data-target="listing-video"]').click();await page.waitForTimeout(300);
    if (!await page.locator('#npati-listing-video > figure video').count() || await page.locator('#npati-listing-video > [data-target="listing-video"]').count()) throw new Error('Uploaded video did not replace its original frontend upload square');
    await page.waitForTimeout(1500);
    if (!await page.locator('#npati-listing-thumbnail > figure img').count() || await page.locator('#npati-listing-thumbnail > [data-target="listing-thumbnail"]').count() || !(await page.evaluate(() => window.__generatedThumbnailUpload instanceof Blob && window.__importedAttachments.includes(904)))) throw new Error(`Video upload did not automatically generate, save and import its thumbnail: ${JSON.stringify(await page.evaluate(()=>({imports:window.__importedAttachments,generated:Boolean(window.__generatedThumbnailUpload),thumbnail:document.querySelector('#npati-listing-thumbnail')?.innerHTML})))}, errors: ${errors.join('; ')}`);
    while(await page.locator('#npati-listing-photos [data-action="remove-listing-upload"]').count())await page.locator('#npati-listing-photos [data-action="remove-listing-upload"]').first().click();
    const tallPreview=await page.locator('.npati-preview-card').evaluate(node=>({className:node.className,mediaHeight:getComputedStyle(node.querySelector('.npati-preview-media')).height}));
    if(!tallPreview.className.includes('is-thumbnail-video')||tallPreview.mediaHeight!=='400px')throw new Error(`Video + thumbnail preview did not switch to the frontend tall card: ${JSON.stringify(tallPreview)}`);
    for(let index=0;index<6;index++){await page.locator('#npati-listing-photos [data-target="listing-photos"]').click();await page.waitForFunction(count=>document.querySelectorAll('#npati-listing-photos > figure').length===count,index+1)}
    const carouselMode=await page.locator('.npati-preview-card').evaluate(node=>({height:getComputedStyle(node.querySelector('.npati-preview-media')).height,variant:node.dataset.cardVariant,className:node.className,dots:node.querySelectorAll('.npati-preview-dots button').length,isPhoto:Boolean(node.querySelector('.npati-preview-media>img'))}));
    if(carouselMode.height!=='240px'||carouselMode.variant!=='short'||!carouselMode.className.includes('is-media-carousel')||carouselMode.dots!==7||!carouselMode.isPhoto)throw new Error(`Photo + video Product Preview did not enter the frontend carousel mode: ${JSON.stringify(carouselMode)}`);
    await page.evaluate(()=>{window.__playedVideo=''});for(let index=0;index<6;index++)await page.locator('.npati-preview-carousel.is-next').click();
    await page.waitForFunction(()=>window.__playedVideo?.includes('new-video.mp4'));
    const previewVideo=page.locator('.npati-preview-media>video');if(!await previewVideo.count()||!(await previewVideo.getAttribute('poster')))throw new Error('Product Preview video slide does not autoplay with the generated thumbnail poster');
    await page.locator('.npati-preview-carousel.is-next').click();if(!await page.locator('.npati-preview-media>img').count())throw new Error('Product Preview carousel did not return from video to the first photo');
    const formBeforeSchedule=await page.locator('#npati-listing-form').boundingBox();await page.locator('[data-action="toggle-listing-schedule"]').click();
    const scheduleModal=page.locator('.npati-schedule-modal'),formDuringSchedule=await page.locator('#npati-listing-form').boundingBox(),scheduleVisual=await scheduleModal.evaluate(node=>{const centered=selector=>{const button=node.querySelector(selector),icon=button.querySelector('svg'),a=button.getBoundingClientRect(),b=icon.getBoundingClientRect();return{x:Math.abs((a.left+a.width/2)-(b.left+b.width/2)),y:Math.abs((a.top+a.height/2)-(b.top+b.height/2))}};return{position:getComputedStyle(node).position,dialogWidth:getComputedStyle(node.querySelector('.npati-schedule-dialog')).width,weekdays:node.querySelectorAll('.npati-schedule-weekdays span').length,days:node.querySelectorAll('.npati-schedule-days button').length,closeCenter:centered('.npati-schedule-dialog>header>button'),previousCenter:centered('[data-action="schedule-month-prev"]'),nextCenter:centered('[data-action="schedule-month-next"]')}});
    if (!await scheduleModal.isVisible() || scheduleVisual.position!=='fixed' || scheduleVisual.dialogWidth!=='720px' || scheduleVisual.weekdays!==7 || scheduleVisual.days<28 || ['closeCenter','previousCenter','nextCenter'].some(key=>scheduleVisual[key].x>.1||scheduleVisual[key].y>.1) || Math.abs(formBeforeSchedule.x-formDuringSchedule.x)>.1 || Math.abs(formBeforeSchedule.width-formDuringSchedule.width)>.1) throw new Error(`Schedule dialog shifted the form or differs from frontend: ${JSON.stringify({scheduleVisual,formBeforeSchedule,formDuringSchedule})}`);
    await scheduleModal.locator('[data-action="schedule-cancel"]').last().click();if(await scheduleModal.isVisible())throw new Error('Schedule dialog did not close');
    await page.locator('[name="isPost"]').locator('..').click();
    if (!await page.locator('[data-product-price] .npati-form-grid').isHidden()) throw new Error('Post mode did not hide product prices');
    await page.locator('[name="isPost"]').locator('..').click();
    await page.locator('[name="price"]').fill('7000');await page.locator('[name="discountPrice"]').fill('2900');
    await page.locator('[name="enableSizes"]').locator('..').click();
    if (!await page.locator('.npati-size-fields').isVisible()) throw new Error('Product sizes did not open');
    await page.locator('[name="tagInput"]').fill('wordpress');await page.locator('[data-action="add-listing-tag"]').click();
    if (!(await page.locator('[name="tags"]').inputValue()).includes('wordpress')) throw new Error('Tags are not interactive');
    if (await page.locator('#npati-listing-form [name="title"]').inputValue() !== listing.title || await page.locator('#npati-listing-form [name="description"]').inputValue() !== listing.description || await page.locator('#npati-listing-form [name="categoryId"]').inputValue() !== 'category-fashion') throw new Error('Edit form was not populated with the listing data');
    if (await page.locator('#npati-listing-photos figure').count() !== 6 || await page.locator('#npati-listing-video figure').count() !== 1 || await page.locator('#npati-listing-thumbnail figure').count() !== 1) throw new Error('Edit form did not preserve listing photos, video and thumbnail');
    await page.locator('#npati-listing-form [name="title"]').fill('Updated listing from WordPress');
    await page.locator('#npati-listing-form [type="submit"]').click();
    await page.waitForFunction(() => window.__updatedListing?.title === 'Updated listing from WordPress' && window.__updatedListing?.photos?.length === 6 && window.__updatedListing?.video === 'npati-file-902' && window.__updatedListing?.thumbnail === 'npati-file-904' && window.__updatedListing?.disableBuy === true && window.__updatedListing?.shippingAvailable === false && window.__updatedListing?.packageSizePreset === undefined);
    await page.waitForSelector('.npati-listing-card');
    const deleteCard=page.locator('.npati-listing-card').nth(1);await deleteCard.locator('[data-action="toggle-listing-menu"]').click();
    page.once('dialog',dialog=>dialog.accept());await deleteCard.locator('[data-action="delete-listing"]').click();
    await page.waitForFunction(() => window.__deletedListing === '22222222-2222-4222-8222-222222222222');
    if (await page.locator('.npati-listing-card').count() !== 3) throw new Error('Deleted listing remains visible in Market');
    await page.locator('[data-market-tab="videos"]').click();
    const videoCard = page.locator('.npati-market-video-card');
    if (await videoCard.count() !== 1) throw new Error('Videos tab did not render the dedicated video-card layout');
    if (await page.locator('.npati-listing-card').count()) throw new Error('Videos tab still renders listing cards');
    const ratio = await videoCard.locator('.npati-market-video-media').evaluate(node => getComputedStyle(node).aspectRatio);
    if (ratio !== '16 / 9') throw new Error(`Video card aspect ratio does not match frontend: ${ratio}`);
    await page.evaluate(() => { window.__playedVideo = ''; });
    await videoCard.hover();
    await page.waitForFunction(() => window.__playedVideo?.includes('video-feed.mp4'));
    if (await videoCard.locator('.npati-market-video-playmark').count()) throw new Error('Videos tab incorrectly displays a centered play button');
    await page.waitForFunction(() => getComputedStyle(document.querySelector('.npati-market-video-progress')).opacity === '1');
    const progressOpacity = await videoCard.locator('.npati-market-video-progress').evaluate(node => getComputedStyle(node).opacity);
    if (progressOpacity !== '1') throw new Error('The frontend red progress line is not visible during playback');
    await videoCard.locator('.npati-market-video-body').click();
    const viewer = page.locator('.npati-video-viewer');
    if (!await viewer.isVisible()) throw new Error('Video viewer did not open inside WordPress');
    if (!(await viewer.locator('video').getAttribute('src'))?.includes('video-feed.mp4')) throw new Error('Video viewer opened the wrong video');
    if (await viewer.locator('video').getAttribute('controls') !== null) throw new Error('Video viewer still uses native browser controls');
    if (!await viewer.locator('.npati-viewer-progress [data-viewer-played]').count()) throw new Error('Video viewer red progress line is missing');
    const playerColors = await viewer.evaluate(node => ({ track:getComputedStyle(node.querySelector('.npati-viewer-progress')).backgroundColor, played:getComputedStyle(node.querySelector('[data-viewer-played]')).backgroundColor }));
    if (playerColors.played !== 'rgb(239, 68, 68)' || playerColors.track !== 'rgb(75, 85, 99)') throw new Error(`Frontend player progress colors mismatch: ${JSON.stringify(playerColors)}`);
    await viewer.locator('[data-viewer-play]').click();
    await page.waitForFunction(() => window.__pausedVideo?.includes('video-feed.mp4'));
    await viewer.locator('[data-viewer-play]').click();
    await page.waitForFunction(() => window.__playedVideo?.includes('video-feed.mp4'));
    await page.waitForFunction(() => document.querySelector('.npati-video-viewer-comment-list')?.textContent?.includes('Frontend modal comment'));
    const viewerCopy = await viewer.innerText();
    for (const expected of ['Frontend video card', '@anastasia', '9', '3', 'Frontend modal comment', 'Existing frontend reply']) if (!viewerCopy.includes(expected)) throw new Error(`Video viewer is missing ${expected}:\n${viewerCopy}`);
    if ((await viewer.locator('.npati-video-comment').first().locator(':scope > .npati-video-comment-avatar img').getAttribute('src')) !== 'https://example.com/comment-avatar.webp') throw new Error('Comment avatar is not rendered from the normalized NPATI asset URL');
    const commentLikeVisual = await viewer.locator('.npati-video-comment').first().locator(':scope > .npati-video-comment-like').evaluate(node => ({ background:getComputedStyle(node).backgroundColor, heart:getComputedStyle(node.querySelector('svg')).width }));
    if (commentLikeVisual.background !== 'rgb(17, 17, 17)' || commentLikeVisual.heart !== '14px') throw new Error(`Frontend comment heart mismatch: ${JSON.stringify(commentLikeVisual)}`);
    await viewer.locator('.npati-video-comment').first().locator(':scope > .npati-video-comment-like').click();
    await page.waitForFunction(() => { const button=document.querySelector('.npati-video-comment:not(.is-reply) > .npati-video-comment-like');return button?.getAttribute('aria-pressed') === 'true' && button.querySelector('b')?.textContent === '2'; });
    await page.mouse.move(0,0);
    await page.waitForTimeout(200);
    const activeHeart = await viewer.locator('.npati-video-comment').first().locator(':scope > .npati-video-comment-like').evaluate(node => ({ background:getComputedStyle(node).backgroundColor,heartFill:getComputedStyle(node.querySelector('svg')).fill,countColor:getComputedStyle(node.querySelector('b')).color,animation:getComputedStyle(node.querySelector('svg')).animationDuration }));
    if (activeHeart.background !== 'rgb(17, 17, 17)' || activeHeart.heartFill !== 'rgb(239, 68, 68)' || activeHeart.countColor !== 'rgb(255, 255, 255)' || activeHeart.animation !== '0.8s') throw new Error(`Active comment heart mismatch: ${JSON.stringify(activeHeart)}`);
    if (await viewer.locator('[data-video-interaction]').count() !== 4) throw new Error('Frontend modal interaction buttons are missing');
    const authorLayout = await viewer.locator('.npati-video-viewer-author').evaluate(node => ({ display:getComputedStyle(node).display,avatar:node.querySelector('.npati-video-viewer-avatar')?.getBoundingClientRect(),name:node.querySelector('.npati-video-viewer-name')?.getBoundingClientRect(),username:node.querySelector('.npati-video-viewer-username')?.getBoundingClientRect() }));
    if (authorLayout.display !== 'flex' || !authorLayout.avatar || !authorLayout.name || !authorLayout.username || authorLayout.name.left <= authorLayout.avatar.right || authorLayout.username.top < authorLayout.name.bottom - 1) throw new Error(`Frontend author layout mismatch: ${JSON.stringify(authorLayout)}`);
    if (!await viewer.locator('.npati-video-viewer-close svg').count()) throw new Error('Frontend SVG close icon is missing');
    if (await viewer.locator('.npati-video-viewer-comments-title').count()) throw new Error('Redundant Comments/date heading is still rendered');
    if (!(await viewer.locator('.npati-video-comment-form .npati-video-comment-composer-avatar img').getAttribute('src'))?.includes('avatar.webp')) throw new Error('Current NPATI avatar is missing beside the comment composer');
    await viewer.locator('.npati-video-viewer-username').focus();
    const chrome = await viewer.evaluate(node => ({ authorBorder:getComputedStyle(node.querySelector('.npati-video-viewer-sidebar>header')).borderBottomWidth,usernameOutline:getComputedStyle(node.querySelector('.npati-video-viewer-username')).outlineStyle,usernameShadow:getComputedStyle(node.querySelector('.npati-video-viewer-username')).boxShadow,closeWidth:getComputedStyle(node.querySelector('.npati-video-viewer-close')).width }));
    if (chrome.authorBorder !== '0px' || chrome.usernameOutline !== 'none' || chrome.usernameShadow !== 'none' || chrome.closeWidth !== '32px') throw new Error(`Video viewer chrome mismatch: ${JSON.stringify(chrome)}`);
    await viewer.locator('.npati-video-viewer-close').hover();
    if ((await viewer.locator('.npati-video-viewer-close').evaluate(node => getComputedStyle(node).backgroundColor)) === 'rgb(227, 44, 38)') throw new Error('Close button still turns red on hover');
    await viewer.locator('[data-video-interaction="like"]').click();
    await page.waitForFunction(() => document.querySelector('[data-video-count="likes"]')?.textContent === '10');
    await viewer.locator('[data-video-interaction="comments"]').click();
    if (!await viewer.locator('.npati-video-comment-form textarea').evaluate(node => node === document.activeElement)) throw new Error('Comments icon does not focus the frontend comment composer');
    await viewer.locator('[data-video-interaction="save"]').click();
    await page.waitForFunction(() => document.querySelector('[data-video-count="saves"]')?.textContent === '5' && document.querySelector('[data-video-interaction="save"]')?.classList.contains('is-active'));
    await viewer.locator('[data-video-interaction="share"]').click();
    await page.waitForFunction(() => ['like','save','share'].every(action => (window.__videoActions || []).includes(action)));
    await viewer.locator('.npati-video-comment-form textarea').fill('New comment from WordPress ');
    await viewer.locator('.npati-video-comment-form .npati-video-emoji-trigger').click();
    const emojiPicker = viewer.locator('.npati-video-comment-form .npati-video-emoji-picker');
    if (!await emojiPicker.isVisible() || await emojiPicker.locator('[data-emoji-category]').count() !== 6) throw new Error('Frontend emoji picker is missing or incomplete');
    const emojiSize = await emojiPicker.evaluate(node => ({width:getComputedStyle(node).width,height:getComputedStyle(node).height}));
    if (emojiSize.width !== '288px' || emojiSize.height !== '256px') throw new Error(`Frontend emoji picker size mismatch: ${JSON.stringify(emojiSize)}`);
    await emojiPicker.locator('[data-emoji-category="hearts"]').click();
    await emojiPicker.locator('[data-emoji="❤️"]').click();
    if (await viewer.locator('.npati-video-comment-form textarea').inputValue() !== 'New comment from WordPress ❤️') throw new Error('Selected emoji was not inserted into the comment');
    await viewer.locator('.npati-video-comment-form button').click();
    await page.waitForFunction(() => (window.__marketCalls || []).some(path => path.endsWith('/comments')));
    await viewer.locator('[data-comment-reply]').click();
    if (!await viewer.locator('.npati-video-reply-form [type="submit"] svg path[d^="m22 2"]').count()) throw new Error('Reply composer does not use the frontend paper-plane icon');
    await viewer.locator('.npati-video-reply-form textarea').fill('Reply from WordPress');
    await viewer.locator('.npati-video-reply-form [type="submit"]').click();
    await page.waitForFunction(() => window.__lastCommentParent === '44444444-4444-4444-8444-444444444444');
    await viewer.locator('.npati-video-viewer-close').click();
    if (await viewer.count()) throw new Error('Video viewer did not close');
    await page.locator('[data-market-tab="shorts"]').click();
    const shortCard = page.locator('.npati-short-card');
    if (await shortCard.count() !== 1 || await page.locator('.npati-listing-card').count()) throw new Error('Shorts tab did not render its dedicated frontend card');
    const shortVisual = await shortCard.evaluate(node => ({ columns:getComputedStyle(node.parentElement).gridTemplateColumns.split(' ').length,height:getComputedStyle(node.querySelector('.npati-short-media')).height,fit:getComputedStyle(node.querySelector('video')).objectFit,shadow:getComputedStyle(node).boxShadow,viewsBackground:getComputedStyle(node.querySelector('.npati-short-views')).backgroundColor,dots:getComputedStyle(node.querySelector('.npati-short-dots svg')).width }));
    if (shortVisual.columns !== 4 || shortVisual.height !== '344px' || shortVisual.fit !== 'cover' || shortVisual.shadow === 'none' || shortVisual.viewsBackground !== 'rgba(31, 41, 55, 0.7)' || shortVisual.dots !== '20px') throw new Error(`Frontend Shorts card mismatch: ${JSON.stringify(shortVisual)}`);
    if ((await shortCard.getAttribute('href')) !== 'https://www.npati.com/ua/s/77777777-7777-4777-8777-777777777777' || (await shortCard.getAttribute('target')) !== '_blank') throw new Error('Short click does not open the exact NPATI /s/:id page');
    const shortCopy=await shortCard.innerText();if(!shortCopy.includes('10')||!shortCopy.includes('2026'))throw new Error(`Short views/date are missing: ${shortCopy}`);
    await page.evaluate(() => { window.__playedVideo = ''; });
    await shortCard.hover();
    await page.waitForFunction(() => window.__playedVideo?.includes('short-feed.mp4'));
    if (await page.locator('[data-market-tab="archived"]').count()) throw new Error('Removed Archive tab is still visible');
    if (!(await page.evaluate(() => (window.__marketCalls || []).some(path => path.includes('/market/listings?status=pending')) && (window.__marketCalls || []).some(path => path.includes('/market/listings?status=rejected'))))) throw new Error('Listings tab did not request pending and rejected listings');
    if (errors.length) throw new Error(`Browser errors: ${errors.join(' | ')}`);
    console.log('market: combined listing statuses, video, Shorts and video viewer passed');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exit(1); });
