

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

  return (
    <section className={`py-16 lg:py-20 xl:py-24 ${bgColor}`}>
      <div className="mx-auto grid max-w-[1279px] gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.7fr)] lg:gap-12 lg:px-8">
        <div className="relative self-start overflow-hidden rounded-[28px] p-7 color-gradient sm:p-10 lg:sticky lg:top-28">
          <span aria-hidden className="pointer-events-none absolute -bottom-24 -right-24 size-64 rounded-full border border-accent/30" />
          <span aria-hidden className="pointer-events-none absolute -bottom-12 -right-12 size-40 rounded-full bg-white/[0.05]" />
          <h2 className="relative font-heading text-[28px] font-bold capitalize leading-[36px] text-white sm:text-[34px] sm:leading-[42px] lg:text-[30px] lg:leading-[38px]">
            {title}
          </h2>
          <div className="relative mt-4 font-sans text-[16px] leading-[26px] text-white/85 sm:text-[17px] sm:leading-[28px]">
            {subtitle ||
              "We simplify online emotional support animal evaluations while maintaining efficiency and legal compliance. Here's what makes us different from other providers."}
          </div>
          <div className="relative mt-8">
            <CtaButton href="/pricing/">Start Your ESA Evaluation</CtaButton>
          </div>
        </div>

        <ul className="grid gap-x-8 sm:grid-cols-2 xl:gap-x-10">
          {items.map(({ icon, title: itemTitle, description }, idx) => {
            const resolvedIcon =
              icon && !icon.includes("/home/whychoose")
                ? icon
                : defaultFeatures[idx % defaultFeatures.length]?.icon || "/esa-icons/icon-10.svg";
            return (
              <li key={itemTitle} className="flex gap-4 border-t border-line-200 py-7 first:border-t-0 sm:[&:nth-child(2)]:border-t-0 sm:first:pt-0 sm:[&:nth-child(2)]:pt-0 first:pt-0">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-cream-100">
                  <Image quality={90} src={resolvedIcon} alt="" width={26} sizes="26px" height={26} unoptimized className="size-[26px] object-contain" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-heading text-[20px] font-bold leading-[27px] text-primary lg:text-[19px] xl:text-[21px] xl:leading-[28px]">{itemTitle}</h3>
                  <div className="mt-2 font-sans text-[15px] leading-[25px] text-body-text">{description}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
