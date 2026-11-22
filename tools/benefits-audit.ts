import { STATES_DATA } from "../data/statesData";
import { EXTRA_STATES } from "../data/extraStates";
const all = { ...STATES_DATA, ...EXTRA_STATES } as Record<string, any>;
const rows = Object.values(all).map((d: any) => {
  const f = d.financialBenefits ?? [], e = d.emotionalBenefits ?? [];
  const L = [...f, ...e].map((x: any) => x.description.length);
  return { slug: d.slug, fin: f.length, emo: e.length, emoHead: (d.emotionalBenefitsHeading ?? "-").slice(0, 34), maxD: Math.max(0, ...L), avgD: L.length ? Math.round(L.reduce((a: number, b: number) => a + b, 0) / L.length) : 0, foot: (d.benefitsFootnote ?? "").length, refund: d.benefitsRefundNote === "" ? "off" : "on", img: (d.benefitsImage ?? "-").replace("/states/", "") };
});
console.table(rows);
