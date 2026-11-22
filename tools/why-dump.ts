import { STATES_DATA } from "../data/statesData";
for (const k of ["california","florida","georgia"]) { const s:any=(STATES_DATA as any)[k]; console.log('##',k); for (const d of s.whyChooseItems) console.log(`- ${d.title} (${d.description.length}): ${d.description}`); }
