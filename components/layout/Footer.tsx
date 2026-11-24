

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { SiteReviewerBanner } from "@/components/state/SiteReviewerBanner";

const FOOTER_GRADIENT = "linear-gradient(180deg, #0C3240 0%, #082733 55%, #061E28 100%)";

const companyLinks = [
  { label: "About Us", href: "/about-us/" },
  { label: "Contact Us", href: "/contact-us/" },
  { label: "Meet Our Therapists", href: "/esa-doctors/" },
  { label: "Video Testimonials", href: "/video-testimonials/" },
  { label: "Customer Reviews", href: "/reviews/" },
];

const quickLinks = [
  { label: "ESA Letter Online", href: "/esa-letter-online/" },
  { label: "ESA Letter for Housing", href: "/esa-letter-for-housing/" },
  { label: "ESA Letter Renewal", href: "/esa-letter-renewal/" },
  { label: "PSD Letter", href: "/psd-letter/" },
  { label: "ESA Letter by State", href: "/state/" },
  { label: "ESA Letter Cost", href: "/pricing/" },
  { label: "ESA FAQs", href: "/frequently-asked-questions/" },
  { label: "ESA Resources", href: "/blog/" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Terms of Service", href: "/terms-of-use/" },
  { label: "Medical Disclaimer", href: "/disclaimer/" },
  { label: "HIPAA Notice of Privacy Practices", href: "/hipaa-compliance/" },
  { label: "Refund Policy", href: "/refund-policy/" },
  { label: "Consent for Telehealth", href: "/telehealth-consent/" },
  { label: "Editorial Policy", href: "/editorial-policy/" },
  { label: "Accessibility Statement", href: "/accessibility-statement/" },
];

function FooterHeading({ children }: { children: React.ReactNode }) {
  return <div className="font-sans text-base font-extrabold uppercase leading-5 tracking-[0.16em] text-accent">{children}</div>;
}

function FooterLinks({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title} className="space-y-5">
      <FooterHeading>{title}</FooterHeading>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="font-sans text-base leading-[22px] text-white/75 transition-colors hover:text-accent">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const contactRows = [
  { icon: Phone, main: "+1 (888) 412-4041", sub: "24/7 Online Support", href: "tel:+18884124041", aria: "Call My ESA Therapist at +1 (888) 412-4041" },
  { icon: Mail, main: "info@myesatherapist.com", sub: "Email us anytime", href: "mailto:info@myesatherapist.com", aria: "Email info@myesatherapist.com" },
  { icon: Clock, main: "Mon - Sat: 9AM - 6PM", sub: "Sunday: Closed" },
  { icon: MapPin, main: "Serving All 50 US States", sub: "Nationwide Service" },
];

export function Footer({ bgColor = "bg-background" }: { bgColor?: string }) {
  void bgColor;
  return (
    <footer className="w-full text-white" style={{ backgroundImage: FOOTER_GRADIENT }}>
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-5 border-b border-white/10 py-7 sm:flex-row sm:items-center sm:justify-between">
          <SiteReviewerBanner placement="footer" />
          <div className="flex h-11 w-[118px] shrink-0 items-center justify-center rounded-[10px] bg-white px-2.5">
            <span className="relative block h-full w-full">
              <Image quality={90} src="/common/hipaa-logo.webp" alt="HIPAA Compliant" fill className="object-contain" sizes="118px" />
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 sm:py-14 lg:grid-cols-[1.5fr_1fr_1.1fr_1.25fr_1.4fr] lg:gap-8">
          <div className="col-span-2 space-y-5 lg:col-span-1 lg:pr-6">
            <Link href="/" aria-label="My ESA Therapist home" className="relative block h-[60px] w-[150px]">
              <Image quality={90} src="/common/myesa-logo-light.svg" alt="My ESA Therapist" fill unoptimized loading="eager" sizes="150px" className="object-contain object-left" />
            </Link>
            <p className="max-w-[340px] font-sans text-base leading-[24px] text-white/70">
              A telehealth platform providing emotional support animal evaluations to those who live with a mental or emotional disability. Trusted, professional &amp; confidential.
            </p>
          </div>

          <FooterLinks title="Company" links={companyLinks} />
          <FooterLinks title="Quick Links" links={quickLinks} />
          <div className="col-span-2 sm:col-span-1">
            <FooterLinks title="Legal" links={legalLinks} />
          </div>

          <div className="col-span-2 space-y-5 sm:col-span-1">
            <FooterHeading>Get in Touch</FooterHeading>
            <ul className="space-y-4">
              {contactRows.map(({ icon: Icon, main, sub, href, aria }) => (
                <li key={main} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-accent ring-1 ring-white/10">
                    <Icon aria-hidden className="size-4" />
                  </span>
                  <span className="min-w-0 font-sans">
                    {href ? (
                      <a href={href} aria-label={aria} className="block break-words text-base leading-[22px] text-white hover:text-accent">{main}</a>
                    ) : (
                      <span className="block text-base leading-[22px] text-white">{main}</span>
                    )}
                    <span className="block text-sm leading-[20px] text-white/55">{sub}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 py-6 font-sans text-sm leading-[20px] text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 My ESA Therapist. All rights reserved.</p>
          <p>
            <Link href="/" className="text-white/75 hover:text-accent">myesatherapist.com</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
