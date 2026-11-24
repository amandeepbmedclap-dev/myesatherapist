import React from "react";
import { CtaButton } from "@/components/common/CtaButton";
import { StateData } from "@/data/statesData";
import { Check, X } from "lucide-react";
import { isSectionPilot } from "@/lib/sectionPilot";

function RequestRow({ title, intro, items, allowed }: { title: string; intro?: string; items: string[]; allowed: boolean }) {
  return (
    <div className="grid gap-5 p-6 sm:p-8 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-10 lg:p-10">
      <div>
        <span
          aria-hidden
          className={`flex size-11 items-center justify-center rounded-[14px] ${allowed ? "bg-accent text-primary" : "bg-[#F9E4E2] text-[#B4443A]"}`}
        >
          {allowed ? <Check strokeWidth={3} className="size-5" /> : <X strokeWidth={3} className="size-5" />}
        </span>
        <h2 className="heading-h2 mt-4 font-heading font-bold text-primary">{title}</h2>
      </div>
      <div className="min-w-0">
        {intro ? <p className="font-sans text-[16px] leading-[27px] text-body-text">{intro}</p> : null}
        {items.length ? (
          <ul className={`${intro ? "mt-5 border-t border-primary/10 pt-5" : ""} space-y-3.5`}>
            {items.map((item) => (
              <li key={item} className="flex items-start gap-3 font-sans text-[16px] leading-[26px] text-body-text">
                <span
                  aria-hidden
                  className={`mt-[3px] flex size-5 shrink-0 items-center justify-center rounded-full ${allowed ? "bg-accent text-primary" : "bg-[#F9E4E2] text-[#B4443A]"}`}
                >
                  {allowed ? <Check strokeWidth={3} className="size-3" /> : <X strokeWidth={3} className="size-3" />}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

export function StateHousingRequestsSection({ data }: { data: StateData }) {
  const requests = data.housingRequests;
  if (!requests) return null;

  if (isSectionPilot(data.slug)) {
    return (
      <section id="housing-requests" data-section="housing-requests" className="w-full bg-background px-4 pb-14 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
        <div className="mx-auto max-w-[1060px]">
          <div className="overflow-hidden rounded-[26px] bg-white ring-1 ring-line-200 shadow-[0_24px_50px_-40px_rgba(26,61,79,0.45)]">
            <RequestRow title={requests.mayRequestTitle} intro={requests.mayRequestIntro} items={requests.mayRequestItems} allowed />
            <div className="border-t border-primary/10 bg-cream-100/60">
              <RequestRow title={requests.cannotRequestTitle} items={requests.cannotRequestItems} allowed={false} />
            </div>
          </div>
          <div className="mt-10 flex justify-center">
            <CtaButton>Start Your ESA Evaluation</CtaButton>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="housing-requests" className="w-full bg-background pt-4 pb-16 sm:pb-20 lg:pb-24">
      <div className="max-w-[1040px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10 sm:space-y-12">
        <div className="space-y-6 sm:space-y-8">
          <h2 className="heading-h2 font-heading font-bold text-primary tracking-tight max-w-[980px] mx-auto">
            {requests.mayRequestTitle}
          </h2>
          <div className="space-y-4 max-w-[960px] mx-auto text-base sm:text-lg text-body-text font-semibold leading-[1.7] font-sans">
            <p>{requests.mayRequestIntro}</p>
            {requests.mayRequestItems.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <h2 className="heading-h2 font-heading font-bold text-primary tracking-tight max-w-[980px] mx-auto">
            {requests.cannotRequestTitle}
          </h2>
          <div className="space-y-4 max-w-[960px] mx-auto text-base sm:text-lg text-body-text font-semibold leading-[1.7] font-sans">
            {requests.cannotRequestItems.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>

        <div>
          <CtaButton className="w-auto min-w-[270px]">Start Your ESA Evaluation</CtaButton>
        </div>
      </div>
    </section>
  );
}
