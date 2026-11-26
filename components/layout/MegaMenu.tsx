"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Mail, Phone, Search } from "lucide-react";
import { CtaButton } from "@/components/common/CtaButton";
import { openEsaEligibilityChecker } from "@/components/common/evaluationCta";
import { STATE_INDEX } from "@/data/stateIndex";

/*
 * Header navigation data and the desktop mega panels. The look is an
 * editorial "index": serif titles, numbered rows on hairlines, a cream rail
 * that introduces each section, and one photo feature per panel.
 */

export type MenuKey = "letters" | "states" | "learn" | "about";

export type NavItem = { label: string; href: string; note?: string };

export const NAV: { key: MenuKey; label: string; title: string; intro: string; items: NavItem[] }[] = [
  {
    key: "letters",
    label: "Get a Letter",
    title: "Get a Letter",
    intro: "Evaluations with mental health professionals licensed in your state.",
    items: [
      { label: "ESA Letter Online", href: "/esa-letter-online/", note: "Start-to-finish online evaluation" },
      { label: "ESA Letter for Housing", href: "/esa-letter-for-housing/", note: "Documentation for rentals and HOAs" },
      { label: "ESA Letter for Dogs", href: "/esa-letter-for-dogs/", note: "Housing letter for an emotional support dog" },
      { label: "ESA Letter Renewal", href: "/esa-letter-renewal/", note: "Keep your documentation current" },
      { label: "PSD Letter", href: "/psd-letter/", note: "For trained psychiatric service dogs" },
      { label: "Video Testimonials", href: "/video-testimonials/", note: "Real clients, in their own words" },
      { label: "Pricing", href: "/pricing/", note: "Plans, extra pets and renewals" },
    ],
  },
  {
    key: "states",
    label: "States",
    title: "Find Your State",
    intro: "Rules differ from state to state. Pick yours to see how it works where you live.",
    items: [],
  },
  {
    key: "learn",
    label: "Learn",
    title: "Learn",
    intro: "Plain-language guides to ESA letters, housing rights and training.",
    items: [
      { label: "ESA Guide", href: "/blog/esa-guide/", note: "The basics, explained" },
      { label: "Qualifying Conditions", href: "/blog/qualifying-conditions/", note: "Conditions that may qualify" },
      { label: "ESA Training", href: "/blog/esa-training/", note: "Living well with your ESA" },
      { label: "ESA Laws by State", href: "/esa-laws/", note: "Housing rules, state by state" },
      { label: "FAQs", href: "/frequently-asked-questions/", note: "Quick answers" },
    ],
  },
  {
    key: "about",
    label: "About Us",
    title: "About My ESA Therapist",
    intro: "A telehealth platform connecting clients with licensed mental health professionals.",
    items: [
      { label: "About Us", href: "/about-us/", note: "Who we are and how we work" },
      { label: "Our Therapists", href: "/esa-doctors/", note: "Meet the licensed professionals" },
      { label: "Client Reviews", href: "/reviews/", note: "What clients say" },
      { label: "Video Testimonials", href: "/video-testimonials/", note: "Stories in their own words" },
      { label: "Contributors", href: "/contributors/", note: "Writers and reviewers" },
      { label: "Editorial Policy", href: "/editorial-policy/", note: "How we write and review" },
    ],
  },
];

export const MOST_READ: NavItem[] = [
  { label: "ESA Letter Sample", href: "/blog/esa-guide/esa-letter-sample/" },
  { label: "How to Verify an ESA Letter", href: "/blog/esa-guide/how-to-verify-an-esa-letter/" },
  { label: "Who Can Write an ESA Letter?", href: "/blog/esa-guide/who-can-write-an-esa-letter/" },
  { label: "Can Landlords Deny ESAs?", href: "/blog/esa-guide/can-landlords-deny-emotional-support-animals/" },
  { label: "HUD Guidance for ESAs", href: "/blog/esa-guide/hud-guidance-for-emotional-support-animals/" },
];

export const POPULAR_STATES = ["california", "texas", "florida", "new-york", "colorado", "virginia"];

