"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Download, X } from "lucide-react";
import { openEsaEligibilityChecker } from "@/components/common/evaluationCta";

/**
 * Exit-intent popup: offers The Renter's ESA Kit (free PDF) for an email,
 * with a quieter path to the free eligibility checker for people who are
 * ready now. Shown at most once every 10 days, never after a signup, never
 * on policy pages and never over another open dialog.
 * Preview on any page with #exit-preview.
 */
const PDF = "/downloads/renters-esa-kit-2026.pdf";
const SEEN = "met-exit-seen";
const DONE = "met-exit-done";
const COOLDOWN = 10 * 24 * 60 * 60 * 1000;
const ARM_AFTER = 10000;
const SKIP = /^\/(privacy-policy|terms-of-use|refund-policy|editorial-policy|hipaa-compliance|telehealth-consent|accessibility-statement|disclaimer|contact-us)\//;

type DL = { dataLayer?: Record<string, unknown>[] };
const track = (event: string, extra: Record<string, unknown> = {}) => {
  const w = window as unknown as DL;
  (w.dataLayer ??= []).push({ event, ...extra });
};
const store = {
  get(k: string) {
    try {
      return localStorage.getItem(k);
    } catch {
      return null;
    }
  },
  set(k: string, v: string) {
    try {
      localStorage.setItem(k, v);
    } catch {}
  },
};

export function ExitIntentPopup() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const armed = useRef(false);

  const allowed = useCallback(() => {
    if (SKIP.test(pathname)) return false;
    if (store.get(DONE)) return false;
    const seen = Number(store.get(SEEN) ?? 0);
    if (seen && Date.now() - seen < COOLDOWN) return false;
    if (document.querySelector('[aria-modal="true"]')) return false;
    if (document.getElementById("mobile-navigation")?.getAttribute("aria-hidden") === "false") return false;
    return true;
  }, [pathname]);

  const trigger = useCallback(
    (how: string) => {
      if (!armed.current || !allowed()) return;
      armed.current = false;
      store.set(SEEN, String(Date.now()));
      setOpen(true);
      track("exit_popup_view", { page_path: pathname, trigger: how });
    },
    [allowed, pathname],
  );

  useEffect(() => {
    if (window.location.hash === "#exit-preview") {
      const t = window.setTimeout(() => setOpen(true), 300);
      return () => window.clearTimeout(t);
    }
    const arm = window.setTimeout(() => (armed.current = true), ARM_AFTER);
    const desktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    // Desktop: the pointer leaves through the top of the window (tabs, back button, close).
    const onOut = (e: MouseEvent) => {
      if (!e.relatedTarget && e.clientY <= 4) trigger("mouse_exit");
    };

    // Phones: a fast flick back up after reading at least half the page.
    let lastY = window.scrollY;
    let lastT = performance.now();
    let depth = 0;
    const onScroll = () => {
      const y = window.scrollY;
      const t = performance.now();
      const max = document.documentElement.scrollHeight - window.innerHeight;
      depth = Math.max(depth, max > 0 ? y / max : 0);
      if (depth > 0.5 && lastY - y > 160 && t - lastT < 300) trigger("scroll_up");
      lastY = y;
      lastT = t;
    };

    if (desktop) document.documentElement.addEventListener("mouseout", onOut);
    else window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(arm);
      document.documentElement.removeEventListener("mouseout", onOut);
      window.removeEventListener("scroll", onScroll);
    };
  }, [trigger]);

  if (!open) return null;
  return <ExitDialog path={pathname} onClose={() => setOpen(false)} />;
}

