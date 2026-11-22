import { applySheetSeo } from "@/lib/seo";
import React from "react";
import { serializeLd } from "@/lib/site";
import type { Metadata } from "next";
import { TopBanner } from "@/components/layout/TopBanner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CategoryHub } from "@/components/blogs/CategoryHub";
import { QualifyingConditionsLearnMore } from "@/components/qualifying-conditions/QualifyingConditionsLearnMore";
import { QualifyingConditionsReasons } from "@/components/qualifying-conditions/QualifyingConditionsReasons";
import { QualifyingConditionsEligibility } from "@/components/qualifying-conditions/QualifyingConditionsEligibility";
import { FaqSection } from "@/components/home/FaqSection";
import { CtaBanner } from "@/components/home/CtaBanner";

import { qualifyingConditionsSchemas } from "@/data/schemas/qualifyingConditionsSchema";

export const metadata: Metadata = applySheetSeo({
  title: "ESA Qualifying Conditions: What Conditions May Qualify? | My ESA Therapist",
  description:
    "Explore mental health conditions that may qualify for an ESA letter, including anxiety, depression, PTSD, ADHD, and panic disorder. Learn about ESA eligibility.",
  alternates: {
    canonical: "https://myesatherapist.com/blog/qualifying-conditions/",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  openGraph: {
    title: "ESA Qualifying Conditions: What Conditions May Qualify? | My ESA Therapist",
    description:
      "Explore mental health conditions that may qualify for an ESA letter, including anxiety, depression, PTSD, ADHD, and panic disorder. Learn about ESA eligibility.",
    url: "https://myesatherapist.com/blog/qualifying-conditions/",
    siteName: "My ESA Therapist",
    type: "article",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    site: "@MyESATherapist",
    creator: "@MyESATherapist",
    title: "ESA Qualifying Conditions: What Conditions May Qualify? | My ESA Therapist",
    description:
      "Explore mental health conditions that may qualify for an ESA letter, including anxiety, depression, PTSD, ADHD, and panic disorder. Learn about ESA eligibility.",
  },
});

const qualifyingConditionsFaqs = [
  {
    num: "01.",
    q: "What conditions may qualify someone for an ESA?",
    a: "Conditions such as anxiety, depression, PTSD, panic disorder, and other emotional or mental health challenges may qualify, depending on an individual's circumstances and professional evaluation.",
  },
  {
    num: "02.",
    q: "Do I need a diagnosis to get an ESA letter?",
    a: "A licensed mental health professional must determine whether an emotional support animal is appropriate based on your mental or emotional health needs.",
  },
  {
    num: "03.",
    q: "Can any animal be an emotional support animal?",
    a: "Many types of animals can serve as ESAs if they provide emotional support that helps alleviate symptoms of a qualifying condition.",
  },
  {
    num: "04.",
    q: "How do emotional support animals help people?",
    a: "ESAs can provide comfort, companionship, and emotional stability, which may help reduce feelings of stress, anxiety, loneliness, or other mental health symptoms.",
  },
];

export default function QualifyingConditionsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-body-text selection:bg-accent/30 selection:text-current">
      {qualifyingConditionsSchemas.map((schemaObj, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeLd(schemaObj) }}
        />
      ))}

      <TopBanner />
      <Header />

      <main className="flex-1">
        <CategoryHub
          slug="qualifying-conditions"
          featuredSlug="conditions-that-may-qualify-for-an-esa"
          title="Qualifying Conditions for an Emotional Support Animal (ESA) Letter"
          gridTitle="Condition-by-condition guides"
          intro={
            <>
              <p>
                If you’ve ever felt calmer just having your ESA curl up beside you after a hard day, you already know
                how an emotional support animal can provide reliable support and comfort whenever you need it. But
                qualifying for an ESA isn’t just about loving your dog or cat; it’s a connection to a real mental or
                emotional health condition, like anxiety, depression, PTSD, or panic disorder, that affects your daily
                life.
              </p>
              <p>
                Here’s the part people often miss: having one of these conditions doesn’t automatically get you an ESA
                letter. A diagnosis is only the beginning. What actually matters is an evaluation by a licensed mental
                health professional, someone who can confirm, in writing, that an ESA would genuinely support your
                well-being. That’s what makes a letter legitimate and accepted by landlords or housing providers.
              </p>
            </>
          }
        />
        <div className="flex flex-col gap-12 pb-12 pt-12 sm:gap-16 sm:pt-16 lg:gap-[6vw] lg:pb-[6vw] lg:pt-[5.9vw] xl:gap-[94px] xl:pb-[94px] xl:pt-[85px]">
          <QualifyingConditionsLearnMore />
          <QualifyingConditionsReasons />
          <QualifyingConditionsEligibility />
        </div>

        <FaqSection
          id="faq"
          title="Frequently Asked Questions"
          subtitle="Get answers to common questions about ESA letters and our service."
          faqs={qualifyingConditionsFaqs}
          bg="bg-background"
        />

        <CtaBanner
          title="The Importance of a Professional Clinical Evaluation"
          description={
            "Qualifying for an ESA letter depends on an individualized assessment\n" +
            "conducted by a licensed mental health professional. A diagnosis alone\n" +
            "does not automatically guarantee eligibility. The evaluation focuses on\n" +
            "whether the presence of an emotional support animal is likely to help\n" +
            "reduce symptoms and improve daily functioning and well-being."
          }
          buttonText="Start Your ESA Evaluation Now"
          buttonHref="/pricing/"
          bgColor="bg-background"
        />
      </main>

      <Footer />
    </div>
  );
}
