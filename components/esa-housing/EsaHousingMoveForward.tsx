import React from "react";
import Image from "next/image";
import { TEAL_GRADIENT } from "@/components/esa-online/EsaOnlineShared";
import { CtaButton } from "@/components/common/CtaButton";

export function EsaHousingMoveForward() {
  return (
    <section className="relative w-full overflow-hidden" style={{ backgroundImage: TEAL_GRADIENT }}>
      <div className="hidden sm:block absolute right-0 bottom-0 sm:h-[60%] lg:h-auto lg:w-[min(17.4vw,250px)] aspect-[254/262] pointer-events-none">
        <Image
            quality={90}
          src="/esa-housing/esa-letter-housing-moveforwardsection-pawicon.webp"
          alt="Paw print"
          fill
          className="object-contain object-right-bottom"
          sizes="260px"
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 flex flex-col items-center gap-6 text-center">
        <h2 className="heading-h2 font-heading font-bold text-background tracking-[-0.00015em] max-w-[888px] lg:max-w-[min(61vw,888px)]">
          Move Forward With Clarity About Your Housing Options
        </h2>
        <p className="body-large text-background max-w-[932px] lg:max-w-[min(64vw,932px)]">
          Learn whether an Emotional Support Animal may be appropriate for you and how housing protections may support your situation.
        </p>
        <CtaButton href="/pricing/" forceStateModal className="mt-2 h-[52px] w-auto text-[16px]">
          Start Your ESA Evaluation
        </CtaButton>
        <p className="body-small text-background max-w-[640px]">
          100% Refund If No ESA Letter Is Issued
        </p>
      </div>
    </section>
  );
}
