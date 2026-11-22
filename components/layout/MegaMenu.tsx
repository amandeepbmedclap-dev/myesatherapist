"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  BadgeDollarSign,
  BookOpen,
  Building2,
  CircleHelp,
  CirclePlay,
  ClipboardCheck,
  Dog,
  FileText,
  GraduationCap,
  HeartPulse,
  House,
  Landmark,
  ListChecks,
  Lock,
  Mail,
  MapPin,
  PawPrint,
  PenLine,
  Phone,
  RefreshCw,
  Scale,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  Users,
  type LucideIcon,
} from "lucide-react";
import { CtaButton } from "@/components/common/CtaButton";
import { openEsaEligibilityChecker } from "@/components/common/evaluationCta";
import { STATE_INDEX } from "@/data/stateIndex";
import { STATE_SHAPES } from "@/data/stateShapes";

export type MenuKey = "services" | "states" | "resources" | "about";

export const MENU_TABS: { key: MenuKey; label: string; short: string }[] = [
  { key: "services", label: "ESA & PSD Letters", short: "Letters" },
  { key: "states", label: "States", short: "States" },
  { key: "resources", label: "Resources", short: "Resources" },
  { key: "about", label: "About", short: "About" },
];

type MenuLink = { label: string; href: string; icon: LucideIcon };

const SERVICES: MenuLink[] = [
  { label: "ESA Letter Online", href: "/esa-letter-online/", icon: PawPrint },
  { label: "ESA Letter for Housing", href: "/esa-letter-for-housing/", icon: House },
  { label: "ESA Letter Renewal", href: "/esa-letter-renewal/", icon: RefreshCw },
  { label: "Pricing", href: "/pricing/", icon: BadgeDollarSign },
];

const PSD: MenuLink[] = [
  { label: "PSD Letter", href: "/psd-letter/", icon: Dog },
  { label: "ESA + PSD Combo", href: "/pricing/", icon: Sparkles },
];

const TRUST: MenuLink[] = [
  { label: "Money-Back Guarantee", href: "/refund-policy/", icon: BadgeCheck },
  { label: "HIPAA Compliance", href: "/hipaa-compliance/", icon: Lock },
  { label: "Licensed Therapists", href: "/esa-doctors/", icon: Stethoscope },
];

const POPULAR_STATES = [
  { code: "CA", name: "California", slug: "california" },
  { code: "TX", name: "Texas", slug: "texas" },
  { code: "FL", name: "Florida", slug: "florida" },
  { code: "NY", name: "New York", slug: "new-york" },
  { code: "CO", name: "Colorado", slug: "colorado" },
  { code: "IL", name: "Illinois", slug: "illinois" },
  { code: "WA", name: "Washington", slug: "washington" },
  { code: "VA", name: "Virginia", slug: "virginia" },
];

const LAWS: MenuLink[] = [
  { label: "ESA Laws by State", href: "/esa-laws/", icon: Scale },
  { label: "Alabama ESA Laws", href: "/esa-laws/alabama/", icon: Landmark },
  { label: "HUD Guidance for ESAs", href: "/blog/esa-guide/hud-guidance-for-emotional-support-animals/", icon: House },
];

const LEARN: MenuLink[] = [
  { label: "ESA Guide", href: "/blog/esa-guide/", icon: BookOpen },
  { label: "ESA Training", href: "/blog/esa-training/", icon: GraduationCap },
  { label: "Qualifying Conditions", href: "/blog/qualifying-conditions/", icon: HeartPulse },
  { label: "All Articles", href: "/blog/", icon: PenLine },
  { label: "FAQs", href: "/frequently-asked-questions/", icon: CircleHelp },
];

const GUIDES = [
  { label: "ESA Letter Sample", href: "/blog/esa-guide/esa-letter-sample/" },
  { label: "How to Verify an ESA Letter", href: "/blog/esa-guide/how-to-verify-an-esa-letter/" },
  { label: "Who Can Write an ESA Letter", href: "/blog/esa-guide/who-can-write-an-esa-letter/" },
  { label: "Can Landlords Deny ESAs?", href: "/blog/esa-guide/can-landlords-deny-emotional-support-animals/" },
  { label: "Is ESA Registration Legit?", href: "/blog/esa-guide/is-esa-registration-legit/" },
];