function ExitDialog({ path, onClose }: { path: string; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [updates, setUpdates] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  const [emailed, setEmailed] = useState(false);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    const html = document.documentElement;
    const before = html.style.overflow;
    html.style.overflow = "hidden";
    ref.current?.querySelector<HTMLElement>("#exit-email")?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !ref.current) return;
      const els = [...ref.current.querySelectorAll<HTMLElement>("a[href],button:not([disabled]),input")];
      if (!els.length) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = before;
      document.removeEventListener("keydown", onKey);
      prev?.focus?.();
    };
  }, [onClose]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setStatus("sending");
    const hp = String(new FormData(e.currentTarget).get("website") ?? "");
    const res = await fetch("/api/lead/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: value, updates, path, hp }),
    }).catch(() => null);
    setEmailed(!!res?.ok);
    store.set(DONE, "1");
    track("generate_lead", { lead_source: "exit_popup", lead_magnet: "renters_esa_kit_2026", page_path: path });
    setStatus("done");
  }

  const checkEligibility = () => {
    track("exit_popup_eligibility", { page_path: path });
    onClose();
    window.setTimeout(() => openEsaEligibilityChecker(), 80);
  };

  return (
    <div
      className="menu-fade fixed inset-0 z-[120] flex items-end justify-center bg-[#1A3D4F]/55 backdrop-blur-[2px] sm:items-center sm:p-6"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-title"
        className="exit-rise relative grid max-h-[94dvh] w-full max-w-[820px] overflow-y-auto overscroll-contain rounded-t-[26px] bg-white shadow-[0_40px_90px_-30px_rgba(26,61,79,0.75)] sm:rounded-[26px] md:grid-cols-[300px_1fr] md:overflow-hidden"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-full bg-white/90 text-[#1A3D4F] ring-1 ring-line-200 transition-colors hover:bg-background"
        >
          <X aria-hidden className="size-5" />
        </button>

        {/* The kit, shown as a small fanned stack of its pages */}
        <div aria-hidden className="relative hidden overflow-hidden bg-background md:block">
          <div className="absolute -left-16 -top-16 size-56 rounded-full bg-accent/25" />
          <div className="absolute -bottom-20 -right-10 size-56 rounded-full bg-[#1D6E72]/10" />
          <div className="relative flex h-full items-center justify-center py-10">
            <div className="relative h-[300px] w-[210px]">
              <Image src="/downloads/renters-esa-kit-2026-p5.webp" alt="" width={210} height={272} className="absolute left-6 top-6 w-[190px] rotate-[8deg] rounded-md shadow-[0_14px_30px_-16px_rgba(26,61,79,0.6)] ring-1 ring-line-200" />
              <Image src="/downloads/renters-esa-kit-2026-p4.webp" alt="" width={210} height={272} className="absolute left-2 top-3 w-[195px] rotate-[3deg] rounded-md shadow-[0_14px_30px_-16px_rgba(26,61,79,0.6)] ring-1 ring-line-200" />
              <Image src="/downloads/renters-esa-kit-2026-cover.webp" alt="" width={210} height={272} className="exit-cover absolute left-0 top-0 w-[200px] -rotate-[4deg] rounded-md shadow-[0_22px_40px_-18px_rgba(26,61,79,0.7)] ring-1 ring-line-200" />
              <span className="absolute -right-4 bottom-2 grid size-[74px] rotate-[10deg] place-items-center rounded-full bg-accent text-center text-[#1A3D4F] shadow-[0_0_0_5px_rgba(232,185,44,0.25)]">
                <span className="leading-none">
                  <span className="block font-heading text-[19px] font-bold">Free</span>
                  <span className="mt-0.5 block text-[8px] font-extrabold tracking-[0.12em]">8 PAGES</span>
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 pt-7 sm:px-9 sm:pb-8 sm:pt-9">
          {status !== "done" ? (
            <>
              <div className="flex items-start gap-4">
                <Image
                  src="/downloads/renters-esa-kit-2026-cover.webp"
                  alt=""
                  width={72}
                  height={93}
                  className="w-[64px] shrink-0 -rotate-[4deg] rounded shadow-[0_10px_20px_-10px_rgba(26,61,79,0.6)] ring-1 ring-line-200 md:hidden"
                />
                <div className="min-w-0 pr-8">
                  <div className="text-[12px] font-bold uppercase tracking-[0.14em] text-gold-600">Before you go</div>
                  <h2 id="exit-title" className="mt-1 font-heading text-[28px] font-bold leading-[1.12] text-[#1A3D4F] sm:text-[32px]">
                    Take the Renter&apos;s ESA Kit with you.
                  </h2>
                </div>
              </div>
              <div className="mt-3 text-[15px] leading-relaxed text-body-text">
                Free PDF, updated for HUD&apos;s May 2026 change. Everything you need to ask your landlord the right way:
              </div>
              <ol className="mt-4 space-y-2">
                {[
                  "A fill-in request message for your landlord",
                  "The seven marks of a landlord-ready ESA letter",
                  "Calm answers to the questions landlords ask",
                ].map((t, i) => (
                  <li key={t} className="flex items-start gap-3 !text-[15px] !leading-snug text-[#1A3D4F]">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#1A3D4F] font-heading text-[12px] font-bold text-accent">
                      {i + 1}
                    </span>
                    <span className="pt-0.5 font-semibold">{t}</span>
                  </li>
                ))}
              </ol>

              <form onSubmit={submit} noValidate className="mt-6">
                <label htmlFor="exit-email" className="sr-only">
                  Email address
                </label>
                <div className="flex flex-col gap-2 rounded-[18px] bg-background p-1.5 ring-1 ring-line-200 focus-within:ring-[#1D6E72] sm:flex-row sm:rounded-full">
                  <input
                    id="exit-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={!!error}
                    aria-describedby={error ? "exit-error" : undefined}
                    placeholder="Your email address"
                    className="h-12 min-w-0 flex-1 rounded-full bg-transparent px-4 text-[16px] text-[#1A3D4F] outline-none placeholder:text-body-text/70"
                  />
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-6 text-[15px] font-bold text-[#1A3D4F] transition-colors hover:bg-gold-600 disabled:opacity-70"
                  >
                    {status === "sending" ? "Sending..." : "Email me the kit"}
                    {status !== "sending" && <ArrowRight aria-hidden className="size-4" />}
                  </button>
                </div>
                {error && (
                  <div id="exit-error" role="alert" className="mt-2 text-[14px] font-semibold text-[#B3261E]">
                    {error}
                  </div>
                )}
                <label className="mt-3 flex items-start gap-2.5 text-[13px] leading-snug text-body-text">
                  <input
                    type="checkbox"
                    checked={updates}
                    onChange={(e) => setUpdates(e.target.checked)}
                    className="mt-0.5 size-4 shrink-0 accent-[#1D6E72]"
                  />
                  <span>
                    Also send me occasional ESA law updates. Unsubscribe anytime. See our{" "}
                    <Link href="/privacy-policy/" className="underline underline-offset-2 hover:text-[#1A3D4F]">
                      privacy policy
                    </Link>
                    .
                  </span>
                </label>
              </form>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line-200 pt-4">
                <button
                  type="button"
                  onClick={checkEligibility}
                  className="group/e inline-flex min-h-[44px] items-center gap-1.5 text-[14.5px] font-semibold text-[#1D6E72]"
                >
                  Ready now? Check if you qualify, free
                  <ArrowRight aria-hidden className="size-4 transition-transform group-hover/e:translate-x-0.5" />
                </button>
                <button type="button" onClick={onClose} className="min-h-[44px] text-[14px] font-medium text-body-text underline underline-offset-4 hover:text-[#1A3D4F]">
                  No thanks
                </button>
              </div>
            </>
          ) : (
            <div role="status" className="flex h-full flex-col justify-center py-4">
              <span className="grid size-14 place-items-center rounded-full bg-accent text-[#1A3D4F]">
                <Check aria-hidden className="size-7" strokeWidth={2.5} />
              </span>
              <h2 id="exit-title" className="mt-5 font-heading text-[30px] font-bold leading-tight text-[#1A3D4F]">
                Your kit is ready.
              </h2>
              <div className="mt-2 text-[15px] leading-relaxed text-body-text">
                {emailed ? <>Open it now. We&apos;ve also sent a copy to {email.trim()}.</> : "Open it now, or save it to read later."}
              </div>
              <a
                href={PDF}
                target="_blank"
                rel="noopener"
                onClick={() => track("file_download", { file_name: "renters-esa-kit-2026.pdf", link_url: PDF })}
                className="mt-6 inline-flex h-12 w-fit items-center gap-2 rounded-full bg-[#1A3D4F] px-6 text-[15px] font-bold text-white transition-colors hover:bg-primary"
              >
                <Download aria-hidden className="size-5" /> Open the kit (PDF)
              </a>
              <button
                type="button"
                onClick={checkEligibility}
                className="group/e mt-5 inline-flex w-fit items-center gap-1.5 text-[14.5px] font-semibold text-[#1D6E72]"
              >
                Check if you qualify, free
                <ArrowRight aria-hidden className="size-4 transition-transform group-hover/e:translate-x-0.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
