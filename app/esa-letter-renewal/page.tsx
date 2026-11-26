import { applySheetSeo } from "@/lib/seo";
import React from "react";
import { serializeLd } from "@/lib/site";
import { pruneSchema } from "@/lib/schema";
import type { Metadata } from "next";

import { TopBanner } from "@/components/layout/TopBanner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

import { EsaRenewalHero } from "@/components/esa-renewal/EsaRenewalHero";
import { EsaRenewalTrustCards } from "@/components/esa-renewal/EsaRenewalTrustCards";
import { EsaRenewalWhySection } from "@/components/esa-renewal/EsaRenewalWhySection";
import { EsaRenewalHowItWorks } from "@/components/esa-renewal/EsaRenewalHowItWorks";
import { EsaRenewalPricing } from "@/components/esa-renewal/EsaRenewalPricing";
import { EsaRenewalHousingSection } from "@/components/esa-renewal/EsaRenewalHousingSection";
import { EsaRenewalLicensedPros } from "@/components/esa-renewal/EsaRenewalLicensedPros";
import { EsaRenewalForWhom } from "@/components/esa-renewal/EsaRenewalForWhom";
import { EsaRenewalWhatToKnow } from "@/components/esa-renewal/EsaRenewalWhatToKnow";

import { FaqSection } from "@/components/home/FaqSection";
import { CtaBanner } from "@/components/home/CtaBanner";

import { esaRenewalSchemas } from "@/data/schemas/esaRenewalSchema";
import { socialImage, withFeatureImage } from "@/data/socialImages";

export const metadata: Metadata = applySheetSeo({
  title: "ESA Letter Renewal Online by Licensed Therapists | My ESA Therapist",
  description:
    "Need to renew your ESA letter? My ESA Therapist offers simple online renewals with licensed therapists and quick turnaround.",
  alternates: {
    canonical: "https://myesatherapist.com/esa-letter-renewal/",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  openGraph: {
    title: "ESA Letter Renewal Online by Licensed Therapists | My ESA Therapist",
    description:
      "Need to renew your ESA letter? My ESA Therapist offers simple online renewals with licensed therapists and quick turnaround.",
    url: "https://myesatherapist.com/esa-letter-renewal/",
    siteName: "My ESA Therapist",
    type: "website",
    locale: "en_US",
    images: socialImage("esa-letter-renewal", "Online ESA letter renewal").openGraph,
  },
  twitter: {
    card: "summary",
    site: "@MyESATherapist",
    creator: "@MyESATherapist",
    title: "ESA Letter Renewal Online by Licensed Therapists | My ESA Therapist",
    description:
      "Need to renew your ESA letter? My ESA Therapist offers simple online renewals with licensed therapists and quick turnaround.",
    images: socialImage("esa-letter-renewal", "Online ESA letter renewal").twitter,
  },
});

const esaRenewalFaqs = [
  {
    num: "01.",
    q: "How recent does my ESA letter need to be for housing purposes?",
    a: "Many housing providers prefer a current emotional support animal letter that reflects your present situation. While federal laws do not set an official expiration date, documentation is often expected to be no older than one year, based on housing provider review practices.",
  },
  {
    num: "02.",
    q: "How long does the ESA letter renewal process take?",
    a: "The renewal process is completed online and typically takes 24–48 hours after the evaluation, depending on provider availability and review time. Timing may vary based on individual circumstances and scheduling.",
  },
  {
    num: "03.",
    q: "Will my evaluation be with the same provider every time or someone new?",
    a: "Your ESA renewal evaluation is completed by a state-licensed mental health professional authorized in your state. The provider may differ from previous evaluations, but each review follows the same ethical and professional standards.",
  },
  {
    num: "04.",
    q: "What kind of questions will the provider ask during the renewal evaluation?",
    a: "During a renewal evaluation, the provider typically asks about your current emotional well-being, daily challenges, and how your emotional support animal has been helping over time.",
  },
  {
    num: "05.",
    q: "Is renewing an ESA letter different from getting a new ESA letter?",
    a: "Yes. An ESA letter renewal focuses on reviewing your current circumstances and ongoing support needs, while a new ESA evaluation involves an initial review. Renewals are intended for individuals who previously had valid ESA documentation.",
  },
  {
    num: "06.",
    q: "What if my situation hasn’t changed much, do I still need a renewal?",
    a: "Even if your circumstances feel similar, housing providers may request updated ESA documentation. A renewal allows a licensed professional to confirm whether ongoing emotional support may still be appropriate based on your current situation.",
  },
  {
    num: "07.",
    q: "Will the letter include today’s date or the evaluation date?",
    a: "If approved, the emotional support animal letter is issued using the evaluation date, showing that the documentation reflects a recent professional review.",
  },
  {
    num: "08.",
    q: "Do you auto-renew emotional support animal letters?",
    a: "No. ESA recommendation letters are not auto-renewed. Every ESA renewal evaluation requires a real review by a state-licensed mental health professional, who independently determines whether updated documentation may be appropriate.",
  },
  {
    num: "09.",
    q: "Will my landlord accept the renewed documentation?",
    a: "Landlord acceptance is not guaranteed. However, a renewed ESA letter issued by a state-licensed professional can help support a housing accommodation request where permitted under fair housing guidelines.",
  },
];

export default function EsaRenewalPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {esaRenewalSchemas.map((schemaObj, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeLd(withFeatureImage(pruneSchema(schemaObj, { personNames: ["Max Phillips"] }), "esa-letter-renewal")) }}
        />
      ))}

      <TopBanner />

      <Header />

      <main className="flex-1">
        <EsaRenewalHero />

        <EsaRenewalTrustCards />

        <EsaRenewalWhySection />

        <EsaRenewalHowItWorks />

        <EsaRenewalPricing />

        <EsaRenewalHousingSection />

        <EsaRenewalLicensedPros />

        <EsaRenewalForWhom />

        <EsaRenewalWhatToKnow />

        <FaqSection
          id="faq"
          title="Frequently Asked Questions About Renewing Your ESA Letter"
          subtitle="Answers to the most common ESA renewal questions"
          faqs={esaRenewalFaqs}
          bg="bg-background"
        />

        <CtaBanner
          buttonHref="#pricing"
          bgColor="bg-background"
        />
      </main>

      <Footer />
    </div>
  );
}