export const PHONE = { display: "+1 (888) 412-4041", href: "tel:+18884124041" };
export const EMAIL = "info@myesatherapist.com";

/* ───────────── shared pieces ───────────── */

/** Numbered index row: gold serif number, serif title, short note, arrow on hover. */
export function IndexRow({ item, n }: { item: NavItem; n: number }) {
  return (
    <Link
      href={item.href}
      className="group/row grid grid-cols-[36px_1fr_auto] items-baseline gap-x-3 border-b border-line-200 py-3.5 transition-colors hover:border-[#1D6E72]"
    >
      <span className="font-heading text-base font-bold text-gold-600">{String(n).padStart(2, "0")}</span>
      <span className="min-w-0">
        <span className="block font-heading text-xl font-bold leading-snug text-[#1A3D4F] transition-colors group-hover/row:text-[#1D6E72]">
          {item.label}
        </span>
        {item.note && <span className="mt-0.5 block text-base leading-snug text-body-text">{item.note}</span>}
      </span>
      <ArrowRight
        aria-hidden
        className="size-4 self-center -translate-x-2 text-[#1D6E72] opacity-0 transition-[opacity,transform] duration-200 group-hover/row:translate-x-0 group-hover/row:opacity-100"
      />
    </Link>
  );
}

function Rail({ title, intro, children }: { title: string; intro: string; children?: ReactNode }) {
  return (
    <div className="flex flex-col rounded-[22px] bg-background p-7 xl:p-8">
      <div className="font-heading text-[28px] font-bold leading-[1.15] text-primary">{title}</div>
      <div className="mt-3 text-base leading-relaxed text-body-text">{intro}</div>
      {children}
    </div>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mb-1 text-base font-bold uppercase tracking-[0.14em] text-gold-600 ${className}`}>{children}</div>;
}

/** Photo with a caption block underneath on a deep teal ground. */
function Feature({ src, alt, eyebrow, title, children }: { src: string; alt: string; eyebrow: string; title: string; children: ReactNode }) {
  return (
    <figure className="relative self-start overflow-hidden rounded-[22px] bg-[#1A3D4F]">
      <Image src={src} alt={alt} width={420} height={420} sizes="340px" loading="lazy" className="h-[210px] w-full object-cover xl:h-[230px]" />
      <figcaption className="p-5 text-white">
        <div className="text-base font-bold uppercase tracking-[0.14em] text-accent">{eyebrow}</div>
        <div className="mt-1 font-heading text-xl font-bold leading-snug">{title}</div>
        <div className="mt-4">{children}</div>
      </figcaption>
    </figure>
  );
}

/* ───────────── state directory ───────────── */

const SORTED_STATES = [...STATE_INDEX].sort((a, b) => a.name.localeCompare(b.name));

export function useStateFilter() {
  const [q, setQ] = useState("");
  const groups = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const list = SORTED_STATES.filter(
      (s) => !needle || s.name.toLowerCase().includes(needle) || s.abbreviation.toLowerCase() === needle,
    );
    const by: Record<string, typeof list> = {};
    for (const s of list) {
      const letter = s.name.replace(/^U\.S\. /, "")[0];
      (by[letter] ||= []).push(s);
    }
    return Object.entries(by).sort(([a], [b]) => a.localeCompare(b));
  }, [q]);
  return { q, setQ, groups };
}

export function StateSearch({ q, setQ, id }: { q: string; setQ: (v: string) => void; id: string }) {
  return (
    <label htmlFor={id} className="relative block">
      <span className="sr-only">Search states</span>
      <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-[#1D6E72]" />
      <input
        id={id}
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Type your state"
        autoComplete="off"
        className="h-12 w-full rounded-full border border-line-200 bg-white pl-11 pr-4 text-[16px] font-medium text-[#1A3D4F] outline-none transition-colors placeholder:text-body-text/70 focus:border-[#1D6E72]"
      />
    </label>
  );
}

export function StateDirectory({
  groups,
  columns = "columns-2 sm:columns-3 xl:columns-4",
}: {
  groups: ReturnType<typeof useStateFilter>["groups"];
  columns?: string;
}) {
  if (!groups.length) {
    return (
      <div className="py-6 text-base text-body-text">
        No match. Try another spelling or{" "}
        <Link href="/state/" className="font-semibold text-[#1D6E72] underline underline-offset-4">
          browse all states
        </Link>
        .
      </div>
    );
  }
  return (
    <div className={`${columns} gap-x-8`}>
      {groups.map(([letter, states]) => (
        <div key={letter} className="mb-3 break-inside-avoid">
          <div className="font-heading text-lg font-bold text-gold-600">{letter}</div>
          <ul>
            {states.map((s) => (
              <li key={s.slug} className="text-base !leading-[1.95]">
                <Link
                  href={`/esa-letter-${s.slug}/`}
                  className="font-medium text-[#1A3D4F] decoration-gold-600 decoration-2 underline-offset-4 hover:text-[#1D6E72] hover:underline"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ───────────── desktop panels ───────────── */

function CheckerLink({ onNavigate, children }: { onNavigate: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={() => {
        onNavigate();
        openEsaEligibilityChecker();
      }}
      className="font-semibold text-[#1D6E72] underline decoration-gold-600 decoration-2 underline-offset-4"
    >
      {children}
    </button>
  );
}

function LettersPanel({ onNavigate }: { onNavigate: () => void }) {
  const nav = NAV[0];
  return (
    <div className="grid grid-cols-[280px_1fr_300px] gap-8 xl:grid-cols-[310px_1fr_330px] xl:gap-10">
      <Rail title={nav.title} intro={nav.intro}>
        <div className="mt-auto pt-6 text-base leading-relaxed text-body-text">
          Not sure where to start? <CheckerLink onNavigate={onNavigate}>Check your eligibility for free</CheckerLink>
        </div>
      </Rail>
      <div className="grid grid-cols-2 gap-x-8 self-start">
        {nav.items.map((item, i) => (
          <IndexRow key={item.label} item={item} n={i + 1} />
        ))}
      </div>
      <Feature
        src="/esa-online/esa-letter-online-esaletterdiffernt-emotinalsupportdog.webp"
        alt="Woman filling out paperwork with her dog beside her"
        eyebrow="100% money-back guarantee"
        title="Every evaluation is backed by our money-back guarantee."
      >
        <CtaButton href="#pricing" forceStateModal className="w-full !h-[50px] text-base" onClick={onNavigate}>
          Start Your ESA Evaluation
        </CtaButton>
        <Link href="/refund-policy/" className="mt-3 inline-flex items-center gap-1.5 text-base font-semibold text-white/80 hover:text-accent">
          How refunds work <ArrowUpRight aria-hidden className="size-4" />
        </Link>
      </Feature>
    </div>
  );
}

function StatesPanel() {
  const { q, setQ, groups } = useStateFilter();
  const nav = NAV[1];
  return (
    <div className="grid grid-cols-[280px_1fr] gap-8 xl:grid-cols-[310px_1fr] xl:gap-10">
      <Rail title={nav.title} intro={nav.intro}>
        <div className="mt-6">
          <StateSearch q={q} setQ={setQ} id="state-search-desktop" />
        </div>
        <Eyebrow className="mt-6">Most visited</Eyebrow>
        <div className="flex flex-wrap gap-2">
          {POPULAR_STATES.map((slug) => {
            const s = STATE_INDEX.find((x) => x.slug === slug);
            if (!s) return null;
            return (
              <Link
                key={slug}
                href={`/esa-letter-${slug}/`}
                className="rounded-full border border-line-200 bg-white px-3.5 py-1.5 text-base font-semibold text-[#1A3D4F] transition-colors hover:border-[#1D6E72] hover:text-[#1D6E72]"
              >
                {s.name}
              </Link>
            );
          })}
        </div>
        <Link href="/esa-laws/" className="mt-auto inline-flex items-center gap-1.5 pt-6 text-base font-semibold text-[#1D6E72] hover:underline">
          ESA laws by state <ArrowUpRight aria-hidden className="size-4" />
        </Link>
      </Rail>
      <div className="max-h-[calc(100dvh-230px)] overflow-y-auto pr-2">
        <StateDirectory groups={groups} columns="columns-4 xl:columns-5" />
      </div>
    </div>
  );
}

function LearnPanel({ onNavigate }: { onNavigate: () => void }) {
  const nav = NAV[2];
  return (
    <div className="grid grid-cols-[280px_1fr_1fr_280px] gap-8 xl:grid-cols-[310px_1fr_1fr_300px] xl:gap-10">
      <Rail title={nav.title} intro={nav.intro}>
        <Link href="/blog/" className="mt-auto inline-flex items-center gap-1.5 pt-6 text-base font-semibold text-[#1D6E72] hover:underline">
          All articles <ArrowUpRight aria-hidden className="size-4" />
        </Link>
      </Rail>
      <div className="self-start">
        <Eyebrow>Topics</Eyebrow>
        {nav.items.map((item, i) => (
          <IndexRow key={item.label} item={item} n={i + 1} />
        ))}
      </div>
      <div className="self-start">
        <Eyebrow>Most read</Eyebrow>
        <ol>
          {MOST_READ.map((item) => (
            <li key={item.href} className="border-b border-line-200">
              <Link
                href={item.href}
                className="group/m flex items-center justify-between gap-3 py-3.5 text-base font-semibold leading-snug text-[#1A3D4F] hover:text-[#1D6E72]"
              >
                {item.label}
                <ArrowUpRight aria-hidden className="size-4 shrink-0 text-gold-600 transition-transform group-hover/m:-translate-y-0.5 group-hover/m:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ol>
      </div>
      <Feature
        src="/esa-online/esa-letter-online-esaletterdiffernt-emotionalsupportcat.webp"
        alt="Woman reading on the sofa with her cat"
        eyebrow="Free, about a minute"
        title="Not sure if you qualify?"
      >
        <button
          type="button"
          onClick={() => {
            onNavigate();
            openEsaEligibilityChecker();
          }}
          className="inline-flex h-[48px] w-full items-center justify-center gap-2 rounded-full bg-white text-base font-bold text-[#1A3D4F] transition-colors hover:bg-accent"
        >
          Free Eligibility Checker <ArrowRight aria-hidden className="size-4" />
        </button>
      </Feature>
    </div>
  );
}

function AboutPanel() {
  const nav = NAV[3];
  return (
    <div className="grid grid-cols-[280px_1fr_300px] gap-8 xl:grid-cols-[310px_1fr_330px] xl:gap-10">
      <Rail title={nav.title} intro={nav.intro} />
      <div className="grid grid-cols-2 gap-x-8 self-start">
        {nav.items.map((item, i) => (
          <IndexRow key={item.label} item={item} n={i + 1} />
        ))}
      </div>
      <div className="flex flex-col rounded-[22px] bg-[#1A3D4F] p-7 text-white">
        <Eyebrow>Talk to us</Eyebrow>
        <div className="font-heading text-xl font-bold leading-snug">Questions before you start?</div>
        <a href={PHONE.href} className="mt-5 flex items-center gap-3 text-[16px] font-semibold hover:text-accent">
          <Phone aria-hidden className="size-[18px] text-accent" /> {PHONE.display}
        </a>
        <a href={`mailto:${EMAIL}`} className="mt-3 flex items-center gap-3 text-[16px] font-semibold hover:text-accent">
          <Mail aria-hidden className="size-[18px] text-accent" /> {EMAIL}
        </a>
        <Link href="/contact-us/" className="mt-auto inline-flex items-center gap-1.5 pt-6 text-base font-semibold text-accent hover:underline">
          Contact page <ArrowUpRight aria-hidden className="size-4" />
        </Link>
      </div>
    </div>
  );
}

export function DesktopPanel({ menu, onNavigate }: { menu: MenuKey; onNavigate: () => void }) {
  switch (menu) {
    case "letters":
      return <LettersPanel onNavigate={onNavigate} />;
    case "states":
      return <StatesPanel />;
    case "learn":
      return <LearnPanel onNavigate={onNavigate} />;
    case "about":
      return <AboutPanel />;
  }
}
