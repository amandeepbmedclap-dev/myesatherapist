"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Video, Brain } from "lucide-react";
import { CtaButton } from "@/components/common/CtaButton";

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="4.98" cy="4.98" r="2.4" />
      <rect x="2.8" y="9.5" width="4.4" height="12.5" rx="0.5" />
      <path d="M10.5 9.5h4.2v1.8c.6-1.1 2-2.1 4.1-2.1 4.4 0 5.2 2.9 5.2 6.6v6.2h-4.4v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.6h-4.4V9.5z" />
    </svg>
  );
}

export interface Therapist {
  id?: number | string;
  name: string;
  title: string;
  bio: string;
  licensedIn: string;
  method?: string;
  focus: string;
  avatar?: string;
  linkedin?: string;
}

export function getTherapistAvatar(t: Therapist): string {
  if (t.avatar && t.avatar !== "/common/therapist-avatar.webp") return t.avatar;
  const lower = t.name.toLowerCase();
  if (lower.includes("robert") || lower.includes("staaf")) {
    return "/doctors/robert-staff-dr.webp";
  }
  if (lower.includes("leslie") || lower.includes("gamble")) {
    return "/doctors/leslie-kgamble-dr.webp";
  }
  if (lower.includes("gaurav") || lower.includes("patel")) {
    return "/doctors/gaurav-patel-dr.webp";
  }
  return t.avatar || "/common/therapist-avatar.webp";
}

export function getTherapistLinkedin(t: Therapist): string {
  if (t.linkedin) return t.linkedin;
  const lower = t.name.toLowerCase();
  if (lower.includes("robert") || lower.includes("staaf")) {
    return "https://www.linkedin.com/in/robert-staaf-b57b53333/";
  }
  if (lower.includes("leslie") || lower.includes("gamble")) {
    return "https://www.linkedin.com/in/leslie-gamble-727571366";
  }
  if (lower.includes("gaurav") || lower.includes("patel")) {
    return "https://www.linkedin.com/in/gaurav-patel-m-d-b5565916";
  }
  return "https://www.linkedin.com/company/myesatherapist/";
}

export function getTherapistProfileHref(t: Therapist): string {
  const lower = t.name.toLowerCase();
  if (lower.includes("robert") || lower.includes("staaf")) return "/esa-doctors/dr-robert-staaf/";
  if (lower.includes("leslie") || lower.includes("gamble")) return "/esa-doctors/dr-leslie-k-gamble/";
  if (lower.includes("gaurav") || lower.includes("patel")) return "/esa-doctors/dr-gaurav-patel/";
  return "/esa-doctors/";
}

const defaultTherapists: Therapist[] = [
  {
    id: 1,
    name: "Robert Staaf",
    title: "Licensed Clinical Social Worker",
    bio: "LCSW with extensive psychotherapy experience. Pet owner and advocate for animal-assisted mental health treatment.",
    licensedIn: "30+ States",
    method: "Video or Phone",
    focus: "Anxiety & Stress",
    avatar: "/doctors/robert-staff-dr.webp",
    linkedin: "https://www.linkedin.com/in/robert-staaf-b57b53333/",
  },
  {
    id: 2,
    name: "Leslie K. Gamble",
    title: "Licensed Independent Clinical Social Worker",
    bio: "Licensed therapist with 13 years of healthcare experience serving individuals, couples, and families with flexible, goal-focused care.",
    licensedIn: "15+ States",
    method: "Video or Phone",
    focus: "Depression & PTSD",
    avatar: "/doctors/leslie-kgamble-dr.webp",
    linkedin: "https://www.linkedin.com/in/leslie-gamble-727571366",
  },
  {
    id: 3,
    name: "Gaurav Patel, MD",
    title: "Family Medicine Physician",
    bio: "Board-certified family medicine physician with experience providing evidence-based, patient-focused care across inpatient, urgent care, outpatient, and telemedicine settings.",
    licensedIn: "47 States",
    method: "Video or Phone",
    focus: "Chronic Conditions & Sleep Concerns",
    avatar: "/doctors/gaurav-patel-dr.webp",
    linkedin: "https://www.linkedin.com/in/gaurav-patel-m-d-b5565916",
  },
];

function SpecRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 py-2.5">
      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-cream-100 text-primary">{icon}</span>
      <div className="min-w-0">
        <div className="font-sans text-[12px] font-bold uppercase leading-4 tracking-[0.08em] text-[#8A6A12]">{label}</div>
        <div className="font-sans text-[15px] font-semibold leading-[22px] text-primary">{value}</div>
      </div>
    </div>
  );
}

