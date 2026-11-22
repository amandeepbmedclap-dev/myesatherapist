import React from "react";
import { PricingTabSwitcher } from "./PricingTabSwitcher";
import { MaybeStateModalButton } from "@/components/common/MaybeStateModalButton";
import { ArrowRight, Check, Minus, ShieldCheck } from "lucide-react";
import { PricingHelpStrip } from "./PricingHelpStrip";
import { ctaLabel } from "@/components/common/ctaCopy";
import { isEvaluationCtaLabel, type StateModalLetter } from "@/components/common/evaluationCta";

const TEAL_GRADIENT = "var(--color-gradient)";

export type PlanType = "esa" | "psd";

export interface PlanCard {
  title: string;
  description: string;
  price: string;
  isPopular?: boolean;
  features: string[];
  buttonText: string;
  mobileButtonText?: string;
  /** One short line saying who the plan is for. Falls back to description. */
  audience?: string;
  /** Small highlight shown beside the price, e.g. a bundle saving. */
  note?: string;
}

export interface PlanSet {
  tabLabel: string;
  description: string;
  cards: [PlanCard, PlanCard, PlanCard];
}

export const PLANS: Record<PlanType, PlanSet> = {
  esa: {
    tabLabel: "ESA Letter",
    description:
      "One flat fee covers your evaluation with a licensed mental health professional in your state. Your letter is issued only if you qualify.",
    cards: [
      {
        title: "ESA Housing Letter",
        description:
          "Professional ESA letter from a state-licensed mental health professional for housing accommodations.",
        price: "$99",
        isPopular: true,
        audience: "For renters who want to live with their emotional support animal.",
        features: [
          "Online ESA evaluation",
          "Licensed mental health professional",
          "Disability-related need assessment",
          "ESA letter if clinically approved",
          "Secure email delivery",
        ],
        buttonText: "Start Your ESA Evaluation",
        mobileButtonText: "Start ESA Evaluation",
      },
      {
        title: "ESA & PSD Letters",
        description:
          "Professional ESA and PSD letters from a state-licensed mental health professional for housing and service dog needs.",
        price: "$179",
        audience: "For people who need both an ESA letter and a PSD letter.",
        note: "Save $19 vs. buying both separately",
        features: [
          "Online ESA evaluation",
          "Licensed mental health professional",
          "Disability-related need assessment",
          "ESA letter if clinically approved",
          "PSD letter if clinically approved",
          "Secure email delivery",
        ],
        buttonText: "Start My ESA & PSD Evaluation",
        mobileButtonText: "Apply Now",
      },
      {
        title: "Not Sure Which One?",
        description:
          "Your needs are unique. Let’s find the right option.",
        price: "?",
        features: [
          "Help identifying the right documentation",
          "ESA and PSD needs assessed",
          "Guidance from a licensed professional",
          "Clear next steps after evaluation",
        ],
        buttonText: "Find the Right Option",
        mobileButtonText: "Find Your Option",
      },
    ],
  },
  psd: {
    tabLabel: "PSD Letter",
    description:
      "One flat fee covers your evaluation with a licensed mental health professional in your state. Your letter is issued only if you qualify.",
    cards: [
      {
        title: "PSD Letter",
        description:
          "Professional PSD letter from a state-licensed mental health professional for service dog needs.",
        price: "$99",
        isPopular: true,
        audience: "For handlers who need documentation for their psychiatric service dog.",
        features: [
          "Online PSD evaluation",
          "Licensed mental health professional",
          "Disability-related need assessment",
          "PSD letter if clinically approved",
          "Secure email delivery",
        ],
        buttonText: "Start Your ESA Evaluation",
        mobileButtonText: "Start ESA Evaluation",
      },
      {
        title: "ESA & PSD Letters",
        description:
          "Professional ESA and PSD letters from a state-licensed mental health professional for housing and service dog needs.",
        price: "$179",
        audience: "For people who need both an ESA letter and a PSD letter.",
        note: "Save $19 vs. buying both separately",
        features: [
          "Online PSD evaluation",
          "Licensed mental health professional",
          "Disability-related need assessment",
          "ESA letter if clinically approved",
          "PSD letter if clinically approved",
          "Secure email delivery",
        ],
        buttonText: "Start My ESA & PSD Evaluation",
        mobileButtonText: "Apply Now",
      },
      {
        title: "Not Sure Which One?",
        description:
          "Your needs are unique. Let’s find the right option.",
        price: "?",
        features: [
          "Help identifying the right documentation",
          "ESA and PSD needs assessed",
          "Guidance from a licensed professional",
          "Clear next steps after evaluation",
        ],
        buttonText: "Find the Right Option",
        mobileButtonText: "Find Your Option",
      },
    ],
  },
};

