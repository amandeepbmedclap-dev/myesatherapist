

import React from "react";
import Image from "next/image";

interface MediaLogo {
  name: string;
  src: string;
  url: string;
  imgClassName?: string;
}

const mediaLogos: MediaLogo[] = [
  {
    name: "American Press",
    src: "/as-seen-on-images/american-press-logo.webp",
    url: "https://smb.americanpress.com/article/Why-My-ESA-Therapist-Prioritizes-Legitimate-ESA-Evaluations-and-Refuses-Instant-Approvals/6a50e6a116e7610b3c53dfdd",
  },
  {
    name: "America Real Estate Online",
    src: "/as-seen-on-images/americarealestateonline-logo.webp",
    url: "https://www.americarealestateonline.com/article/905468413-my-esa-therapist-simplifies-the-process-to-get-an-online-esa-letter-in-2026",
  },
  {
    name: "AZ Big Media",
    src: "/as-seen-on-images/azbigmedia-logo.webp",
    url: "https://azbigmedia.com/business/law/when-your-arizona-esa-letter-expires-rights-and-renewal-explained/",
  },
  {
    name: "Washington City Paper",
    src: "/as-seen-on-images/citypaper-logo.webp",
    url: "https://pr.washingtoncitypaper.com/article/Why-My-ESA-Therapist-Prioritizes-Legitimate-ESA-Evaluations-and-Refuses-Instant-Approvals/6a50e6a116e7610b3c53dfdd",
  },
  {
    name: "Delaware Online",
    src: "/as-seen-on-images/delawareonline-logo.svg",
    url: "https://www.delawareonline.com/press-release/story/127440/my-esa-therapist-simplifies-the-process-to-get-an-online-esa-letter-in-2026/",
    imgClassName: "!max-w-none !h-[24px] sm:!h-[28px] lg:!h-[30px] xl:!h-[32px] !w-auto",
  },
  {
    name: "The Columbus Dispatch",
    src: "/as-seen-on-images/dispatch-logo.svg",
    url: "https://www.dispatch.com/press-release/story/173229/my-esa-therapist-simplifies-the-process-to-get-an-online-esa-letter-in-2026/",
    imgClassName: "!max-w-none !h-[26px] sm:!h-[28px] lg:!h-[30px] xl:!h-[32px] !w-auto",
  },
  {
    name: "dvm360",
    src: "/as-seen-on-images/dvm-360-logo.webp",
    url: "https://www.dvm360.com/view/can-veterinarians-write-an-esa-letter-",
  },
  {
    name: "FinancialContent",
    src: "/as-seen-on-images/financialcontent-logo.webp",
    url: "https://www.financialcontent.com/article/accwirecq-2026-3-27-my-esa-therapist-highlights-growing-demand-for-ethical-esa-evaluations-among-gen-z",
  },
  {
    name: "FingerLakes1.com",
    src: "/as-seen-on-images/fingerlakes1-logo.webp",
    url: "https://www.fingerlakes1.com/2026/04/17/my-esa-therapist-explains-how-to-get-a-legit-esa-letter-in-new-york/",
  },
  {
    name: "Legal Reader",
    src: "/as-seen-on-images/legal-reader-logo.webp",
    url: "https://www.legalreader.com/top-5-trusted-online-esa-letter-providers-in-2026/",
  },
  {
    name: "lohud",
    src: "/as-seen-on-images/lohud-logo.svg",
    url: "https://www.lohud.com/press-release/story/162150/my-esa-therapist-simplifies-the-process-to-get-an-online-esa-letter-in-2026/",
    imgClassName: "!max-w-none !h-[28px] sm:!h-[32px] lg:!h-[34px] xl:!h-[36px] !w-auto",
  },
  {
    name: "Muddy River News",
    src: "/as-seen-on-images/muddyrivernews-logo.webp",
    url: "https://muddyrivernews.com/business/sponsored-content/my-esa-therapist-data-shows-rising-demand-for-online-esa-letters-among-illinois-renters/20260415085053/",
  },
  {
    name: "The National Law Review",
    src: "/as-seen-on-images/national-law-review-logo.webp",
    url: "https://natlawreview.com/press-releases/my-esa-therapist-simplifies-process-get-online-esa-letter-2026",
    imgClassName: "!max-w-none !h-[24px] sm:!h-[26px] lg:!h-[28px] xl:!h-[30px] !w-auto",
  },
  {
    name: "PR Newswire",
    src: "/as-seen-on-images/pr-newswire-logo.webp",
    url: "https://www.prnewswire.com/news-releases/why-my-esa-therapist-prioritizes-legitimate-ESA-Evaluations-and-Refuses-Instant-Approvals-302821988.html",
  },
  {
    name: "The Register-Guard",
    src: "/as-seen-on-images/registerguard-logo.svg",
    url: "https://www.registerguard.com/press-release/story/54408/my-esa-therapist-simplifies-the-process-to-get-an-online-esa-letter-in-2026/",
    imgClassName: "!max-w-none !h-[26px] sm:!h-[28px] lg:!h-[30px] xl:!h-[32px] !w-auto",
  },
  {
    name: "RentDeals",
    src: "/as-seen-on-images/rentdeals-logo.webp",
    url: "https://www.rentdeals.com/blog/the-pet-rent-trap-a-housing-cost-breakdown-with-insights-from-my-esa-therapist/",
  },
  {
    name: "The Valdosta Daily Times",
    src: "/as-seen-on-images/the-valdosta-daily-times-logo.webp",
    url: "https://pr.valdostadailytimes.com/article/Why-My-ESA-Therapist-Prioritizes-Legitimate-ESA-Evaluations-and-Refuses-Instant-Approvals/6a50e6a116e7610b3c53dfdd",
  },
  {
    name: "The State Journal",
    src: "/as-seen-on-images/thestatejournal-image.webp",
    url: "https://smb.state-journal.com/article/Why-My-ESA-Therapist-Prioritizes-Legitimate-ESA-Evaluations-and-Refuses-Instant-Approvals/6a50e6a116e7610b3c53dfdd",
  },
  {
    name: "Yahoo! Finance",
    src: "/as-seen-on-images/yahoo-finance-logo.webp",
    url: "https://finance.yahoo.com/sectors/healthcare/articles/esa-therapist-highlights-growing-demand-165000890.html",
  },
];

