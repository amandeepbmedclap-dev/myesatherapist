import { STATE_INDEX_BY_SLUG } from "@/data/stateIndex";

const EVALUATION_CTA_LABELS = new Set([
  "get started",
  "start evaluation",
  "start your evaluation",
  "start your esa evaluation",
  "start esa evaluation",
  "start your esa evaluation now",
  "apply for esa + psd letter",
  "apply now",
  "find the right option",
  "find your option",
  "schedule your evaluation",
  "schedule consultation",
  "schedule consultation now",
  "schedule your esa assessment",
  "start your consultation",
  "start your application",
  "start your renewal online",
  "begin your renewal process",
  "book appointment",
  "book your appointment",
  "apply your esa letter",
  "apply your esa letter now",
  "apply esa letter now",
  "begin with esa letter evaluation",
  "renew your esa letter now",
  "talk with a licensed therapist",
  "find your eligibility",
  "find your eligibility in minutes",
  "begin your evaluation",
  "start your confidential esa evaluation",
  "start your esa assessment",
  "schedule a consultation",
  "schedule a consultation now",
  "book an esa evaluation",
  "book an online esa evaluation",
  "apply my esa letter",
  // Current wording (components/common/ctaCopy.ts)
  "start my esa evaluation",
  "start my evaluation",
  "start my psd evaluation",
  "start my esa + psd evaluation",
  "start my esa & psd evaluation",
  "renew my esa letter",
  "book my evaluation",
]);

export const OPEN_STATE_MODAL_EVENT = "open-state-select-modal";
export const OPEN_ESA_CHECKER_EVENT = "open-esa-eligibility-checker";

export type StateModalLetter = "esa" | "psd";

export function isEvaluationCtaLabel(label: string) {
  const text = label.replace(/\s+/g, " ").trim().toLowerCase();
  return EVALUATION_CTA_LABELS.has(text);
}

function isStatePage(pathname: string) {
  const match = pathname.match(/^\/esa-letter-([^/]+)\/?$/);
  return Boolean(match && STATE_INDEX_BY_SLUG[match[1]]);
}

function documentZoom() {
  const raw = Number.parseFloat(getComputedStyle(document.body).zoom);
  return Number.isFinite(raw) && raw > 0 ? raw : 1;
}

function scrollToStateHeroForm() {
  if (!isStatePage(window.location.pathname)) return false;
  const forms = Array.from(document.querySelectorAll<HTMLElement>("[data-state-hero-form]"));
  const form = forms.find((el) => {
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  });
  if (!form) return false;
  if (window.location.hash) {
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  }
  // Between 1024px and 1439px the layout script zooms body to fit a 1440px
  // design. getBoundingClientRect is in visual pixels and scrollY is in
  // layout pixels, so the visual distance has to be multiplied by zoom.
  // Windows Chrome also ignores smooth scrolling while that zoom is not 1,
  // and the document's scroll-behavior is smooth, so "auto" would still be ignored.
  const zoom = documentZoom();
  const header = document.querySelector("header");
  const offset = header ? header.getBoundingClientRect().bottom : 0;
  const top = window.scrollY + (form.getBoundingClientRect().top - offset - 16) * zoom;
  const behavior: ScrollBehavior = zoom === 1 ? "smooth" : "instant";
  window.scrollTo({ top: Math.max(0, top), behavior });
  return true;
}

export function openStateSelectModal(letter?: StateModalLetter, options?: { force?: boolean }) {
  if (typeof window === "undefined") return;
  if (!options?.force && scrollToStateHeroForm()) return;
  window.dispatchEvent(new CustomEvent(OPEN_STATE_MODAL_EVENT, { detail: { letter } }));
}

export function openEsaEligibilityChecker() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(OPEN_ESA_CHECKER_EVENT));
}
