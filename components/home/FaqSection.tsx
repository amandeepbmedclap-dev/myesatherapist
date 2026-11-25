"use client";

import { track } from "@/lib/track";
import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { serializeLd } from "@/lib/site";
import { faqPageSchema } from "@/lib/schema";

const TEAL_GRADIENT = "var(--color-gradient)";

const defaultFaqs = [
  {
    num: "01.",
    q: "Is My ESA Therapist legitimate?",
    a: "Yes. My ESA Therapist connects individuals directly with independent, state-licensed mental health professionals (LMHPs) who conduct clinical assessments designed to support applicable Fair Housing Act requirements and relevant HUD guidance.",
  },
  {
    num: "02.",
    q: "How does My ESA Therapist work?",
    a: (
      <div>
        <p className="mb-2">Our process is simple and transparent:</p>
        <ol className="list-decimal list-outside pl-5 space-y-1.5">
          <li>Complete a confidential online pre-screening questionnaire</li>
          <li>Schedule a telehealth consultation with a licensed clinician in your state</li>
          <li>If qualified, receive your official ESA recommendation letter delivered securely via email.</li>
        </ol>
      </div>
    ),
  },
  {
    num: "03.",
    q: "Is my information safe with My ESA Therapist?",
    a: "Yes. We take privacy extremely seriously. All personal and clinical information is encrypted, transmitted securely, and protected under strict HIPAA-compliant protocols. We will never share or sell your private information.",
  },
  {
    num: "04.",
    q: "What are the housing protections for ESAs?",
    a: "Under the Fair Housing Act, individuals with disabilities may request a reasonable accommodation to keep an assistance animal when the animal is needed because of their disability. When the disability or disability-related need is not readily apparent, reliable documentation from a healthcare professional may help support the request.",
  },
  {
    num: "05.",
    q: "How quickly can I receive my ESA letter?",
    a: "After completing your telehealth evaluation with our licensed provider, approved ESA letters are delivered via secure digital PDF within 24 to 48 hours. Priority expedited delivery options are also available.",
  },
  {
    num: "06.",
    q: "What if I don't qualify for an ESA?",
    a: "Your card is charged when you book. If the evaluation cannot be completed, you receive a full refund. A completed evaluation is non-refundable, whether or not a letter is issued.",
  },
];

export interface FaqItem {
  num?: string;
  q: string;
  a: React.ReactNode;
}

interface FaqSectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  faqs?: FaqItem[];
  bg?: string;
  className?: string;
  /** "light": white question rows with gold numbers (state-page redesign). */
  variant?: "classic" | "light";
  /** Optional photo for the light variant's side column. */
  image?: { src: string; alt: string; position?: string };
}

