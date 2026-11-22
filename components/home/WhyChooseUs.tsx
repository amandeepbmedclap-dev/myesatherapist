

import React from "react";
import Image from "next/image";
import { CtaButton } from "@/components/common/CtaButton";

export interface WhyChooseFeature {
  icon?: string;
  title: string;
  description: string;
}

const defaultFeatures: WhyChooseFeature[] = [
  {
    icon: "/esa-icons/icon-33.svg",
    title: "Licensed Professionals",
    description:
      "Evaluations are conducted by independent U.S.-licensed mental health professionals authorized to assess ESA eligibility.",
  },
  {
    icon: "/esa-icons/icon-15.svg",
    title: "Secure Telehealth Platform",
    description:
      "HIPAA-compliant systems ensure your information remains confidential and protected.",
  },
  {
    icon: "/esa-icons/glyph-2.svg",
    title: "Clinical Integrity First",
    description:
      "We do not guarantee ESA approval. Recommendations are based solely on clinical judgment.",
  },
  {
    icon: "/esa-icons/icon-17.svg",
    title: "Legitimate ESA Documentation",
    description:
      "When clinically appropriate, ESA letters are issued in compliance with applicable federal and state housing guidelines.",
  },
  {
    icon: "/esa-icons/icon-24.svg",
    title: "Nationwide Access",
    description:
      "Telehealth evaluations available for individuals across the United States, subject to clinician availability.",
  },
  {
    icon: "/esa-icons/icon-26.svg",
    title: "Transparent Process",
    description:
      "Clear steps, clear expectations, no misleading claims.",
  },
];

interface WhyChooseUsProps {
  bgColor?: string;
  title?: string;
  subtitle?: string;
  features?: WhyChooseFeature[];
}

export function WhyChooseUs({
  bgColor = "bg-background",
  title = "Why Choose My ESA Therapist?",
  subtitle,
  features = defaultFeatures,
}: WhyChooseUsProps) {
  const items = features && features.length > 0 ? features : defaultFeatures;

  // Varied tile tones keep the grid lively; any number of points works (3 per row on desktop).
  const tone = [
    "bg-white ring-1 ring-line-200",
    "bg-cream-100",
    "bg-[#E7F2EF]",
    "bg-cream-100",
    "bg-white ring-1 ring-line-200",
    "bg-[#FBF1D3]",
  ];

  return (
    <section className={`py-16 lg:py-20 xl:py-24 ${bgColor}`}>
      <div className="mx-auto max-w-[1279px] px-4 sm:px-6 lg:px-8">
        <div className="relative mb-4 grid gap-6 overflow-hidden rounded-[28px] p-7 color-gradient sm:p-10 lg:mb-5 lg:gap-6 lg:p-12">
          <span aria-hidden className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full border border-accent/30" />
          <span aria-hidden className="pointer-events-none absolute -right-8 -top-10 size-48 rounded-full border border-white/10" />
          <span aria-hidden className="pointer-events-none absolute -bottom-32 left-1/3 size-72 rounded-full bg-white/[0.04]" />
          <h2 className="relative max-w-[960px] font-heading text-[30px] font-bold leading-[38px] text-white sm:text-[40px] sm:leading-[48px]">{title}</h2>
          <div className="relative lg:flex lg:items-end lg:justify-between lg:gap-12">
            <div className="max-w-[680px] font-sans text-[16px] leading-[26px] text-white/85 sm:text-[17px] sm:leading-[28px]">
              {subtitle ||
                "We simplify online emotional support animal evaluations while maintaining efficiency and legal compliance. Here's what makes us different from other providers."}
            </div>
            <div className="mt-6 shrink-0 lg:mt-0">
              <CtaButton href="/pricing/">Start Your ESA Evaluation</CtaButton>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {items.map(({ icon, title: itemTitle, description }, idx) => {
            const resolvedIcon =
              icon && !icon.includes("/home/whychoose")
                ? icon
                : defaultFeatures[idx % defaultFeatures.length]?.icon || "/esa-icons/icon-10.svg";
            return (
              <div
                key={itemTitle}
                className={`group relative overflow-hidden rounded-[24px] p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7 ${tone[idx % tone.length]}`}
              >
                <span aria-hidden className="pointer-events-none absolute right-5 top-3 select-none font-heading text-[56px] font-bold leading-none text-primary/[0.07]">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="relative flex size-14 shrink-0 items-center justify-center rounded-[16px] bg-white shadow-[0_8px_20px_-12px_rgba(26,61,79,0.5)]">
                  <Image quality={90} src={resolvedIcon} alt="" width={28} sizes="28px" height={28} unoptimized className="size-7 object-contain transition-transform duration-300 group-hover:scale-110" />
                </span>
                <div className="relative mt-5 min-w-0">
                  <h3 className="font-heading text-[21px] font-bold leading-[28px] text-primary">{itemTitle}</h3>
                  <div className="mt-2 font-sans text-[15px] leading-[25px] text-body-text">{description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
