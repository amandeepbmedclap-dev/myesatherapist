import React from "react";
import { ReviewBadges } from "@/components/common/ReviewBadges";
import { HeroStatPills } from "@/components/common/HeroStatPills";
import { ResponsiveHero, standardHeroBackgrounds } from "@/components/common/ResponsiveHero";

const STATS = [
  { value: "6,500+", label: "Clients Supported" },
  { value: "7+", label: "Years Serving" },
  { value: "100%", label: "Money-Back Guarantee" },
];

export function PricingHero() {
  return (
    <ResponsiveHero
      className="z-30"
      centered={false}
      desktopHeight={802}
      tabletMinHeight="780px"
      backgrounds={standardHeroBackgrounds(
        "/hero-image-for-mobile-all.webp",
        "/pricing/pricing-section-hero-section-tablet.webp",
        "/pricing/pricing-section-hero-section.webp",
        { mobile: "object-bottom", tablet: "object-bottom", desktop: "object-center" },
      )}
    >
      <HeroStatPills stats={STATS} className="hidden sm:grid" />
      <h1 className="heading-h1 text-primary mt-6 max-w-[320px] sm:max-w-[553px]">
        Choose the Right Package For You
      </h1>
      <p className="body-large text-body-text mx-auto mt-3 max-w-[320px] sm:mx-0 sm:max-w-[553px]">
        No hidden fees. No upfront charges. Your card is authorized at booking but only charged after your evaluation is completed by a licensed mental health professional.
      </p>
      <div className="mt-6 flex w-full max-w-[360px] flex-col items-center gap-3 sm:max-w-none sm:items-start">
        <HeroStatPills stats={STATS} className="sm:hidden" />
        <ReviewBadges className="mx-auto max-w-none justify-center sm:mx-0 sm:justify-start" />
      </div>
    </ResponsiveHero>
  );
}
