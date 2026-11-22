import React from "react";
import Link from "next/link";
import type { StateData } from "@/data/statesData";
import { STATE_INDEX_BY_SLUG } from "@/data/stateIndex";

// Internal-linking silo for state (BOFU) pages: sibling money pages,
// neighboring states, and the supporting guides renters actually read.
const NEIGHBORS: Record<string, string[]> = {
  alabama: ["florida", "georgia", "mississippi", "tennessee"],
  alaska: ["washington", "hawaii", "oregon"],
  arizona: ["california", "nevada", "new-mexico", "utah"],
  arkansas: ["louisiana", "missouri", "oklahoma", "texas"],
  california: ["arizona", "nevada", "oregon"],
  colorado: ["kansas", "nebraska", "new-mexico", "utah", "wyoming"],
  connecticut: ["massachusetts", "new-york", "rhode-island"],
  delaware: ["maryland", "new-jersey", "pennsylvania"],
  florida: ["alabama", "georgia", "puerto-rico"],
  georgia: ["alabama", "florida", "north-carolina", "south-carolina", "tennessee"],
  hawaii: ["california", "alaska", "washington"],
  idaho: ["montana", "nevada", "oregon", "utah", "washington"],
  illinois: ["indiana", "iowa", "kentucky", "missouri", "wisconsin"],
  indiana: ["illinois", "kentucky", "michigan", "ohio"],
  iowa: ["illinois", "minnesota", "missouri", "nebraska", "wisconsin"],
  kansas: ["colorado", "missouri", "nebraska", "oklahoma"],
  kentucky: ["indiana", "ohio", "tennessee", "virginia", "west-virginia"],
  louisiana: ["arkansas", "mississippi", "texas"],
  maine: ["new-hampshire", "massachusetts", "vermont"],
  maryland: ["delaware", "pennsylvania", "virginia", "washington-dc", "west-virginia"],
  massachusetts: ["connecticut", "new-hampshire", "new-york", "rhode-island", "vermont"],
  michigan: ["indiana", "ohio", "wisconsin"],
  minnesota: ["iowa", "north-dakota", "south-dakota", "wisconsin"],
  mississippi: ["alabama", "arkansas", "louisiana", "tennessee"],
  missouri: ["arkansas", "illinois", "iowa", "kansas", "kentucky"],
  montana: ["idaho", "north-dakota", "south-dakota", "wyoming"],
  nebraska: ["colorado", "iowa", "kansas", "south-dakota"],
  nevada: ["arizona", "california", "idaho", "utah"],
  "new-hampshire": ["maine", "massachusetts", "vermont"],
  "new-jersey": ["delaware", "new-york", "pennsylvania"],
  "new-mexico": ["arizona", "colorado", "oklahoma", "texas"],
  "new-york": ["connecticut", "new-jersey", "pennsylvania", "vermont"],
  "north-carolina": ["georgia", "south-carolina", "tennessee", "virginia"],
  "north-dakota": ["minnesota", "montana", "south-dakota"],
  ohio: ["indiana", "kentucky", "michigan", "pennsylvania", "west-virginia"],
  oklahoma: ["arkansas", "kansas", "missouri", "texas"],
  oregon: ["california", "idaho", "nevada", "washington"],
  pennsylvania: ["delaware", "maryland", "new-jersey", "new-york", "ohio"],
  "rhode-island": ["connecticut", "massachusetts"],
  "south-carolina": ["georgia", "north-carolina"],
  "south-dakota": ["minnesota", "nebraska", "north-dakota", "wyoming"],
  tennessee: ["alabama", "georgia", "kentucky", "mississippi", "north-carolina"],
  texas: ["arkansas", "louisiana", "new-mexico", "oklahoma"],
  utah: ["arizona", "colorado", "idaho", "nevada"],
  vermont: ["massachusetts", "new-hampshire", "new-york"],
  virginia: ["kentucky", "maryland", "north-carolina", "washington-dc", "west-virginia"],
  washington: ["idaho", "oregon", "alaska"],
  "washington-dc": ["maryland", "virginia"],
  "west-virginia": ["kentucky", "maryland", "ohio", "pennsylvania", "virginia"],
  wisconsin: ["illinois", "iowa", "michigan", "minnesota"],
  wyoming: ["colorado", "idaho", "montana", "nebraska", "utah"],
  "puerto-rico": ["virgin-islands", "florida"],
  "virgin-islands": ["puerto-rico", "florida"],
};

// State-specific ESA law guides that exist today; others use the laws hub.
const STATE_LAW_GUIDES = new Set(["alabama"]);

export function StateNextSteps({ data }: { data: StateData }) {
  const name = data.name;
  const neighbors = (NEIGHBORS[data.slug] || [])
    .map((slug) => STATE_INDEX_BY_SLUG[slug])
    .filter(Boolean);
  const lawsHref = STATE_LAW_GUIDES.has(data.slug) ? `/esa-laws/${data.slug}/` : "/esa-laws/";
  const lawsLabel = STATE_LAW_GUIDES.has(data.slug) ? `${name} ESA laws explained` : `ESA laws by state, including ${name}`;

  const services = [
    { href: "/esa-letter-online/", label: "How online ESA letter evaluations work" },
    { href: "/psd-letter/", label: `Psychiatric service dog (PSD) letter in ${name}` },
    { href: "/esa-letter-for-housing/", label: "ESA letter for housing" },
    { href: "/esa-letter-renewal/", label: "Renew an existing ESA letter" },
    { href: "/pricing/", label: "ESA letter cost and what is included" },
  ];
  const guides = [
    { href: lawsHref, label: lawsLabel },
    { href: "/blog/esa-guide/can-landlords-deny-emotional-support-animals/", label: `Can a landlord in ${name} deny an ESA?` },
    { href: "/blog/esa-guide/how-to-verify-an-esa-letter/", label: "How landlords verify an ESA letter" },
    { href: "/blog/esa-guide/hud-guidance-for-emotional-support-animals/", label: "What changed in HUD's 2026 ESA guidance" },
  ];

  return (
    <section aria-labelledby="next-steps-heading" className="w-full bg-background py-12 sm:py-16">
      <div className="max-w-[1278px] mx-auto px-4 sm:px-6 lg:px-6 xl:px-0">
        <h2 id="next-steps-heading" className="heading-h2 text-primary text-center">
          More ESA Guides, Resources, and Help for {name} Residents
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <LinkGroup title="Our services" links={services} />
          <LinkGroup title={`Guides for ${name} renters`} links={guides} />
          {neighbors.length > 0 && (
            <LinkGroup
              title="Nearby states"
              links={neighbors.map((s) => ({ href: `/esa-letter-${s.slug}/`, label: `ESA letter in ${s.name}` }))}
              footer={{ href: "/state/", label: "See all states" }}
            />
          )}
        </div>
      </div>
    </section>
  );
}

function LinkGroup({
  title,
  links,
  footer,
}: {
  title: string;
  links: Array<{ href: string; label: string }>;
  footer?: { href: string; label: string };
}) {
  return (
    <div className="rounded-[20px] border border-[#EAE5DC] bg-white p-6">
      <h3 className="font-heading font-bold text-[20px] leading-[28px] text-primary">{title}</h3>
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
      {footer && (
        <Link
          href={footer.href}
          prefetch={false}
          className="mt-4 inline-block body-small font-semibold text-body-text hover:text-[#1D6E72]"
        >
          {footer.label}
        </Link>
      )}
    </div>
  );
}
