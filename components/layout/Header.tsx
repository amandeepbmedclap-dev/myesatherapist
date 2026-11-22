"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, ClipboardCheck, Mail, Phone, Plus } from "lucide-react";
import { CtaButton } from "@/components/common/CtaButton";
import { openEsaEligibilityChecker } from "@/components/common/evaluationCta";
import {
  DesktopPanel,
  EMAIL,
  MOST_READ,
  NAV,
  PHONE,
  StateDirectory,
  StateSearch,
  useStateFilter,
  type MenuKey,
} from "./MegaMenu";

/* ───────────── mobile sheet ───────────── */

function MobileSection({
  id,
  title,
  open,
  onToggle,
  children,
}: {
  id: string;
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-line-200">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`m-${id}`}
        onClick={onToggle}
        className="flex min-h-[64px] w-full items-center justify-between gap-4 text-left"
      >
        <span className={`font-heading text-[26px] font-bold leading-tight transition-colors ${open ? "text-[#1D6E72]" : "text-[#1A3D4F]"}`}>
          {title}
        </span>
        <span
          aria-hidden
          className={`grid size-9 shrink-0 place-items-center rounded-full border transition-[transform,background-color,color] duration-300 ${
            open ? "rotate-45 border-[#1D6E72] bg-[#1D6E72] text-white" : "border-line-200 text-[#1D6E72]"
          }`}
        >
          <Plus className="size-4" />
        </span>
      </button>
      <div id={`m-${id}`} className={open ? "pb-5" : "hidden"}>
        {children}
      </div>
    </div>
  );
}

