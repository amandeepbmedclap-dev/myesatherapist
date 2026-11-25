"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lock, RotateCcw, Stethoscope } from "lucide-react";
import { SiteReviewerBanner } from "@/components/state/SiteReviewerBanner";

/** Pages piloting the redesigned trust band (visual overhaul pilot). */
const PILOT = new Set(["/esa-letter-florida/"]);

const items = [
  { icon: Stethoscope, title: "State-licensed clinicians", sub: "Evaluations by professionals licensed where you live", href: "/esa-doctors/" },
  { icon: Lock, title: "Secure, encrypted checkout", sub: "Payments processed through encrypted systems", href: "/privacy-policy/" },
  { icon: RotateCcw, title: "Money-back guarantee", sub: "See exactly how refunds work", href: "/refund-policy/" },
];

/** Top of the footer: reviewer credit and the trust signals we can substantiate. */
export function FooterTrustBand({ legacy }: { legacy: React.ReactNode }) {
  const pathname = usePathname() ?? "";
  if (!PILOT.has(pathname)) return <>{legacy}</>;
  return (
    <div className="border-b border-white/10 py-8 lg:py-9">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        <div className="flex items-center gap-4 rounded-[18px] bg-white/[0.04] p-4 ring-1 ring-white/10 lg:rounded-none lg:bg-transparent lg:p-0 lg:pr-6 lg:ring-0">
          <span className="flex h-12 w-[92px] shrink-0 items-center justify-center rounded-[12px] bg-white px-2">
            <span className="relative block h-full w-full">
              <Image quality={90} src="/common/hipaa-logo.webp" alt="HIPAA compliant" fill className="object-contain" sizes="92px" />
            </span>
          </span>
          <span className="font-sans">
            <span className="block text-[15px] font-semibold leading-[21px] text-white">HIPAA-compliant platform</span>
            <span className="block text-[13px] leading-[19px] text-white/60">Your health information stays private</span>
          </span>
        </div>
        {items.map(({ icon: Icon, title, sub, href }) => (
          <Link
            key={title}
            href={href}
            className="group flex items-center gap-4 rounded-[18px] bg-white/[0.04] p-4 ring-1 ring-white/10 transition-colors hover:bg-white/[0.07] lg:rounded-none lg:border-l lg:border-white/10 lg:bg-transparent lg:px-6 lg:py-0 lg:ring-0 lg:hover:bg-transparent"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent ring-1 ring-accent/30">
              <Icon aria-hidden className="size-5" />
            </span>
            <span className="font-sans">
              <span className="block text-[15px] font-semibold leading-[21px] text-white group-hover:text-accent">{title}</span>
              <span className="block text-[13px] leading-[19px] text-white/60">{sub}</span>
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-7 border-t border-white/10 pt-6">
        <SiteReviewerBanner placement="footer" />
      </div>
    </div>
  );
}
