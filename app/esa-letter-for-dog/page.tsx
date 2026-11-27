import React from "react";
import type { Metadata } from "next";
import { applySheetSeo } from "@/lib/seo";
import { serializeLd } from "@/lib/site";
import { esaLetterForDogSchema } from "@/data/schemas/esaLetterForDogSchema";
import { TopBanner } from "@/components/layout/TopBanner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EsaDogsHero } from "@/components/esa-dogs/EsaDogsHero";
import {
  EsaDogsBenefits,
  EsaDogsBreeds,
  EsaDogsComparison,
  EsaDogsConditions,
  EsaDogsRights,
  EsaDogsSampleNote,
  EsaDogsWhy,
} from "@/components/esa-dogs/EsaDogsSections";
import { EsaOnlineHowItWorks } from "@/components/esa-online/EsaOnlineHowItWorks";
import { TherapistsSection } from "@/components/home/TherapistsSection";
import { PricingSection } from "@/components/home/PricingSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { CtaBanner } from "@/components/home/CtaBanner";

const META_TITLE = "ESA Letter for Dog: Get Evaluated Online | My ESA Therapist";
const META_DESCRIPTION =
  "Need an ESA letter for your dog? Connect with a licensed mental health professional online, get evaluated, and receive your letter if you qualify.";
const OG_TITLE = "Get an ESA Letter for Your Dog | My ESA Therapist";
const OG_DESCRIPTION =
  "Talk to a licensed mental health professional online and get an ESA letter for your dog if you qualify. Simple, private, and 100% online.";
const TWITTER_DESCRIPTION =
  "Talk to a licensed mental health professional online and get an ESA letter for your dog if you qualify.";
const PAGE_URL = "https://myesatherapist.com/esa-letter-for-dog/";
const FEATURED_IMAGE = "https://myesatherapist.com/esa-dogs/hero.webp";
const FEATURED_IMAGE_ALT = "Woman sitting with her emotional support dog";

export const metadata: Metadata = applySheetSeo({
  title: META_TITLE,
  description: META_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  openGraph: {
    type: "website",
    siteName: "My ESA Therapist",
    locale: "en_US",
    url: PAGE_URL,
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [
      {
        url: FEATURED_IMAGE,
        width: 1200,
        height: 630,
        type: "image/webp",
        alt: FEATURED_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@MyESATherapist",
    creator: "@MyESATherapist",
    title: OG_TITLE,
    description: TWITTER_DESCRIPTION,
    images: [
      {
        url: FEATURED_IMAGE,
        alt: FEATURED_IMAGE_ALT,
      },
    ],
  },
});

const DOG_FAQS = [
  {
    q: "Can I get an ESA letter for more than one dog?",
    a: "Yes. You can get an ESA letter for multiple emotional support dogs. However, a licensed mental health professional must assess the need for each dog, and the housing request must be reasonable. Additionally, landlords can evaluate each request.",
  },
  {
    q: "Can I use an ESA letter for dog in another state?",
    a: "An ESA letter is generally issued by the professional licensed in the state where you receive mental health services. If you move away, you may need an evaluation from a professional licensed in the new state.",
  },
  {
    q: "How long does an ESA evaluation for a dog take?",
    a: "The time depends on your availability, the professional’s schedule, and the information required for the evaluation. An online appointment may make it easier to complete the process from home.",
  },
  {
    q: "Can my landlord contact the professional who issued my dog’s ESA letter?",
    a: "Yes. A landlord may contact the professional to verify the documentation’s authenticity. Landlords generally may not ask for your diagnosis or medical records, only reliable documentation of the disability-related need.",
  },
  {
    q: "Can I get an ESA letter for a puppy?",
    a: "Yes. A puppy can qualify as an emotional support animal if it provides disability-related support. There is no federal minimum age requirement for an ESA. However, the professional will consider your needs and whether the puppy is suitable for the requested housing accommodation.",
  },
];

export default function EsaLetterForDogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeLd(esaLetterForDogSchema) }}
      />
      <TopBanner />
      <Header />
      <main className="flex-1">
        <EsaDogsHero />
        <EsaDogsWhy />
        <EsaDogsBenefits />
        <EsaDogsConditions />
        <EsaOnlineHowItWorks
          className="bg-white"
          title="Get Your Emotional Support Dog Letter in 3 Easy Steps"
          subtitle="Complete your ESA evaluation for your dog to find out whether an ESA letter is appropriate for you."
          buttonText="Get Started"
          note="If not approved after your evaluation? You get a full refund."
          // paymentNote="We authorize your payment first, but we will only charge it after your evaluation is completed."
          steps={[
            {
              image: "/esa-renewal/esa-renewal-processworks-step1.webp",
              title: "Set Up Your Appointment",
              description:
                "Create your account and choose a time that works for you to connect with a licensed mental health professional.",
            },
            {
              image: "/esa-renewal/esa-renewal-processworks-step2.webp",
              title: "Speak With Professionals",
              description:
                "During the consultation, the professional reviews your emotional and mental health concerns and assesses whether an emotional support animal is appropriate.",
            },
            {
              image: "/esa-renewal/esa-renewal-processworks-step3.webp",
              title: "Clinical Determination",
              description:
                "Following the professional evaluation, if deemed appropriate by the licensed professional, emotional support animal documentation is sent directly to your email. If not, no documentation is issued.",
            },
          ]}
        />
        <EsaDogsSampleNote />
        <TherapistsSection
          bgColor="bg-background"
          title="Our Licensed Mental Health Professionals"
          subtitle="We connect individuals with licensed mental health professionals who are qualified to conduct evaluations and provide recommendations when clinically appropriate."
          refundText="If not approved after your evaluation? You get a full refund."
        />
        <EsaDogsRights />
        <EsaDogsComparison />
        <EsaDogsBreeds />
        <PricingSection
          heading="ESA Letter for Dog Cost That Fits Your Budget"
          descriptionOverride="Start your dog’s ESA evaluation with clear and affordable pricing."
          ctaHref="/pricing/"
        />
        <TestimonialsSection
          title="Loved By Dog Owners"
          subtitle="Here’s what clients say about their ESA evaluation."
        />
        <FaqSection
          title="FAQs About ESA Letter for Dog"
          subtitle=""
          faqs={DOG_FAQS}
          image={{ src: "/esa-dogs/faq-photo.webp", alt: "Woman kneeling beside her yellow Labrador on a forest path" }}
        />
        <CtaBanner
          title="Ready to Apply for an ESA Letter for Dog Online?"
          description="Take the first step towards housing support for your dog. Start your online ESA evaluation with a state-licensed mental health professional to discuss your needs."
          buttonText="Start Your Evaluation"
          buttonHref="/pricing/"
        />
      </main>
      <Footer />
    </div>
  );
}