function MobileLinks({ items }: { items: { label: string; href: string; note?: string }[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item.label}>
          <Link href={item.href} className="flex min-h-[52px] items-center justify-between gap-3 rounded-xl bg-white px-4 py-2.5 ring-1 ring-line-200">
            <span>
              <span className="block text-[16px] font-semibold leading-snug text-[#1A3D4F]">{item.label}</span>
              {item.note && <span className="block text-[13px] leading-snug text-body-text">{item.note}</span>}
            </span>
            <ArrowRight aria-hidden className="size-4 shrink-0 text-gold-600" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

function MobileSheet({ open, close, isPsd }: { open: boolean; close: () => void; isPsd: boolean }) {
  const [section, setSection] = useState<MenuKey | null>("letters");
  const { q, setQ, groups } = useStateFilter();
  const toggle = (k: MenuKey) => setSection((s) => (s === k ? null : k));
  const [letters, , learn, about] = NAV;

  return (
    <div
      id="mobile-navigation"
      aria-hidden={!open}
      onClick={(e) => (e.target as HTMLElement).closest("a") && close()}
      className={`menu-drop flex h-[calc(100dvh-72px)] flex-col bg-background lg:hidden ${open ? "" : "hidden"}`}
    >
      <div className="flex-1 overflow-y-auto overscroll-contain px-5 pb-6">
        <MobileSection id="letters" title={letters.label} open={section === "letters"} onToggle={() => toggle("letters")}>
          <MobileLinks items={letters.items} />
        </MobileSection>

        <MobileSection id="states" title="States" open={section === "states"} onToggle={() => toggle("states")}>
          <StateSearch q={q} setQ={setQ} id="state-search-mobile" />
          <div className="mt-4 rounded-2xl bg-white p-4 ring-1 ring-line-200">
            <StateDirectory groups={groups} columns="columns-2" />
          </div>
        </MobileSection>

        <MobileSection id="learn" title={learn.label} open={section === "learn"} onToggle={() => toggle("learn")}>
          <MobileLinks items={learn.items} />
          <div className="mb-1 mt-5 text-[12px] font-bold uppercase tracking-[0.14em] text-gold-600">Most read</div>
          <ul>
            {MOST_READ.map((item) => (
              <li key={item.href} className="border-b border-line-200 last:border-0">
                <Link href={item.href} className="flex min-h-[48px] items-center text-[15px] font-semibold text-[#1A3D4F]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </MobileSection>

        <MobileSection id="about" title={about.label} open={section === "about"} onToggle={() => toggle("about")}>
          <MobileLinks items={about.items} />
        </MobileSection>

        <Link
          href="/pricing/"
          className="flex min-h-[64px] items-center justify-between border-b border-line-200 font-heading text-[26px] font-bold text-[#1A3D4F]"
        >
          Pricing
          <ArrowRight aria-hidden className="size-5 text-gold-600" />
        </Link>

        <div className="mt-6 space-y-1 text-[15px]">
          <a href={PHONE.href} className="flex min-h-[44px] items-center gap-3 font-semibold text-[#1A3D4F]">
            <Phone aria-hidden className="size-[18px] text-[#1D6E72]" /> {PHONE.display}
          </a>
          <a href={`mailto:${EMAIL}`} className="flex min-h-[44px] items-center gap-3 font-semibold text-[#1A3D4F]">
            <Mail aria-hidden className="size-[18px] text-[#1D6E72]" /> {EMAIL}
          </a>
        </div>
      </div>

      {/* Actions stay in reach at the bottom of the sheet */}
      <div className="space-y-2.5 border-t border-line-200 bg-white px-5 pb-[max(16px,env(safe-area-inset-bottom))] pt-4">
        {!isPsd && (
          <button
            type="button"
            onClick={() => {
              close();
              openEsaEligibilityChecker();
            }}
            className="cta3d cta3d--outline flex h-[50px] w-full items-center justify-center gap-2 text-[15px]"
          >
            <ClipboardCheck aria-hidden className="size-[18px]" /> Check My Eligibility, Free
          </button>
        )}
        <CtaButton
          href="#pricing"
          centerLabel
          forceStateModal
          letter={isPsd ? "psd" : "esa"}
          className="w-full !h-[54px] !text-[16px]"
          onClick={close}
        >
          {isPsd ? "Start Your Consultation" : "Start Your ESA Evaluation"}
        </CtaButton>
      </div>
    </div>
  );
}

/* ───────────── header ───────────── */

/**
 * Site header. Desktop: text navigation with a gold underline marker; each
 * item opens an editorial mega panel (cream intro rail, numbered index rows,
 * a photo feature) on hover or click. Phones: a full-height cream sheet with
 * serif accordion sections and the evaluation actions pinned to the bottom.
 * All links are rendered in the HTML even while closed, for crawlers.
 */
export function Header() {
  const [menu, setMenu] = useState<MenuKey | null>(null);
  const [sheet, setSheet] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  const isPsd = pathname === "/psd-letter/";
  const isDoctors = pathname === "/esa-doctors/";
  const isLegalReviewer =
    pathname?.includes("legal-reviewer") || pathname?.includes("reviewer") || pathname?.includes("contributors");

  const close = useCallback(() => {
    setMenu(null);
    setSheet(false);
  }, []);

  // Close menus after navigation (render-time reset).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenu(null);
    setSheet(false);
  }

  const cancel = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
  }, []);
  const schedule = (fn: () => void, ms: number) => {
    cancel();
    timer.current = setTimeout(fn, ms);
  };
  useEffect(() => cancel, [cancel]);

  useEffect(() => {
    if (!menu && !sheet) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menu, sheet, close]);

  // Phones: pin the page behind the open sheet (iOS-safe).
  useEffect(() => {
    if (!sheet) return;
    const body = document.body;
    const header = headerRef.current;
    const scrollY = window.scrollY;
    const prev = { o: body.style.overflow, p: body.style.position, t: body.style.top, w: body.style.width, pt: body.style.paddingTop };
    if (header) {
      header.style.position = "fixed";
      header.style.inset = "0 0 auto 0";
      body.style.paddingTop = `${header.offsetHeight}px`;
    }
    document.documentElement.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    return () => {
      document.documentElement.style.overflow = "";
      body.style.overflow = prev.o;
      body.style.position = prev.p;
      body.style.top = prev.t;
      body.style.width = prev.w;
      body.style.paddingTop = prev.pt;
      if (header) {
        header.style.position = "";
        header.style.inset = "";
      }
      window.scrollTo(0, scrollY);
    };
  }, [sheet]);

  return (
    <>
      {menu && <div aria-hidden onClick={close} className="menu-fade fixed inset-0 z-[85] hidden bg-[#1A3D4F]/35 lg:block" />}
      <header
        ref={headerRef}
        onMouseLeave={() => menu && schedule(() => setMenu(null), 220)}
        onMouseEnter={cancel}
        className={`sticky top-0 border-b border-line-200 bg-white ${menu || sheet ? "z-[90]" : "z-50"}`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:h-[88px] lg:px-8 xl:px-[80px]">
          <Link href="/" className="flex min-w-0 shrink items-center" aria-label="My ESA Therapist home">
            <Image
              quality={90}
              src="/common/myesa-logo.svg"
              alt="My ESA Therapist"
              width={171}
              sizes="171px"
              height={71}
              priority
              loading="eager"
              unoptimized
              className="h-11 w-auto max-w-full object-contain sm:h-14 lg:h-[60px]"
            />
          </Link>

          <nav aria-label="Main" className="hidden h-full items-stretch lg:flex">
            {NAV.map((item) => {
              const active = menu === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  aria-expanded={active}
                  aria-controls="site-menu"
                  onClick={() => {
                    cancel();
                    setMenu((m) => (m === item.key ? null : item.key));
                  }}
                  onMouseEnter={() => schedule(() => setMenu(item.key), menu ? 60 : 140)}
                  className="group/nav relative flex items-center gap-1 px-3.5 text-[15.5px] font-semibold text-[#1A3D4F] xl:px-5"
                >
                  <span className={`transition-colors ${active ? "text-[#1D6E72]" : "group-hover/nav:text-[#1D6E72]"}`}>{item.label}</span>
                  <ChevronDown aria-hidden className={`size-4 text-gold-600 transition-transform duration-200 ${active ? "rotate-180" : ""}`} />
                  <span
                    aria-hidden
                    className={`absolute inset-x-3.5 bottom-[-1px] h-[3px] origin-center rounded-full bg-accent transition-transform duration-300 xl:inset-x-5 ${
                      active ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-50"
                    }`}
                  />
                </button>
              );
            })}
            <Link
              href="/pricing/"
              onMouseEnter={() => menu && schedule(() => setMenu(null), 120)}
              className={`group/nav relative flex items-center px-3.5 text-[15.5px] font-semibold xl:px-5 ${
                pathname === "/pricing/" ? "text-[#1D6E72]" : "text-[#1A3D4F] hover:text-[#1D6E72]"
              }`}
            >
              Pricing
              <span
                aria-hidden
                className={`absolute inset-x-3.5 bottom-[-1px] h-[3px] rounded-full bg-accent transition-transform duration-300 xl:inset-x-5 ${
                  pathname === "/pricing/" ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-50"
                }`}
              />
            </Link>
          </nav>

          <div className="hidden shrink-0 items-center gap-5 lg:flex">
            {isPsd ? (
              <CtaButton href="#pricing" className="h-[52px] w-auto px-6 text-[16px]">
                Start Your Consultation
              </CtaButton>
            ) : isDoctors || isLegalReviewer ? (
              <CtaButton href={isLegalReviewer ? "/#pricing" : "#therapists"} className="h-[52px] w-auto px-6 text-[16px]">
                Start Your ESA Evaluation
              </CtaButton>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => openEsaEligibilityChecker()}
                  className="group/chk hidden items-center gap-2 text-[15px] font-semibold text-[#1D6E72] xl:inline-flex"
                >
                  <span className="grid size-9 place-items-center rounded-full bg-background transition-colors group-hover/chk:bg-accent group-hover/chk:text-[#1A3D4F]">
                    <ClipboardCheck aria-hidden className="size-[18px]" />
                  </span>
                  <span className="underline decoration-transparent decoration-2 underline-offset-4 transition-colors group-hover/chk:decoration-gold-600">
                    Am I eligible?
                  </span>
                </button>
                <CtaButton href="#pricing" forceStateModal className="h-[52px] w-auto text-[16px]">
                  Start Your ESA Evaluation
                </CtaButton>
              </>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-1.5 lg:hidden">
            {!sheet && (
              <CtaButton
                variant="accent"
                letter={isPsd ? "psd" : "esa"}
                forceStateModal
                className="!h-11 w-auto !gap-1.5 !px-4 !text-[14px] [&_.cta-arrow]:!size-4"
              >
                Start Evaluation
              </CtaButton>
            )}
            <button
              type="button"
              onClick={() => setSheet((v) => !v)}
              aria-label={sheet ? "Close menu" : "Open menu"}
              aria-expanded={sheet}
              aria-controls="mobile-navigation"
              className="flex h-11 items-center gap-2 rounded-full pl-2 pr-0.5 text-[15px] font-semibold text-[#1A3D4F]"
            >
              <span className={sheet ? "" : "sr-only sm:not-sr-only"}>{sheet ? "Close" : "Menu"}</span>
              <span aria-hidden className="relative grid size-10 place-items-center rounded-full bg-primary text-white">
                <span className={`absolute h-[2px] w-4 rounded-full bg-current transition-transform duration-300 ${sheet ? "rotate-45" : "-translate-y-[3px]"}`} />
                <span className={`absolute h-[2px] w-4 rounded-full bg-current transition-transform duration-300 ${sheet ? "-rotate-45" : "translate-y-[3px]"}`} />
              </span>
            </button>
          </div>
        </div>

        {/* Desktop mega panel: every panel is in the HTML, only the active one shows. */}
        <div
          id="site-menu"
          aria-hidden={!menu}
          onClick={(e) => (e.target as HTMLElement).closest("a") && close()}
          className={`absolute inset-x-0 top-full hidden border-t border-line-200 bg-white shadow-[0_30px_60px_-30px_rgba(26,61,79,0.5)] ${menu ? "menu-drop lg:block" : ""}`}
        >
          <div className="mx-auto max-w-[1278px] px-8 py-8 xl:px-0">
            {NAV.map((item) => (
              <div key={item.key} className={menu === item.key ? "menu-panel" : "hidden"}>
                <DesktopPanel menu={item.key} onNavigate={close} />
              </div>
            ))}
          </div>
        </div>

        <MobileSheet open={sheet} close={close} isPsd={isPsd} />
      </header>
    </>
  );
}
