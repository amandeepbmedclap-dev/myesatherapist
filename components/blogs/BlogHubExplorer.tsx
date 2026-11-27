"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, Clock, Search, X } from "lucide-react";
import { openEsaEligibilityChecker } from "@/components/common/evaluationCta";
import { contributorProfileHref } from "@/data/contributorsData";

export type HubPost = {
  slug: string;
  url: string;
  title: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  image: string;
  updated: string;
  updatedTs: number;
  minutes: number;
  author: string;
};

export type HubCategory = { slug: string; name: string; href: string; blurb: string; count: number };

const TITLE = "Your Go-to-Resource Hub for Emotional Support Animals";
const DESCRIPTION =
  "Finding reliable information about emotional support animals should not be complicated. Explore expert-written blogs that simplify important ESA topics and help you better understand your rights, responsibilities, and the role of emotional support animals in everyday life.";
const STOP = new Set(["a", "an", "and", "are", "can", "do", "does", "for", "how", "i", "in", "is", "it", "my", "of", "on", "or", "the", "to", "what", "who", "with", "you"]);
const SUGGESTIONS = ["landlord", "ESA letter", "anxiety", "training", "registration"];

const shortDate = (d: string) => {
  const t = Date.parse(d);
  return t ? new Date(t).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : d;
};

export function searchPosts(posts: HubPost[], q: string, cat = "all"): HubPost[] {
    const raw = q.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
    const terms = raw.filter((t) => !STOP.has(t));
    const use = terms.length ? terms : raw;
    const inCat = posts.filter((p) => cat === "all" || p.categorySlug === cat);
    if (!use.length) return inCat;
    const words = (s: string) => s.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
    const hits = (list: string[], t: string) => list.some((w) => w.startsWith(t) || (t.length > 3 && w.startsWith(t.replace(/s$/, ""))));
    return inCat
      .map((p) => {
        const title = words(p.title);
        const rest = words(`${p.excerpt} ${p.category} ${p.author}`);
        const phrase = q.trim().toLowerCase();
        let score = phrase.length > 2 && p.title.toLowerCase().includes(phrase) ? 10 : 0;
        for (const t of use) {
          if (hits(title, t)) score += 3;
          else if (hits(rest, t)) score += 1;
          else return null;
        }
        return { p, score };
      })
      .filter((x): x is { p: HubPost; score: number } => !!x)
      .sort((a, b) => b.score - a.score || b.p.updatedTs - a.p.updatedTs)
      .map((x) => x.p);
}

/* ───────────── cards ───────────── */

