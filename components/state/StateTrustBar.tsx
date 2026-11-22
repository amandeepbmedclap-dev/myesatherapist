import React from "react";
import { BadgeDollarSign, CalendarCheck, ShieldCheck, Users } from "lucide-react";
import { StateData } from "@/data/statesData";

export function StateTrustBar({ data }: { data: StateData }) {
  const stateName = data.name;
  // One verified nationwide figure; per-state counts were removed (Nov 2026).
  // The rating is shown with its source in the hero badges (Trustpilot, ConsumerAffairs),
  // so it is not repeated here as an unsourced average.
  const stat5 = data.trustStat5 || { value: "Secure", label: "Online Evaluation" };

  const stats = [
    { icon: Users, value: "6,500+", label: "Clients Supported Nationwide" },
    { icon: CalendarCheck, value: "7+ Years", label: `Serving ${stateName}` },
    { icon: BadgeDollarSign, value: "$99", label: "All inclusive, no surprises" },
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
              <div className="font-heading text-[26px] font-bold leading-[30px] text-primary xl:text-[28px]">{value}</div>
              <div className="mt-1 font-sans text-[14px] leading-[20px] text-body-text">{label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
