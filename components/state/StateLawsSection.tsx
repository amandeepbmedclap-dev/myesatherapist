
import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { StateData } from "@/data/statesData";
import { CollapsibleNote } from "@/components/common/CollapsibleNote";
import { isSectionPilot } from "@/lib/sectionPilot";

export function StateLawsSection({ data }: { data: StateData }) {
  const stateName = data.name;
  const pilot = isSectionPilot(data.slug);
  const checkClass = pilot ? "w-5 h-5 rounded-full bg-accent text-primary flex items-center justify-center" : "w-5 h-5 rounded-full text-white flex items-center justify-center shadow-xs";
  const checkStyle = pilot ? undefined : { background: "var(--color-gradient)" };

  return (
    <section className="w-full bg-background py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1060px] mx-auto">
        <div className="text-center max-w-[820px] mx-auto mb-8 sm:mb-10 lg:mb-12">
          <h2 className="heading-h2 font-heading font-bold text-primary tracking-tight mb-3">
            {data.lawsTitle || `Understanding ${stateName} ESA Laws for Reasonable Accommodations`}
          </h2>
          <p className="body-large text-body-text max-w-[760px] mx-auto">
            {data.lawsSubtitle ||
              `Emotional support animal housing in ${stateName} is governed by federal housing regulations that lay out the accommodation process and what landlords are required to provide.`}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-6 xl:gap-8 mb-10 lg:mb-12">
          <div className="hover-card hover-surface bg-white rounded-[20px] sm:rounded-[24px] lg:rounded-[30px] border border-[#EAE5DC] shadow-[0_4px_20px_rgba(0,0,0,0.025)] flex flex-col overflow-hidden">
            <div className="relative w-full aspect-[16/9] overflow-hidden shrink-0">
              <Image
            quality={90}
                src="/states/esalaws-fairemployment-housing.webp"
                alt="Federal Housing Guidelines"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="p-4.5 sm:p-5 lg:p-6 flex flex-col flex-1">
              <h3 className="heading-h3 font-heading font-bold text-primary text-center mb-4 sm:mb-5">
                {data.card1Title || "Federal Housing Guidelines"}
              </h3>

              <div className="space-y-4 flex-1">
                {(data.card1Items || [
                  {
                    title: "Fair Housing Act Rights",
                    description:
                      "Even in homes with no-pet policies, the Fair Housing Act permits anyone with a legitimate need for an ESA to request living accommodations without discrimination.",
                  },
                  {
                    title: "Waiver of Pet-Related Fees",
                    description: `Once legitimate ESA documentation from an ${stateName}-licensed provider is authorized, landlords are generally prohibited from charging pet deposits or pet rent.`,
                  },
                  {
                    title: "Case-by-Case Housing Assessment",
                    description:
                      "Landlords cannot enforce standard pet size, weight, or breed limits, and must evaluate each ESA accommodation request on an individual basis.",
                  },
                ]).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex h-7 shrink-0 items-end">
                      <div className={checkClass} style={checkStyle}>
                        <Check className="w-3 h-3 stroke-[3]" />
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

          <div className="hover-card hover-surface bg-white rounded-[20px] sm:rounded-[24px] lg:rounded-[30px] border border-[#EAE5DC] shadow-[0_4px_20px_rgba(0,0,0,0.025)] flex flex-col overflow-hidden">
            <div className="relative w-full aspect-[16/9] overflow-hidden shrink-0">
              <Image
            quality={90}
                src={data.slug === "california" ? "/states/esalaws-california-state.webp" : "/states/state-lawssection-secondcard.webp"}
                alt="Housing Provider Roles & Responsibilities"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="p-4.5 sm:p-5 lg:p-6 flex flex-col flex-1">
              <h3 className="heading-h3 font-heading font-bold text-primary text-center mb-4 sm:mb-5">
                {data.card2Title || "Housing Provider Role & Responsibilities"}
              </h3>

              <div className="space-y-4 flex-1">
                {(data.card2Items || [
                  {
                    title: "Verification of ESA Documentation",
                    description: `Housing providers may examine ESA letters to ensure they reflect a genuine therapeutic relationship with accurate ${stateName}-based provider credentials.`,
                  },
                  {
                    title: "Enforcement of Community Rules",
                    description:
                      "General property and community safety/cleanliness rules may still be implemented as long as they don't conflict with approved ESA accommodations.",
                  },
                  {
                    title: "Health, Safety, and Property Concerns",
                    description:
                      "An accommodation request may be rejected or reexamined if the specific animal poses a credible risk to health or safety or causes substantial damage.",
                  },
                ]).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex h-7 shrink-0 items-end">
                      <div className={checkClass} style={checkStyle}>
                        <Check className="w-3 h-3 stroke-[3]" />
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
        </div>

        {data.legalNotice !== "" && pilot && (
          <CollapsibleNote
            label="Legal notice"
            collapse={false}
            text={data.legalNotice || `Emotional support animals do not have public access rights like service animals under the ADA and are mainly considered for household housing accommodations in ${stateName}. Generally speaking, ESAs are not permitted in public places like restaurants or stores where pets are restricted.`}
            className="mx-auto max-w-[880px] rounded-[18px] bg-white/70 p-4 ring-1 ring-line-200 sm:p-5"
          />
        )}
        {data.legalNotice !== "" && !pilot && (
        <div className="max-w-[895px] mx-auto bg-[rgba(232,185,44,0.1)] rounded-[20px] overflow-hidden flex items-stretch shadow-xs">
          <div className="w-3 sm:w-3.5 bg-accent shrink-0" />
          <div className="p-4 sm:p-5 lg:p-6 flex-1">
            <p className="eyebrow text-primary mb-1.5">
              IMPORTANT LEGAL NOTICE
            </p>
            <p className="body-small whitespace-pre-line text-body-text">
              {data.legalNotice ||
                `Emotional support animals do not have public access rights like service animals under the ADA and are mainly considered for household housing accommodations in ${stateName}. Generally speaking, ESAs are not permitted in public places like restaurants or stores where pets are restricted.`}
            </p>
          </div>
        </div>
        )}
      </div>
    </section>
  );
}
