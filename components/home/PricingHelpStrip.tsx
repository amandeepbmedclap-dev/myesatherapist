"use client";

import { ArrowRight, HelpCircle } from "lucide-react";
import { openEsaEligibilityChecker } from "@/components/common/evaluationCta";

export function PricingHelpStrip() {
  return (
    <div className="mx-auto mt-8 flex w-full max-w-[860px] flex-col items-center gap-4 rounded-[18px] bg-white px-5 py-5 text-center ring-1 ring-line-200 sm:flex-row sm:px-7 sm:text-left">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-cream-100 text-primary">
        <HelpCircle aria-hidden className="size-6" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="font-sans text-base font-bold leading-6 text-primary">Not sure which letter you need?</div>
        <div className="font-sans text-[14px] leading-[22px] text-body-text">
          Answer a few quick questions and see whether an ESA letter fits your situation before you pay.
        </div>
      </div>
      <button
        type="button"
        onClick={() => openEsaEligibilityChecker()}
        className="cta3d cta3d--outline inline-flex h-[48px] shrink-0 items-center justify-center gap-2 px-5 font-sans text-base"
      >
        Check My Eligibility, Free
        <ArrowRight aria-hidden strokeWidth={2.5} className="cta-arrow size-4" />
      </button>
    </div>
  );
}
