import React from "react";
import type { Metadata } from "next";
import { applySheetSeo, pageSocial } from "@/lib/seo";
import { TopBanner } from "@/components/layout/TopBanner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { EsaDogsHero } from "@/components/esa-dogs/EsaDogsHero";
import {
  EsaDogsBenefits,
  EsaDogsBreeds,
  EsaDogsComparison,
  EsaDogsConditions,
  EsaDogsLetterIncludes,
  EsaDogsRights,
  EsaDogsVetting,
  EsaDogsWhy,
} from "@/components/esa-dogs/EsaDogsSections";
import { EsaOnlineHowItWorks } from "@/components/esa-online/EsaOnlineHowItWorks";
import { TherapistsSection } from "@/components/home/TherapistsSection";
import { PricingSection } from "@/components/home/PricingSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { CtaBanner } from "@/components/home/CtaBanner";

const TITLE = "ESA Letter for Dogs | Licensed Evaluation - My ESA Therapist";
const DESCRIPTION =
  "Get an ESA letter for your dog after an online evaluation with a licensed mental health professional. Housing-ready documentation if you qualify, with a full refund if you don't.";

export const metadata: Metadata = applySheetSeo({
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://myesatherapist.com/esa-letter-for-dogs/" },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  ...pageSocial({
    title: TITLE,
    description: DESCRIPTION,
    url: "https://myesatherapist.com/esa-letter-for-dogs/",
  }),
});

const DOG_FAQS = [
  {
    q: "Can any dog be an emotional support animal?",
    a: "Yes. Any dog can be an emotional support animal, whatever the breed, size, or age. An ESA letter documents your disability-related need for the animal. It is not a certification of a particular breed.",
  },
  {
    q: "Does an ESA dog have public access like a service dog?",
    a: "No. An emotional support dog is protected for housing under the Fair Housing Act. A service dog that is individually trained to perform tasks may have public access under the ADA. An ESA does not.",
  },
  {
    q: "Can a landlord charge a pet deposit or pet rent for an ESA dog?",
    a: "Generally, no. When a valid ESA letter supports a reasonable accommodation, housing providers may not charge pet rent or a pet deposit. You remain responsible for actual damage beyond ordinary wear.",
  },
  {
    q: "Can a landlord enforce breed or weight limits on an ESA dog?",
    a: "A general no-pets, breed, or weight rule usually cannot be used by itself to deny a valid ESA. A housing provider may still deny a specific animal that poses a direct threat or would cause substantial damage, based on that animal's behavior.",
  },
  {
    q: "Does my dog need special training for an ESA letter?",
    a: "No. An emotional support dog is not required to perform trained tasks. The letter is based on a licensed professional's judgment that the dog's presence helps with your mental or emotional condition.",
  },
  {
    q: "What happens if I am not approved?",
    a: "If the licensed professional determines an ESA letter is not clinically appropriate, no letter is issued and you receive a full refund. Approval is never guaranteed.",
  },
];

export default function EsaLetterForDogsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopBanner />
      <Header />
      <main className="flex-1">
        <EsaDogsHero />
        <EsaDogsWhy />
        <EsaDogsBenefits />
        <EsaDogsConditions />
        <EsaOnlineHowItWorks
          className="bg-white"
          title="Get Your ESA Letter In 3 Easy Steps"
          subtitle="Most customers finish in under 30 minutes."
          buttonText="Get Started"
          note="If not approved after your evaluation? You get a full refund."
          paymentNote="We authorize your payment first, but we will only charge it after your evaluation is completed."
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
        <TherapistsSection
          bgColor="bg-background"
          title="Our Licensed Mental Health Professionals"
          subtitle="We connect individuals with licensed mental health professionals who are qualified to conduct evaluations and provide recommendations when clinically appropriate."
          refundText="If not approved after your evaluation? You get a full refund."
        />
        <EsaDogsVetting />
        <EsaDogsRights />
        <EsaDogsComparison />
        <EsaDogsBreeds />
        <EsaDogsLetterIncludes />
        <PricingSection
          heading="Simple, Honest Pricing"
          descriptionOverride="One-time fee. No subscriptions. Refunded in full if you don't qualify."
          ctaHref="/pricing/"
        />
        <TestimonialsSection
          title="Loved By Dog Owners"
          subtitle="Here’s what clients say about their ESA evaluation."
        />
        <FaqSection
          title="Frequently Asked Questions"
          subtitle="Get answers to common questions about ESA letters and our service."
          faqs={DOG_FAQS}
          image={{ src: "/esa-dogs/faq-photo.webp", alt: "Woman kneeling beside her yellow Labrador on a forest path" }}
        />
        <CtaBanner
          title="Ready To Start Your ESA Evaluation?"
          description="If you believe an Emotional Support Animal may be appropriate for your situation, you can begin a professional evaluation today."
          buttonText="Start Your Evaluation"
          buttonHref="/pricing/"
        />
      </main>
      <Footer />
    </div>
  );
}
