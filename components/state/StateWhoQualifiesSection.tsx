
import React from "react";
import Image from "next/image";
import { StateData } from "@/data/statesData";
import { CollapsibleNote } from "@/components/common/CollapsibleNote";
import { WHO_QUALIFIES_FOCUS } from "./whoQualifiesFocus";

const CONDITION_RULES: { test: RegExp; icons: string[] }[] = [
  { test: /panic|agoraphob/i, icons: ["/esa-icons/icon-1.svg", "/esa-icons/icon-10.svg"] },
  { test: /ptsd|trauma/i, icons: ["/esa-icons/icon-2.svg"] },
  { test: /depress|dysthym|grief|sadness/i, icons: ["/esa-icons/icon-3.svg"] },
  { test: /seasonal|affective|insomnia|sleep/i, icons: ["/esa-icons/glyph-1.svg"] },
  { test: /neurodiverg|neurodev|cognitive|adhd|attention/i, icons: ["/esa-icons/icon-5.svg"] },
  { test: /bipolar|cyclothym|\bmood\b/i, icons: ["/esa-icons/icon-4.svg", "/esa-icons/icon-7.svg"] },
  { test: /obsess|ocd|compuls|excoriat|dermatill|hoard|skin pick|somatic/i, icons: ["/esa-icons/icon-6.svg", "/esa-icons/icon-14.svg"] },
  { test: /communication/i, icons: ["/esa-icons/icon-34.svg"] },
  { test: /social|phobia|mutism|avoidant|withdrawal/i, icons: ["/esa-icons/icon-8.svg", "/esa-icons/icon-10.svg"] },
  { test: /schizo|psychos/i, icons: ["/esa-icons/icon-32.svg"] },
  { test: /borderline|\bbpd\b|personality/i, icons: ["/esa-icons/icon-7.svg"] },
  { test: /eating|binge/i, icons: ["/esa-icons/icon-12.svg"] },
  { test: /burnout/i, icons: ["/esa-icons/icon-12.svg", "/esa-icons/icon-1.svg"] },
  { test: /depersonal|dissociat|sensory/i, icons: ["/esa-icons/icon.svg"] },
  { test: /anxiet|worry|stress|adjustment/i, icons: ["/esa-icons/icon.svg", "/esa-icons/icon-12.svg"] },
  { test: /other/i, icons: ["/esa-icons/icon-18.svg"] },
];

const CONDITION_FALLBACKS = [
  "/esa-icons/icon-18.svg",
  "/esa-icons/icon-34.svg",
  "/esa-icons/icon-17.svg",
  "/esa-icons/icon-19.svg",
  "/esa-icons/icon-9.svg",
  "/esa-icons/icon-26.svg",
];

function iconFromRules(text: string, used: Set<string>) {
  for (const rule of CONDITION_RULES) {
    if (!rule.test.test(text)) continue;
    const icon = rule.icons.find((candidate) => !used.has(candidate));
    if (icon) return icon;
  }
  return null;
}

function conditionIcons(items: { title: string; description: string }[]) {
  const used = new Set<string>();
  return items.map((item) => {
    const icon =
      iconFromRules(item.title, used) ??
      iconFromRules(`${item.title} ${item.description}`, used) ??
      CONDITION_FALLBACKS.find((candidate) => !used.has(candidate)) ??
      CONDITION_FALLBACKS[0];
    used.add(icon);
    return icon;
  });
}

const defaultConditions = [
  {
    title: "Panic Disorder with Agoraphobia",
    description: "Frequent panic attacks restricting leaving homes and public spaces.",
    icon: "/esa-icons/icon.svg",
  },
  {
    title: "Chronic PTSD",
    description: "Trauma-related flashbacks affecting daily life or emotional regulation.",
    icon: "/esa-icons/icon-1.svg",
  },
  {
    title: "Persistent Depressive Disorder",
    description: "Long-term depressive symptoms affecting motivation and energy.",
    icon: "/esa-icons/icon-2.svg",
  },
  {
    title: "Obsessive-Compulsive Disorder",
    description: "Intrusive thoughts or compulsions disrupting routine activities.",
    icon: "/esa-icons/icon-4.svg",
  },
];

