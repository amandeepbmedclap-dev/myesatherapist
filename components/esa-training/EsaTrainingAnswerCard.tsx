const POINTS = [
  "No pet fees for a legitimate ESA. That hasn't changed.",
  "HUD shifted enforcement on May 22, 2026 toward trained, task-specific animals.",
  "A current letter from a licensed professional still holds legal footing.",
];

/** The short answer to "Does my ESA need training?", shown beside the hero. */
export function EsaTrainingAnswerCard() {
  return (
    <div className="relative overflow-hidden rounded-[28px] bg-[#1A3D4F] p-7 text-white shadow-[0_40px_70px_-40px_rgba(26,61,79,0.8)] sm:p-9">
      <div aria-hidden className="absolute -right-16 -top-16 size-52 rounded-full bg-accent/15" />
      <div className="relative text-base font-bold uppercase tracking-[0.16em] text-accent">The short answer</div>
      <h2 className="heading-h2 relative mt-3 font-heading font-bold text-white">
        No. Training Isn&apos;t Legally Required.
      </h2>
      <p className="relative mt-3 text-base leading-relaxed text-white/80">
        The Fair Housing Act has never required ESAs to be trained. But behavior, documentation, and a current letter
        matter more than ever since HUD&apos;s 2026 enforcement shift.
      </p>
      <ul className="relative mt-6 space-y-3">
        {POINTS.map((point, i) => (
          <li key={point} className="flex items-start gap-4 rounded-[14px] bg-white/[0.07] p-4 ring-1 ring-white/10">
            <span className="font-heading text-xl font-bold leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
            <span className="text-base font-semibold leading-snug text-white">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
