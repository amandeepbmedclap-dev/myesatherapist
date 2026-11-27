import React from "react";
import { SectionHeader } from "@/components/common/BlogPageBlocks";

export function QualifyingConditionsLearnMore() {
  return (
    <section className="w-full bg-background">
      <div className="mx-auto flex w-full max-w-[1065px] flex-col items-center gap-8 px-4 sm:px-8 lg:px-[5vw] xl:px-0">
        <SectionHeader
          title="The Importance of a Professional Clinical Evaluation"
          subtitle="Qualifying for an ESA letter depends on an individualized assessment conducted by a licensed mental health professional. A diagnosis alone does not automatically guarantee eligibility. The evaluation focuses on whether the presence of an emotional support animal is likely to help reduce symptoms and improve daily functioning and well-being."
          subtitleMaxWidth="max-w-[1065px]"
          className="gap-8 lg:gap-[2.4vw] xl:gap-8"
        />
      </div>
    </section>
  );
}
