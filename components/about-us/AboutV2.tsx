import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, CreditCard, HeartHandshake, Laptop, MonitorSmartphone, PawPrint, Receipt, RotateCcw, ShieldCheck, Stethoscope, UserRound, Video } from "lucide-react";

const label = "font-sans text-sm font-extrabold uppercase tracking-[0.16em] text-[#8A6A12]";

/** "Why do individuals trust…" as one connected strip of four facts. */
export function AboutTrustStrip() {
  const items = [
    { icon: Stethoscope, title: "Licensed Clinicians", description: "State-licensed mental health professionals" },
    { icon: Video, title: "Phone or Video Evaluation", description: "Secure phone or video sessions" },
    { icon: ShieldCheck, title: "HIPAA-Compliant", description: "Secure handling of personal information" },
    { icon: BadgeCheck, title: "Clinical Assessment", description: "Outcomes based on clinical assessment" },
  ];
  return (
    <section data-section="about-trust" className="w-full bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-[1180px]">
        <div className="mx-auto max-w-[880px] text-center">
          <h2 className="heading-h2 text-primary">Why Do Individuals Trust My ESA Therapist for Their Evaluation?</h2>
          <p className="body-large mx-auto mt-3 max-w-[700px] text-body-text">We stand apart by providing legitimate, professional ESA evaluations conducted by licensed clinicians.</p>
        </div>
        <div className="mt-10 grid overflow-hidden rounded-[24px] bg-background ring-1 ring-line-200 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, description }, i) => (
            <div key={title} className={`flex items-start gap-4 p-6 lg:flex-col lg:gap-5 lg:p-7 ${i > 0 ? "border-t border-primary/10 sm:border-t-0" : ""} ${i % 2 === 1 ? "sm:border-l sm:border-primary/10" : ""} ${i >= 2 ? "sm:border-t sm:border-primary/10 lg:border-t-0" : ""} ${i > 0 ? "lg:border-l lg:border-primary/10" : ""}`}>
              <span className="flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-white text-[#1D6E72] shadow-[0_6px_16px_-10px_rgba(26,61,79,0.5)]">
                <Icon aria-hidden className="size-6" />
              </span>
              <div>
                <h3 className="heading-h3 font-heading font-bold text-primary">{title}</h3>
                <p className="mt-1 font-sans text-base leading-[24px] text-body-text">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Mission + three principles, photo in a capped frame. */
export function AboutMission() {
  const items = [
    { title: "Ethical and Professional Standards", description: "We prioritize ethical ESA evaluations and adhere to industry best practices, ensuring each assessment is fair, professional, and compliant with federal and state guidelines." },
    { title: "Provider-Led Clinical Assessments", description: "All evaluations are conducted independently by licensed mental health professionals, with eligibility determined solely through professional clinical review." },
    { title: "Nationwide Coverage and Accessibility", description: "Our platform offers ESA evaluations in all 50 states, providing accessible telehealth services while ensuring evaluations meet local licensing requirements." },
  ];
  return (
    <section data-section="about-mission" className="w-full bg-background px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-[1180px] items-center gap-10 lg:grid-cols-[minmax(0,460px)_minmax(0,1fr)] lg:gap-16">
        <div className="relative mx-auto w-full max-w-[460px]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] shadow-[0_30px_60px_-36px_rgba(26,61,79,0.6)]">
            <Image quality={88} src="/about-us/mission-photo.webp" alt="Woman relaxing at home with her emotional support dog" fill sizes="(min-width: 1024px) 460px, 92vw" className="object-cover object-[50%_35%]" />
          </div>
          <div className="absolute -bottom-6 left-6 right-6 flex items-center gap-3 rounded-[18px] bg-white p-4 shadow-[0_18px_40px_-24px_rgba(26,61,79,0.6)] ring-1 ring-line-200 sm:left-auto sm:right-[-24px] sm:w-[260px]">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-primary"><HeartHandshake aria-hidden className="size-5" /></span>
            <span className="font-sans text-sm leading-[19px] text-primary"><b className="block font-semibold">Independent clinical assessment</b>by a licensed provider</span>
          </div>
        </div>
        <div className="pt-6 lg:pt-0">
          <div className={label}>Our mission</div>
          <h2 className="heading-h2 mt-3 text-primary">Legitimate ESA Letter Evaluations You Can Trust</h2>
          <p className="body-large mt-4 text-body-text">
            Our mission is to make the ESA evaluation process clear, ethical, and accessible. We connect individuals with licensed mental health professionals through a secure ESA evaluation process, with all outcomes determined solely through an independent clinical assessment by the provider.
          </p>
          <ol className="mt-8 divide-y divide-primary/10 border-y border-primary/10">
            {items.map((it, i) => (
              <li key={it.title} className="flex gap-5 py-5">
                <span className="font-heading text-[28px] font-bold leading-[30px] text-gold-600 tabular-nums">0{i + 1}</span>
                <div>
                  <h3 className="heading-h3 font-heading font-bold text-primary">{it.title}</h3>
                  <p className="mt-1.5 font-sans text-base leading-[25px] text-body-text">{it.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** Who we help: five groups in an uneven grid. */
export function AboutWhoWeHelp() {
  const groups = [
    { icon: Receipt, title: "Renters Facing Housing Restrictions", description: "An ESA letter, issued after evaluation by a licensed professional, may help you live with your ESA in no-pet housing." },
    { icon: UserRound, title: "Individuals with Mental Health Conditions", description: "Discuss your mental health concerns with a licensed mental health professional who will independently assess whether an ESA may be clinically appropriate." },
    { icon: MonitorSmartphone, title: "Remote or Telehealth Users", description: "Complete secure, HIPAA-compliant telehealth ESA evaluations from anywhere, with scheduling flexibility to suit your needs." },
    { icon: RotateCcw, title: "First-Time and Returning ESA Applicants", description: "Work with licensed professionals whether applying for the first time or updating existing documentation." },
    { icon: PawPrint, title: "Emotional Wellness-Focused Pet Owners", description: "Discuss with licensed professionals the potential role of a companion animal in emotional support." },
  ];
  const span = ["lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "sm:col-span-2 lg:col-span-2"];
  return (
    <section data-section="about-who" className="w-full bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-[1180px]">
        <div className="mx-auto max-w-[880px] text-center">
          <h2 className="heading-h2 text-primary">Who Does My ESA Therapist Help With ESA Evaluations?</h2>
          <p className="body-large mx-auto mt-3 max-w-[700px] text-body-text">We serve individuals across the U.S. seeking emotional support animals for mental wellness. Our platform supports a clear, secure, and professional ESA evaluation process.</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-6 lg:gap-5">
          {groups.map(({ icon: Icon, title, description }, i) => (
            <div key={title} className={`hover-card flex flex-col rounded-[22px] p-6 ring-1 ring-line-200 sm:p-7 ${i < 2 ? "bg-cream-100" : "bg-background"} ${span[i]}`}>
              <span className="flex size-11 items-center justify-center rounded-[13px] bg-white text-[#1D6E72] shadow-[0_6px_16px_-10px_rgba(26,61,79,0.5)]">
                <Icon aria-hidden className="size-5" />
              </span>
              <h3 className="heading-h3 mt-5 font-heading font-bold text-primary">{title}</h3>
              <p className="mt-2 font-sans text-base leading-[24px] text-body-text">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Policies, with links to the full documents. */
export function AboutPolicies() {
  const cards = [
    { icon: RotateCcw, title: "Refund Policy", description: "Your card is charged when you book. A refund is issued if the evaluation cannot be completed. A completed evaluation is non-refundable.", href: "/refund-policy/", link: "Read the refund policy" },
    { icon: CreditCard, title: "Secure Payment", description: "All payments are processed securely through encrypted systems to ensure your financial information is protected.", href: "/privacy-policy/", link: "How we protect your data" },
    { icon: Laptop, title: "No Hidden Fees", description: "Upfront, transparent pricing with no surprise charges or recurring fees. One payment covers the complete evaluation.", href: "/pricing/", link: "See pricing" },
  ];
  return (
    <section data-section="about-policies" className="w-full bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-[1180px]">
        <div className="mx-auto max-w-[880px] text-center">
          <h2 className="heading-h2 text-primary">Clear Policies & Transparent Pricing for ESA Evaluations</h2>
          <p className="body-large mx-auto mt-3 max-w-[700px] text-body-text">We believe in upfront pricing and honest policies with no surprises.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3 lg:mt-12">
          {cards.map(({ icon: Icon, title, description, href, link }) => (
            <div key={title} className="flex flex-col rounded-[22px] bg-background p-6 ring-1 ring-line-200 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-accent text-primary"><Icon aria-hidden className="size-5" /></span>
                <h3 className="heading-h3 font-heading font-bold text-primary">{title}</h3>
              </div>
              <p className="mt-4 flex-1 font-sans text-base leading-[24px] text-body-text">{description}</p>
              <Link href={href} className="mt-5 inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4 hover:text-[#1D6E72]">
                {link} <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
