
import React from "react";
import Image from "next/image";
import { StateData } from "@/data/statesData";
import { BENEFITS_FOCUS_X, BENEFITS_FOCUS_Y } from "./benefitsFocus";
import { CtaButton } from "@/components/common/CtaButton";

const HOUSE = "/esa-icons/icon-20.svg";
const PAW = "/esa-icons/icon-30.svg";
const DOLLAR = "/esa-icons/icon-21.svg";
const COIN = "/esa-icons/icon-22.svg";
const PLANE = "/esa-icons/icon-28.svg";
const SCALES = "/esa-icons/icon-25.svg";
const SHIELD = "/esa-icons/glyph.svg";
const HEART = "/esa-icons/icon-12.svg";
const CALENDAR = "/esa-icons/icon-9.svg";
const CALENDAR_CHECK = "/esa-icons/icon-16.svg";
const PEOPLE = "/esa-icons/icon-8.svg";
const MOOD = "/esa-icons/icon-7.svg";
const BRAIN = "/esa-icons/icon.svg";
const MOON = "/esa-icons/glyph-1.svg";
const EYE = "/esa-icons/icon-26.svg";
const DOCUMENT = "/esa-icons/icon-17.svg";
const REFRESH = "/esa-icons/icon-27.svg";
const CLIPBOARD = "/esa-icons/icon-18.svg";
const CHAT = "/esa-icons/icon-34.svg";
const LOCK = "/esa-icons/icon-14.svg";
const HEART_ALT = "/esa-icons/icon-1.svg";
const HOUSE_ALT = "/esa-icons/icon-29.svg";
const PERSON = "/esa-icons/icon-10.svg";

type IconRule = { test: RegExp; icons: string[] };

const FINANCIAL_RULES: IconRule[] = [
  { test: /breed|size|weight/i, icons: [PAW] },
  { test: /relocat|moving|\bmoves?\b|transition/i, icons: [PLANE] },
  { test: /\bchanges?\b/i, icons: [REFRESH] },
  { test: /penalt|denial|violation|unfair|evict|reject|dispute|evaluat|disrupt/i, icons: [SCALES, SHIELD] },
  { test: /fee|deposit|\brent\b|charge|premium|\bcost|expense|saving|budget|insurance|\bspend/i, icons: [DOLLAR, COIN] },
  { test: /no extra fee|no additional fee/i, icons: [SHIELD] },
  { test: /\bwork\b|workplace|employment|\bjob\b/i, icons: [CLIPBOARD] },
  { test: /paperwork|privacy|document|negotiat/i, icons: [DOCUMENT, EYE] },
  { test: /renewal/i, icons: [CALENDAR] },
  { test: /no-pet|housing|accommodat|live with|living comfortably|live comfortably|\blease\b/i, icons: [HOUSE, HOUSE_ALT] },
  { test: /pet restriction|pet rule|pet polic|restriction/i, icons: [PAW] },
  { test: /protect|legal|fair|exempt/i, icons: [SHIELD, SCALES] },
  { test: /therap|mental|anxiety|stress/i, icons: [HEART] },
];

const EMOTIONAL_RULES: IconRule[] = [
  { test: /isolat|lonel|alone/i, icons: [PEOPLE, PERSON] },
  { test: /social/i, icons: [PEOPLE, PERSON] },
  { test: /winter|season|climate/i, icons: [MOON] },
  { test: /safet|secur/i, icons: [SHIELD, LOCK] },
  { test: /routine|structure|habit|accountab|responsib|purpose|motivat|function/i, icons: [CALENDAR, CALENDAR_CHECK] },
  { test: /focus|attention|sensory|aware|regulat|mindful/i, icons: [BRAIN] },
  { test: /anxiet|stress|worry|panic|overwhelm|burnout|trigger|coping/i, icons: [HEART, HEART_ALT] },
  { test: /\bmood\b|depress|grief|joy|\bpositive\b/i, icons: [MOOD] },
  { test: /express/i, icons: [CHAT] },
  { test: /connection/i, icons: [PEOPLE] },
  { test: /comfort|compan|presence|calm|ground|balance|stabil|consisten|well-being|wellbeing/i, icons: [PAW, HEART, HEART_ALT, MOOD] },
];

const FINANCIAL_FALLBACKS = [HOUSE, PAW, DOLLAR, COIN, PLANE, SCALES, SHIELD, DOCUMENT, CALENDAR, HEART, REFRESH, CLIPBOARD];
const EMOTIONAL_FALLBACKS = [HEART, SHIELD, CALENDAR, PAW, PEOPLE, MOOD, BRAIN, MOON, CHAT, DOCUMENT];

function iconForText(text: string, rules: IconRule[], used: Set<string>) {
  for (const rule of rules) {
    if (!rule.test.test(text)) continue;
    const icon = rule.icons.find((candidate) => !used.has(candidate));
    if (icon) return icon;
  }
  return null;
}

