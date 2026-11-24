import React from "react";
import { BadgeCheck, BadgeDollarSign, ShieldCheck, Video } from "lucide-react";
import { StateData } from "@/data/statesData";

export function StateTrustBar({ data }: { data: StateData }) {
  const stateName = data.name;
  // The hero pills already show clients supported, years serving and the money-back
  // guarantee, and the hero badges show sourced ratings, so this bar carries facts the
  // hero does not repeat. All of them are stated elsewhere on the site.
  const stat5 = data.trustStat5 || { value: "HIPAA", label: "Secure, private platform" };

  const stats = [
    { icon: BadgeDollarSign, value: "$99", label: "All inclusive, no surprises" },
    { icon: BadgeCheck, value: "Licensed", label: `Clinicians in ${stateName}` },
    { icon: Video, value: "Telehealth", label: "Video or phone evaluation" },
    { icon: ShieldCheck, value: stat5.value, label: stat5.label },
  ];

  return (
    <div className="pointer-events-auto relative z-30 -mt-[62px] mb-[58px] hidden px-8 lg:block">
      <div className="mx-auto grid max-w-[1146px] grid-cols-4 overflow-hidden rounded-[26px] bg-white shadow-[0_18px_40px_-24px_rgba(26,61,79,0.45)] ring-1 ring-line-200">
        {stats.map(({ icon: Icon, value, label }, idx) => (
          <div key={idx} className={`flex items-start gap-3.5 px-5 py-6 xl:gap-4 xl:px-7 ${idx > 0 ? "border-l border-line-200" : ""}`}>
            <span className="flex size-11 shrink-0 items-center justify-center rounded-[14px] bg-cream-100 text-primary">
              <Icon aria-hidden className="size-6" strokeWidth={1.8} />
            </span>
            <div className="min-w-0">
              <div className="font-heading text-[28px] font-bold leading-[30px] text-primary xl:text-[28px]">{value}</div>
              <div className="mt-1 font-sans text-base leading-[22px] text-body-text">{label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
