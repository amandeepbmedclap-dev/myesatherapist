import { STATES_DATA } from "../data/statesData";
import { EXTRA_STATES } from "../data/extraStates";
const all = { ...STATES_DATA, ...EXTRA_STATES } as Record<string, any>;
for (const s of Object.values(all) as any[]) console.log(s.slug, '|', s.scamsCommonSubtitle ?? '-', '|', (s.scamsCommonItems||[])[0]);
