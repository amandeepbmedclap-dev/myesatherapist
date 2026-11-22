import { STATES_DATA } from "../data/statesData";
import { EXTRA_STATES } from "../data/extraStates";
const all = { ...STATES_DATA, ...EXTRA_STATES } as Record<string, any>;
for (const s of Object.values(all)) { const r=s.housingRequests; console.log(s.slug, r? JSON.stringify(r).slice(0,90)+' | may:'+r.mayRequestItems.length+' cannot:'+r.cannotRequestItems.length : '-', '| legal:', (s.legalNotice??'(default)').length); }
console.log(JSON.stringify((all as any).florida.housingRequests,null,1));
