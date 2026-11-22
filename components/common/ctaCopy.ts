/**
 * One place for call-to-action wording across the site.
 *
 * Old button labels (from components and content data) are mapped to a small
 * set of conversion-tested patterns:
 *  - first person ("My") rather than "Your"
 *  - the specific outcome the visitor is starting (an ESA evaluation), not a
 *    vague "Get Started" or "Apply Now"
 *  - no promise of approval: the letter depends on the evaluation
 * Labels not listed here are shown as written.
 */
export const CTA = {
  esa: "Start My ESA Evaluation",
  esaShort: "Start My Evaluation",
  psd: "Start My PSD Evaluation",
  combo: "Start My ESA + PSD Evaluation",
  renew: "Renew My ESA Letter",
  book: "Book My Evaluation",
  checker: "Check My Eligibility, Free",
  read: "Read the Guide",
} as const;

const MAP: Record<string, string> = {
  // ESA evaluation
  "get started": CTA.esa,
  "start your evaluation": CTA.esa,
  "start your evaluation now": CTA.esa,
  "start your esa evaluation": CTA.esa,
  "start your esa evaluation now": CTA.esa,
  "start my esa evaluation now!": CTA.esa,
  "start my esa evaluation now": CTA.esa,
  "start esa evaluation": CTA.esa,
  "start your confidential esa evaluation": CTA.esa,
  "start your esa assessment": CTA.esa,
  "start your application": CTA.esa,
  "schedule your esa assessment": CTA.esa,
  "schedule your evaluation": CTA.esa,
  "schedule an evaluation": CTA.esa,
  "begin your evaluation": CTA.esa,
  "begin with esa letter evaluation": CTA.esa,
  "book an esa evaluation": CTA.esa,
  "book an online esa evaluation": CTA.esa,
  "apply now": CTA.esa,
  "apply your esa letter": CTA.esa,
  "apply your esa letter now": CTA.esa,
  "apply esa letter now": CTA.esa,
  "apply my esa letter": CTA.esa,
  "find your eligibility": CTA.esa,
  "find your eligibility in minutes": CTA.esa,
  "find the right option": CTA.esa,
  "find your option": CTA.esa,
  "talk with a licensed therapist": CTA.esa,
  "connect with a licensed professional": CTA.esa,
  "work with licensed professionals": CTA.esa,
  "start evaluation": CTA.esaShort,
  // PSD
  "start your consultation": CTA.psd,
  "schedule consultation": CTA.psd,
  "schedule consultation now": CTA.psd,
  "schedule a consultation": CTA.esa,
  "schedule a consultation now": CTA.esa,
  "apply for esa + psd letter": CTA.combo,
  // Renewal
  "start your renewal online": CTA.renew,
  "begin your renewal process": CTA.renew,
  "renew your esa letter now": CTA.renew,
  // Booking with a named therapist
  "book appointment": CTA.book,
  "book your appointment": CTA.book,
  // Free eligibility checker
  "free esa eligibility checker": CTA.checker,
  // Content
  "read more": CTA.read,
};

export function ctaLabel(label: string, letter?: "esa" | "psd"): string {
  const key = label.replace(/\s+/g, " ").trim().toLowerCase();
  const mapped = MAP[key];
  if (!mapped) return label;
  if (letter === "psd" && (mapped === CTA.esa || mapped === CTA.esaShort)) return CTA.psd;
  return mapped;
}