export function FaqSection({
  id = "faq",
  title = "Frequently Asked Questions About ESA Letters and Evaluations",
  subtitle = "Get answers to common questions about ESA letters and our service.",
  faqs: customFaqs,
  bg = "bg-background",
  className,
  variant = "light",
  image,
}: FaqSectionProps = {}) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const rawList = customFaqs && customFaqs.length > 0 ? customFaqs : defaultFaqs;
  const items = rawList.map((f, i) => ({
    ...f,
    num: f.num || `${String(i + 1).padStart(2, "0")}.`,
  }));

  if (variant === "light") {
    return (
      <section id={id} data-section="faq" className={cn("relative px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20", bg, className)}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeLd(faqPageSchema(items), { faq: true }) }}
        />
        {id !== "faq" && <div id="faq" className="sr-only" />}
        <div className="mx-auto max-w-[1180px]">
          <div className="mx-auto mb-10 max-w-[880px] text-center lg:mb-12">
            <h2 className="heading-h2 text-primary">{title}</h2>
            {subtitle && <p className="body-large mx-auto mt-3 max-w-[760px] text-body-text">{subtitle}</p>}
          </div>

          <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-14">
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-4">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] shadow-[0_24px_50px_-36px_rgba(26,61,79,0.6)]">
                  <Image quality={85} src={image?.src ?? "/images/common/reading-esa-faqs-on-phone-with-dog.webp"} alt={image?.alt ?? "Woman reading answers about ESA letters on her phone while her dog sleeps beside her"} fill sizes="320px" className="object-cover" style={image?.position ? { objectPosition: image.position } : undefined} />
                </div>
                <div className="rounded-[20px] bg-cream-100 p-5">
                  <div className="font-heading text-[20px] font-bold leading-[28px] text-primary">Still have a question?</div>
                  <div className="mt-1 font-sans text-base leading-[26px] text-body-text">Our team is happy to help.</div>
                  <div className="mt-3 flex flex-col gap-1.5 font-sans text-base font-semibold">
                    <a href="tel:+18884124041" className="text-primary underline decoration-accent decoration-2 underline-offset-4 hover:text-[#1D6E72]">+1 (888) 412-4041</a>
                    <a href="mailto:info@myesatherapist.com" className="text-primary underline decoration-accent decoration-2 underline-offset-4 hover:text-[#1D6E72]">info@myesatherapist.com</a>
                  </div>
                </div>
              </div>
            </aside>

            <div className="divide-y divide-primary/10 border-y border-primary/10">
              {items.map((faq, idx) => {
                const isOpen = openIdx === idx;
                return (
                  <FaqRow key={idx} num={faq.num} q={faq.q} a={faq.a} open={isOpen} onToggle={() => setOpenIdx(isOpen ? null : idx)} />
                );
              })}
            </div>

            <div className="rounded-[20px] bg-cream-100 p-5 lg:hidden">
              <div className="font-heading text-[20px] font-bold leading-[28px] text-primary">Still have a question?</div>
              <div className="mt-1 font-sans text-base leading-[26px] text-body-text">Our team is happy to help.</div>
              <div className="mt-3 flex flex-col gap-1.5 font-sans text-base font-semibold">
                <a href="tel:+18884124041" className="text-primary underline decoration-accent decoration-2 underline-offset-4">+1 (888) 412-4041</a>
                <a href="mailto:info@myesatherapist.com" className="text-primary underline decoration-accent decoration-2 underline-offset-4">info@myesatherapist.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className={cn("relative pt-12 sm:pt-16 lg:pt-16 xl:pt-24 pb-10 sm:pb-12 lg:pb-10 xl:pb-24", bg, className)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeLd(faqPageSchema(items), { faq: true }) }}
      />
      {id !== "faq" && <div id="faq" className="sr-only" />}
      <div className="max-w-[1442px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-[1254px] mx-auto mb-14 space-y-2">
          <h2 className="heading-h2">
            {title}
          </h2>
          {subtitle && (
            <p className="body-large">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-8 xl:gap-[60px] max-w-[1184px] mx-auto relative">
          <div className="w-full max-w-[551px] lg:w-[380px] xl:w-[551px] h-[360px] sm:h-[440px] lg:h-[540px] xl:h-[673px] shrink-0 self-center mx-auto lg:self-start lg:mx-0 lg:sticky lg:top-[104px]">
            <div className="relative w-full h-full rounded-[20px] overflow-hidden shadow-md">
              <Image
                quality={90}
                src="/images/common/reading-esa-faqs-on-phone-with-dog.webp"
                alt="Woman reading answers about ESA letters on her phone while her dog sleeps beside her"
                fill
                className="object-cover"
                sizes="(min-width: 1280px) 551px, (min-width: 1024px) 380px, 90vw"
              />
            </div>
          </div>

          <div className={`w-full max-w-[566px] lg:max-w-none lg:flex-1 space-y-3.5 sm:space-y-5 xl:space-y-[25px] flex flex-col justify-center`}>
            {items.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <details
                  key={idx}
                  open={isOpen}
                  className="w-full rounded-[20px] overflow-hidden shadow-sm transition-all duration-200"
                >
                  <summary
                    onClick={(event) => {
                      event.preventDefault();
                      setOpenIdx(isOpen ? null : idx);
                    }}
                    className="w-full min-h-[58px] sm:min-h-[68px] xl:min-h-[74px] flex items-stretch text-left rounded-[20px] overflow-hidden transition-all duration-200 relative color-gradient cursor-pointer list-none [&::-webkit-details-marker]:hidden"
                  >
                    <div className="w-[56px] sm:w-[68px] xl:w-[78px] shrink-0 bg-accent flex items-center justify-center heading-h3 text-primary leading-none rounded-l-[20px] self-stretch">
                      {faq.num}
                    </div>

                    <div className="flex-1 py-2.5 sm:py-3 px-3.5 sm:px-6 flex items-center justify-between gap-3 sm:gap-4">
                      <h4 className="heading-h4 text-white m-0">
                        {faq.q}
                      </h4>

                      <span
                        className={`w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] flex items-center justify-center shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 3V15M3 9H15"
                            stroke="var(--color-background)"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                  </summary>

                  <div className="bg-background px-5 sm:px-7 py-4 sm:py-5 font-sans font-medium text-[16px] leading-[26px] border border-primary/10 border-t-0 rounded-b-[20px] whitespace-pre-line">
                    {faq.a}
                  </div>
                </details>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Shared FAQ row (number, question, round +/x toggle) used by every FAQ list on the site. */
export function FaqRow({ num, q, a, open, onToggle }: { num?: string; q: string; a: React.ReactNode; open: boolean; onToggle: () => void }) {
  return (
    <details open={open} className="group">
      <summary
        onClick={(event) => {
          event.preventDefault();
          if (!open) track("faq_open", { question: q.slice(0, 100) });
          onToggle();
        }}
        className="flex w-full cursor-pointer list-none items-start gap-4 py-5 text-left sm:gap-6 [&::-webkit-details-marker]:hidden"
      >
        <span className="mt-[3px] w-7 shrink-0 font-heading text-[16px] font-bold leading-[24px] text-gold-600 tabular-nums">{num?.replace(/\.$/, "")}</span>
        <h4 className={`heading-h4 m-0 flex-1 font-heading font-bold transition-colors ${open ? "text-primary" : "text-primary/90 group-hover:text-primary"}`}>{q}</h4>
        <span
          aria-hidden
          className={`mt-[2px] flex size-7 shrink-0 items-center justify-center rounded-full ring-1 transition-all duration-300 ${open ? "rotate-45 bg-accent text-primary ring-accent" : "text-primary ring-primary/20 group-hover:ring-primary/40"}`}
        >
          <svg width="12" height="12" viewBox="0 0 18 18" fill="none"><path d="M9 3V15M3 9H15" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" /></svg>
        </span>
      </summary>
      <div className="whitespace-pre-line pb-6 pl-11 pr-11 font-sans text-[16px] leading-[27px] text-body-text sm:pl-[52px]">{a}</div>
    </details>
  );
}
