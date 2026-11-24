
import React from "react";
import Image from "next/image";
import { Check, X } from "lucide-react";
import { StateData } from "@/data/statesData";
import { isSectionPilot } from "@/lib/sectionPilot";

export function StateScamsSection({ data }: { data: StateData }) {
  const stateName = data.name;
  const pilot = isSectionPilot(data.slug);

  const defaultWhatYouNeed = [
    {
      title: "ESA Letter from a Licensed Provider",
      description: `Your ESA letter ${stateName} must come after a proper evaluation by a mental health professional licensed in the state.`,
    },
    {
      title: "Clinical Mental Health Evaluation",
      description: "A comprehensive assessment of your emotional or mental health condition is a required part of the ESA review process.",
    },
    {
      title: "Verified Therapeutic Relationship",
      description: "An ongoing or clearly established provider-patient relationship helps confirm the validity of the recommendation.",
    },
  ];

  const defaultCommonScams = [
    "Advertise “ESA registrations” or suggest there is an official certification system.",
    "Sell unofficial ESA letters, ID cards, badges, or animal accessories.",
    "Provide immediate ESA approvals without a proper clinical evaluation.",
    "Claim guaranteed acceptance or approval by landlords or housing providers.",
    `Operate without licensed ${stateName} mental health professionals.`,
  ];

  const title = data.scamsTitle || `${stateName} ESA Scams: What's Real vs. Fake`;
  const subtitle = data.scamsSubtitle || `Getting an idea of the common ESA scams in ${stateName} can help you save yourself from fake websites and false certifications and registrations online.`;
  const alertTitle = data.scamsAlertTitle || "Important: No Official ESA Registry Exists";
  const alertText = data.scamsAlertText || `There is no state or federal registry, certification system, database, or official ESA ID in ${stateName} or anywhere else in the United States.`;
  const whatYouNeedTitle = data.scamsWhatYouNeedTitle || "What You Actually Need";
  const whatYouNeedItems = data.scamsWhatYouNeedItems && data.scamsWhatYouNeedItems.length > 0
    ? data.scamsWhatYouNeedItems
    : defaultWhatYouNeed;
  const commonTitle = data.scamsCommonTitle || "Common ESA Scams";
  const commonSubtitle = data.scamsCommonSubtitle;
  const commonItems = data.scamsCommonItems && data.scamsCommonItems.length > 0
    ? data.scamsCommonItems
    : defaultCommonScams;

  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1060px] mx-auto">
        <div className="text-center max-w-[840px] mx-auto mb-8 sm:mb-10 lg:mb-12">
          <h2 className="heading-h2 font-heading font-bold text-primary tracking-tight">
            {title}
          </h2>
          <p className="body-large text-body-text mt-3 max-w-[760px] mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="max-w-[840px] mx-auto bg-[#FFF0F0] rounded-[18px] sm:rounded-[22px] overflow-hidden flex items-stretch shadow-[0_4px_20px_rgba(0,0,0,0.02)] mb-10 sm:mb-12 lg:mb-14">
          <div className="w-3.5 sm:w-4 bg-[#D9383A] shrink-0" />
          <div className="p-4 sm:p-5 lg:p-6 flex items-center gap-3.5 sm:gap-4 flex-1">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 shrink-0">
              <Image quality={90}
                src="/states/california-scams-alert-icon.svg"
                alt="Alert Icon"
                fill
                unoptimized
                className="object-contain"
                sizes="40px"
              />
            </div>
            <div className="flex-1">
              <h3 className="heading-h3 font-sans font-bold text-[#D6292B] mb-1">
                {alertTitle}
              </h3>
              <p className="body text-body-text">
                {alertText}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:grid-rows-[auto_auto_1fr] lg:gap-x-6 lg:gap-y-0 xl:gap-x-8">
          <div className="bg-[#EFF6F3] rounded-[20px] sm:rounded-[24px] lg:rounded-[26px] border border-[#E1EFE9] shadow-[0_4px_25px_rgba(0,0,0,0.025)] flex flex-col overflow-hidden lg:row-span-3 lg:grid lg:grid-rows-subgrid">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] overflow-hidden shrink-0">
              <Image
            quality={90}
                src="/states/emotional-support-letter-consultation.png"
                alt="Consultation for an emotional support animal letter"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="flex items-center justify-center px-5 pt-5 sm:px-6 sm:pt-6 lg:px-7 lg:pt-7">
              <h3 className="heading-h3 font-heading font-bold text-primary text-center">
                {whatYouNeedTitle}
              </h3>
            </div>
            <div className="flex flex-col flex-1 px-5 pb-5 pt-6 sm:px-6 sm:pb-6 sm:pt-7 lg:px-7 lg:pb-7">
              <div className="flex flex-1 flex-col gap-5 lg:justify-between lg:gap-4">
                {whatYouNeedItems.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="flex h-7 shrink-0 items-end">
                      <div
                        className={pilot ? "w-5 h-5 rounded-full bg-accent text-primary flex items-center justify-center" : "w-5 h-5 rounded-full text-white flex items-center justify-center shadow-xs"}
                        style={pilot ? undefined : { background: "var(--color-gradient)" }}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </div>
                    <div>
                      <h4 className="heading-h4 font-sans font-bold text-primary mb-1">
                        {item.title}
                      </h4>
                      <p className="body text-body-text">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#FFF0F0] rounded-[20px] sm:rounded-[24px] lg:rounded-[26px] border border-[#FCDADA] shadow-[0_4px_25px_rgba(0,0,0,0.025)] flex flex-col overflow-hidden lg:row-span-3 lg:grid lg:grid-rows-subgrid">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] overflow-hidden shrink-0">
              <Image
            quality={90}
                src="/states/california-scams-commonesascams.webp"
                alt="Common ESA Scams to Avoid"
                fill
                className="object-cover object-[center_20%]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="flex items-center justify-center px-5 pt-5 sm:px-6 sm:pt-6 lg:px-7 lg:pt-7">
              <h3 className="heading-h3 font-heading font-bold text-[#D6292B] text-center">
                {commonTitle}
              </h3>
            </div>
            <div className="flex flex-col flex-1 px-5 pb-5 pt-5 sm:px-6 sm:pb-6 sm:pt-6 lg:px-7 lg:pb-7">

              {commonSubtitle && (
                <h4 className="heading-h4 font-sans font-bold text-primary text-left mb-4">
                  {commonSubtitle}
                </h4>
              )}

              <div className={pilot ? "flex flex-1 flex-col gap-4 lg:justify-between lg:gap-3" : "space-y-4 sm:space-y-4.5 flex-1"}>
                {commonItems.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="flex h-[26px] shrink-0 items-center">
                      <div className="w-5 h-5 rounded-full bg-[#D9383A] text-white flex items-center justify-center shadow-sm">
                        <X className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </div>
                    <p className="font-sans text-sm sm:text-sm lg:text-sm font-semibold text-body-text leading-[26px]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
