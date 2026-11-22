import React from "react";
import Link from "next/link";

// Ties each supporting article (TOFU/MOFU) to the money page it supports (BOFU).
type NextLink = { href: string; label: string };

const ONLINE: NextLink = { href: "/esa-letter-online/", label: "Start with an online ESA letter evaluation" };
const HOUSING: NextLink = { href: "/esa-letter-for-housing/", label: "Get an ESA letter for housing" };
const STATES: NextLink = { href: "/state/", label: "Check the ESA rules in your state" };
const PSD: NextLink = { href: "/psd-letter/", label: "Explore a psychiatric service dog (PSD) letter" };
const LAWS: NextLink = { href: "/esa-laws/", label: "Read ESA laws by state" };
const PRICING: NextLink = { href: "/pricing/", label: "See what an ESA letter costs" };

const BY_SLUG: Record<string, NextLink[]> = {
  "can-landlords-deny-emotional-support-animals": [HOUSING, LAWS, STATES],
  "hud-guidance-for-emotional-support-animals": [HOUSING, LAWS, STATES],
  "how-to-verify-an-esa-letter": [HOUSING, ONLINE, STATES],
  "is-esa-registration-legit": [ONLINE, HOUSING, PRICING],
  "esa-letter-sample": [ONLINE, HOUSING, PRICING],
  "who-can-write-an-esa-letter": [ONLINE, STATES, PRICING],
  "emotional-support-animal": [ONLINE, PSD, STATES],
  "esa-for-children": [ONLINE, HOUSING, STATES],
  "prepare-esa-for-rental-housing": [HOUSING, LAWS, STATES],
  "8-basic-obedience-commands-every-esa-should-know": [HOUSING, PSD, ONLINE],
  "esa-training-myths": [HOUSING, PSD, LAWS],
};

const BY_CATEGORY: Record<string, NextLink[]> = {
  "qualifying-conditions": [ONLINE, PSD, STATES],
  "esa-guide": [ONLINE, HOUSING, STATES],
  "esa-training": [HOUSING, PSD, ONLINE],
};

export function BlogNextStep({ slug, categorySlug }: { slug: string; categorySlug: string }) {
  const links = BY_SLUG[slug] || BY_CATEGORY[categorySlug] || [ONLINE, HOUSING, STATES];
  return (
    <section aria-labelledby="blog-next-step" className="w-full bg-background pt-12 sm:pt-16">
      <div className="max-w-[900px] mx-auto px-4 sm:px-6">
        <div className="rounded-[20px] border border-[#EAE5DC] bg-white p-6 sm:p-8">
          <h2 id="blog-next-step" className="heading-h3 text-primary">
            Your Next Step
          </h2>
          <p className="mt-2 body-text text-body-text">
            ESA documentation is issued only after an evaluation by a licensed professional. These pages explain the process and requirements.
          </p>
          <ul className="mt-4 flex flex-col gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  prefetch={false}
                  className="body-text font-semibold text-primary underline underline-offset-4 hover:text-[#1D6E72]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
