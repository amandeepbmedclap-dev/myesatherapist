// Render: npx playwright install chromium (once), then: node docs/renters-esa-kit/render.mjs
import { chromium } from 'playwright';
const b = await chromium.launch({ args:['--no-sandbox','--allow-file-access-from-files'] });
const p = await b.newPage({ viewport:{width:816,height:1056} });
await p.goto('file://'+new URL('kit.html', import.meta.url).pathname+'', { waitUntil:'networkidle' });
await p.evaluate(() => document.fonts.ready);
await p.pdf({ path:new URL('../../public/downloads/renters-esa-kit-2026.pdf', import.meta.url).pathname, width:'8.5in', height:'11in', printBackground:true, preferCSSPageSize:true });
await b.close(); console.log('PDF written');
