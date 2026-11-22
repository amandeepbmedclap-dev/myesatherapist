import { STATES_DATA } from "../data/statesData";
import { EXTRA_STATES } from "../data/extraStates";
const all = { ...STATES_DATA, ...EXTRA_STATES } as Record<string, any>;
for (const s of Object.values(all)) for (const d of [...(s.financialBenefits||[]),...(s.emotionalBenefits||[])]) if (d.description.length>260) console.log(`### ${s.slug} | ${d.title} | ${d.description.length}\n${d.description}`);
