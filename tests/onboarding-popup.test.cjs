const { chromium } = require('../../../frontend/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  });
  try {
    {
      const page = await browser.newPage();
      const pageErrors = [];
      page.on('pageerror', error => pageErrors.push(error.message));
      await page.setContent(`<div id="npati-hub-app"><section class="npati-onboarding"><button class="npati-connect-button">Connect</button><button class="npati-register-toggle">Create</button><form id="npati-registration-form" class="npati-registration-form" hidden><h2>Create NPATI account</h2><input name="username" required value="new_user"><input name="email" type="email" required value="new@example.com"><input name="password" type="password" minlength="8" required value="password123"><button type="submit">Create account</button><p class="npati-registration-note">The password is sent directly to NPATI Hub and is not stored by WordPress.</p></form><p class="npati-action-status"></p></section></div>`);
      await page.evaluate(() => {
        window.NPATI_HUB_CONFIG = { nonce: 'test', adminBaseUrl: 'admin.php?page=npati' };
        Element.prototype.scrollIntoView = function(options) { window.__scrollTarget=this.id;window.__scrollOptions=options; };
        window.wp = {
          apiFetch: Object.assign(async (options) => {
            window.__authCall = options;
            return { pairing_id:'00000000-0000-4000-8000-000000000001',registration_token:'a'.repeat(43),registration_url:'https://www.npati.com/hub/api/v1/wordpress/pairings/id/register' };
          }, { use() {}, createNonceMiddleware() { return () => {}; } }),
        };
        window.fetch = async (_url, options) => { window.__registration = JSON.parse(options.body); return { ok:true, json:async()=>({data:{callback_url:'about:blank#connected'}}) }; };
      });
      await page.addStyleTag({ path: 'D:/npati/npati-clone/wordpress-plugin/npati-hub/assets/css/admin.css' });
      await page.addScriptTag({ path: 'D:/npati/npati-clone/wordpress-plugin/npati-hub/assets/js/admin.js' });
      await page.click('.npati-register-toggle');
      if (await page.locator('#npati-registration-form').isHidden()) throw new Error('Registration form did not open');
      await page.waitForFunction(()=>window.__scrollTarget==='npati-registration-form');
      const scrollOptions=await page.evaluate(()=>window.__scrollOptions);
      if(scrollOptions?.behavior!=='smooth'||scrollOptions?.block!=='start')throw new Error(`Registration scroll behavior mismatch: ${JSON.stringify(scrollOptions)}`);
      const registrationType=await page.evaluate(()=>{const heading=getComputedStyle(document.querySelector('.npati-registration-form h2')),note=getComputedStyle(document.querySelector('.npati-registration-note'));return{headingSize:heading.fontSize,headingAlign:heading.textAlign,noteAlign:note.textAlign,noteColor:note.color,noteLineHeight:note.lineHeight}});
      if(registrationType.headingSize!=='18px'||registrationType.headingAlign!=='center'||registrationType.noteAlign!=='center'||registrationType.noteColor!=='rgb(48, 52, 58)'||registrationType.noteLineHeight!=='18px')throw new Error(`Registration typography mismatch: ${JSON.stringify(registrationType)}`);
      await page.click('#npati-registration-form [type="submit"]');
      await page.waitForFunction(() => window.__authCall?.data?.intent === 'register' && window.__registration?.username === 'new_user');
      const wpPayload = await page.evaluate(() => window.__authCall.data);
      if ('password' in wpPayload) throw new Error('Password was sent through WordPress REST');
      console.log('register: inline form uses direct Hub request');
      await page.close();
    }
    {
      const page = await browser.newPage();
      const pageErrors = [];
      page.on('pageerror', error => pageErrors.push(error.message));
      await page.setContent(`<div id="npati-hub-app"><section class="npati-onboarding"><h1>One workspace for your store, content and publishing.</h1><button class="npati-connect-button">Connect NPATI</button><button class="npati-register-toggle">Create account</button><form id="npati-registration-form" hidden><label>Nickname<input name="username"></label><label>Password<input name="password"></label></form><p class="npati-action-status"></p></section></div>`);
      await page.evaluate(() => {
        window.NPATI_HUB_CONFIG = { nonce:'test', market:'UA', language:'uk' };
        window.wp = { apiFetch:Object.assign(async()=>({}),{use(){},createNonceMiddleware(){return()=>{}}}) };
      });
      await page.addScriptTag({ path:'D:/npati/npati-clone/wordpress-plugin/npati-hub/assets/js/admin.js' });
      await page.click('.npati-register-toggle');
      await page.waitForTimeout(100);
      const copy = await page.locator('.npati-onboarding').innerText();
      const detectedLanguage = await page.evaluate(() => document.documentElement.dataset.npatiUiLanguage);
      for (const expected of ['Єдиний простір для магазину, контенту та публікацій.','Підключити NPATI','Створити обліковий запис','Нікнейм','Пароль']) if (!copy.includes(expected)) throw new Error(`Missing Ukrainian text: ${expected}\nDetected language: ${detectedLanguage}\nPage errors: ${pageErrors.join(' | ')}\nRendered copy:\n${copy}`);
      console.log('uk: WordPress onboarding localization passed');
      await page.close();
    }
    {
      const page = await browser.newPage();
      const pageErrors = [];
      page.on('pageerror', error => pageErrors.push(error.message));
      await page.setContent(`<header class="npati-app-header"><a class="npati-wordmark"><span>Npati</span><i>.</i></a><div class="npati-header-actions"><div class="npati-profile-menu"><button id="npati-profile-trigger"><span class="npati-avatar" data-profile-avatar>N</span></button><div id="npati-profile-dropdown" hidden><div class="npati-profile-summary"><span data-profile-avatar>N</span><div><strong data-profile-name></strong><span data-profile-email></span></div></div><button data-profile-action="avatar">Change profile photo</button><a data-profile-link hidden>View profile</a><button data-profile-action="disconnect">Sign out</button><p class="npati-profile-status"></p></div></div></div></header>`);
      await page.evaluate(() => {
        window.NPATI_HUB_CONFIG = { nonce:'test', market:'US', language:'en', connected:true, adminBaseUrl:'#signed-out' };
        const apiFetch = async options => {
          window.__profileCalls = [...(window.__profileCalls || []), options];
          return {username:'anastasia',displayName:'Anastasia',email:'a@example.com',avatar:'https://api.npati.com/assets/avatar.webp',profileUrl:'https://www.npati.com/@anastasia'};
        };
        apiFetch.use=()=>{};apiFetch.createNonceMiddleware=()=>()=>{};
        const selection={first:()=>({toJSON:()=>({id:77})})};
        window.wp={apiFetch,media:()=>({on(_name,handler){this.handler=handler},open(){this.handler()},state(){return{get:()=>selection}}})};
      });
      await page.addScriptTag({ path:'D:/npati/npati-clone/wordpress-plugin/npati-hub/assets/js/admin.js' });
      await page.waitForFunction(()=>document.querySelector('[data-profile-name]')?.textContent==='@anastasia');
      await page.click('#npati-profile-trigger');
      if (await page.locator('#npati-profile-dropdown').isHidden()) throw new Error('Profile menu did not open');
      await page.click('[data-profile-action="avatar"]');
      await page.waitForFunction(()=>window.__profileCalls?.some(call=>call.path==='/npati/v1/profile/avatar'&&call.data?.attachmentId===77));
      page.once('dialog',dialog=>dialog.accept());
      await page.click('[data-profile-action="disconnect"]');
      await page.waitForFunction(()=>window.__profileCalls?.some(call=>call.path==='/npati/v1/disconnect'&&call.method==='POST'));
      if(pageErrors.length)throw new Error(`Profile header errors: ${pageErrors.join(' | ')}`);
      console.log('profile: avatar menu updates the profile and can sign out');
      await page.close();
    }
    {
      const page = await browser.newPage();
      await page.setContent(`<header><button id="npati-profile-trigger"><span data-profile-avatar>N</span></button><div id="npati-profile-dropdown" hidden><strong data-profile-name></strong><span data-profile-email></span><a data-profile-link hidden></a></div></header>`);
      await page.evaluate(()=>{
        window.NPATI_HUB_CONFIG={nonce:'test',market:'US',language:'en',connected:true,profile:{username:'anastasia',email:'a@example.com',avatar:'https://api.npati.com/assets/avatar.webp'}};
        const apiFetch=async options=>{window.__cachedProfileCalls=[...(window.__cachedProfileCalls||[]),options];return{}};
        apiFetch.use=()=>{};apiFetch.createNonceMiddleware=()=>()=>{};window.wp={apiFetch};
      });
      await page.addScriptTag({path:'D:/npati/npati-clone/wordpress-plugin/npati-hub/assets/js/admin.js'});
      await page.waitForFunction(()=>document.querySelector('[data-profile-name]')?.textContent==='@anastasia');
      const calls=await page.evaluate(()=>window.__cachedProfileCalls||[]);
      if(calls.some(call=>call.path==='/npati/v1/profile'))throw new Error('Cached profile triggered a duplicate API request');
      console.log('profile: cached avatar renders without a duplicate API request');
      await page.close();
    }
    {
      const page = await browser.newPage();
      await page.setContent(`<header><button id="npati-profile-trigger"><span data-profile-avatar>N</span></button><div id="npati-profile-dropdown" hidden></div></header>`);
      await page.evaluate(()=>{
        window.NPATI_HUB_CONFIG={nonce:'test',market:'US',language:'en',connected:true,adminBaseUrl:'#npati-sign-in'};
        const apiFetch=async()=>Promise.reject({code:'invalid_api_key',message:'API key is invalid'});
        apiFetch.use=()=>{};apiFetch.createNonceMiddleware=()=>()=>{};window.wp={apiFetch};
      });
      await page.addScriptTag({path:'D:/npati/npati-clone/wordpress-plugin/npati-hub/assets/js/admin.js'});
      await page.waitForFunction(()=>location.hash==='#npati-sign-in');
      console.log('profile: invalid API key returns the user to NPATI sign-in');
      await page.close();
    }
    {
      const page = await browser.newPage();
      await page.setContent(`<header><button id="npati-profile-trigger"><span data-profile-avatar>N</span></button><div id="npati-profile-dropdown" hidden><button data-profile-action="avatar">Photo</button><p class="npati-profile-status"></p></div></header>`);
      await page.evaluate(()=>{
        window.NPATI_HUB_CONFIG={nonce:'test',market:'US',language:'en',connected:false};
        const apiFetch=async options=>{window.__offlineCalls=[...(window.__offlineCalls||[]),options];return{}};
        apiFetch.use=()=>{};apiFetch.createNonceMiddleware=()=>()=>{};window.wp={apiFetch};
      });
      await page.addScriptTag({path:'D:/npati/npati-clone/wordpress-plugin/npati-hub/assets/js/admin.js'});
      await page.waitForTimeout(100);
      const calls=await page.evaluate(()=>window.__offlineCalls||[]);
      if(calls.some(call=>call.path==='/npati/v1/profile'))throw new Error('Offline header requested a protected NPATI profile');
      console.log('offline: protected profile request is suppressed');
      await page.close();
    }
    {
      const page = await browser.newPage();
      await page.setContent(`<div class="npati-hub-admin"><div class="npati-app-shell"><header class="npati-app-header"><a href="#" class="npati-wordmark"><span class="npati-wordmark-text">Npati<i>.</i></span></a><div class="npati-profile-summary"><div><strong data-profile-name>@anastasia</strong><span data-profile-email>andriikosta1@gmail.com</span></div></div><span class="npati-connection-pill"><i></i>Offline</span><span class="npati-connection-pill is-connected"><i></i>Connected</span></header><nav class="npati-section-nav"><a href="#market">Market</a></nav><main class="npati-app-content"><section class="npati-onboarding"><h1>One workspace for your store, content and publishing.</h1><div class="npati-onboarding-actions"><button class="npati-primary-button">Connect NPATI</button><button class="npati-secondary-button">Create account</button></div><p class="npati-onboarding-copy">Connect your NPATI account or create a new one without leaving WordPress.</p></section><section class="npati-page-heading npati-market-heading"><div><h1>Ваш контент у маркеті</h1><p>Оголошення, відео та шортси з підключеного облікового запису NPATI.</p></div></section></main></div></div>`);
      await page.addStyleTag({ path:'D:/npati/npati-clone/wordpress-plugin/npati-hub/assets/css/admin.css' });
      await page.waitForTimeout(400);
      await page.focus('.npati-wordmark');
      await page.waitForTimeout(50);
      const styles=await page.evaluate(()=>{
        const logo=getComputedStyle(document.querySelector('.npati-wordmark'));
        const dot=getComputedStyle(document.querySelector('.npati-wordmark i'));
        const offline=getComputedStyle(document.querySelector('.npati-connection-pill'));
        const connected=getComputedStyle(document.querySelector('.npati-connection-pill.is-connected'));
        const keyframes=document.querySelector('.npati-wordmark i').getAnimations().find(animation=>animation.animationName==='npati-logo-bounce')?.effect.getKeyframes()||[];
        const nav=getComputedStyle(document.querySelector('.npati-section-nav a'));
        const navBar=getComputedStyle(document.querySelector('.npati-section-nav'));
        return {outline:logo.outlineStyle,shadow:logo.boxShadow,logoSize:logo.fontSize,logoLineHeight:logo.lineHeight,logoWeight:logo.fontWeight,dotLineHeight:dot.lineHeight,animation:dot.animationName,duration:dot.animationDuration,keyframes:keyframes.map(frame=>({offset:frame.offset,transform:frame.transform,easing:frame.easing})),offlineBackground:offline.backgroundColor,offlineColor:offline.color,offlineBorder:offline.borderTopColor,connectedBackground:connected.backgroundColor,connectedColor:connected.color,navSize:nav.fontSize,navWeight:nav.fontWeight,navColor:nav.color,navJustify:navBar.justifyContent,navShadow:navBar.boxShadow};
      });
      if(styles.outline!=='none'||styles.shadow!=='none')throw new Error(`Logo focus frame remains: ${JSON.stringify(styles)}`);
      if(styles.animation!=='npati-logo-bounce'||styles.duration!=='1s')throw new Error(`Logo dot animation mismatch: ${JSON.stringify(styles)}`);
      if(styles.logoSize!=='24px'||styles.logoLineHeight!=='32px'||styles.logoWeight!=='700'||styles.dotLineHeight!=='32px')throw new Error(`Logo geometry differs from NpatiLogo.tsx: ${JSON.stringify(styles)}`);
      if(styles.keyframes.length!==3||styles.keyframes[0].transform!=='translateY(-25%)'||styles.keyframes[0].easing!=='cubic-bezier(0.8, 0, 1, 1)'||styles.keyframes[1].transform!=='none'||styles.keyframes[1].easing!=='cubic-bezier(0, 0, 0.2, 1)'||styles.keyframes[2].transform!=='translateY(-25%)')throw new Error(`Logo keyframes differ from frontend bounce: ${JSON.stringify(styles.keyframes)}`);
      if(styles.offlineBackground!=='rgb(255, 255, 255)'||styles.offlineColor!=='rgb(23, 23, 23)'||styles.offlineBorder!=='rgb(23, 23, 23)')throw new Error(`Offline badge contrast mismatch: ${JSON.stringify(styles)}`);
      if(styles.connectedBackground!=='rgb(255, 255, 255)'||styles.connectedColor!=='rgb(22, 101, 52)')throw new Error(`Connected badge contrast mismatch: ${JSON.stringify(styles)}`);
      if(styles.navSize!=='14px'||Number(styles.navWeight)<650||styles.navColor!=='rgb(17, 17, 17)')throw new Error(`Navigation resting typography mismatch: ${JSON.stringify(styles)}`);
      if(styles.navJustify!=='center'||styles.navShadow==='none')throw new Error(`Desktop navigation is not centered with a shadow: ${JSON.stringify(styles)}`);
      const onboarding=await page.evaluate(()=>{const card=document.querySelector('.npati-onboarding').getBoundingClientRect(),heading=getComputedStyle(document.querySelector('.npati-onboarding h1')),actions=document.querySelector('.npati-onboarding-actions'),actionsStyle=getComputedStyle(actions),buttonStyle=getComputedStyle(actions.querySelector('button')),copy=document.querySelector('.npati-onboarding-copy'),copyStyle=getComputedStyle(copy);return{top:card.top,bottom:card.bottom,headingSize:heading.fontSize,headingWeight:heading.fontWeight,buttonHeight:buttonStyle.minHeight,buttonSize:buttonStyle.fontSize,actionsJustify:actionsStyle.justifyContent,copyAfterButtons:Boolean(actions.compareDocumentPosition(copy)&Node.DOCUMENT_POSITION_FOLLOWING),copyColor:copyStyle.color,copySize:copyStyle.fontSize,copyLineHeight:copyStyle.lineHeight,hasLogo:Boolean(document.querySelector('.npati-onboarding-logo')),hasEyebrow:Boolean(document.querySelector('.npati-onboarding>.npati-eyebrow'))}});
      if(onboarding.hasLogo||onboarding.hasEyebrow||onboarding.headingSize!=='30px'||onboarding.headingWeight!=='600'||onboarding.buttonHeight!=='52px'||onboarding.buttonSize!=='15px'||onboarding.actionsJustify!=='center'||!onboarding.copyAfterButtons||onboarding.copyColor!=='rgb(48, 52, 58)'||onboarding.copySize!=='14px'||onboarding.copyLineHeight!=='22.4px'||onboarding.bottom>900||onboarding.top>210)throw new Error(`Onboarding layout mismatch: ${JSON.stringify(onboarding)}`);
      const requestedTypography=await page.evaluate(()=>{const username=getComputedStyle(document.querySelector('[data-profile-name]')),email=getComputedStyle(document.querySelector('[data-profile-email]')),heading=getComputedStyle(document.querySelector('.npati-market-heading h1')),description=getComputedStyle(document.querySelector('.npati-market-heading p'));return{usernameColor:username.color,usernameWeight:username.fontWeight,emailColor:email.color,headingColor:heading.color,headingSize:heading.fontSize,headingWeight:heading.fontWeight,descriptionColor:description.color}});
      if(requestedTypography.usernameColor!=='rgb(0, 0, 0)'||Number(requestedTypography.usernameWeight)<800||requestedTypography.emailColor!=='rgb(0, 0, 0)'||requestedTypography.headingColor!=='rgb(0, 0, 0)'||requestedTypography.headingSize!=='26px'||requestedTypography.headingWeight!=='600'||requestedTypography.descriptionColor!=='rgb(0, 0, 0)')throw new Error(`Profile/Market typography mismatch: ${JSON.stringify(requestedTypography)}`);
      await page.hover('.npati-onboarding-actions .npati-primary-button');
      await page.waitForTimeout(200);
      const buttonTransform=await page.$eval('.npati-onboarding-actions .npati-primary-button',node=>getComputedStyle(node).transform);
      if(buttonTransform==='none'||!buttonTransform.startsWith('matrix(1.025'))throw new Error(`Onboarding button hover scale mismatch: ${buttonTransform}`);
      await page.hover('.npati-section-nav a');
      await page.waitForTimeout(250);
      const navHover=await page.$eval('.npati-section-nav a',node=>{const style=getComputedStyle(node);return{color:style.color,fontWeight:style.fontWeight,transitionDuration:style.transitionDuration}});
      if(navHover.color!=='rgb(227, 44, 38)'||Number(navHover.fontWeight)<700||navHover.transitionDuration!=='0.2s')throw new Error(`Frontend breadcrumb hover mismatch: ${JSON.stringify(navHover)}`);
      console.log('header: frontend dot animation, status styles and breadcrumb menu hover passed');
      await page.close();
    }
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