function cardLetter(buttonText: string, directSurvey: boolean): StateModalLetter | undefined {
  if (directSurvey && isEvaluationCtaLabel(buttonText)) return "psd";
  return undefined;
}

function PricingCardButton({
  href,
  label,
  letter,
  featured,
}: {
  href: string;
  label: string;
  letter?: StateModalLetter;
  featured: boolean;
}) {
  return (
    <MaybeStateModalButton
      href={href}
      label={label}
      letter={letter}
      evaluationCta
      className={`cta3d ${featured ? "cta3d--gold" : "cta3d--teal"} inline-flex h-auto min-h-[54px] w-full min-w-0 items-center justify-center gap-2 px-3 py-2 font-sans text-[15px] leading-5 lg:text-[16px]`}
    >
      <span className="min-w-0 text-balance text-center">{ctaLabel(label, letter)}</span>
      <ArrowRight aria-hidden strokeWidth={2.5} className="cta-arrow size-[18px] shrink-0" />
    </MaybeStateModalButton>
  );
}

/** Merge feature lists in reading order so every card shows the same rows. */
function unionFeatures(cards: PlanCard[]): string[] {
  const out: string[] = [];
  for (const card of cards) {
    card.features.forEach((f, i) => {
      if (out.includes(f)) return;
      const prev = i > 0 ? out.indexOf(card.features[i - 1]) : -1;
      out.splice(prev + 1, 0, f);
    });
  }
  return out;
}

interface RenderCardsProps {
  cards: PlanCard[];
  popularCardIndex?: number;
  ctaHref: string;
  directSurvey?: boolean;
  showHelp?: boolean;
}

