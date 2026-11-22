"use client";

import React, { useState } from "react";
import { ArrowRight, Brain, CalendarDays, CircleCheck, HeartHandshake, Info, MapPin, PawPrint, Stethoscope, UserRound } from "lucide-react";
import { StateData } from "@/data/statesData";
import { openEsaEligibilityChecker } from "@/components/common/evaluationCta";

/**
 * Eligibility section split into who may qualify (personal criteria) and what the
 * state's process involves (ordered steps). The wording of every item is the state's
 * own; only grouping and order change.
 */

// Items that describe a step of the process rather than a trait of the person.
const PROCESS = /^(undergo|complete|completion|review|attend|participate|schedule|meet with|a clinical evaluation)\b|\bdetermines?\b|client[–-]provider relationship|required disclosures/i;

// Natural order of process steps.
function stepRank(item: string) {
  if (/undergo|evaluation/i.test(item)) return 1;
  if (/relationship|30-day|30‑day/i.test(item)) return 2;
  if (/disclos/i.test(item)) return 3;
  if (/determin/i.test(item)) return 4;
  return 5;
}

function criterionIcon(item: string) {
  if (/\b18\b|years (of age )?or older|years old|minor|consent/i.test(item)) return UserRound;
  if (/resid|live in|lives|relocat|move there|move to/i.test(item)) return MapPin;
  if (/care for|caring for|responsibl/i.test(item)) return PawPrint;
  if (/\banimal\b/i.test(item)) return HeartHandshake;
  if (/daily|day-to-day|day to day|functioning|routine/i.test(item)) return CalendarDays;
  if (/mental|emotional health|condition|concern|symptom/i.test(item)) return Brain;
  if (/clinician|professional|evaluat|assess/i.test(item)) return Stethoscope;
  if (/animal|support|benefit/i.test(item)) return HeartHandshake;
  return CircleCheck;
}

const DEFAULT_ITEMS = (stateName: string) => [
  "The person is at least 18 years old or has documented consent from a parent or guardian if a minor.",
  "A mental or emotional health condition is diagnosed through a professional clinical evaluation.",
  "The condition substantially affects daily life and functioning like emotional regulation, sleep or ability to focus.",
  "The therapeutic role of an animal is identified on a case-by-case basis.",
  `The individual is currently a resident of ${stateName} or is planning to relocate there.`,
];

export function StateEligibilityPanels({ data }: { data: StateData }) {
  const [open, setOpen] = useState(false);
  const stateName = data.name;
  const items = data.requirementsItems && data.requirementsItems.length > 0 ? data.requirementsItems : DEFAULT_ITEMS(stateName);
  const steps = items.filter((i) => PROCESS.test(i)).sort((a, b) => stepRank(a) - stepRank(b));
  // Two panels only when the state's list really describes a process; otherwise one grid in the original order.
  const twoPanel = steps.length >= 3;
  const criteria = twoPanel ? items.filter((i) => !PROCESS.test(i)) : items;

  const title = data.requirementsTitle || `Basic Requirements for an ESA Letter in ${stateName}`;
  const note =
    data.requirementsNote ||
    `ESA evaluation in ${stateName} must be determined through an individualized assessment conducted by an ${stateName}-licensed mental health professional (LMHP). An ESA letter may only be issued when clinically appropriate based on that evaluation.`;
  const noteBody = note.replace(/^(important\s*note[:\s-]*|important[:\s-]*)/i, "");
  const longNote = noteBody.length > 200;

  return (
    <section data-section="eligibility" className="w-full bg-background px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-[1180px]">
        <div className="mx-auto mb-10 max-w-[820px] text-center">
          <h2 className="heading-h2 text-primary">{title}</h2>
          {data.requirementsIntro && <div className="body-large mt-3 text-body-text">{data.requirementsIntro}</div>}
        </div>

        <div className={twoPanel ? "grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]" : ""}>
          <div className="rounded-[26px] bg-white p-6 shadow-[0_18px_40px_-30px_rgba(26,61,79,0.5)] ring-1 ring-line-200 sm:p-8">
            <div className="font-sans text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#8A6A12]">{twoPanel ? "Who may qualify" : "Key considerations"}</div>
            <ul className={`mt-5 grid gap-4 ${twoPanel ? "" : "md:grid-cols-2 md:gap-x-10 md:gap-y-5"}`}>
              {criteria.map((item) => {
                const Icon = criterionIcon(item);
                return (
                  <li key={item} className="flex items-start gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-[14px] bg-cream-100 text-primary">
                      <Icon aria-hidden className="size-5" strokeWidth={1.9} />
                    </span>
                    <span className="pt-2 font-sans text-[16px] leading-[25px] text-primary">{item}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {twoPanel && (
            <div className="relative overflow-hidden rounded-[26px] p-6 color-gradient sm:p-8">
              <span aria-hidden className="pointer-events-none absolute -bottom-28 -right-24 size-64 rounded-full border border-accent/25" />
              <div className="relative font-sans text-[12px] font-extrabold uppercase tracking-[0.14em] text-accent">
                What the {stateName} process involves
              </div>
              <ol className="relative mt-5 flex flex-col">
                {steps.map((item, idx) => (
                  <li key={item} className="relative flex gap-4 pb-5 last:pb-0">
                    {idx < steps.length - 1 && <span aria-hidden className="absolute bottom-0 left-[17px] top-9 w-px bg-white/25" />}
                    <span className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-accent font-sans text-[14px] font-extrabold text-[#163545]">
                      {idx + 1}
                    </span>
                    <span className="pt-1.5 font-sans text-[16px] leading-[25px] text-white">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        <div className="mt-5 flex flex-col gap-5 rounded-[22px] bg-white/70 p-5 ring-1 ring-line-200 sm:p-6 lg:flex-row lg:items-center lg:gap-8">
          {noteBody && (
            <div className="flex min-w-0 flex-1 items-start gap-3">
              <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-[#8A6A12]" />
              <div className="min-w-0 font-sans text-[14px] leading-[22px] text-body-text">
                <span className={open || !longNote ? "block" : "line-clamp-2"}>
                  <span className="font-bold text-primary">Important: </span>
                  {noteBody}
                </span>
                {longNote && (
                <button
                  type="button"
                  onClick={() => setOpen((v) => !v)}
                  aria-expanded={open}
                  className="mt-1 cursor-pointer font-bold text-primary underline decoration-accent decoration-2 underline-offset-4"
                >
                  {open ? "Show less" : "Read more"}
                </button>
                )}
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={() => openEsaEligibilityChecker()}
            className="cta3d cta3d--gold inline-flex h-[54px] shrink-0 items-center justify-center gap-2 self-center px-6 font-sans text-[16px] lg:self-auto"
          >
            Check My Eligibility, Free
            <ArrowRight aria-hidden strokeWidth={2.5} className="cta-arrow size-[18px]" />
          </button>
        </div>
      </div>
    </section>
  );
}
