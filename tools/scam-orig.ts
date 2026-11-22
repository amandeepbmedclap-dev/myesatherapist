import { STATES_DATA } from "../data/statesData";
import { EXTRA_STATES } from "../data/extraStates";
import fs from "fs";
const all = { ...STATES_DATA, ...EXTRA_STATES } as Record<string, any>;
const fix = JSON.parse(fs.readFileSync("/tmp/scamfix.json","utf8"));
const out:any[] = [];
for (const [k,v] of Object.entries<any>(fix)) {
  (v.need||[]).forEach((n:string|null,i:number)=>{ if(n) out.push([k, all[k].scamsWhatYouNeedItems[i].description, n, all[k].scamsWhatYouNeedItems[i].title]); });
  (v.common||[]).forEach((n:string|null,i:number)=>{ if(n) out.push([k, all[k].scamsCommonItems[i], n, "scam item"]); });
}
fs.writeFileSync("/tmp/scampairs.json", JSON.stringify(out));