const COMPANY: MenuLink[] = [
  { label: "About Us", href: "/about-us/", icon: Building2 },
  { label: "Our Therapists", href: "/esa-doctors/", icon: Stethoscope },
  { label: "Contributors", href: "/contributors/", icon: Users },
  { label: "Editorial Policy", href: "/editorial-policy/", icon: FileText },
];

const PROOF: MenuLink[] = [
  { label: "Client Reviews", href: "/reviews/", icon: Star },
  { label: "Video Testimonials", href: "/video-testimonials/", icon: CirclePlay },
];

/* ───────────── building blocks ───────────── */

type Tone = "cream" | "teal" | "dark" | "white";

const TONE: Record<Tone, string> = {
  cream: "bg-cream-100",
  teal: "bg-primary text-white",
  dark: "bg-[#1A3D4F] text-white",
  white: "bg-white ring-1 ring-line-200",
};

function Card({ tone, className = "", label, children }: { tone: Tone; className?: string; label: string; children: ReactNode }) {
  return (
    <section
      aria-label={label}
      className={`group/card relative overflow-hidden rounded-[20px] p-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-20px_rgba(26,61,79,0.45)] xl:p-6 ${TONE[tone]} ${className}`}
    >
      {children}
    </section>
  );
}

function CardHead({ title, blurb, icon: Icon, dark }: { title: string; blurb?: string; icon: LucideIcon; dark?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <span
        aria-hidden
        className={`grid size-11 shrink-0 place-items-center rounded-xl transition-transform duration-300 group-hover/card:-rotate-6 ${
          dark ? "bg-white/10 text-accent ring-1 ring-white/15" : "bg-white text-[#1D6E72] ring-1 ring-line-200"
        }`}
      >
        <Icon className="size-[22px]" strokeWidth={1.9} />
      </span>
      <div className="min-w-0">
        <div className={`font-heading text-[21px] font-bold leading-tight ${dark ? "text-white" : "text-primary"}`}>{title}</div>
        {blurb && <div className={`mt-1 max-w-[34ch] text-[14px] leading-snug ${dark ? "text-white/75" : "text-body-text"}`}>{blurb}</div>}
      </div>
    </div>
  );
}

function Row({ link, dark }: { link: MenuLink; dark?: boolean }) {
  const Icon = link.icon;
  return (
    <li>
      <Link
        href={link.href}
        className={`group/l -mx-2 flex min-h-[44px] items-center gap-3 rounded-xl px-2 py-1.5 text-[15px] font-semibold transition-colors ${
          dark ? "text-white hover:bg-white/10" : "text-[#1A3D4F] hover:bg-white/80"
        }`}
      >
        <span
          aria-hidden
          className={`grid size-8 shrink-0 place-items-center rounded-lg transition-colors duration-200 ${
            dark
              ? "bg-white/10 text-accent group-hover/l:bg-accent group-hover/l:text-[#1A3D4F]"
              : "bg-white text-[#1D6E72] ring-1 ring-line-200 group-hover/l:bg-[#1D6E72] group-hover/l:text-white"
          }`}
        >
          <Icon className="size-4" />
        </span>
        <span className="flex-1">{link.label}</span>
        <ArrowRight
          aria-hidden
          className="size-4 shrink-0 -translate-x-1.5 opacity-0 transition-[transform,opacity] duration-200 group-hover/l:translate-x-0 group-hover/l:opacity-100"
        />
      </Link>
    </li>
  );
}

function MoreLink({ href, children, dark }: { href: string; children: ReactNode; dark?: boolean }) {
  return (
    <Link
      href={href}
      className={`group/a mt-3 inline-flex min-h-[44px] items-center gap-1 text-[14px] font-semibold underline-offset-4 hover:underline ${
        dark ? "text-accent" : "text-[#1D6E72]"
      }`}
    >
      {children}
      <ArrowRight aria-hidden className="size-4 transition-transform group-hover/a:translate-x-0.5" />
    </Link>
  );
}

