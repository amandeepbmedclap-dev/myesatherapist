import { STATES_DATA } from "../data/statesData";
import { EXTRA_STATES } from "../data/extraStates";
const all = { ...STATES_DATA, ...EXTRA_STATES } as Record<string, any>;
for (const k of process.argv.slice(2)) { const s=all[k]; console.log(`\n## ${k}`); (s.scamsWhatYouNeedItems||[]).forEach((i:any)=>console.log(`- ${i.title}\n  ${i.description}`)); }