function assignBenefitIcons(
  items: { title: string; description: string }[],
  rules: IconRule[],
  fallbacks: string[],
  used = new Set<string>(),
) {
  return items.map((item) => {
    const icon =
      iconForText(item.title, rules, used) ??
      iconForText(`${item.title} ${item.description}`, rules, used) ??
      fallbacks.find((candidate) => !used.has(candidate)) ??
      fallbacks[0];
    used.add(icon);
    return icon;
  });
}

function BenefitCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="bg-white rounded-[18px] border border-[#EAE5DC] shadow-[0px_1px_4px_rgba(0,0,0,0.08)] p-4 sm:p-5 flex flex-col items-start gap-3 h-full text-left">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F6F1E8] shrink-0">
        <Image quality={90} src={icon} alt={title} width={26}
          sizes="26px" height={26} unoptimized className="h-[26px] w-[26px] object-contain" />
      </div>
      <h4 className="font-heading text-[18px] sm:text-[20px] font-bold text-primary leading-snug">{title}</h4>
      <p className="body text-[#5F6B6F]">{description}</p>
    </div>
  );
}

export function StateBenefitsSection({ data }: { data: StateData }) {
  const stateName = data.name;

  const defaultFinancialBenefits = [
    {
      title: "Comfortable Housing with Your ESA",
      description: `${stateName} tenants may request reasonable housing accommodations with their ESAs even in no-pet policy localities.`,
      icon: "/states/whomayqualifies-california-chronicworry.svg",
    },
    {
      title: "Avoid Extra Pet-Related Costs",
      description: `When valid ESA documentation is presented, ${stateName} landlords are prohibited from charging pet rent, deposits, or extra fees.`,
      icon: "/states/california-benefits-workplaceconsideration.svg",
    },
    {
      title: "No Breed, Weight, or Size Limits",
      description: `Emotional support animals are not subject to standard breed, size, or weight limits by ${stateName} housing providers.`,
      icon: "/states/california-benefits-workplaceconsideration.svg",
    },
  ];

  const defaultEmotionalBenefits = [
    {
      title: "Supports Stress and Anxiety Relief",
      description:
        "Having an ESA nearby helps reduce anxiety levels and bring a calming presence during overwhelming high-stress situations.",
      icon: "/states/whomayqualifies-panicattack.svg",
    },
    {
      title: "Encourages Emotional Balance",
      description:
        "Ongoing companionship from an ESA provides continuous reassurance and comfort to maintain consistent emotional well-being.",
      icon: "/states/california-benefits-strongersense.svg",
    },
    {
      title: "Improves Daily Structure and Meaning",
      description:
        "Caring for an animal helps establish daily routine, generate responsibility, and add meaningful purpose to everyday life.",
      icon: "/states/california-benefits-strongersense.svg",
    },
  ];

  const financialBenefits = data.financialBenefits && data.financialBenefits.length > 0
    ? data.financialBenefits
    : defaultFinancialBenefits;

  const emotionalBenefits = data.emotionalBenefits && data.emotionalBenefits.length > 0
    ? data.emotionalBenefits
    : defaultEmotionalBenefits;

  const title = data.benefitsTitle || `Benefits of Having an ESA Letter in ${stateName}`;
  const subtitle = data.benefitsSubtitle || `A properly issued emotional support animal letter in ${stateName} can help residents obtain housing accommodations while also promoting emotional well-being and everyday stability.`;
  const financialHeading = "Financial Benefits of ESA Letter";
  const emotionalHeading = data.emotionalBenefitsHeading || "Emotional Benefits :";
  const refundNote = data.benefitsRefundNote === ""
    ? ""
    : (data.benefitsRefundNote || "100% Refund If No ESA Letter Is Issued");

  const isStateWhoBenefits = Boolean(data.benefitsImage?.includes("statewhobenefits"));
  const usedBenefitIcons = new Set<string>();
  const financialIcons = assignBenefitIcons(financialBenefits, FINANCIAL_RULES, FINANCIAL_FALLBACKS, usedBenefitIcons);
  const emotionalIcons = assignBenefitIcons(emotionalBenefits, EMOTIONAL_RULES, EMOTIONAL_FALLBACKS, usedBenefitIcons);

  return (
    <section className="w-full bg-white overflow-hidden relative z-10">
      <div className="w-full max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(420px,46%)] lg:items-stretch">
          <div className="order-1 lg:order-2 relative flex w-full min-h-[280px] sm:min-h-[420px] lg:min-h-full">
            <div className="sm:hidden relative w-full aspect-[390/513]">
              <Image
            quality={90}
                src={data.benefitsImageMobile ?? "/states/californina-benefits-mobile.webp"}
                alt={`Benefits of Having an ESA Letter in ${stateName} Mobile View`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 639px) 100vw, 1px"
              />
              <div className="absolute bottom-0 left-[36.4%] -translate-x-1/2 translate-y-1/2 z-10 w-10 h-10">
                <Image
            quality={90}
                  src="/states/whomayqualifies-california-icon.webp"
                  alt="Heart Icon"
                  width={40}
          sizes="40px"
                  height={40}
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </div>
            </div>

            <div className="hidden sm:block lg:hidden relative w-full aspect-[834/1050]">
              <Image
            quality={90}
                src={data.benefitsImageTablet ?? "/states/californina-benefits-tablet.webp"}
                alt={`Benefits of Having an ESA Letter in ${stateName} Tablet View`}
                fill
                className="object-cover object-top"
                sizes="(min-width: 640px) and (max-width: 1023px) 100vw, 1px"
              />
              <div className="absolute bottom-0 left-[33.8%] -translate-x-1/2 translate-y-1/2 z-10 w-12 h-12">
                <Image
            quality={90}
                  src="/states/whomayqualifies-california-icon.webp"
                  alt="Heart Icon"
                  width={48}
          sizes="48px"
                  height={48}
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </div>
            </div>

            <div className="hidden lg:block absolute inset-0">
              <Image
                quality={90}
                src={data.benefitsImage ?? "/states/california-benefits-clinical-issued.webp"}
                alt={`Benefits of Having an ESA Letter in ${stateName}`}
                fill
                className="object-cover object-left pointer-events-none"
                sizes="46vw"
              />
              <div
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10 w-11 h-11 xl:w-16 xl:h-16"
                style={{
                  top: data.benefitsBadgeTop ?? (isStateWhoBenefits ? "50%" : "31.3%"),
                  left: data.benefitsBadgeLeft ?? (isStateWhoBenefits ? "3.3%" : "12.6%"),
                }}
              >
                <Image
                  quality={90}
                  src="/states/whomayqualifies-california-icon.webp"
                  alt="Heart Icon"
                  width={64}
          sizes="64px"
                  height={64}
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </div>
            </div>
          </div>

          <div className="order-2 lg:order-1 px-4 sm:px-6 lg:px-10 xl:px-16 py-8 lg:py-14 flex flex-col justify-center">
            <div className="mb-6 lg:mb-8">
              <h2 className="heading-h2 text-primary mb-3">
                {title}
              </h2>
              <p className="body-large text-body-text max-w-[640px]">
                {subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-5 max-w-[860px] mb-8">
              <div className="flex flex-col gap-4">
                <h3 className="font-heading text-[22px] md:text-[26px] font-bold text-primary leading-tight whitespace-pre-line">
                  {financialHeading}
                </h3>
                {financialBenefits.map((item, idx) => (
                  <BenefitCard
                    key={item.title}
                    title={item.title}
                    description={item.description}
                    icon={financialIcons[idx]}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-heading text-[22px] md:text-[26px] font-bold text-primary leading-tight whitespace-pre-line">
                  {emotionalHeading}
                </h3>
                {emotionalBenefits.map((item, idx) => (
                  <BenefitCard
                    key={item.title}
                    title={item.title}
                    description={item.description}
                    icon={emotionalIcons[idx]}
                  />
                ))}
              </div>
            </div>

            {data.benefitsFootnote ? (
              <p className="body-text text-[#5F6B6F] max-w-[860px] mb-8">
                {data.benefitsFootnote}
              </p>
            ) : null}

            <div className="flex justify-center lg:justify-start">
              <div className="flex flex-col items-center lg:items-start gap-2 w-fit">
                <CtaButton href="#faq" className="w-auto">
                  Apply Your ESA Letter Now
                </CtaButton>
                {refundNote ? (
                  <p className="body-small text-[#5F6B6F] text-center lg:text-left">
                    {refundNote}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BenefitList({
  heading,
  items,
  icons,
  tone,
}: {
  heading: string;
  items: { title: string; description: string }[];
  icons: string[];
  tone: "cream" | "mint";
}) {
  return (
    <div className={`flex h-full flex-col rounded-[26px] p-6 sm:p-7 ${tone === "cream" ? "bg-cream-100" : "bg-[#E7F2EF]"}`}>
      <h3 className="flex items-center gap-3 !font-sans !text-[12px] font-extrabold uppercase !leading-4 tracking-[0.14em] text-[#8A6A12]">
        <span aria-hidden className="h-px w-8 bg-accent" />
        {heading.replace(/\s*\n\s*/g, " ").replace(/\s*:\s*$/, "")}
      </h3>
      <ul className="mt-4 flex flex-1 flex-col">
        {items.map((item, idx) => (
          <li key={item.title} className={`flex gap-4 py-5 ${idx > 0 ? "border-t border-primary/10" : "pt-3"} last:pb-0`}>
            <span className="flex size-11 shrink-0 items-center justify-center rounded-[14px] bg-white shadow-[0_6px_16px_-10px_rgba(26,61,79,0.5)]">
              <Image quality={90} src={icons[idx]} alt="" width={24} height={24} sizes="24px" unoptimized className="size-6 object-contain" />
            </span>
            <div className="min-w-0">
              <h4 className="font-heading text-[18px] font-bold leading-[24px] text-primary sm:text-[19px]">{item.title}</h4>
              <div className="mt-1.5 font-sans text-[15px] leading-[24px] text-body-text">{item.description}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Redesigned benefits section (piloting on Alabama): centred heading, then financial
 * benefits | framed photo | emotional benefits. Photo is a pre-cropped opaque copy shown
 * with object-cover in a capped frame, so it is never stretched.
 */
export function StateBenefitsV2({ data }: { data: StateData }) {
  const stateName = data.name;
  const financialBenefits = data.financialBenefits?.length ? data.financialBenefits : [];
  const emotionalBenefits = data.emotionalBenefits?.length ? data.emotionalBenefits : [];
  if (!financialBenefits.length && !emotionalBenefits.length) return <StateBenefitsSection data={data} />;

  const title = data.benefitsTitle || `Benefits of Having an ESA Letter in ${stateName}`;
  const subtitle =
    data.benefitsSubtitle ||
    `A properly issued emotional support animal letter in ${stateName} can help residents obtain housing accommodations while also promoting emotional well-being and everyday stability.`;
  const financialHeading = data.financialBenefitsHeading || "Financial Benefits of ESA Letter";
  const emotionalHeading = data.emotionalBenefitsHeading || "Emotional Benefits";
  const refundNote = data.benefitsRefundNote === "" ? "" : data.benefitsRefundNote || "100% Refund If No ESA Letter Is Issued";

  const used = new Set<string>();
  const financialIcons = assignBenefitIcons(financialBenefits, FINANCIAL_RULES, FINANCIAL_FALLBACKS, used);
  const emotionalIcons = assignBenefitIcons(emotionalBenefits, EMOTIONAL_RULES, EMOTIONAL_FALLBACKS, used);
  const photo = `/states/benefits/${data.slug}.webp`;

  return (
    <section data-section="benefits" className="relative z-10 w-full bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-[1280px]">
        <div className="mx-auto mb-10 max-w-[880px] text-center lg:mb-12">
          <h2 className="heading-h2 text-primary">{title}</h2>
          <p className="body-large mx-auto mt-4 max-w-[760px] text-body-text">{subtitle}</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px_minmax(0,1fr)] lg:gap-6 xl:grid-cols-[minmax(0,1fr)_340px_minmax(0,1fr)]">
          <div className="relative order-first mx-auto w-full max-w-[520px] lg:order-none lg:col-start-2 lg:row-start-1 lg:max-w-none">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[26px] bg-cream-100 shadow-[0_30px_60px_-34px_rgba(26,61,79,0.6)] sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[520px]">
              <Image quality={85} src={photo} alt="A person spending time with their emotional support animal" fill sizes="(min-width: 1024px) 340px, 92vw" className="object-cover"
                style={{ objectPosition: `${BENEFITS_FOCUS_X[data.slug] ?? 50}% ${BENEFITS_FOCUS_Y[data.slug] ?? 40}%` }} />
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(180deg,rgba(26,61,79,0)_0%,rgba(26,61,79,0.55)_100%)]" />
              <span className="absolute bottom-4 right-4 flex size-12 items-center lg:bottom-5 lg:right-auto lg:left-1/2 lg:size-14 lg:-translate-x-1/2 justify-center rounded-full bg-white shadow-[0_10px_24px_-10px_rgba(0,0,0,0.45)]">
                <Image quality={90} src="/states/whomayqualifies-california-icon.webp" alt="" width={40} height={40} sizes="40px" className="size-9 object-contain" />
              </span>
            </div>
          </div>
          <div className="lg:col-start-1 lg:row-start-1">
            <BenefitList heading={financialHeading} items={financialBenefits} icons={financialIcons} tone="cream" />
          </div>
          <div className="lg:col-start-3 lg:row-start-1">
            <BenefitList heading={emotionalHeading} items={emotionalBenefits} icons={emotionalIcons} tone="mint" />
          </div>
        </div>

        {data.benefitsFootnote ? <p className="body-text mx-auto mt-8 max-w-[880px] text-center text-body-text">{data.benefitsFootnote}</p> : null}

        <div className="mt-10 flex flex-col items-center gap-2">
          <CtaButton href="#faq">Apply Your ESA Letter Now</CtaButton>
          {refundNote ? <p className="body-small text-center text-body-text">{refundNote}</p> : null}
        </div>
      </div>
    </section>
  );
}
