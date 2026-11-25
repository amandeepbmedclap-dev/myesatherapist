

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { CtaButton } from "@/components/common/CtaButton";

const TEAL_GRADIENT = "var(--color-gradient)";

type CtaBannerProps = {
  bgColor?: string;
  className?: string;
  titleClassName?: string;
  eyebrow?: string;
  title?: string;
  description?: React.ReactNode;
  note?: string;
  disclaimer?: string;
  buttonText?: string;
  buttonHref?: string;
  flushBottom?: boolean;
};

export function CtaBanner({
  bgColor = "bg-background",
  className = "",
  titleClassName = "",
  eyebrow,
  title = "Ready to Start Your ESA Evaluation With a Licensed Professional?",
  description = "If you believe an emotional support animal may be appropriate for your situation, you can begin a professional evaluation today.",
  note,
  disclaimer,
  buttonText = "Start Your Evaluation",
  buttonHref = "#how-it-works",
  flushBottom = false,
}: CtaBannerProps) {
  void flushBottom;
  return (
    <section
      data-section="closing-cta"
      className={cn("relative w-full px-4 pb-14 pt-12 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20 lg:pt-[150px]", bgColor, className)}
    >
      <div className="relative mx-auto max-w-[1280px] rounded-[28px] color-gradient shadow-[0_40px_80px_-50px_rgba(26,61,79,0.8)] lg:rounded-[32px]">
        <div className="pointer-events-none absolute bottom-0 left-[40%] z-0 hidden h-[150px] w-[220px] md:block">
          <Image quality={90} src="/common/cta-section-paw.webp" alt="" fill sizes="220px" className="object-contain object-bottom opacity-80" />
        </div>

        <div
          className="pointer-events-none absolute bottom-0 right-0 z-20 hidden h-[500px] w-[46%] max-w-[620px] lg:block xl:h-[530px]"
          style={{ clipPath: "inset(-400px 0 0 0 round 0 0 32px 0)" }}
        >
          <Image
            quality={90}
            src="/common/cta-banner-background.webp"
            alt="Woman embracing emotional support dog"
            fill
            loading="eager"
            className="object-contain object-right-bottom"
            sizes="620px"
          />
        </div>

        <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-12 lg:min-h-[400px] lg:max-w-[60%] lg:px-14 lg:py-14 xl:px-16">
          <div className="space-y-4">
            {eyebrow && <div className="body-small font-bold uppercase tracking-wider text-accent">{eyebrow}</div>}
            <h2 className={cn("heading-h2 whitespace-pre-line text-background", titleClassName)}>{title}</h2>
            <p className="body-large max-w-[560px] text-background/90">
              {typeof description === "string" && description.includes("\n")
                ? description.split("\n").map((line, i, arr) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < arr.length - 1 && <br className="hidden lg:block" />}
                    </React.Fragment>
                  ))
                : description}
            </p>
            {note && <p className="body-small pt-1 text-accent">{note}</p>}
          </div>
          <div className="pt-7">
            <CtaButton href={buttonHref} stateModal variant="accent" className="w-auto min-w-[240px]">
              {buttonText}
            </CtaButton>
          </div>
          {disclaimer && <p className="body-small max-w-[560px] pt-4 text-background/80">{disclaimer}</p>}
        </div>

        <div className="pointer-events-none relative -mt-4 h-[240px] w-full overflow-hidden rounded-b-[28px] sm:h-[300px] lg:hidden">
          <Image
            quality={90}
            src="/common/cta-banner-background.webp"
            alt=""
            fill
            loading="eager"
            className="object-contain object-bottom"
            sizes="(max-width: 1023px) 100vw, 1px"
          />
        </div>
      </div>
    </section>
  );
}
