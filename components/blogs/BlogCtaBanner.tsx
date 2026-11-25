import Image from "next/image";
import Link from "next/link";
import { Check, ShieldCheck, Star } from "lucide-react";
import { CtaButton } from "@/components/common/CtaButton";

const CLINICIANS = [
  { src: "/images/doctors/robert-staaf-profile-image.webp", alt: "Robert Staaf" },
  { src: "/images/doctors/leslie-k.-gamble-licsw-image.webp", alt: "Leslie K. Gamble" },
  { src: "/images/doctors/dr-gaurav-patel-image.webp", alt: "Dr. Gaurav Patel" },
];

const POINTS = ["Evaluation by a clinician licensed in your state", "Secure, HIPAA-compliant telehealth", "$99, no hidden fees"];

type Props = {
  heading: string;
  description: string;
  buttonText: string;
  buttonHref?: string;
  id?: string;
  eyebrow?: string;
  className?: string;
};

/** In-article and end-of-article conversion banner for blog posts. */
export function BlogCtaBanner({ heading, description, buttonText, buttonHref, id, eyebrow = "Your next step", className = "" }: Props) {
  return (
    <aside
      id={id}
      aria-label={heading}
      className={`@container relative my-10 overflow-hidden rounded-[26px] color-gradient text-white shadow-[0_30px_60px_-38px_rgba(26,61,79,0.95)] sm:my-12 scroll-mt-28 ${className}`}
    >
      <span aria-hidden className="pointer-events-none absolute -left-24 -top-28 size-72 rounded-full bg-accent/15 blur-3xl" />
      <span aria-hidden className="pointer-events-none absolute -bottom-32 right-1/3 size-72 rounded-full bg-white/[0.06] blur-3xl" />

      <div className="relative grid items-stretch @3xl:grid-cols-[minmax(0,1fr)_270px]">
        <div className="p-6 @lg:p-9 @3xl:p-10">
          <div className="flex items-center gap-3 font-sans text-[12px] font-bold uppercase tracking-[0.16em] text-accent">
            <span aria-hidden className="h-[2px] w-7 bg-accent" />
            {eyebrow}
          </div>
          <h3 className="mt-3 font-heading !text-[26px] font-bold !leading-[1.2] !text-white sm:!text-[30px]">{heading}</h3>
          <p className="mt-3 max-w-[520px] font-sans !text-[16px] !leading-[1.6] !text-white/85">{description}</p>

          <ul className="mt-5 grid gap-2.5 font-sans text-[14.5px] leading-[1.45] text-white/90 sm:grid-cols-1">
            {POINTS.map((t) => (
              <li key={t} className="flex items-start gap-2.5">
                <span className="mt-[1px] flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/20">
                  <Check aria-hidden className="size-3.5 text-accent" strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </ul>

          <CtaButton href={buttonHref} stateModal variant="accent" className="mt-6 w-full @xl:w-auto">
            {buttonText}
          </CtaButton>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-5">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {CLINICIANS.map((c) => (
                  <span key={c.src} className="relative size-9 overflow-hidden rounded-full ring-2 ring-[#1D5763]">
                    <Image src={c.src} alt={c.alt} fill sizes="36px" className="object-cover" />
                  </span>
                ))}
              </div>
              <div className="whitespace-nowrap font-sans text-[13px] leading-[1.35] text-white/80">
                <span className="flex items-center gap-1 font-bold text-white">
                  <Star aria-hidden className="size-3.5 fill-accent text-accent" /> 6,500+ clients supported
                </span>
                by licensed clinicians
              </div>
            </div>
            <p className="flex items-center gap-2 font-sans text-[13px] text-white/75">
              <ShieldCheck aria-hidden className="size-4 shrink-0 text-accent" />
              <span>
                Covered by our{" "}
                <Link href="/refund-policy/" className="underline decoration-accent/80 underline-offset-2 hover:text-white">
                  money-back guarantee
                </Link>
              </span>
            </p>
          </div>
        </div>

        <div className="relative hidden @3xl:block">
          <Image
            src="/images/common/telehealth-esa-evaluation-video-call.webp"
            alt="Woman on a telehealth video call with a licensed clinician for her ESA evaluation"
            fill
            sizes="280px"
            className="object-cover"
            style={{ objectPosition: "40% 50%" }}
          />
          <span aria-hidden className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#1E5562] to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/95 p-3.5 text-[#1F4652] shadow-lg backdrop-blur">
            <div className="flex items-center gap-2 font-sans text-[13px] font-bold">
              <span className="size-2 rounded-full bg-emerald-500" /> Online evaluation
            </div>
            <div className="mt-1 font-sans text-[12.5px] leading-[1.4] text-[#4D5F66]">With a clinician licensed where you live</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
