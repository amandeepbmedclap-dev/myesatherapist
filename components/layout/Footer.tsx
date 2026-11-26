

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { FooterTrustBand } from "@/components/layout/FooterTrustBand";

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

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/myesatherapy", icon: FacebookIcon },
  { label: "X", href: "https://x.com/myesatherapist", icon: XIcon },
  { label: "Instagram", href: "https://www.instagram.com/myesatherapist/", icon: InstagramIcon },
  { label: "YouTube", href: "https://www.youtube.com/@myesatherapist", icon: YouTubeIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/myesatherapist/", icon: LinkedInIcon },
];

function SocialIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-4" fill="currentColor">
      {children}
    </svg>
  );
}

function FacebookIcon() {
  return (
    <SocialIcon>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H8.08v-2.91h2.36V9.84c0-2.34 1.39-3.63 3.52-3.63 1.02 0 2.09.18 2.09.18v2.3h-1.18c-1.16 0-1.52.72-1.52 1.46v1.76h2.59l-.41 2.91h-2.18V22c4.78-.76 8.44-4.92 8.44-9.94z" />
    </SocialIcon>
  );
}

function InstagramIcon() {
  return (
    <SocialIcon>
      <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm10 1.8H7A2.2 2.2 0 0 0 4.8 7v10A2.2 2.2 0 0 0 7 19.2h10a2.2 2.2 0 0 0 2.2-2.2V7A2.2 2.2 0 0 0 17 4.8zM12 8.1A3.9 3.9 0 1 1 8.1 12 3.9 3.9 0 0 1 12 8.1zm0 1.6A2.3 2.3 0 1 0 14.3 12 2.3 2.3 0 0 0 12 9.7zm4.35-2.55a1 1 0 1 1-1 1 1 1 0 0 1 1-1z" />
    </SocialIcon>
  );
}

function XIcon() {
  return (
    <SocialIcon>
      <path d="M4 4h3.2l4.1 5.5L16.2 4H20l-6.1 7.2L20.3 20h-3.2l-4.5-6L7.6 20H3.8l6.5-7.6L4 4z" />
    </SocialIcon>
  );
}

function YouTubeIcon() {
  return (
    <SocialIcon>
      <path d="M23 12.2s0-3.2-.4-4.6c-.2-.9-.9-1.6-1.8-1.8C19.2 5.4 12 5.4 12 5.4s-7.2 0-8.8.4c-.9.2-1.6.9-1.8 1.8C1 9 1 12.2 1 12.2s0 3.2.4 4.6c.2.9.9 1.6 1.8 1.8 1.6.4 8.8.4 8.8.4s7.2 0 8.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.4.4-4.6.4-4.6zM9.8 15.5v-6.6l6.2 3.3-6.2 3.3z" />
    </SocialIcon>
  );
}

function LinkedInIcon() {
  return (
    <SocialIcon>
      <path d="M4.7 3.3a2.2 2.2 0 1 0 .1 4.4 2.2 2.2 0 0 0-.1-4.4zM3 9h3.4v12H3zm7 0h3.2v1.6h.1c.4-.8 1.5-1.7 3.2-1.7 3.4 0 4 2.2 4 5.1V21H17v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21H10z" />
    </SocialIcon>
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
        <FooterTrustBand />

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
                    <span className="block text-base leading-[20px] text-white/55">{sub}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-6 font-sans text-base leading-[20px] text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 My ESA Therapist. All rights reserved.</p>
          <ul className="flex items-center gap-2">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`My ESA Therapist on ${label}`}
                  className="flex size-9 items-center justify-center rounded-full bg-white/[0.07] text-white/75 ring-1 ring-white/10 transition-colors hover:text-accent"
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