export function Meta({ p, light }: { p: HubPost; light?: boolean }) {
  const authorHref = contributorProfileHref(p.author);
  return (
    <span className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-base ${light ? "text-white/75" : "text-body-text"}`}>
      {p.author &&
        (authorHref ? (
          <Link
            href={authorHref}
            className={`relative z-10 font-semibold underline decoration-current/40 underline-offset-2 transition-colors ${
              light ? "text-white hover:text-accent" : "text-[#1A3D4F] hover:text-[#1D6E72]"
            }`}
          >
            {p.author}
          </Link>
        ) : (
          <span className={`font-semibold ${light ? "text-white" : "text-[#1A3D4F]"}`}>{p.author}</span>
        ))}
      <span className="inline-flex items-center gap-1">
        <Clock aria-hidden className={`size-3.5 ${light ? "text-accent" : "text-[#1D6E72]"}`} /> {p.minutes} min read
      </span>
      <span>{shortDate(p.updated)}</span>
    </span>
  );
}

export function PostCard({ p, wide = false, priority = false }: { p: HubPost; wide?: boolean; priority?: boolean }) {
  return (
    <article
      className={`group relative flex h-full overflow-hidden rounded-[22px] bg-white ring-1 ring-line-200 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(26,61,79,0.55)] ${
        wide ? "flex-col md:flex-row" : "flex-col"
      }`}
    >
      <span className={`relative block shrink-0 overflow-hidden bg-background ${wide ? "aspect-[16/10] md:aspect-auto md:min-h-[300px] md:w-[50%]" : "aspect-[16/10]"}`}>
        <Image
          src={p.image}
          alt={p.title}
          fill
          priority={priority}
          quality={90}
          sizes={wide ? "(min-width:1024px) 720px, 100vw" : "(min-width:1024px) 480px, (min-width:640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
        />
      </span>
      <span className={`flex flex-1 flex-col ${wide ? "p-6 md:p-8" : "p-5 sm:p-6"}`}>
        <span className="text-base font-bold uppercase tracking-[0.14em] text-gold-600">{p.category}</span>
        <Link
          href={p.url}
          className={`mt-2 block font-heading font-bold leading-snug text-[#1A3D4F] transition-colors group-hover:text-[#1D6E72] after:absolute after:inset-0 ${
            wide ? "text-[28px] md:text-[28px]" : "text-[20px]"
          }`}
        >
          {p.title}
        </Link>
        <span className={`mt-2 text-base leading-relaxed text-body-text ${wide ? "line-clamp-3" : "line-clamp-2"}`}>{p.excerpt}</span>
        <span className="mt-auto block pt-5">
          <span className="flex items-end justify-between gap-3 border-t border-line-200 pt-4">
            <Meta p={p} />
            <ArrowRight aria-hidden className="size-5 shrink-0 -translate-x-1 text-[#1D6E72] opacity-0 transition-[transform,opacity] group-hover:translate-x-0 group-hover:opacity-100" />
          </span>
        </span>
      </span>
    </article>
  );
}

export function CtaTile() {
  return (
    <div className="relative flex h-full min-h-[300px] flex-col justify-between overflow-hidden rounded-[22px] bg-[#1A3D4F] p-7 text-white">
      <div aria-hidden className="absolute -right-14 -top-14 size-48 rounded-full bg-accent/20" />
      <div aria-hidden className="absolute -bottom-20 -left-12 size-52 rounded-full bg-white/5" />
      <div className="relative">
        <div className="text-base font-bold uppercase tracking-[0.14em] text-accent">Free, about a minute</div>
        <div className="mt-2 font-heading text-[28px] font-bold leading-tight">Reading up before you apply?</div>
        <div className="mt-3 text-base leading-relaxed text-white/80">
          See whether an ESA evaluation makes sense for you before you book anything.
        </div>
      </div>
      <div className="relative mt-6 space-y-3">
        <button
          type="button"
          onClick={() => openEsaEligibilityChecker()}
          className="cta3d cta3d--gold inline-flex h-[52px] w-full items-center justify-center gap-2 px-5 text-base"
        >
          Free ESA Eligibility Checker <ArrowRight aria-hidden className="size-4" />
        </button>
        <Link href="/pricing/" className="inline-flex items-center gap-1 text-base font-semibold text-accent hover:underline">
          See plans and pricing <ArrowUpRight aria-hidden className="size-4" />
        </Link>
      </div>
    </div>
  );
}

/* ───────────── page ───────────── */

export function BlogHubExplorer({
  posts,
  categories,
  startHere,
  featured,
}: {
  posts: HubPost[];
  categories: HubCategory[];
  startHere: HubPost[];
  featured: HubPost;
}) {
  const [q, setQ] = useState("");

  // Support links like /blog/?q=landlord
  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get("q");
    if (!initial) return;
    const t = window.setTimeout(() => setQ(initial), 0);
    return () => window.clearTimeout(t);
  }, []);

  const results = useMemo(() => searchPosts(posts, q), [posts, q]);

  const filtering = q.trim() !== "";
  const latest = posts[0] ? new Date(posts[0].updatedTs).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "";
  const toResults = () => document.getElementById("articles")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <>
      {/* ───── Hero ───── */}
      <section className="relative overflow-hidden bg-background">
        <div aria-hidden className="absolute -right-32 -top-40 size-[520px] rounded-full bg-accent/10" />
        <div aria-hidden className="absolute -bottom-48 -left-24 size-[420px] rounded-full bg-[#1D6E72]/[0.06]" />
        <div className="relative mx-auto grid max-w-[1278px] gap-10 px-4 pb-14 pt-6 sm:px-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-center lg:gap-14 lg:pb-20 lg:pt-10 xl:px-0">
          <div>
            <div className="text-base font-bold uppercase tracking-[0.16em] text-gold-600">The My ESA Therapist Journal</div>
            <h1 className="heading-h1 mt-3 max-w-[620px] text-primary">{TITLE}</h1>
            <p className="body-large mt-4 max-w-[580px] text-body-text">{DESCRIPTION}</p>

            <form
              role="search"
              onSubmit={(e) => {
                e.preventDefault();
                toResults();
              }}
              className="mt-7 max-w-[580px]"
            >
              <label htmlFor="blog-search" className="sr-only">
                Search articles
              </label>
              <div className="group relative">
                <Search aria-hidden className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-body-text transition-colors group-focus-within:text-[#1D6E72]" />
                <input
                  id="blog-search"
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search articles, e.g. landlord, anxiety, renewal"
                  autoComplete="off"
                  className="h-[60px] w-full rounded-full bg-white pl-14 pr-[118px] text-[16px] font-medium text-[#1A3D4F] shadow-[0_18px_40px_-24px_rgba(26,61,79,0.55)] outline-none ring-1 ring-line-200 transition-shadow placeholder:font-normal placeholder:text-body-text/70 focus:ring-2 focus:ring-[#1D6E72]"
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
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 h-12 -translate-y-1/2 rounded-full bg-primary px-5 text-base font-bold text-white transition-colors hover:bg-[#1A3D4F]"
                >
                  Search
                </button>
              </div>
              <div aria-live="polite" className="mt-3 min-h-[24px] text-base">
                {q.trim() ? (
                  <span className="font-semibold text-[#1A3D4F]">
                    {results.length} {results.length === 1 ? "article" : "articles"} found.{" "}
                    <button type="button" onClick={toResults} className="text-[#1D6E72] underline underline-offset-4">
                      See results
                    </button>
                  </span>
                ) : (
                  <span className="flex flex-wrap items-center gap-2 text-body-text">
                    Popular:
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setQ(s)}
                        className="rounded-full bg-white px-3 py-1 text-base font-semibold text-[#1A3D4F] ring-1 ring-line-200 transition-colors hover:ring-[#1D6E72]"
                      >
                        {s}
                      </button>
                    ))}
                  </span>
                )}
              </div>
            </form>

            <div className="mt-7 flex flex-wrap gap-x-9 gap-y-3">
              {[
                [String(posts.length), "articles"],
                [String(categories.length), "topics"],
                [latest, "latest update"],
              ].map(([v, l]) => (
                <div key={l} className="flex items-baseline gap-2">
                  <span className="font-heading text-[28px] font-bold leading-none text-[#1A3D4F]">{v}</span>
                  <span className="text-base text-body-text">{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Featured story */}
          <article className="group relative flex flex-col overflow-hidden rounded-[28px] bg-[#1A3D4F] shadow-[0_40px_70px_-40px_rgba(26,61,79,0.8)]">
            <span className="relative block aspect-[16/10] overflow-hidden">
              <Image src={featured.image} alt={featured.title} fill priority sizes="(min-width:1024px) 560px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
              <span className="absolute left-5 top-5 rounded-full bg-accent px-3.5 py-1.5 text-base font-extrabold uppercase tracking-[0.12em] text-[#1A3D4F]">
                Featured · {featured.category}
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
        </div>
      </section>

      {/* ───── Topic bar ───── */}
      <div id="articles" className="scroll-mt-28 border-y border-line-200 bg-white">
        <div className="mx-auto flex max-w-[1278px] flex-col gap-3 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between xl:px-0">
          <nav aria-label="Blog topics" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:px-0">
            {[{ slug: "all", name: "All articles", count: posts.length, href: "/blog/" }, ...categories].map((c) => {
              const on = c.slug === "all";
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
                  <span className={`rounded-full px-2 py-0.5 text-base ${on ? "bg-white/15 text-white" : "bg-white text-[#1D6E72]"}`}>{c.count}</span>
                </Link>
              );
            })}
          </nav>
          {filtering && (
            <button
              type="button"
              onClick={() => {
                setQ("");
              }}
              className="inline-flex items-center gap-1.5 self-start text-base font-semibold text-[#1D6E72] underline underline-offset-4 md:self-auto"
            >
              <X aria-hidden className="size-4" /> Clear search
            </button>
          )}
        </div>
      </div>

      {filtering ? (
        /* ───── Results ───── */
        <section className="bg-background py-12 md:py-16">
          <div className="mx-auto max-w-[1278px] px-4 sm:px-6 xl:px-0">
            <h2 className="heading-h2 text-primary">
              <>Results for &ldquo;{q.trim()}&rdquo;</>
            </h2>
            <p className="mt-1 text-base text-body-text">
              {results.length} of {posts.length} articles
            </p>
            {results.length ? (
              <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((p) => (
                  <li key={p.slug}>
                    <PostCard p={p} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-8 rounded-[22px] bg-white p-10 text-center ring-1 ring-line-200">
                <div className="font-heading text-[28px] font-bold text-[#1A3D4F]">No articles match &ldquo;{q.trim()}&rdquo;</div>
                <p className="mt-2 text-body-text">Try a shorter word, or pick another topic.</p>
                <button
                  type="button"
                  onClick={() => {
                    setQ("");
                  }}
                  className="mt-5 inline-flex h-11 items-center rounded-full bg-[#1A3D4F] px-5 text-base font-semibold text-white hover:bg-primary"
                >
                  Show all articles
                </button>
              </div>
            )}
          </div>
        </section>
      ) : (
        <>
          {/* ───── Start here ───── */}
          <section className="bg-[#1A3D4F] py-14 text-white md:py-20">
            <div className="mx-auto max-w-[1278px] px-4 sm:px-6 xl:px-0">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="text-base font-bold uppercase tracking-[0.16em] text-accent">New to ESAs?</div>
                  <h2 className="heading-h2 mt-2 text-white">Start here, in this order</h2>
                </div>
                <p className="max-w-[420px] text-base leading-relaxed text-white/75">
                  Four reads that take you from &ldquo;what is an ESA?&rdquo; to knowing what a real letter looks like.
                </p>
              </div>
              <ol className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
                {startHere.map((p, i) => (
                  <li key={p.slug}>
                    <Link href={p.url} className="group flex h-full items-center gap-4 sm:flex-col sm:items-stretch sm:gap-0">
                      <span className="relative block aspect-square w-24 shrink-0 overflow-hidden rounded-[16px] bg-white/10 sm:aspect-[4/3] sm:w-auto sm:rounded-[18px]">
                        <Image src={p.image} alt={p.title} fill sizes="(min-width:1024px) 300px, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
                      </span>
                      <span className="flex items-start gap-3 sm:mt-4">
                        <span className="font-heading text-[40px] font-bold leading-[0.9] text-accent">{String(i + 1).padStart(2, "0")}</span>
                        <span className="min-w-0">
                          <span className="block font-heading text-xl font-bold leading-snug text-white group-hover:text-accent">{p.title}</span>
                          <span className="mt-1.5 inline-flex items-center gap-1 text-base text-white/70">
                            <Clock aria-hidden className="size-3.5 text-accent" /> {p.minutes} min read
                          </span>
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* ───── Topics ───── */}
          {categories.map((c, ci) => {
            const list = posts.filter((p) => p.categorySlug === c.slug);
            const [lead, ...rest] = list;
            return (
              <section key={c.slug} id={c.slug} className={`scroll-mt-28 py-14 md:py-20 ${ci % 2 ? "bg-white" : "bg-background"}`}>
                <div className="mx-auto max-w-[1278px] px-4 sm:px-6 xl:px-0">
                  <div className="grid gap-6 border-b border-line-200 pb-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:items-end">
                    <div>
                      <div className="text-base font-bold uppercase tracking-[0.16em] text-gold-600">
                        Topic {String(ci + 1).padStart(2, "0")} · {c.count} articles
                      </div>
                      <h2 className="heading-h2 mt-2 text-primary">{c.name}</h2>
                    </div>
                    <div>
                      <p className="text-[16px] leading-relaxed text-body-text">{c.blurb}</p>
                      <Link href={c.href} className="mt-3 inline-flex items-center gap-1.5 text-base font-bold text-[#1D6E72] hover:underline">
                        Browse all {c.name} articles <ArrowRight aria-hidden className="size-4" />
                      </Link>
                    </div>
                  </div>
                  <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {lead && (
                      <li className="sm:col-span-2">
                        <PostCard p={lead} wide />
                      </li>
                    )}
                    {rest.map((p, i) => {
                      const withCta = ci === 0 && rest.length > 3;
                      const rem = (2 + rest.length + (withCta ? 1 : 0)) % 3;
                      const last = i === rest.length - 1 && rem !== 0;
                      const span = last ? (rem === 1 ? "sm:col-span-2 lg:col-span-3" : "sm:col-span-2") : "";
                      return (
                        <li key={p.slug} className="contents">
                          {withCta && i === 3 && (
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
                  </ul>
                </div>
              </section>
            );
          })}
        </>
      )}

      {/* Keep every article linked in the HTML, whatever the filter shows. */}
      {filtering && (
        <nav aria-label="All articles" className="sr-only">
          <ul>
            {posts.map((p) => (
              <li key={p.slug}>
                <a href={p.url}>{p.title}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}
