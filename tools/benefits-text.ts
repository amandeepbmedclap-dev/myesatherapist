import { STATES_DATA } from "../data/statesData";
import { EXTRA_STATES } from "../data/extraStates";
import fs from "fs";
const all = { ...STATES_DATA, ...EXTRA_STATES } as Record<string, any>;
const out:any = {};
for (const s of Object.values(all)) out[s.slug] = [s.benefitsTitle, s.benefitsSubtitle, ...[...(s.financialBenefits||[]),...(s.emotionalBenefits||[])].flatMap((d:any)=>[d.title,d.description])].filter(Boolean);
fs.writeFileSync("/tmp/bentext.json", JSON.stringify(out));
