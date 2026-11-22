import { STATES_DATA } from "../data/statesData";
import { EXTRA_STATES } from "../data/extraStates";
const all = { ...STATES_DATA, ...EXTRA_STATES } as Record<string, any>;
const rows = Object.values(all).map((d: any) => {
  const c = d.whoQualifiesConditions ?? [];
  const dl = c.map((x: any) => x.description.length);
  return { slug: d.slug, n: c.length, maxTitle: Math.max(0, ...c.map((x: any) => x.title.length)), avgDesc: dl.length ? Math.round(dl.reduce((a: number, b: number) => a + b, 0) / dl.length) : 0, maxDesc: Math.max(0, ...dl), sub: (d.whoQualifiesSubtitle ?? "").length, note: (d.whoQualifiesNote ?? "").length, img: d.whoQualifiesImage ?? "-", aspect: d.whoQualifiesAspect ?? "-", heading: d.whoQualifiesSectionHeading ?? "(default)" };
});
console.table(rows);
