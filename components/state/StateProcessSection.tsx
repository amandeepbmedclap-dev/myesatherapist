
import React from "react";
import Image from "next/image";
import { StateData } from "@/data/statesData";
import { CtaButton } from "@/components/common/CtaButton";
import { Check } from "lucide-react";

function processIcon(src: string) {
  if (src.includes("schedule")) return "/esa-icons/icon-16.svg";
  if (src.includes("determination")) return "/esa-icons/glyph-2.svg";
  if (src.includes("clinical")) return "/esa-icons/icon-18.svg";
  return src;
}

export function StateProcessSection({ data }: { data: StateData }) {
  const stateName = data.name;

  const defaultSteps = [
    {
      number: "01",
      icon: "/states/california-esa-evaluation-schedule.svg",
      title: "Schedule an Evaluation",
      description: `Create an account and schedule a telehealth appointment with a ${stateName}-licensed mental health professional.${
        data.abbreviation === "CA"
          ? " This begins the required 30‑day provider relationship under AB 468."
          : " Choose a convenient time for your evaluation session."
      }`,
      offsetClass: "md:translate-y-0",
    },
    {
      number: "02",
      icon: "/states/california-esa-evaluation-clinical.svg",
      title: "Clinical Evaluation & Ongoing Provider Relationship",
      description:
        "Meet privately via secure audio or video consultation. The clinician assesses your needs and maintains the therapeutic relationship throughout the required period.",
      offsetClass: "md:translate-y-10",
    },
    {
      number: "03",
      icon: "/states/california-esa-evaluation-determination.svg",
      title: "Clinical Determination",
      description: `If the clinician determines that an ESA is appropriate after the ${
        data.abbreviation === "CA" ? "30‑day requirement" : "evaluation process"
      }, a compliant ESA letter is issued and delivered securely.`,
      offsetClass: "md:translate-y-20",
    },
  ];

  const steps = data.processSteps && data.processSteps.length > 0
    ? data.processSteps.map((s, idx) => ({
        ...s,
        offsetClass: idx === 0 ? "md:translate-y-0" : idx === 1 ? "md:translate-y-10" : "md:translate-y-20",
      }))
    : defaultSteps;

  const differentiators = data.processDifferentiators || [
    "No instant or automated ESA letters issued.",
    data.abbreviation === "CA"
      ? "AB 468–compliant documentation."
      : "Legitimate, legally compliant documentation.",
    `${stateName} licensed mental health professionals only.`,
    "HIPAA‑compliant, secure telehealth platform.",
  ];

  const title = data.processTitle || `How the ${stateName} ESA Evaluation Process Works?`;
  const subtitle = data.processSubtitle || `Our platform helps ${stateName} residents connect with licensed mental health professionals for ESA evaluations conducted through secure telehealth, in accordance with ${data.abbreviation === "CA" ? "California’s AB 468 requirements" : `${stateName} state requirements`}.`;

  return (
    <section
      id="process"
      className="relative z-10 w-full scroll-mt-36 bg-background px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-24"
    >
      <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-12 lg:gap-16">
        <div className="mx-auto max-w-[1030px] space-y-3 text-center sm:space-y-4">
          <h2 className="font-heading text-3xl font-bold leading-tight tracking-[-0.00015em] text-primary sm:text-4xl lg:text-[44px] lg:leading-[54px]">
            {title}
          </h2>
          <p className="body-large mx-auto max-w-[885px] text-body-text">{subtitle}</p>
        </div>

        {/* Steps: stacked rows so titles of any length stay aligned */}
        <ol className="w-full overflow-hidden rounded-[28px] bg-white shadow-[0_18px_40px_-30px_rgba(26,61,79,0.5)] ring-1 ring-line-200">
          {steps.map((step) => (
            <li
              key={step.number}
              className="grid grid-cols-1 gap-x-4 gap-y-2 border-b border-line-200 px-5 py-6 last:border-b-0 sm:grid-cols-[72px_minmax(0,1fr)] sm:px-8 sm:py-7 lg:grid-cols-[88px_minmax(0,340px)_minmax(0,1fr)] lg:items-center lg:gap-x-10 lg:px-10 lg:py-8"
            >
              <div className="relative row-span-2 hidden size-14 items-center justify-center self-start rounded-full bg-cream-100 sm:flex sm:size-[72px] lg:row-span-1 lg:size-[88px] lg:self-center">
                <Image quality={90} src={processIcon(step.icon)} alt="" width={30} sizes="30px" height={30} unoptimized className="size-6 object-contain sm:size-[30px]" />
                <span className="absolute -right-1 -top-1 flex size-7 items-center justify-center rounded-full bg-primary font-sans text-[12px] font-extrabold text-white">
                  {step.number}
                </span>
              </div>
              <div className="min-w-0 self-center">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-10 items-center justify-center rounded-full bg-cream-100 sm:hidden">
                    <Image quality={90} src={processIcon(step.icon)} alt="" width={22} sizes="22px" height={22} unoptimized className="size-[22px] object-contain" />
                  </span>
                  <span className="font-sans text-[12px] font-extrabold uppercase tracking-[0.12em] text-[#8A6A12]">Step {step.number}</span>
                </div>
                <h3 className="mt-2 sm:mt-1 font-heading text-[21px] font-bold leading-[28px] text-primary sm:text-[24px] sm:leading-[32px]">{step.title}</h3>
              </div>
              <div className="min-w-0 font-sans sm:col-start-2 text-[15px] leading-[25px] text-body-text sm:text-[16px] sm:leading-[26px] lg:col-start-3">
                {step.description}
              </div>
            </li>
          ))}
        </ol>

        {/* Differentiators */}
        <div className="grid w-full gap-7 overflow-hidden rounded-[28px] p-7 color-gradient sm:p-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-6 lg:p-12">
          <div role="heading" aria-level={3} className="font-heading text-[26px] font-bold leading-[34px] text-white sm:text-[32px] sm:leading-[40px] lg:col-start-1 lg:row-start-1">
            {data.processDifferentiatorsTitle || "Why Our Process Is Different"}
          </div>

          <div className="flex flex-col gap-3 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            {differentiators.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 rounded-[16px] bg-white/[0.07] px-4 py-3.5 ring-1 ring-white/10">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-[#163545]">
                  <Check aria-hidden strokeWidth={3} className="size-3.5" />
                </span>
                <span className="font-sans text-[15px] leading-[24px] text-white sm:text-[16px]">{item}</span>
              </div>
            ))}
            {data.processNote && (
              <div className="mt-1 rounded-[16px] border border-accent/50 bg-white/[0.04] p-4 font-sans text-[14px] leading-[22px] text-white/85">
                {data.processNote}
              </div>
            )}
          </div>

          <div className="flex flex-col items-start gap-2 lg:col-start-1 lg:row-start-2">
            <CtaButton href="/pricing/">Start Your ESA Evaluation</CtaButton>
            {data.benefitsRefundNote !== "" && (
              <span className="font-sans text-[14px] leading-5 text-white/80">100% Refund If No ESA Letter Is Issued</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