function RenderCardsContainer({
  cards: allCards,
  popularCardIndex,
  ctaHref,
  directSurvey = false,
  showHelp = false,
}: RenderCardsProps) {
  const cards = allCards.filter((c) => c.price !== "?");
  // Plans that share most of their features get an aligned comparison list
  // (ticks and dashes); unrelated plans just list their own features.
  const shared = cards.length > 1 ? cards[0].features.filter((f) => cards.every((c) => c.features.includes(f))) : [];
  const compare = shared.length >= 3;
  const rows = compare ? unionFeatures(cards) : [];

  return (
    <div className="w-full">
      <div className={`mx-auto grid w-full gap-6 ${cards.length >= 3 ? "max-w-[1100px] md:grid-cols-3" : "max-w-[860px] md:grid-cols-2"}`}>
        {cards.map((card, idx) => {
          const featured = popularCardIndex !== undefined ? idx === popularCardIndex : !!card.isPopular;
          const letter = cardLetter(card.buttonText, directSurvey);
          const list = compare ? rows : card.features;
          const audience = card.audience ?? card.description;

          return (
            <div
              key={card.title}
              className={`relative flex flex-col rounded-[24px] p-6 sm:p-8 md:p-6 lg:p-8 ${
                featured
                  ? "order-first color-gradient text-white shadow-[0_18px_40px_-18px_rgba(26,61,79,0.55)] ring-2 ring-accent md:order-none"
                  : "bg-white text-primary shadow-[0_10px_30px_-20px_rgba(26,61,79,0.35)] ring-1 ring-line-200"
              }`}
            >
              {featured && (
                <span className="absolute -top-3.5 left-6 rounded-full bg-accent px-3.5 py-1 font-sans text-[12px] font-extrabold uppercase tracking-[0.08em] text-[#163545] shadow-sm sm:left-8">
                  Most Popular
                </span>
              )}

              <h3 className={`font-heading text-[24px] font-bold leading-[1.2] sm:text-[26px] ${featured ? "text-white" : "text-primary"}`}>
                {card.title.replace("\n", " ")}
              </h3>
              <div className={`mt-2 font-sans text-[15px] leading-[23px] ${featured ? "text-white/85" : "text-body-text"}`}>
                {audience}
              </div>

              <div className="mt-6 flex items-end gap-2">
                <span className={`font-heading text-[52px] font-bold leading-none tracking-tight ${featured ? "text-accent" : "text-primary"}`}>
                  {card.price}
                </span>
                <span className={`pb-1.5 font-sans text-[14px] font-semibold leading-5 ${featured ? "text-white/80" : "text-body-text"}`}>
                  one-time fee
                </span>
              </div>
              {card.note && (
                <div className={`mt-3 inline-flex w-fit rounded-full px-3 py-1 font-sans text-[13px] font-bold leading-5 ${featured ? "bg-accent/15 text-accent" : "bg-[#E7F2EF] text-[#1D6E72]"}`}>
                  {card.note}
                </div>
              )}

              <div className="mt-6">
                <PricingCardButton href={ctaHref} label={card.buttonText} letter={letter} featured={featured} />
              </div>
              <div className={`mt-3 flex items-center justify-center gap-1.5 font-sans text-[13px] font-medium leading-5 ${featured ? "text-white/80" : "text-body-text"}`}>
                <ShieldCheck aria-hidden className="size-4 shrink-0" /> No hidden fees. Pay once.
              </div>

              <div className={`mt-6 border-t pt-5 ${featured ? "border-white/15" : "border-line-200"}`}>
                <div className={`mb-3 font-sans text-[12px] font-extrabold uppercase tracking-[0.1em] ${featured ? "text-accent" : "text-gold-600"}`}>
                  What&apos;s included
                </div>
                <ul className="flex flex-col gap-2.5">
                  {list.map((feature) => {
                    const has = card.features.includes(feature);
                    return (
                      <li key={feature} className="flex items-start gap-2.5">
                        <span
                          className={`mt-[1px] flex size-5 shrink-0 items-center justify-center rounded-full ${
                            has ? (featured ? "bg-accent text-[#163545]" : "bg-primary text-white") : featured ? "bg-white/10 text-white/50" : "bg-cream-100 text-body-text/50"
                          }`}
                        >
                          {has ? <Check aria-hidden strokeWidth={3} className="size-3" /> : <Minus aria-hidden strokeWidth={3} className="size-3" />}
                        </span>
                        <span
                          className={`font-sans text-[15px] leading-[22px] ${
                            has ? (featured ? "text-white" : "text-primary") : featured ? "text-white/45 line-through" : "text-body-text/55 line-through"
                          }`}
                        >
                          {has ? feature : <><span className="sr-only">Not included: </span>{feature}</>}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
      {showHelp && <PricingHelpStrip />}
    </div>
  );
}

interface PricingSectionProps {
  bgColor?: string;
  defaultPlan?: PlanType;
  ctaHref?: string;
  sectionId?: string;
  sectionClassName?: string;
  heading?: string;
  headingClassName?: string;
  descriptionOverride?: string;
  showTabs?: boolean;
  maxCards?: number;
  popularCardIndex?: number;
  cards?: PlanCard[];
  /** @deprecated kept so older call sites still type-check; no longer used. */
  showDog?: boolean;
  /** @deprecated */
  headerHeight?: number;
  /** @deprecated */
  mobileFeatureLimit?: number;
}

export function PricingSection({
  bgColor = "bg-background",
  defaultPlan = "esa",
  ctaHref = "#how-it-works",
  sectionId = "pricing",
  sectionClassName = "py-16 lg:py-24",
  heading = "Simple, Transparent Plans & Pricing for Your ESA Evaluation",
  headingClassName = "heading-h2",
  descriptionOverride,
  showTabs = true,
  maxCards,
  popularCardIndex,
  cards: cardsOverride,
}: PricingSectionProps) {
  const pick = (type: PlanType) => {
    const src = cardsOverride ?? PLANS[type].cards;
    return src.slice(0, maxCards ?? src.length);
  };
  const hasHelp = (list: PlanCard[]) => list.some((c) => c.price === "?");

  return (
    <section id={sectionId} className={`${sectionClassName} ${bgColor} relative overflow-hidden`}>
      <div className="mx-auto flex max-w-[1442px] flex-col items-center gap-10 px-4 sm:px-6 lg:px-4 xl:px-0">
        <div className="mx-auto max-w-[760px] space-y-3 text-center">
          <h2 className={headingClassName}>{heading}</h2>
          <p className="body-large">{descriptionOverride ?? PLANS[defaultPlan].description}</p>
        </div>

        {showTabs ? (
          <PricingTabSwitcher
            esaLabel={PLANS.esa.tabLabel}
            psdLabel={PLANS.psd.tabLabel}
            defaultTab={defaultPlan}
            esaContent={<RenderCardsContainer cards={pick("esa")} popularCardIndex={popularCardIndex} ctaHref={ctaHref} showHelp={hasHelp(pick("esa"))} />}
            psdContent={<RenderCardsContainer cards={pick("psd")} popularCardIndex={popularCardIndex} ctaHref={ctaHref} directSurvey showHelp={hasHelp(pick("psd"))} />}
          />
        ) : (
          <RenderCardsContainer
            cards={pick(defaultPlan)}
            popularCardIndex={popularCardIndex}
            ctaHref={ctaHref}
            directSurvey={defaultPlan === "psd"}
            showHelp={hasHelp(pick(defaultPlan))}
          />
        )}
      </div>
    </section>
  );
}
