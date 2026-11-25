/**
 * Visual overhaul pilot: new art-directed images per state page (non-hero).
 * Only states listed here get the new images; every other page keeps its current ones.
 */
export type PilotImage = { src: string; alt: string; position?: string };

export type StateImageSet = {
  whoQualifies?: PilotImage;
  benefits?: PilotImage;
  lawsFederal?: PilotImage;
  lawsProvider?: PilotImage;
  scamsNeed?: PilotImage;
  scamsCommon?: PilotImage;
  faq?: PilotImage;
};

const FLORIDA: StateImageSet = {
  whoQualifies: {
    src: "/images/florida/florida-renter-calm-at-home-with-dog.webp",
    alt: "Florida renter sitting quietly in her apartment with her senior dog resting against her",
    position: "60% 50%",
  },
  benefits: {
    src: "/images/florida/florida-tenant-move-in-day-with-esa-dog.webp",
    alt: "Tenant on move-in day in a Florida apartment, holding the new keys beside his emotional support dog",
    position: "55% 60%",
  },
  lawsFederal: {
    src: "/images/florida/florida-tenant-reviewing-lease-with-cat.webp",
    alt: "Florida tenant reading her lease at the kitchen table while her cat sits beside the papers",
  },
  lawsProvider: {
    src: "/images/florida/florida-property-manager-reviewing-esa-letter.webp",
    alt: "Florida property manager reviewing a tenant's ESA letter while he waits with his small dog",
  },
  scamsNeed: {
    src: "/images/florida/florida-telehealth-esa-evaluation-video-call.webp",
    alt: "Florida resident on a telehealth video call with a licensed clinician for her ESA evaluation, her golden retriever at her feet",
  },
  scamsCommon: {
    src: "/images/florida/hesitating-before-paying-online-esa-registry.webp",
    alt: "Man pausing with his credit card before paying an online ESA registry site",
    position: "50% 35%",
  },
  faq: {
    src: "/images/florida/reading-esa-faqs-on-phone-with-dog.webp",
    alt: "Woman reading answers about ESA letters on her phone while her Labrador sleeps beside her on the sofa",
    position: "40% 50%",
  },
};

const SETS: Record<string, StateImageSet> = { florida: FLORIDA };

export const stateImages = (slug: string): StateImageSet => SETS[slug] ?? {};
