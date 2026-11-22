import { STATES_DATA } from "../data/statesData";
import { EXTRA_STATES } from "../data/extraStates";
const PROCESS = /^(undergo|complete|completion|review|attend|participate|schedule|meet with|a clinical evaluation)\b|\bdetermines?\b|client[–-]provider relationship|required disclosures/i;
const all = { ...STATES_DATA, ...EXTRA_STATES } as Record<string, { name: string; requirementsItems?: string[] }>;
for (const [k, d] of Object.entries(all)) {
  const items = d.requirementsItems ?? [];
  const c = items.filter((i) => !PROCESS.test(i));
  const s = items.filter((i) => PROCESS.test(i));
  console.log(`\n## ${d.name} (${k}) criteria=${c.length} steps=${s.length} ${s.length>=3?"TWO-PANEL":"GRID"}`);
  c.forEach((i) => console.log("  C:", i.slice(0, 110)));
  s.forEach((i) => console.log("  S:", i.slice(0, 110)));
}
