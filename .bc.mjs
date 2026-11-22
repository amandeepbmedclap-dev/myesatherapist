import { chromium } from '/home/claude/.npm-global/lib/node_modules/playwright/index.mjs';
const pages=['/about-us/','/contact-us/','/esa-doctors/','/esa-doctors/dr-robert-staaf/','/esa-laws/','/esa-laws/alabama/','/reviews/','/video-testimonials/','/state/','/esa-letter-renewal/','/psd-letter/','/esa-letter-arkansas/','/pricing/','/frequently-asked-questions/','/blog/','/blog/esa-guide/','/blog/esa-guide/esa-letter-sample/','/contributors/allyson-valley/','/contributors/max-phillips/','/legal-reviewer/','/esa-letter-online/','/esa-letter-for-housing/','/privacy-policy/','/refund-policy/'];
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args:['--no-sandbox'] });
for (const w of [1440,390]) {
 const p=await b.newPage({viewport:{width:w,height:900}}); await p.addInitScript(()=>localStorage.setItem('met-exit-done','1'));
 for (const u of pages) {
  const r=await p.goto('http://localhost:3123'+u,{waitUntil:'domcontentloaded'}); await p.waitForTimeout(700);
  const info=await p.evaluate(()=>{const hdr=document.querySelector('header'); const hb=hdr?hdr.getBoundingClientRect().bottom:0; const navs=[...document.querySelectorAll('nav[aria-label="Breadcrumb"]')].filter(n=>n.offsetParent||n.getClientRects().length); if(!navs.length) return 'NONE'; return navs.map(n=>{const r=n.getBoundingClientRect(); const ol=n.querySelector('ol,div')||n; const o=ol.getBoundingClientRect(); const items=[...n.querySelectorAll('a,span[aria-current],[aria-current]')].map(e=>e.textContent.trim()).join(' > '); const cs=getComputedStyle(n.querySelector('a')||n); return `gap=${Math.round(r.top-hb)} left=${Math.round(o.left)} center=${Math.round((o.left+o.right)/2)} fs=${cs.fontSize} col=${cs.color} :: ${items}`}).join(' || ')});
  console.log(w, r.status(), u, info);
 }
 await p.close();
}
await b.close();
