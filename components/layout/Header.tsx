"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown } from "lucide-react";
import { CtaButton } from "@/components/common/CtaButton";
import { openEsaEligibilityChecker } from "@/components/common/evaluationCta";
import { MENU_TABS, MenuPanel, type MenuKey } from "./MegaMenu";

const STRIP_STATES = [
  { name: "California", slug: "california" },
  { name: "Texas", slug: "texas" },
  { name: "New York", slug: "new-york" },
  { name: "Florida", slug: "florida" },
  { name: "Colorado", slug: "colorado" },
  { name: "Illinois", slug: "illinois" },
  { name: "Washington", slug: "washington" },
];

function Burger({ open }: { open: boolean }) {
  const bar = "absolute left-0 h-[2px] w-5 rounded-full bg-current transition-transform duration-300";
  return (
    <span aria-hidden className="relative block h-5 w-5">
      <span className={`${bar} top-[5px] ${open ? "translate-y-[4px] rotate-45" : ""}`} />
      <span className={`${bar} top-[13px] ${open ? "-translate-y-[4px] -rotate-45" : "w-3.5"}`} />
    </span>
  );
}

/**
 * Site header: logo, four mega-menu tabs and the evaluation CTAs. Each tab
 * opens a bento-style panel under the bar; on phones the burger opens the
 * same panels with a tab switcher. Every panel stays in the HTML (hidden
 * until opened) so crawlers can follow the links.
 */
