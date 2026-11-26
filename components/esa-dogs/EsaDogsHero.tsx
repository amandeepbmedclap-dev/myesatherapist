"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { STATE_INDEX, STATE_INDEX_BY_SLUG } from "@/data/stateIndex";
import { STATE_DROPDOWN_ABBR, STATE_DROPDOWN_ITEM, STATE_DROPDOWN_PANEL } from "@/components/common/stateDropdownClasses";
import { CtaButton } from "@/components/common/CtaButton";
import { promptSelectState } from "@/components/common/promptSelectState";

const POINTS = [
  "Evaluation by a professional licensed in your state",
  "Letter written for housing use, ready to hand to your landlord",
  "Full refund if you don't qualify",
];

export function EsaDogsHero() {
  const [selectedState, setSelectedState] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    if (isDropdownOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const stateLabel = selectedState
    ? STATE_INDEX_BY_SLUG[selectedState]?.name || "Select your State"
    : "Select your State";

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
        <Image
          src="/esa-dogs/hero.webp"
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[72%_center]"
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col px-5 py-12 sm:px-8 lg:min-h-[664px] lg:justify-center lg:py-16 lg:pl-[80px] lg:pr-20">
        <div className="flex w-full max-w-[560px] flex-col items-center text-center lg:items-start lg:text-left">
          <h1 className="heading-h1 text-primary">
            Get an ESA Letter for Your Dog — Without the Hassle
          </h1>
          <p className="body-large mt-5 max-w-[486px] text-body-text">
            Your dog already helps you cope. Speak with a licensed mental health professional online and, if you qualify, receive your ESA letter the same day.
          </p>
          <ul className="body mt-5 max-w-[520px] list-disc space-y-1 pl-5 text-left text-body-text">
            {POINTS.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>

          <div className="relative z-50 mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen((open) => !open)}
                aria-haspopup="listbox"
                aria-expanded={isDropdownOpen}
                aria-label={selectedState ? `Selected state ${stateLabel}` : "Select your State"}
                className="flex h-[52px] w-[259px] items-center gap-3 rounded-full border border-primary bg-background px-6 shadow-[0px_1px_2px_rgba(0,0,0,0.15)]"
              >
                <Image src="/esa-icons/icon-37.svg" alt="" width={24} height={24} unoptimized />
                <span className="flex-1 truncate text-left font-sans text-primary">{stateLabel}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 text-primary transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {isDropdownOpen && (
                <div className={STATE_DROPDOWN_PANEL} style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                  <div className="py-1">
                    {STATE_INDEX.map((state) => (
                      <button
                        key={state.slug}
                        type="button"
                        onClick={() => {
                          setSelectedState(state.slug);
                          setIsDropdownOpen(false);
                        }}
                        className={STATE_DROPDOWN_ITEM}
                      >
                        <span>{state.name}</span>
                        <span className={STATE_DROPDOWN_ABBR}>{state.abbreviation}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <CtaButton
              href={selectedState ? `/esa-letter-${selectedState}/` : undefined}
              onClick={selectedState ? undefined : promptSelectState}
              stateModal={false}
              variant="accent"
              className="w-[174px]"
            >
              Get Started
            </CtaButton>
          </div>
        </div>

        <div className="relative mt-8 h-[280px] overflow-hidden rounded-[24px] sm:h-[420px] lg:hidden">
          <Image
            src="/esa-dogs/hero.webp"
            alt="Woman sitting with her golden retriever"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-[72%_center]"
          />
        </div>
      </div>
    </section>
  );
}