interface AsSeenOnSectionProps {
  bgColor?: string;
}

export function AsSeenOnSection({ bgColor = "bg-white/40" }: AsSeenOnSectionProps) {
  const logoClass = (logo: (typeof mediaLogos)[number]) =>
    logo.imgClassName || "h-[26px] w-auto max-w-[150px] object-contain sm:h-[30px] lg:h-[32px] lg:max-w-[170px]";

  return (
    <section className={`relative z-10 overflow-hidden py-10 sm:py-12 ${bgColor}`}>
      <div className="mb-7 flex items-center justify-center gap-4 px-4 sm:mb-8">
        <span aria-hidden className="h-px w-10 bg-accent sm:w-16" />
        <div role="heading" aria-level={2} className="font-sans text-[13px] font-extrabold uppercase tracking-[0.2em] text-primary">Press &amp; Mentions</div>
        <span aria-hidden className="h-px w-10 bg-accent sm:w-16" />
      </div>

      <div className="group relative w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <div className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]" style={{ animationDuration: "60s" }}>
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1 || undefined} className="flex shrink-0 items-center gap-12 pr-12 sm:gap-16 sm:pr-16">
              {mediaLogos.map((logo) =>
                copy === 0 ? (
                  <a
                    key={logo.name}
                    href={logo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Read on ${logo.name}`}
                    className="flex h-12 shrink-0 items-center opacity-55 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                  >
                    <Image quality={90} unoptimized loading="lazy" src={logo.src} alt={logo.name} width={260} height={65} sizes="260px" className={`shrink-0 ${logoClass(logo)}`} />
                  </a>
                ) : (
                  <span key={logo.name} className="flex h-12 shrink-0 items-center opacity-55 grayscale">
                    <Image quality={90} unoptimized loading="lazy" src={logo.src} alt="" width={260} height={65} sizes="260px" className={`shrink-0 ${logoClass(logo)}`} />
                  </span>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
