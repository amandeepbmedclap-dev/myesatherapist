import Image from "next/image";
import Link from "next/link";
import { SiteReviewerBanner } from "@/components/state/SiteReviewerBanner";

/** Trust seals: only claims the business can substantiate. Each links to its proof page. */
const SEALS = [
  { src: "/badges/hipaa-compliant-seal.svg", alt: "HIPAA compliant seal", label: "HIPAA-compliant platform", href: "/hipaa-compliance/" },
  { src: "/badges/state-licensed-clinicians-seal.svg", alt: "State-licensed clinicians seal", label: "State-licensed clinicians", href: "/esa-doctors/" },
  { src: "/badges/secure-encrypted-checkout-seal.svg", alt: "Secure encrypted checkout seal", label: "Secure, encrypted checkout", href: "/privacy-policy/" },
  { src: "/badges/money-back-guarantee-seal.svg", alt: "100% money-back guarantee seal", label: "Money-back guarantee", href: "/refund-policy/" },
  { src: "/badges/clinician-reviewed-content-seal.svg", alt: "Clinician-reviewed content seal", label: "Clinician-reviewed content", href: "/editorial-policy/" },
];

/** Top of the footer: trust seals and the reviewer credit. */
export function FooterTrustBand() {
  return (
    <div className="border-b border-white/10 py-9 lg:py-10">
      <ul className="flex flex-wrap justify-center gap-x-4 gap-y-7 sm:grid sm:grid-cols-5 lg:gap-x-8">
        {SEALS.map((s) => (
          <li key={s.src} className="w-[30%] sm:w-auto">
            <Link href={s.href} className="group flex flex-col items-center gap-3 text-center">
              <Image
                src={s.src}
                alt={s.alt}
                width={112}
                height={112}
                unoptimized
                className="size-[84px] drop-shadow-[0_10px_18px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-[-4deg] sm:size-[96px] lg:size-[108px]"
              />
              <span className="font-sans text-[12.5px] font-semibold leading-[17px] text-white/80 group-hover:text-accent sm:text-[13.5px]">{s.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex justify-center border-t border-white/10 pt-6">
        <SiteReviewerBanner placement="footer" />
      </div>
    </div>
  );
}
