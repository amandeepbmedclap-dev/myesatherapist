"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { CtaTile, Meta, PostCard, searchPosts, type HubPost } from "./BlogHubExplorer";

export type CategoryLink = { slug: string; name: string; href: string; count?: number };

export function CategoryHubExplorer({
  slug,
  name,
  title,
  intro,
  aside,
  posts,
  featured,
  links,
  gridTitle,
}: {
  slug: string;
  name: string;
  title: string;
  intro: ReactNode;
  aside?: ReactNode;
  posts: HubPost[];
  featured?: HubPost;
  links: CategoryLink[];
  gridTitle: string;
}) {
  const [q, setQ] = useState("");
  const results = useMemo(() => searchPosts(posts, q), [posts, q]);
  const searching = q.trim() !== "";
  const toResults = () => document.getElementById("articles")?.scrollIntoView({ behavior: "smooth", block: "start" });
  const latest = posts[0] ? new Date(posts[0].updatedTs).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "";
  const minutes = posts.reduce((n, p) => n + p.minutes, 0);

  // Balanced grid: a wide lead card, a CTA tile, and no lone card on the last row.
  // The featured story is already in the hero, so leave it out of the grid until someone searches.
  const shown = searching || aside || !featured ? results : results.filter((p) => p.slug !== featured.slug);
  const [lead, ...rest] = shown;
  const withCta = !searching && rest.length >= 2;
  const rem = (2 + rest.length + (withCta ? 1 : 0)) % 3;

  return (
    <>
      {/* ───── Hero ───── */}
      <section className="relative overflow-hidden bg-background">
        <div aria-hidden className="absolute -right-32 -top-40 size-[520px] rounded-full bg-accent/10" />
        <div aria-hidden className="absolute -bottom-48 -left-24 size-[420px] rounded-full bg-[#1D6E72]/[0.06]" />
        <div className="relative mx-auto grid max-w-[1278px] gap-10 px-4 pb-14 pt-6 sm:px-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-center lg:gap-14 lg:pb-20 lg:pt-10 xl:px-0">
          <div>
            <div className="text-base font-bold uppercase tracking-[0.16em] text-gold-600">The My ESA Therapist Journal · {name}</div>
            <h1 className="heading-h1 mt-3 max-w-[620px] text-primary">{title}</h1>
            <div className="mt-4 max-w-[600px] space-y-4 text-lg leading-[1.7] text-body-text [&_p]:text-lg [&_p]:leading-[1.7]">{intro}</div>

            <form
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                toResults();
              }}
              className="mt-7 max-w-[580px]"
            >
              <label htmlFor="cat-search" className="sr-only">
                Search {name} articles
              </label>
              <div className="group relative">
                <Search aria-hidden className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-body-text transition-colors group-focus-within:text-[#1D6E72]" />
                <input
                  id="cat-search"
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder={`Search ${name} articles`}
                  autoComplete="off"
                  className="h-[60px] w-full rounded-full bg-white pl-14 pr-[118px] text-[16px] font-medium text-[#1A3D4F] shadow-[0_18px_40px_-24px_rgba(26,61,79,0.55)] outline-none ring-1 ring-line-200 placeholder:font-normal placeholder:text-body-text/70 focus:ring-2 focus:ring-[#1D6E72]"
                />
                {q && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => setQ("")}
                    className="absolute right-[104px] top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full text-body-text hover:bg-background hover:text-[#1A3D4F]"
                  >
                    <X aria-hidden className="size-4" />
                  </button>
                )}
                <button type="submit" className="absolute right-1.5 top-1/2 h-12 -translate-y-1/2 rounded-full bg-primary px-5 text-base font-bold text-white transition-colors hover:bg-[#1A3D4F]">
                  Search
                </button>
              </div>
              <div aria-live="polite" className="mt-3 min-h-[24px] text-base">
                {searching && (
                  <span className="font-semibold text-[#1A3D4F]">
                    {results.length} {results.length === 1 ? "article" : "articles"} found.{" "}
                    <button type="button" onClick={toResults} className="text-[#1D6E72] underline underline-offset-4">
                      See results
                    </button>
                  </span>
                )}
              </div>
            </form>

            <div className="mt-5 flex flex-wrap gap-x-9 gap-y-3">
              {[
                [String(posts.length), "articles"],
                [`${minutes}`, "minutes of reading"],
                [latest, "latest update"],
              ].map(([v, l]) => (
                <div key={l} className="flex items-baseline gap-2">
                  <span className="font-heading text-[28px] font-bold leading-none text-[#1A3D4F]">{v}</span>
                  <span className="text-base text-body-text">{l}</span>
                </div>
              ))}
            </div>
          </div>

          {aside ??
            (featured && (
              <article className="group relative flex flex-col overflow-hidden rounded-[28px] bg-[#1A3D4F] shadow-[0_40px_70px_-40px_rgba(26,61,79,0.8)]">
                <span className="relative block aspect-[16/10] overflow-hidden">
                  <Image src={featured.image} alt={featured.title} fill priority sizes="(min-width:1024px) 560px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  <span className="absolute left-5 top-5 rounded-full bg-accent px-3.5 py-1.5 text-base font-extrabold uppercase tracking-[0.12em] text-[#1A3D4F]">
                    Featured · {name}
                  </span>
                </span>
                <span className="block p-6 sm:p-8">
                  <Link href={featured.url} className="block font-heading text-[28px] font-bold leading-tight text-white after:absolute after:inset-0 sm:text-[28px]">
                    {featured.title}
                  </Link>
                  <span className="mt-3 line-clamp-2 block text-base leading-relaxed text-white/80">{featured.excerpt}</span>
                  <span className="mt-5 flex items-center justify-between gap-4 border-t border-white/15 pt-4">
                    <Meta p={featured} light />
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-[#1A3D4F] transition-transform group-hover:-rotate-45">
                      <ArrowRight aria-hidden className="size-5" />
                    </span>
                  </span>
                </span>
              </article>
            ))}
        </div>
      </section>

      {/* ───── Topic bar: links to the other blog categories ───── */}
      <nav aria-label="Blog topics" className="border-y border-line-200 bg-white">
        <div className="no-scrollbar mx-auto flex max-w-[1278px] gap-2 overflow-x-auto px-4 py-4 sm:px-6 md:flex-wrap xl:px-0">
          {links.map((c) => {
            const on = c.slug === slug;
            return (
              <Link
                key={c.slug}
                href={c.href}
                aria-current={on ? "page" : undefined}
                className={`inline-flex h-11 shrink-0 items-center gap-2 rounded-full px-4 text-base font-semibold transition-colors ${
                  on ? "bg-[#1A3D4F] text-white" : "bg-background text-[#1A3D4F] hover:bg-cream-100"
                }`}
              >
                {c.name}
                {c.count !== undefined && (
                  <span className={`rounded-full px-2 py-0.5 text-base ${on ? "bg-white/15 text-white" : "bg-white text-[#1D6E72]"}`}>{c.count}</span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ───── Articles ───── */}
      <section id="articles" className="scroll-mt-28 bg-background py-14 md:py-20">
        <div className="mx-auto max-w-[1278px] px-4 sm:px-6 xl:px-0">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line-200 pb-6">
            <div>
              <div className="text-base font-bold uppercase tracking-[0.16em] text-gold-600">{searching ? "Search results" : `${posts.length} articles`}</div>
              <h2 className="heading-h2 mt-2 text-primary">{searching ? <>Results for &ldquo;{q.trim()}&rdquo;</> : gridTitle}</h2>
            </div>
            {searching && (
              <button type="button" onClick={() => setQ("")} className="inline-flex items-center gap-1.5 text-base font-semibold text-[#1D6E72] underline underline-offset-4">
                <X aria-hidden className="size-4" /> Clear search
              </button>
            )}
          </div>

          {shown.length ? (
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {lead && (
                <li className="sm:col-span-2">
                  <PostCard p={lead} wide />
                </li>
              )}
              {rest.map((p, i) => {
                const last = i === rest.length - 1 && rem !== 0;
                const span = last ? (rem === 1 ? "sm:col-span-2 lg:col-span-3" : "sm:col-span-2") : "";
                return (
                  <li key={p.slug} className="contents">
                    {withCta && i === 2 && (
                      <div>
                        <CtaTile />
                      </div>
                    )}
                    <div className={span}>
                      <PostCard p={p} wide={last} />
                    </div>
                  </li>
                );
              })}
              {withCta && rest.length === 2 && (
                <li>
                  <CtaTile />
                </li>
              )}
            </ul>
          ) : (
            <div className="mt-8 rounded-[22px] bg-white p-10 text-center ring-1 ring-line-200">
              <div className="font-heading text-[28px] font-bold text-[#1A3D4F]">No {name} articles match &ldquo;{q.trim()}&rdquo;</div>
              <p className="mt-2 text-body-text">
                Try a shorter word, or{" "}
                <Link href={`/blog/?q=${encodeURIComponent(q.trim())}`} className="font-semibold text-[#1D6E72] underline underline-offset-4">
                  search all articles
                </Link>
                .
              </p>
            </div>
          )}

          {searching && (
            <nav aria-label={`All ${name} articles`} className="sr-only">
              <ul>
                {posts.map((p) => (
                  <li key={p.slug}>
                    <a href={p.url}>{p.title}</a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </section>
    </>
  );
}
