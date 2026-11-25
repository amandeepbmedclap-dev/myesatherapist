import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Clock3 } from "lucide-react";
import { AUTHORS, REVIEWERS } from "@/data/contributorsData";

const PROFILE_HREF: Record<string, string> = Object.fromEntries([...AUTHORS, ...REVIEWERS].map((p) => [p.name, p.href]));

type Person = { name: string; image?: string; credentials?: string };

export function ArticleHero({
  title,
  subtitle,
  category,
  categoryHref,
  readMinutes,
  author,
  reviewer,
  updated,
  highlights,
}: {
  title: string;
  subtitle: string;
  category: string;
  categoryHref: string;
  readMinutes: number;
  author: Person;
  reviewer: Person;
  updated: string;
  highlights?: string[];
}) {
  const person = (p: Person, label: string) => {
    const href = PROFILE_HREF[p.name];
    return (
      <div className="flex min-w-0 items-center gap-3">
        <span className="relative size-11 shrink-0 overflow-hidden rounded-full ring-2 ring-white shadow-[0_4px_10px_-4px_rgba(26,61,79,0.5)]">
          {p.image ? <Image src={p.image} alt={p.name} fill sizes="44px" className="object-cover" /> : null}
        </span>
        <span className="min-w-0 font-sans leading-tight">
          <span className="block text-base text-body-text">{label}</span>
          {href ? (
            <Link href={href} className="block truncate text-base font-semibold text-primary underline decoration-accent/70 decoration-2 underline-offset-4 hover:text-[#1D6E72]">
              {p.name}
            </Link>
          ) : (
            <span className="block truncate text-base font-semibold text-primary">{p.name}</span>
          )}
          {p.credentials ? <span className="block truncate text-base text-body-text/80">{p.credentials}</span> : null}
        </span>
      </div>
    );
  };

  return (
    <section data-section="article-hero" className="relative overflow-hidden bg-background px-4 pb-12 pt-8 sm:px-6 sm:pt-10 lg:px-8 lg:pb-16 lg:pt-12">
      <span aria-hidden className="pointer-events-none absolute -right-40 -top-40 size-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(232,185,44,0.16),transparent)]" />
      <div className={`relative mx-auto grid max-w-[1280px] gap-10 ${highlights?.length ? "lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-14" : ""}`}>
        <div className="min-w-0 self-center">
          <div className="flex flex-wrap items-center gap-2.5 font-sans text-base">
            <Link href={categoryHref} className="rounded-full bg-primary px-3.5 py-1.5 font-semibold text-white hover:bg-[#1D6E72]">
              {category}
            </Link>
            <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-primary ring-1 ring-line-200">
              <Clock3 aria-hidden className="size-3.5 text-gold-600" /> {readMinutes} min read
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-primary ring-1 ring-line-200">
              <BadgeCheck aria-hidden className="size-3.5 text-[#1D6E72]" /> Clinically reviewed
            </span>
          </div>
          <h1 className="heading-h1 mt-5 font-heading font-bold text-primary">{title}</h1>
          <p className="mt-5 max-w-[680px] font-sans text-lg leading-[29px] text-body-text sm:text-[18px] sm:leading-[30px]">{subtitle}</p>
          <div className="mt-7 flex flex-col gap-4 border-t border-primary/10 pt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8">
            {person(author, "Written by")}
            {person(reviewer, "Medically reviewed by")}
            <div className="font-sans leading-tight">
              <span className="block text-base text-body-text">Last updated</span>
              <span className="block text-base font-semibold text-primary">{updated}</span>
            </div>
          </div>
        </div>

        {highlights?.length ? (
          <aside aria-labelledby="key-highlights" className="relative self-center">
            <div className="relative rounded-[26px] bg-white p-6 shadow-[0_30px_60px_-40px_rgba(26,61,79,0.55)] ring-1 ring-line-200 sm:p-7">
              <span aria-hidden className="absolute -top-3 left-7 rounded-full bg-accent px-3.5 py-1 font-sans text-base font-extrabold uppercase tracking-[0.14em] text-primary">
                At a glance
              </span>
              <h2 id="key-highlights" className="heading-h2 font-heading font-bold text-primary">Key highlights</h2>
              <ol className="mt-4 space-y-3.5">
                {highlights.map((h, i) => (
                  <li key={i} className="flex gap-3 font-sans text-base leading-[24px] text-body-text">
                    <span className="mt-[1px] flex size-7 shrink-0 items-center justify-center rounded-[8px] bg-[#E7F2EF] text-base font-bold leading-none text-[#1D6E72]">{i + 1}</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        ) : null}
      </div>
    </section>
  );
}
