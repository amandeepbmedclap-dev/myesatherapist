import { ReviewBadges } from "@/components/common/ReviewBadges";
import { HeroStatPills } from "@/components/common/HeroStatPills";
import { CtaButton } from "@/components/common/CtaButton";
import { ResponsiveHero, standardHeroBackgrounds } from "@/components/common/ResponsiveHero";

const HEADING_LINE_1 = "Renew Your ESA";
const HEADING_LINE_2 = "Letter Online";
const DESCRIPTION =
  "Connect with a state-licensed mental health professional to request an ESA letter renewal that reflects your current emotional and mental health–related needs.";

const PILLS = [
  { value: "6,500+", label: "Clients Supported" },
  { value: "7+", label: "Years Serving" },
  { value: "100%", label: "Money-Back Guarantee" },
];

export function EsaRenewalHero() {
  return (
    <ResponsiveHero
      className="z-30"
      centered
      desktopHeight={780}
      tabletMinHeight="860px"
      backgrounds={standardHeroBackgrounds(
        "/hero-image-for-mobile-all.webp",
        "/esa-renewal/esa-renwal-herosection-tablet.webp",
        "/esa-renewal/esa-renewal-herosection.webp",
        { mobile: "object-top", tablet: "object-bottom", desktop: "object-right" },
      )}
    >
      <HeroStatPills stats={PILLS} className="hidden sm:grid" />
      <h1 className="heading-h1 text-primary mt-5 max-w-[320px] sm:max-w-[560px]">
        {HEADING_LINE_1}
        <br />
        {HEADING_LINE_2}
      </h1>
      <p className="body-large text-body-text mx-auto mt-3 max-w-[320px] sm:mx-0 sm:max-w-[560px]">{DESCRIPTION}</p>
      <CtaButton href="#pricing" variant="accent" className="mt-5 w-auto min-w-[240px] sm:min-w-[280px]">
        Start Your Renewal Online
      </CtaButton>
      <div className="mt-6 flex flex-col items-center gap-3 lg:items-start">
        <HeroStatPills stats={PILLS} className="sm:hidden" />
        <ReviewBadges />
      </div>
    </ResponsiveHero>
  );
}