export function Header() {
  const [menu, setMenu] = useState<MenuKey | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const open = menu !== null;

  const isPsd = pathname === "/psd-letter/";
  const isDoctors = pathname === "/esa-doctors/";
  const isLegalReviewer =
    pathname?.includes("legal-reviewer") || pathname?.includes("reviewer") || pathname?.includes("contributors");

  const close = useCallback(() => setMenu(null), []);

  // Close the menu after navigation (render-time reset, no effect needed).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenu(null);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(null);
        burgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Lock the page behind the open menu (iOS-safe: pin the body in place).
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const body = document.body;
    const header = headerRef.current;
    const scrollY = window.scrollY;
    const previous = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      bodyPaddingTop: body.style.paddingTop,
    };
    if (header) {
      header.style.position = "fixed";
      header.style.top = "0";
      header.style.left = "0";
      header.style.right = "0";
      body.style.paddingTop = `${header.offsetHeight}px`;
    }
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";

    return () => {
      html.style.overflow = previous.htmlOverflow;
      body.style.overflow = previous.bodyOverflow;
      body.style.position = previous.bodyPosition;
      body.style.top = previous.bodyTop;
      body.style.width = previous.bodyWidth;
      body.style.paddingTop = previous.bodyPaddingTop;
      if (header) {
        header.style.position = "";
        header.style.top = "";
        header.style.left = "";
        header.style.right = "";
      }
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  const toggle = (key: MenuKey) => setMenu((m) => (m === key ? null : key));

  return (
    <>
      {open && (
        <div aria-hidden onClick={close} className="menu-fade fixed inset-0 z-[85] bg-[#1A3D4F]/40" />
      )}
      <header ref={headerRef} className={`sticky top-0 bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.25)] ${open ? "z-[90]" : "z-50"}`}>
        <div className="w-full bg-white">
          <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:h-[98px] lg:px-8 xl:px-[80px]">
            <Link href="/" className="flex min-w-0 shrink items-center">
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
                className="h-12 w-auto max-w-full object-contain sm:h-16 lg:h-[64px] xl:h-[71px]"
              />
            </Link>

            <nav aria-label="Main" className="mx-4 hidden shrink-0 items-center gap-1 lg:flex xl:gap-2">
              {MENU_TABS.map((tab) => {
                const active = menu === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    aria-expanded={active}
                    aria-controls="site-menu"
                    onClick={() => toggle(tab.key)}
                    onMouseEnter={() => open && setMenu(tab.key)}
                    className={`inline-flex h-11 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 text-[15px] font-semibold transition-colors xl:text-[16px] ${
                      active ? "bg-primary text-white" : "text-body-text hover:bg-background hover:text-[#1D6E72]"
                    }`}
                  >
                    {tab.label}
                    <ChevronDown aria-hidden className={`size-4 transition-transform duration-200 ${active ? "rotate-180" : ""}`} />
                  </button>
                );
              })}
            </nav>

            <div className="hidden shrink-0 items-center justify-end gap-[8px] lg:flex">
              {isPsd ? (
                <CtaButton href="#pricing" className="h-[54px] w-auto px-6 text-[16px]">
                  Start Your Consultation
                </CtaButton>
              ) : isDoctors || isLegalReviewer ? (
                <CtaButton href={isLegalReviewer ? "/#pricing" : "#therapists"} className="h-[54px] w-auto px-6 text-[16px]">
                  Start Your ESA Evaluation
                </CtaButton>
              ) : (
                <>
                  <CtaButton
                    variant="secondary"
                    className="h-[54px] w-auto px-6 text-[16px]"
                    onClick={() => openEsaEligibilityChecker()}
                  >
                    Free ESA Eligibility Checker
                  </CtaButton>
                  <CtaButton href="#pricing" forceStateModal className="h-[54px] w-auto text-[16px]">
                    Start Your ESA Evaluation
                  </CtaButton>
                </>
              )}
            </div>

            <div className="flex shrink-0 items-center gap-2 lg:hidden">
              <CtaButton
                variant="accent"
                letter={isPsd ? "psd" : "esa"}
                forceStateModal
                className="!h-11 !min-w-0 w-auto !gap-2 !pl-4 !pr-1 !text-[14px] [&>span:last-child]:!h-8 [&>span:last-child]:!w-8 [&_img]:!h-4 [&_img]:!w-4"
                onClick={close}
              >
                Start Evaluation
              </CtaButton>
              <button
                ref={burgerRef}
                type="button"
                onClick={() => setMenu((m) => (m ? null : "services"))}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="site-menu"
                className={`grid size-11 shrink-0 place-items-center rounded-full transition-colors ${
                  open ? "bg-primary text-white" : "bg-background text-primary"
                }`}
              >
                <Burger open={open} />
              </button>
            </div>
          </div>
        </div>

        <div className="hidden h-[37px] w-full bg-background lg:block">
          <div className="mx-auto flex h-full max-w-[1278px] items-center justify-between px-4 sm:px-6 lg:px-6 xl:px-0">
            <div className="no-scrollbar flex h-[26px] items-center gap-4 overflow-x-auto lg:gap-[26px]">
              {STRIP_STATES.map((st) => {
                const href = `/esa-letter-${st.slug}/`;
                const isActive = pathname === href || pathname === `/esa-letter-${st.slug}`;
                return (
                  <Link
                    key={st.slug}
                    href={href}
                    className={`whitespace-nowrap font-sans text-[13px] font-medium leading-[26px] text-body-text transition-colors xl:text-[14px] ${
                      isActive ? "font-bold" : ""
                    }`}
                  >
                    {st.name}
                  </Link>
                );
              })}
            </div>
            <Link
              href="/state/"
              className="flex shrink-0 items-center gap-2 whitespace-nowrap font-sans text-[13px] font-medium leading-[26px] text-body-text transition-opacity hover:opacity-85 xl:text-[14px]"
            >
              <span>See All 50 States</span>
              <ArrowRight className="h-4 w-4 text-body-text" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* Mega menu: every panel is in the HTML, only the active one is shown. */}
        <div
          id="site-menu"
          aria-hidden={!open}
          onClick={(e) => (e.target as HTMLElement).closest("a") && close()}
          className={`menu-drop absolute inset-x-0 top-full max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain border-t border-line-200 bg-white shadow-[0_24px_48px_-24px_rgba(26,61,79,0.45)] lg:max-h-[calc(100dvh-135px)] ${
            open ? "" : "hidden"
          }`}
        >
          <div className="mx-auto max-w-[1278px] px-3 py-3 sm:px-6 sm:py-5 xl:px-0">
            {/* Tab switcher for phones and tablets */}
            <div role="tablist" aria-label="Menu sections" className="mb-3 grid grid-cols-4 gap-1.5 lg:hidden">
              {MENU_TABS.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={menu === tab.key}
                  onClick={() => setMenu(tab.key)}
                  className={`h-11 rounded-full px-2 text-[13px] font-semibold transition-colors sm:text-[14px] ${
                    menu === tab.key ? "bg-primary text-white" : "bg-background text-[#1A3D4F]"
                  }`}
                >
                  {tab.short}
                </button>
              ))}
            </div>

            {MENU_TABS.map((tab) => (
              <div key={tab.key} className={menu === tab.key ? "menu-panel" : "hidden"}>
                <MenuPanel menu={tab.key} onNavigate={close} />
              </div>
            ))}

            {/* Phone-only CTAs */}
            {!isPsd && (
              <div className="mt-3 lg:hidden">
                <CtaButton
                  variant="secondary"
                  className="h-[48px] w-full justify-center"
                  onClick={() => {
                    close();
                    openEsaEligibilityChecker();
                  }}
                >
                  Free ESA Eligibility Checker
                </CtaButton>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
