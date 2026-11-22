"use client";

import React, { useState } from "react";
import { FAQ_DATA, FAQ_FILTERS, FAQ_FILTER_LABELS, type FaqFilter } from "./faqData";
import { serializeLd } from "@/lib/site";
import { faqPageSchema } from "@/lib/schema";
import { FaqRow } from "@/components/home/FaqSection";


export function FaqAccordionSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [filter, setFilter] = useState<FaqFilter>("All Topics");

  const visibleFaqs = FAQ_DATA.filter((faq) => filter === "All Topics" || faq.category === filter);
  const availableFilters = FAQ_FILTERS.filter(
    (f) => f === "All Topics" || FAQ_DATA.some((faq) => faq.category === f),
  );

  const selectFilter = (f: FaqFilter) => {
    setFilter(f);
    setOpenIdx(0);
  };

  const toggleAccordion = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq-list" className="w-full bg-background py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeLd(faqPageSchema(FAQ_DATA.map((f) => ({ q: f.question, a: f.answer }))), { faq: true }) }}
      />
      <div className="max-w-[880px] mx-auto flex flex-col items-center gap-8 sm:gap-10">
        <div className="flex flex-col items-center gap-4 text-center max-w-[720px]">
          <h2 className="heading-h2 text-primary">Frequently Asked Questions About ESA Letters and Evaluations</h2>
          <p className="body-large text-body-text">
            Explore helpful information about ESA letters, mental health support, housing rights, and the evaluation process.
          </p>
        </div>

        <div
          className="flex flex-wrap justify-center gap-2.5 sm:gap-3 w-full py-1"
          role="group"
          aria-label="Filter FAQs by topic"
        >
          {availableFilters.map((f) => {
            const active = f === filter;
            return (
              <button
                key={f}
                type="button"
                onClick={(e) => {
                  selectFilter(f);
                  e.currentTarget.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
                }}
                aria-pressed={active}
                className={`shrink-0 whitespace-nowrap px-5 py-2.5 rounded-full font-sans font-semibold text-[14px] leading-[22px] border transition-colors cursor-pointer ${
                  active
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-primary border-[#EAE5DC] hover:bg-primary/5"
                }`}
              >
                {FAQ_FILTER_LABELS[f]}
              </button>
            );
          })}
        </div>

        <div className="w-full divide-y divide-primary/10 border-y border-primary/10">
          {visibleFaqs.map((faq, idx) => (
            <FaqRow key={faq.question} num={String(idx + 1).padStart(2, "0")} q={faq.question} a={faq.answer} open={openIdx === idx} onToggle={() => toggleAccordion(idx)} />
          ))}
        </div>
      </div>
    </section>
  );
}
