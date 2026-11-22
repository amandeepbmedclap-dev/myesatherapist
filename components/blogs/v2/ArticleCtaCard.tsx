import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { CtaButton } from "@/components/common/CtaButton";

const CLINICIANS = [
  { src: "/images/doctors/robert-staaf-profile-image.webp", alt: "Robert Staaf" },
  { src: "/images/doctors/leslie-k.-gamble-licsw-image.webp", alt: "Leslie K. Gamble" },
  { src: "/images/doctors/dr-gaurav-patel-image.webp", alt: "Dr. Gaurav Patel" },
];

/** Conversion card for the article sidebar (and inline on smaller screens). */
export function ArticleCtaCard({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[24px] color-gradient p-6 text-white shadow-[0_30px_60px_-40px_rgba(26,61,79,0.9)] ${className}`}>
      <span aria-hidden className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-accent/15" />
      <div className="relative flex -space-x-2.5">
        {CLINICIANS.map((c) => (
          <span key={c.src} className="relative size-10 overflow-hidden rounded-full ring-2 ring-[#1D4F5C]">
            <Image src={c.src} alt={c.alt} fill sizes="40px" className="object-cover" />
          </span>
        ))}
      </div>
      <div className="relative mt-4 font-heading text-[22px] font-bold leading-[29px]">Talk to a licensed clinician about an ESA letter</div>
      <ul className="relative mt-4 space-y-2 font-sans text-[14px] leading-[21px] text-white/90">
        {["Evaluation by a clinician licensed in your state", "$99, no hidden fees", "Secure, HIPAA-compliant telehealth"].map((t) => (
          <li key={t} className="flex gap-2">
            <Check aria-hidden className="mt-[2px] size-4 shrink-0 text-accent" /> {t}
          </li>
        ))}
      </ul>
      <CtaButton className="relative mt-5 w-full">Start My ESA Evaluation</CtaButton>
      <div className="relative mt-3 text-center font-sans text-[12.5px] text-white/70">
        Covered by our <Link href="/refund-policy/" className="underline decoration-accent/80 underline-offset-2 hover:text-white">money-back guarantee</Link>
      </div>
    </div>
  );
}
