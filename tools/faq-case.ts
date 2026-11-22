import { STATES_DATA } from "../data/statesData";
import { EXTRA_STATES } from "../data/extraStates";
const all = { ...STATES_DATA, ...EXTRA_STATES } as Record<string, any>;
const names = new Set(Object.values(all).flatMap((s: any) => s.name.split(" ")));
const keep = new Set(["I","I'm","ESA","ESAs","PSD","HOA","HUD","ID","FHA","ADA","US","U.S.","DC","Fair","Housing","Act"]);
const isTitle = (q: string) => { const w = q.split(" ").filter((x) => /^[a-z]/i.test(x)); return w.filter((x) => /^[A-Z]/.test(x)).length / w.length > 0.6; };
export function toSentence(q: string) {
  return q.split(" ").map((w, i) => {
    if (i === 0) return w;
    const core = w.replace(/^[("]+|[),.?!:"]+$/g, "");
    if (keep.has(core) || names.has(core) || /^[A-Z0-9.\-\/]+$/.test(core) && core.length > 1) return w;
    if (core.includes("/")) return w.split("/").map((p) => (names.has(p) ? p : p.charAt(0).toLowerCase() + p.slice(1))).join("/");
    return w.replace(/[A-Za-z]/, (c) => c.toLowerCase());
  }).join(" ");
}
const only = process.argv[2];
for (const s of Object.values(all) as any[]) {
  if (only && s.slug !== only) continue;
  for (const f of s.faqs || []) if (isTitle(f.q)) console.log(JSON.stringify([s.slug, f.q, toSentence(f.q)]));
}

export function applyCase(slug?: string) { return (Object.values(all) as any[]).filter((s) => !slug || s.slug === slug).flatMap((s) => (s.faqs || []).filter((f: any) => isTitle(f.q)).map((f: any) => [s.slug, f.q, toSentence(f.q)])); }
if (process.argv[3] === "--json") require("fs").writeFileSync("/tmp/faqcase.json", JSON.stringify(applyCase(only)));
