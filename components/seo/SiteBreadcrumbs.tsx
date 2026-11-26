"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { serializeLd } from "@/lib/site";
import { cn } from "@/lib/utils";

const CANONICAL_ORIGIN = "https://myesatherapist.com";

const LABELS: Record<string, string> = {
  "about-us": "About Us",
  "contact-us": "Contact Us",
  "esa-doctors": "Our Therapists",
  "esa-letter-online": "ESA Letter Online",
  "esa-letter-for-housing": "ESA Letter for Housing",
  "esa-letter-for-dogs": "ESA Letter for Dogs",
  "esa-letter-renewal": "ESA Letter Renewal",
  "psd-letter": "PSD Letter",
  pricing: "ESA Letter Cost",
  reviews: "Customer Reviews",
  "video-testimonials": "Video Testimonials",
  "frequently-asked-questions": "FAQs",
  contributors: "Contributors",
  blog: "Blog",
  "esa-guide": "ESA Guide",
  "esa-training": "ESA Training",
  "qualifying-conditions": "Qualifying Conditions",
  "esa-laws": "ESA Laws",
  state: "ESA Letter by State",
  "dr-robert-staaf": "Robert Staaf, LCSW",
  "dr-leslie-k-gamble": "Leslie K. Gamble, LICSW",
  "dr-gaurav-patel": "Gaurav Patel, MD",
  author: "Authors",
  "privacy-policy": "Privacy Policy",
  "terms-of-use": "Terms of Use",
  "refund-policy": "Refund Policy",
  "hipaa-compliance": "HIPAA Compliance",
  disclaimer: "Medical Disclaimer",
  "editorial-policy": "Editorial Policy",
  "accessibility-statement": "Accessibility Statement",
  "consent-for-telehealth": "Consent for Telehealth",
  "telehealth-consent": "Consent for Telehealth",
  "legal-reviewer": "Legal Reviewer",
  "max-phillips": "Max Phillips",
  "awais-arshad": "Awais Arshad",
};


// Shorter names for narrow screens, so the current page stays visible.
const SHORT: Record<string, string> = { "esa-doctors": "Therapists", state: "States" };

const ACRONYMS = new Set(["esa", "psd", "hud", "faq", "hipaa", "adhd", "ptsd"]);

function titleCase(segment: string) {
  return segment
    .split("-")
    .filter(Boolean)
    .map((word) => {
      const lower = word.toLowerCase();
      if (ACRONYMS.has(lower)) return lower.toUpperCase();
      if (lower === "faqs") return "FAQs";
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

const LETTER_PRODUCTS = ["esa-letter-online", "esa-letter-for-housing", "esa-letter-for-dogs", "esa-letter-renewal"];

function isStateLetter(segment: string) {
  return segment.startsWith("esa-letter-") && !LETTER_PRODUCTS.includes(segment);
}

function labelFor(segment: string) {
  if (isStateLetter(segment)) {
    return titleCase(segment.slice("esa-letter-".length));
  }
  return LABELS[segment] ?? titleCase(segment);
}

export function SiteBreadcrumbs({
  className,
  includeSchema = false,
}: {
  className?: string;
  includeSchema?: boolean;
}) {
  const pathname = usePathname() || "/";
  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);
  // On a blog post the article itself is dropped from the trail, so every
  // remaining crumb (Blog, category) stays a real link.
  const isBlogPost = segments[0] === "blog" && segments.length > 2;
  if (isBlogPost) {
    segments.pop();
  }
  const crumbs: { name: string; path: string; short?: string }[] = [{ name: "Home", path: "/" }];

  const isState = segments.length === 1 && isStateLetter(segments[0]);
  if (isState) {
    crumbs.push({ name: LABELS.state, short: "States", path: "/state/" });
    crumbs.push({ name: `ESA Letter ${labelFor(segments[0])}`, path: `/${segments[0]}/` });
  } else {
    segments.forEach((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join("/")}/`;
      crumbs.push({ name: labelFor(segment), path, short: SHORT[segment] });
    });
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${CANONICAL_ORIGIN}${crumb.path === "/" ? "/" : crumb.path}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className={cn("min-w-0", className)}>
      {includeSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeLd(schema) }} />
      )}
      <ol className="no-scrollbar flex min-w-0 items-center gap-x-2 overflow-x-auto whitespace-nowrap font-sans text-base leading-5 sm:text-base">
        {crumbs.map((crumb, index) => {
          const current = !isBlogPost && index === crumbs.length - 1;
          return (
            <li key={crumb.path} className="flex shrink-0 items-center gap-2">
              {index > 0 && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0 text-[#B9AE9C]">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              )}
              {current ? (
                <span aria-current="page" className="font-semibold text-primary">
                  {crumb.name}
                </span>
              ) : (
                <Link href={crumb.path} className="font-medium text-body-text underline-offset-4 transition-colors hover:text-primary hover:underline">
                  {crumb.short ? (
                    <>
                      <span className="sm:hidden">{crumb.short}</span>
                      <span className="hidden sm:inline">{crumb.name}</span>
                    </>
                  ) : (
                    crumb.name
                  )}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Site-wide breadcrumb bar, rendered once under the header on every page except home. */
export function BreadcrumbBar() {
  const pathname = usePathname() || "/";
  if (pathname === "/") return null;
  return (
    <div className="border-b border-line-200 bg-background">
      <div className="mx-auto flex max-w-[1440px] items-center px-4 py-3 sm:px-6 lg:px-8 xl:px-[80px]">
        <SiteBreadcrumbs />
      </div>
    </div>
  );
}