function renderTextWithLinks(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const [, label, url] = match;
    parts.push(
      <a
        key={match.index}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline hover:text-[#1D6E72] font-bold transition-colors"
      >
        {label}
      </a>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

/**
 * Redesigned "Who may qualify" section (piloting on Minnesota).
 * - Fixed 2x2 grid of condition cards with one structure: icon + title row, description below.
 * - Photo shown in one consistent frame (4:5, object-cover) from a pre-cropped, fully opaque
 *   version of the state image, so nothing is stretched and the baked-in wave never shows.
 * - Important note uses the shared collapsible callout.
 */
export function StateWhoQualifiesV2({ data }: { data: StateData }) {
  const stateName = data.name;
  const conditions = data.whoQualifiesConditions && data.whoQualifiesConditions.length > 0 ? data.whoQualifiesConditions : defaultConditions;
  const title = data.whoQualifiesTitle || `Who May Qualify for an ESA Letter in ${stateName}?`;
  const subtitle =
    data.whoQualifiesSubtitle ||
    `${stateName} residents having trouble completing everyday tasks and activities can get evaluated by licensed mental health professionals (LMHP) in ${stateName} to check the need for an emotional support animal.`;
  // One label for every state (approved Nov 2026); avoids implying a condition alone qualifies.
  const sectionHeading = "Conditions a Clinician May Consider";
  const icons = conditionIcons(conditions);
  const photo = `/states/who-qualifies/${data.slug}.webp`;

  return (
    <section data-section="who-qualifies" className="relative z-10 w-full bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-8 xl:grid-cols-[minmax(0,1fr)_420px] xl:gap-x-16">
        <div className="text-center lg:col-start-1 lg:row-start-1 lg:text-left">
          <h2 className="heading-h2 text-primary">{title}</h2>
          <div className="body-large mx-auto mt-4 max-w-[640px] text-body-text lg:mx-0">{renderTextWithLinks(subtitle)}</div>
        </div>

        <div className="relative mx-auto w-full max-w-[420px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:flex lg:max-w-none lg:items-center lg:self-stretch">
          <div className="relative w-full lg:h-full lg:max-h-[820px]">
          <span aria-hidden className="absolute -left-3 -top-3 hidden size-24 rounded-[24px] bg-accent/30 sm:block lg:-left-4 lg:-top-4 lg:size-28" />
          <span aria-hidden className="absolute -bottom-3 -right-3 hidden size-32 rounded-[28px] color-gradient opacity-90 sm:block lg:-bottom-4 lg:-right-4 lg:size-40" />
          <div className="relative aspect-[4/3] overflow-hidden rounded-[26px] bg-cream-100 shadow-[0_30px_60px_-34px_rgba(26,61,79,0.6)] sm:aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[520px]">
            <Image quality={85} src={photo} alt="A person relaxing at home with their pet" fill sizes="(min-width: 1024px) 420px, 92vw" className="object-cover" style={{ objectPosition: `${WHO_QUALIFIES_FOCUS[data.slug] ?? 50}% 25%` }} />
          </div>
          </div>
        </div>

        <div className="lg:col-start-1 lg:row-start-2">
          <p className="eyebrow flex items-center gap-3 text-[#8A6A12]">
            <span aria-hidden className="h-px w-8 bg-accent" />
            {sectionHeading}
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {conditions.map((item, idx) => (
              <div key={item.title} className="flex flex-col rounded-[20px] bg-background p-5 ring-1 ring-line-200 sm:p-6">
                <div className="flex items-center gap-3 sm:min-h-[52px]">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-[14px] bg-white shadow-[0_6px_16px_-10px_rgba(26,61,79,0.5)]">
                    <Image quality={90} src={icons[idx]} alt="" width={24} height={24} sizes="24px" unoptimized className="size-6 object-contain" />
                  </span>
                  <h4 className="heading-h4 min-w-0 font-heading font-bold text-primary">{item.title.replace(/\//g, "/\u200B")}</h4>
                </div>
                <div className="mt-3 font-sans text-base leading-[24px] text-body-text">{item.description}</div>
              </div>
            ))}
          </div>
          {data.whoQualifiesNote && (
            <CollapsibleNote text={data.whoQualifiesNote} className="mt-4 rounded-[18px] bg-background/70 p-4 ring-1 ring-line-200 sm:p-5" />
          )}
        </div>
      </div>
    </section>
  );
}