function ClinicianCard({ t }: { t: Therapist }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[26px] bg-white shadow-[0_18px_40px_-28px_rgba(26,61,79,0.55)] ring-1 ring-line-200 transition-shadow duration-300 hover:shadow-[0_24px_50px_-26px_rgba(26,61,79,0.6)]">
      <div className="relative aspect-[5/4] overflow-hidden color-gradient">
        <span aria-hidden className="absolute left-1/2 top-[14%] size-[78%] -translate-x-1/2 rounded-full border border-accent/40" />
        <span aria-hidden className="absolute left-1/2 top-[22%] size-[62%] -translate-x-1/2 rounded-full bg-white/[0.06]" />
        <Image
          quality={90}
          src={getTherapistAvatar(t)}
          alt={t.name}
          fill
          sizes="(min-width: 1024px) 360px, 80vw"
          className="object-contain object-bottom pt-5 transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <a
          href={getTherapistLinkedin(t)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t.name} LinkedIn Profile`}
          className="group/li absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm transition-colors hover:bg-accent"
        >
          <LinkedinIcon className="size-4 text-[#FFFFFF] transition-colors group-hover/li:text-[#163545]" />
        </a>
      </div>

      <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
        <h3 className="font-heading text-[24px] font-bold leading-[1.2] text-primary">{t.name}</h3>
        <div className="mt-1 font-sans text-[15px] font-semibold leading-[22px] text-[#1D6E72]">{t.title}</div>
        <div className="mt-3 font-sans text-[15px] leading-[24px] text-body-text">{t.bio}</div>

        <div className="mt-4 divide-y divide-line-200 border-y border-line-200">
          <SpecRow icon={<MapPin aria-hidden className="size-4" />} label="Licensed In" value={t.licensedIn} />
          <SpecRow icon={<Video aria-hidden className="size-4" />} label="Evaluation Method" value={t.method || "Video or Phone"} />
          <SpecRow icon={<Brain aria-hidden className="size-4" />} label="Focus Areas" value={t.focus} />
        </div>

        <Link
          href={getTherapistProfileHref(t)}
          className="mt-auto inline-flex items-center gap-2 pt-5 font-sans text-[15px] font-bold text-primary underline-offset-4 hover:underline"
        >
          View Profile <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}

interface TherapistsSectionProps {
  title?: string;
  subtitle?: string;
  licensureNote?: string;
  refundText?: string | null;
  therapistsList?: Therapist[];
  bgColor?: string;
  className?: string;
}

export function TherapistsSection({
  title = "Our Licensed Clinicians",
  subtitle = "We connect individuals with licensed mental health professionals who are qualified to conduct evaluations and provide recommendations when clinically appropriate.",
  licensureNote = "A Note on Licensure Levels: Depending on their state of origin, a social worker or counselor may have a variety of titles, such as Licensed Clinical Social Worker (LCSW), Licensed Independent Clinical Social Worker (LICSW), etc. These are comparable licensure levels.",
  refundText = "100% Refund If No ESA Letter Is Issued",
  therapistsList,
  bgColor = "bg-white",
  className = "",
}: TherapistsSectionProps) {
  const therapists = therapistsList && therapistsList.length > 0 ? therapistsList : defaultTherapists;
  const [active, setActive] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const onScroll = () => {
      const card = el.querySelector<HTMLElement>("[data-card]");
      if (!card) return;
      const gap = parseFloat(getComputedStyle(el).columnGap) || 16;
      setActive(Math.min(therapists.length - 1, Math.round(el.scrollLeft / (card.offsetWidth + gap))));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [therapists.length]);

  const goTo = (i: number) => {
    const el = railRef.current;
    const card = el?.querySelectorAll<HTMLElement>("[data-card]")[i];
    if (el && card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  const noteMatch = licensureNote?.match(/^A Note on Licensure Levels:?/i)?.[0];
  const gridCols = therapists.length >= 3 ? "lg:grid-cols-3 lg:max-w-[1180px]" : "lg:grid-cols-2 lg:max-w-[800px]";

  return (
    <section className={`py-16 lg:py-20 xl:py-24 ${bgColor} overflow-hidden ${className}`}>
      <div className="mx-auto max-w-[1279px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-[852px] space-y-3 text-center lg:mb-12">
          <h2 className="heading-h2 capitalize">{title}</h2>
          <p className="body-large mx-auto max-w-[813px]">{subtitle}</p>
        </div>

        <div
          ref={railRef}
          className={`-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 pt-1 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-auto lg:grid lg:snap-none lg:gap-7 lg:overflow-visible lg:px-0 ${gridCols}`}
          style={{ scrollbarWidth: "none" }}
        >
          {therapists.map((t, idx) => (
            <div key={t.id ?? `${t.name}-${idx}`} data-card className="w-[84%] shrink-0 snap-start sm:w-[46%] lg:w-auto">
              <ClinicianCard t={t} />
            </div>
          ))}
        </div>

        {therapists.length > 1 && (
          <div className="mt-4 flex items-center justify-center gap-1 lg:hidden">
            {therapists.map((t, idx) => (
              <button
                key={t.name}
                type="button"
                onClick={() => goTo(idx)}
                aria-label={`Show ${t.name}`}
                className="flex size-7 cursor-pointer items-center justify-center"
              >
                <span className={`block h-2 rounded-full transition-all duration-300 ${idx === active ? "w-5 bg-primary" : "w-2 bg-[#CBD5E1]"}`} />
              </button>
            ))}
          </div>
        )}

        {licensureNote && (
          <div className="mx-auto mt-8 max-w-[900px] text-center font-sans text-[13px] leading-[21px] text-body-text lg:mt-10">
            {noteMatch ? (
              <>
                <strong className="font-bold text-primary">{noteMatch}</strong> {licensureNote.replace(/^A Note on Licensure Levels:?\s*/i, "")}
              </>
            ) : (
              licensureNote
            )}
          </div>
        )}

        <div className="flex flex-col items-center gap-2 pt-8 sm:pt-10">
          <CtaButton href="#how-it-works" variant="accent">
            Book Appointment
          </CtaButton>
          {refundText && <p className="body-small text-center">{refundText}</p>}
        </div>
      </div>
    </section>
  );
}
