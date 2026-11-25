"use client";

import { track } from "@/lib/track";
import React, { useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

const reviews = [
  {
    id: "vId0sRVPY0I",
    name: "Marianne C",
    quote:
      "“Looking for an ESA letter in Houston was stressful until I found My ESA Therapist. The process was fast, legitimate, and stress-free.”",
  },
  {
    id: "gxdipq0J2No",
    name: "Leighann",
    quote:
      "“The doctor was kind and patient during my consultation. The entire experience was smooth, legitimate, and completely stress-free.”",
  },
  {
    id: "Mjf33Y0NvVc",
    name: "April E",
    quote:
      "“Customer service was responsive from the start. The consultation was authentic, licensed, and completed without any hassle.”",
  },
];

export function YouTubePlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 68 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M66.52 7.74c-.78-2.93-3.09-5.24-6.02-6.02C55.22 0 34 0 34 0S12.78 0 7.5 1.72c-2.93.78-5.24 3.09-6.02 6.02C0 13.02 0 24 0 24s0 10.98 1.48 16.26c.78 2.93 3.09 5.24 6.02 6.02C12.78 48 34 48 34 48s21.22 0 26.5-1.72c2.93-.78 5.24-3.09 6.02-6.02C68 34.98 68 24 68 24s0-10.98-1.48-16.26z"
        fill="#FF0000"
      />
      <polygon points="45,24 27,14 27,34" fill="#FFFFFF" />
    </svg>
  );
}

interface TestimonialsSectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
}

const thumb = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

export function TestimonialsSection({
  title = "See What Our Clients Say About Their ESA Evaluation Experience",
  subtitle = "Here’s what our clients say about their experience.",
  buttonText = "See More Reviews",
  buttonHref = "/reviews",
}: TestimonialsSectionProps = {}) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const current = reviews[active];

  const choose = (idx: number) => {
    setActive(idx);
    setPlaying(false);
    // On small screens the player sits above the list, so bring it into view.
    if (window.innerWidth < 1024) stageRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section className="overflow-hidden bg-background py-16 lg:py-20 xl:py-24">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-[640px] text-center lg:mb-14">
          <h2 className="heading-h2">{title}</h2>
          <div className="body-large mt-3">{subtitle}</div>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-16">
          <div ref={stageRef} className="relative mx-auto w-full max-w-[420px]">
            <span aria-hidden className="absolute -left-4 -top-4 hidden size-28 rounded-[28px] bg-accent/30 sm:block" />
            <span aria-hidden className="absolute -bottom-4 -right-4 hidden size-40 rounded-[32px] color-gradient opacity-90 sm:block" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-[#0f2a35] shadow-[0_30px_60px_-30px_rgba(26,61,79,0.7)]">
              {playing ? (
                <iframe
                  key={current.id}
                  className="absolute inset-0 size-full"
                  src={`https://www.youtube.com/embed/${current.id}?autoplay=1&rel=0`}
                  title={`${current.name} video review`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <button type="button" onClick={() => { setPlaying(true); track("video_play", { video_title: current.name, video_id: current.id, location: "home_testimonials" }); }} className="group absolute inset-0 cursor-pointer" aria-label={`Play ${current.name}'s video review`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    key={current.id}
                    src={`https://img.youtube.com/vi/${current.id}/sddefault.jpg`}
                    onError={(e) => {
                      const img = e.currentTarget;
                      if (!img.src.endsWith("hqdefault.jpg")) img.src = thumb(current.id);
                    }}
                    alt={current.name}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 size-full scale-[1.35] object-cover object-center transition-transform duration-500 group-hover:scale-[1.4]"
                  />
                  <span aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,42,53,0)_45%,rgba(15,42,53,0.92)_100%)]" />
                  <span className="absolute left-1/2 top-1/2 flex size-[76px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-110">
                    <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-white/40 [animation-duration:2.2s]" />
                    <Play aria-hidden className="relative ml-1 size-7 fill-primary text-primary" />
                  </span>
                  <span className="absolute inset-x-0 bottom-0 p-6 text-left">
                    <span className="block font-heading text-[28px] font-bold leading-tight text-white">{current.name}</span>
                    <span className="mt-1 inline-flex items-center gap-1.5 font-sans text-base font-semibold uppercase tracking-[0.1em] text-accent">
                      <Play aria-hidden className="size-3 fill-accent" /> Video review
                    </span>
                  </span>
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {reviews.map((r, idx) => (
              <QuoteCard key={r.id} review={r} active={idx === active} onSelect={() => choose(idx)} />
            ))}
            <Link
              href={buttonHref}
              className="group mt-3 inline-flex items-center gap-2 self-center font-sans text-[16px] font-bold text-primary underline decoration-accent decoration-2 underline-offset-[6px] transition-colors hover:text-[#1D6E72] lg:self-start"
            >
              {buttonText}
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuoteCard({ review, active, onSelect }: { review: (typeof reviews)[number]; active: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`group flex w-full cursor-pointer items-start gap-4 rounded-[20px] p-4 text-left transition-all duration-300 sm:p-5 ${
        active ? "color-gradient shadow-[0_18px_36px_-22px_rgba(26,61,79,0.8)]" : "bg-white ring-1 ring-line-200 hover:-translate-y-0.5 hover:ring-accent/60"
      }`}
    >
      <span className={`relative size-14 shrink-0 overflow-hidden rounded-full ring-2 ${active ? "ring-accent" : "ring-white shadow-sm"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={thumb(review.id)} alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full scale-[2] object-cover object-center" />
        <span className="absolute inset-0 flex items-center justify-center bg-black/25">
          <Play aria-hidden className="ml-0.5 size-4 fill-white text-white" />
        </span>
      </span>
      <span className="min-w-0">
        <span className={`block font-sans text-base leading-[24px] sm:text-[16px] sm:leading-[26px] ${active ? "text-white" : "text-body-text"}`}>{review.quote}</span>
        <span className={`mt-2 block font-sans text-base font-bold ${active ? "text-accent" : "text-primary"}`}>{review.name}</span>
      </span>
    </button>
  );
}
