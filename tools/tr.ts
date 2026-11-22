import { STATES_DATA } from "../data/statesData";
import { EXTRA_STATES } from "../data/extraStates";
const all = { ...STATES_DATA, ...EXTRA_STATES } as Record<string, any>;
const texts = new Map<string, number>(); let n=0;
for (const s of Object.values(all)) { if (s.trustedReviews?.length) { n++; for (const r of s.trustedReviews) { const t=(r.text||r.quote||r.review||JSON.stringify(r)).slice(0,60); texts.set(t,(texts.get(t)||0)+1);} } }
console.log('states with text reviews', n, 'unique', texts.size); console.log([...texts.entries()].slice(0,4));
