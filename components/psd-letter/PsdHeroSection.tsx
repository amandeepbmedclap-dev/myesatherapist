import React from "react";
import { ReviewBadges } from "@/components/common/ReviewBadges";
import { HeroStatPills } from "@/components/common/HeroStatPills";
import { HeroCtaGroup } from "@/components/common/HeroCtaGroup";
import { ResponsiveHero, standardHeroBackgrounds } from "@/components/common/ResponsiveHero";

const STATS = [
  { value: "6,500+", label: "Clients Supported" },
  { value: "7+", label: "Years Serving" },
  { value: "100%", label: "Money-Back Guarantee" },
];

const REFUND_NOTE = "Not approved after your PSD evaluation? You get a full refund!";
const HERO_SUBTITLE =
  "Connect with state-licensed mental health professionals to discuss your needs and explore if a psychiatric service dog letter may be appropriate for you.";

export function PsdHeroSection() {
  return (
    <ResponsiveHero
      className="z-30"
      centered={false}
      desktopHeight={814}
      tabletMinHeight="780px"
      backgrounds={standardHeroBackgrounds(
        "/hero-image-for-mobile-all.webp",
        "/psd-letter/psd-hero-section-tablet.webp",
        "/psd-letter/psd-herosection-new.webp",
        { mobile: "object-top", tablet: "object-center", desktop: "object-right" },
      )}
    >
      <HeroStatPills stats={STATS} className="hidden sm:grid" />
      <h1 className="heading-h1 text-primary mt-6 max-w-[340px] capitalize sm:max-w-[760px]">
        Psychiatric Service Dog
        <br />
        Letter Assistance
      </h1>
      <p className="body-large mx-auto mt-4 max-w-[340px] sm:mx-0 sm:max-w-[520px]">{HERO_SUBTITLE}</p>
      <HeroCtaGroup
        containerClassName="mt-6 flex flex-col items-center gap-3 sm:flex-row"
        ctaClassName="w-[192px]"
        defaultHref="#pricing"
      />
      <p className="body-small mt-3">{REFUND_NOTE}</p>
      <div className="mt-6 flex flex-col items-center gap-3 lg:items-start">
        <HeroStatPills stats={STATS} className="sm:hidden" />
        <ReviewBadges />
      </div>
    </ResponsiveHero>
  );
}
