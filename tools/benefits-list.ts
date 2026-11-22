import { STATES_DATA } from "../data/statesData";
import { EXTRA_STATES } from "../data/extraStates";
const all:any[] = [...Object.values(STATES_DATA as any), ...Object.values(EXTRA_STATES as any)];
for (const s of all) {
  const ds=[...(s.financialBenefits||[]),...(s.emotionalBenefits||[])];
  const long=ds.filter((d:any)=>d.description.length>230).map((d:any)=>d.description.length);
  console.log(s.slug, '|', s.benefitsTitle, '|', s.financialBenefitsHeading||'-', '|', JSON.stringify(s.emotionalBenefitsHeading||'-'), '|img', s.benefitsImage||'-', '|long', long.join(','));
}
