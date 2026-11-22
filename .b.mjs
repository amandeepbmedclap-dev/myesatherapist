import { chromium } from '/home/claude/.npm-global/lib/node_modules/playwright/index.mjs';
const slug=process.argv[2]||'alabama';
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args:['--no-sandbox'] });
for (const w of [1440,1024,768,390]) { const p=await b.newPage({viewport:{width:w,height:900}}); await p.addInitScript(()=>localStorage.setItem('met-exit-done','1'));
 await p.goto(`http://localhost:3123/esa-letter-${slug}/`,{waitUntil:'networkidle'}); await p.evaluate(()=>document.querySelector('header').style.position='static');
 const dw=await p.evaluate(()=>document.documentElement.scrollWidth); if(dw>w) console.log('overflow',w,dw);
 const s=p.locator('[data-section="benefits"]'); await s.scrollIntoViewIfNeeded();
 await p.evaluate(async()=>{const i=document.querySelector('[data-section=benefits] img'); i.loading='eager'; if(!i.complete) await new Promise(r=>{i.onload=r;setTimeout(r,4000)})}); await p.waitForTimeout(300);
 if(w>=1024) console.log(w, await p.evaluate(()=>{const s=document.querySelector('[data-section=benefits]'); const h=s.querySelector('h2'); const cs=getComputedStyle(h); const cols=[...s.querySelectorAll('ul')].map(u=>Math.round(u.parentElement.getBoundingClientRect().height)); const f=s.querySelector('img').parentElement.getBoundingClientRect(); return {h2lines:Math.round(h.getBoundingClientRect().height/parseFloat(cs.lineHeight)), cols, photo:[Math.round(f.width),Math.round(f.height)]}}));
 await s.screenshot({path:`/home/claude/shots/ben-${slug}-${w}.png`}); await p.close(); }
await b.close();