/** Small approved-letter illustration: letterhead, text lines, signature and a gold stamp. */
function MiniLetter() {
  return (
    <div aria-hidden className="pointer-events-none relative mx-auto my-6 hidden w-[230px] lg:block">
      <div className="absolute inset-0 translate-x-3 translate-y-2 rotate-[4deg] rounded-xl bg-white/60 ring-1 ring-line-200" />
      <div className="relative -rotate-[3deg] rounded-xl bg-white p-4 shadow-[0_14px_30px_-18px_rgba(26,61,79,0.5)] ring-1 ring-line-200 transition-transform duration-500 group-hover/card:-translate-y-1.5 group-hover/card:rotate-0">
        <div className="flex items-center justify-between border-b border-line-200 pb-2">
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative static SVG */}
          <img src="/common/myesa-logo.svg" alt="" width={58} height={24} className="h-6 w-auto" />
          <span className="text-[10px] font-bold tracking-wide text-body-text">ESA LETTER</span>
        </div>
        <div className="mt-3 space-y-1.5">
          {["w-full", "w-11/12", "w-full", "w-3/4", "w-5/6"].map((w, i) => (
            <span key={i} className={`block h-1.5 rounded-full bg-primary/10 ${w}`} />
          ))}
        </div>
        <div className="mt-4 flex items-end justify-between">
          <svg viewBox="0 0 90 28" className="h-6 w-20 text-primary">
            <path
              d="M3 20c6-10 10-14 13-11s-4 14 1 12 7-14 11-12-2 12 3 11 6-8 10-8 2 7 6 6 8-6 13-7 8 1 12-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
          <span className="grid size-14 -rotate-12 place-items-center rounded-full border-2 border-dashed border-gold-600 text-center text-[8px] font-extrabold leading-tight text-gold-600">
            LICENSED
            <br />
            THERAPIST
          </span>
        </div>
      </div>
    </div>
  );
}

/** Round gold seal for the money-back guarantee. */
function GuaranteeSeal() {
  return (
    <Link
      href="/refund-policy/"
      aria-label="100% money-back guarantee, read the refund policy"
      className="grid size-[96px] shrink-0 place-items-center rounded-full bg-accent text-center text-[#1A3D4F] shadow-[0_0_0_6px_rgba(232,185,44,0.18)] transition-transform duration-500 hover:rotate-[14deg]"
    >
      <span className="leading-none">
        <span className="block font-heading text-[26px] font-bold">100%</span>
        <span className="mt-1 block text-[9px] font-extrabold tracking-wide">
          MONEY-BACK
          <br />
          GUARANTEE
        </span>
      </span>
    </Link>
  );
}

function StateShape({ code, className = "" }: { code: string; className?: string }) {
  const d = STATE_SHAPES[code];
  if (!d) return <MapPin aria-hidden className={className} />;
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className}>
      <path d={d} fill="currentColor" />
    </svg>
  );
}

function StatePicker() {
  const router = useRouter();
  return (
    <label className="relative mt-2.5 block">
      <span className="sr-only">Choose your state</span>
      <MapPin aria-hidden className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gold-600" />
      <select
        defaultValue=""
        onChange={(e) => e.target.value && router.push(e.target.value)}
        className="h-11 w-full cursor-pointer appearance-none rounded-xl border border-line-200 bg-white pl-9 pr-3 text-[14px] font-medium text-[#1A3D4F] transition-colors hover:border-primary/40"
      >
        <option value="" disabled>
          Choose any state or territory
        </option>
        {STATE_INDEX.map((s) => (
          <option key={s.slug} value={`/esa-letter-${s.slug}/`}>
            {s.name}
          </option>
        ))}
      </select>
    </label>
  );
}

/* ───────────── panels ───────────── */

function ServicesPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr]">
      <Card tone="cream" label="ESA letters" className="flex flex-col lg:row-span-2">
        <CardHead title="ESA Letters" blurb="Evaluations with licensed mental health professionals in your state." icon={PawPrint} />
        <ul className="mt-4 space-y-0.5">
          {SERVICES.map((l) => (
            <Row key={l.label} link={l} />
          ))}
        </ul>
        <MiniLetter />
        <CtaButton href="#pricing" forceStateModal className="mt-5 w-full !h-[50px] !text-[15px] lg:mt-auto" onClick={onNavigate}>
          Start Your ESA Evaluation
        </CtaButton>
      </Card>

      <Card tone="teal" label="Psychiatric service dog letters">
        <CardHead title="PSD Letters" blurb="For handlers whose dog is trained to perform tasks." icon={Dog} dark />
        <ul className="mt-3 space-y-0.5">
          {PSD.map((l) => (
            <Row key={l.label} link={l} dark />
          ))}
        </ul>
      </Card>

      <Card tone="dark" label="Why clients choose us">
        <CardHead title="Peace of Mind" icon={ShieldCheck} dark />
        <div className="mt-3 flex items-end justify-between gap-3">
          <ul className="min-w-0 flex-1 space-y-0.5">
            {TRUST.map((l) => (
              <Row key={l.label} link={l} dark />
            ))}
          </ul>
          <GuaranteeSeal />
        </div>
      </Card>

      <Card tone="white" label="How it works" className="md:col-span-2">
        <CardHead title="How It Works" icon={ListChecks} />
        <ol className="mt-4 grid gap-3 sm:grid-cols-3">
          {[
            ["1", "Complete a short assessment", "Answer a few questions about how you are feeling day to day."],
            ["2", "Meet a licensed professional", "A therapist licensed in your state reviews your needs with you."],
            ["3", "Receive your letter if eligible", "Approved clients get their documentation in the patient portal."],
          ].map(([n, t, d]) => (
            <li key={n} className="flex gap-3 rounded-xl bg-background p-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent font-heading text-[15px] font-bold text-[#1A3D4F]">{n}</span>
              <span>
                <span className="block text-[14px] font-bold text-[#1A3D4F]">{t}</span>
                <span className="mt-0.5 block text-[13px] leading-snug text-body-text">{d}</span>
              </span>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}

function StatesPanel() {
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr]">
      <Card tone="cream" label="ESA letters by state" className="md:col-span-2 lg:col-span-1 lg:row-span-2">
        <CardHead title="ESA Letters by State" blurb="State rules differ. Start with the page for where you live." icon={MapPin} />
        <ul className="mt-4 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
          {POPULAR_STATES.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/esa-letter-${s.slug}/`}
                className="group/s flex h-11 items-center gap-2 rounded-xl bg-white px-2.5 text-[14px] font-semibold text-[#1A3D4F] ring-1 ring-line-200 transition-colors hover:bg-primary hover:text-white hover:ring-primary"
              >
                <StateShape code={s.code} className="size-5 shrink-0 text-[#1D6E72] transition-colors group-hover/s:text-accent" />
                <span className="truncate">{s.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <StatePicker />
        <MoreLink href="/state/">See all 50 states</MoreLink>
      </Card>

      <Card tone="teal" label="ESA laws">
        <CardHead title="ESA Laws" blurb="What housing providers can and cannot ask for." icon={Scale} dark />
        <ul className="mt-3 space-y-0.5">
          {LAWS.map((l) => (
            <Row key={l.label} link={l} dark />
          ))}
        </ul>
      </Card>

      <Card tone="dark" label="Territories and DC">
        <CardHead title="Also Serving" icon={Landmark} dark />
        <ul className="mt-3 flex flex-wrap gap-2">
          {[
            ["Washington, DC", "washington-dc"],
            ["Puerto Rico", "puerto-rico"],
            ["U.S. Virgin Islands", "virgin-islands"],
          ].map(([name, slug]) => (
            <li key={slug}>
              <Link
                href={`/esa-letter-${slug}/`}
                className="inline-flex min-h-[40px] items-center rounded-full bg-white/10 px-3.5 text-[14px] font-semibold text-white ring-1 ring-white/15 transition-colors hover:bg-accent hover:text-[#1A3D4F]"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function ResourcesPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-[1fr_1.15fr_1fr]">
      <Card tone="white" label="Learn">
        <CardHead title="Learn" icon={BookOpen} />
        <ul className="mt-3 space-y-0.5">
          {LEARN.map((l) => (
            <Row key={l.label} link={l} />
          ))}
        </ul>
      </Card>

      <Card tone="cream" label="Popular guides">
        <CardHead title="Popular Guides" blurb="Answers to the questions clients ask us most." icon={FileText} />
        <ul className="mt-3 divide-y divide-line-200">
          {GUIDES.map((g) => (
            <li key={g.href}>
              <Link
                href={g.href}
                className="group/g flex min-h-[44px] items-center justify-between gap-3 py-2 text-[15px] font-semibold text-[#1A3D4F] transition-colors hover:text-[#1D6E72]"
              >
                {g.label}
                <ArrowRight aria-hidden className="size-4 shrink-0 text-gold-600 transition-transform group-hover/g:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </Card>

      <Card tone="teal" label="Eligibility checker" className="flex flex-col md:col-span-2 lg:col-span-1">
        <CardHead title="Not Sure If You Qualify?" blurb="Take our free eligibility checker. It takes about a minute and there is no charge." icon={ClipboardCheck} dark />
        <button
          type="button"
          onClick={() => {
            onNavigate();
            openEsaEligibilityChecker();
          }}
          className="mt-5 inline-flex h-[50px] w-full items-center justify-center gap-2 rounded-full bg-accent px-5 text-[15px] font-bold text-[#1A3D4F] transition-colors hover:bg-gold-600 lg:mt-auto"
        >
          Free ESA Eligibility Checker
          <ArrowRight aria-hidden className="size-4" />
        </button>
        <MoreLink href="/blog/qualifying-conditions/conditions-that-may-qualify-for-an-esa/" dark>
          Conditions that may qualify
        </MoreLink>
      </Card>
    </div>
  );
}

function AboutPanel() {
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      <Card tone="cream" label="Company">
        <CardHead title="Who We Are" blurb="A telehealth platform connecting clients with licensed professionals." icon={Building2} />
        <ul className="mt-3 space-y-0.5">
          {COMPANY.map((l) => (
            <Row key={l.label} link={l} />
          ))}
        </ul>
      </Card>

      <Card tone="white" label="Client stories">
        <CardHead title="Client Stories" blurb="Hear from people who went through the process." icon={Star} />
        <ul className="mt-3 space-y-0.5">
          {PROOF.map((l) => (
            <Row key={l.label} link={l} />
          ))}
        </ul>
      </Card>

      <Card tone="dark" label="Contact" className="md:col-span-2 lg:col-span-1">
        <CardHead title="Talk to Us" icon={Phone} dark />
        <ul className="mt-3 space-y-0.5">
          <li>
            <a href="tel:+18884124041" className="group/l -mx-2 flex min-h-[44px] items-center gap-3 rounded-xl px-2 py-1.5 text-[15px] font-semibold text-white hover:bg-white/10">
              <span aria-hidden className="grid size-8 place-items-center rounded-lg bg-white/10 text-accent group-hover/l:bg-accent group-hover/l:text-[#1A3D4F]">
                <Phone className="size-4" />
              </span>
              +1 (888) 412-4041
            </a>
          </li>
          <li>
            <a href="mailto:info@myesatherapist.com" className="group/l -mx-2 flex min-h-[44px] items-center gap-3 rounded-xl px-2 py-1.5 text-[15px] font-semibold text-white hover:bg-white/10">
              <span aria-hidden className="grid size-8 place-items-center rounded-lg bg-white/10 text-accent group-hover/l:bg-accent group-hover/l:text-[#1A3D4F]">
                <Mail className="size-4" />
              </span>
              info@myesatherapist.com
            </a>
          </li>
        </ul>
        <MoreLink href="/contact-us/" dark>
          Contact us
        </MoreLink>
      </Card>
    </div>
  );
}

export function MenuPanel({ menu, onNavigate }: { menu: MenuKey; onNavigate: () => void }) {
  switch (menu) {
    case "services":
      return <ServicesPanel onNavigate={onNavigate} />;
    case "states":
      return <StatesPanel />;
    case "resources":
      return <ResourcesPanel onNavigate={onNavigate} />;
    case "about":
      return <AboutPanel />;
  }
}
