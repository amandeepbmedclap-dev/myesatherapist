import { chromium } from '/home/claude/.npm-global/lib/node_modules/playwright/index.mjs';
const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args:['--no-sandbox','--allow-file-access-from-files'] });
const p = await b.newPage({ viewport:{width:816,height:1056} });
await p.goto('file:///home/claude/kit/kit.html', { waitUntil:'networkidle' });
await p.evaluate(() => document.fonts.ready);
await p.pdf({ path:'/home/claude/kit/renters-esa-kit-2026.pdf', width:'8.5in', height:'11in', printBackground:true, preferCSSPageSize:true });
const n = await p.locator('section.page').count();
for (let i=0;i<n;i++) await p.locator('section.page').nth(i).screenshot({ path:`/home/claude/kit/p${i+1}.png` });
await b.close(); console.log('pages', n);
