import { STATES_DATA } from "../data/statesData";
import { EXTRA_STATES } from "../data/extraStates";
const all = { ...STATES_DATA, ...EXTRA_STATES } as Record<string, any>;
const lim=[170,170,260,190,190,190];
for (const s of Object.values(all)) { const it=s.whyChooseItems||[]; console.log(s.slug.padEnd(15), (s.whyChooseSubtitle||'').length, it.length, it.map((d:any,i:number)=>d.description.length+(d.description.length>lim[i]?'*':'')).join(' ')); }
