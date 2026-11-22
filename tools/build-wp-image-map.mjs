// Builds data/wpImageMap.json: a lookup from an old WordPress upload's
// file stem to the matching image in /public, so old /wp-content/uploads/
// URLs (indexed in Google Images or linked from other sites) can 301 to
// the same picture on the Next.js site.
//
// Run: node tools/build-wp-image-map.mjs
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const PUBLIC = path.join(ROOT, "public");
const EXT = /\.(webp|png|jpe?g|gif|svg|avif|mp4)$/i;

export function stemOf(file) {
  return path
    .basename(file)
    .replace(EXT, "")
    .toLowerCase()
    .replace(/\.(webp|png|jpe?g)$/i, "") // double extensions like x.webp.webp
    .replace(/-\d{2,4}x\d{2,4}$/, "") // WordPress size variants
    .replace(/-(scaled|min|rotated)$/, "")
    .replace(/-\d$/, ""); // duplicate-upload suffix (-1, -2)
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (EXT.test(e.name)) out.push(p);
  }
  return out;
}

// Prefer clean paths (no spaces, not the nested public/public copy) and webp.
function score(rel) {
  let s = rel.length;
  if (/\s|&/.test(rel)) s += 1000;
  if (rel.startsWith("/public/")) s += 1000;
  if (!/\.webp$/i.test(rel)) s += 50;
  return s;
}

const map = {};
for (const abs of walk(PUBLIC)) {
  const rel = "/" + path.relative(PUBLIC, abs).split(path.sep).join("/");
  const stem = stemOf(rel);
  if (!stem) continue;
  if (!map[stem] || score(rel) < score(map[stem])) map[stem] = rel;
}

const sorted = Object.fromEntries(Object.entries(map).sort(([a], [b]) => a.localeCompare(b)));
fs.writeFileSync(path.join(ROOT, "data/wpImageMap.json"), JSON.stringify(sorted) + "\n");
console.log(`wpImageMap: ${Object.keys(sorted).length} stems`);
