"use client";

import { usePathname } from "next/navigation";
import { SiteReviewerBanner } from "@/components/state/SiteReviewerBanner";
import { STATE_INDEX_BY_SLUG } from "@/data/stateIndex";

/** Reviewer credit in the footer, shown only on state landing pages (/esa-letter-<state>/). */
export function FooterReviewer() {
  const path = usePathname() ?? "";
  const m = path.match(/^\/esa-letter-([a-z-]+)\/?$/);
  if (!m || !STATE_INDEX_BY_SLUG[m[1]]) return null;
  return (
    <div className="mt-8 flex justify-center border-t border-white/10 pt-6">
      <SiteReviewerBanner placement="footer" />
    </div>
  );
}
