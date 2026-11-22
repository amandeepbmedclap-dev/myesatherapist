import { STATES_DATA } from "../data/statesData";
import { EXTRA_STATES } from "../data/extraStates";
import fs from "fs";
const all = { ...STATES_DATA, ...EXTRA_STATES } as Record<string, any>;
const out:any = {};
for (const s of Object.values(all) as any[]) {
  const t:string[] = [];
  for (const f of s.faqs||[]) t.push(f.q, f.a);
  for (const c of s.cities||[]) t.push(c.name);
  t.push(...(s.scamsCommonItems||[])); for (const i of s.scamsWhatYouNeedItems||[]) t.push(i.title,i.description);
  if (s.scamsCommonSubtitle) t.push(s.scamsCommonSubtitle);
  for (const c of [...(s.card1Items||[]),...(s.card2Items||[])]) t.push(c.title,c.description);
  if (s.legalNotice) t.push(s.legalNotice);
  if (s.citiesSubtitle) t.push(s.citiesSubtitle);
  out[s.slug]=t.filter(Boolean);
}
fs.writeFileSync("/tmp/statetext.json", JSON.stringify(out));
