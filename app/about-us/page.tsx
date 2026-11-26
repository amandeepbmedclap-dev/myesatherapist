import { applySheetSeo } from "@/lib/seo";
import { Metadata } from "next";
import { serializeLd } from "@/lib/site";
import { pruneSchema } from "@/lib/schema";
import { TopBanner } from "@/components/layout/TopBanner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AboutHeroSection } from "@/components/about-us/AboutHeroSection";
import { AboutVsFakeSection } from "@/components/about-us/AboutVsFakeSection";
import { FaqSection, FaqItem } from "@/components/home/FaqSection";
import { CtaBanner } from "@/components/home/CtaBanner";
import { AboutMission, AboutPolicies, AboutTrustStrip, AboutWhoWeHelp } from "@/components/about-us/AboutV2";
import { aboutUsSchema } from "@/data/schemas/aboutUsSchema";
import { socialImage, withFeatureImage } from "@/data/socialImages";

export const metadata: Metadata = applySheetSeo({
  title: "About My ESA Therapist | Licensed ESA Evaluations You Can Trust",
  description:
    "Learn how My ESA Therapist provides legitimate, HIPAA-compliant ESA evaluations through state-licensed mental health professionals across all 50 states.",
  alternates: {
    canonical: "https://myesatherapist.com/about-us/",
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  openGraph: {
    title: "About My ESA Therapist | Licensed ESA Evaluations You Can Trust",
    description:
      "Learn how My ESA Therapist provides legitimate, HIPAA-compliant ESA evaluations through state-licensed mental health professionals across all 50 states.",
    url: "https://myesatherapist.com/about-us/",
    siteName: "My ESA Therapist",
    type: "website",
    locale: "en_US",
    images: socialImage("about-us", "About My ESA Therapist").openGraph,
  },
  twitter: {
    card: "summary_large_image",
    site: "@MyESATherapist",
    creator: "@MyESATherapist",
    title: "About My ESA Therapist | Licensed ESA Evaluations You Can Trust",
    description:
      "Learn how My ESA Therapist provides legitimate, HIPAA-compliant ESA evaluations through state-licensed mental health professionals across all 50 states.",
    images: socialImage("about-us", "About My ESA Therapist").twitter,
  },
});


const ABOUT_FAQS: FaqItem[] = [
  {
    num: "01.",
    q: "What is My ESA Therapist's mission?",
    a: "My ESA Therapist's mission is to make the ESA evaluation process clear, ethical, and accessible. Individuals are connected with licensed mental health professionals through a secure ESA evaluation process, with all outcomes determined solely through an independent clinical assessment by the provider.",
  },
  {
    num: "02.",
    q: "Who conducts the ESA evaluations?",
    a: "All evaluations are conducted exclusively by state-licensed mental health professionals. Eligibility is determined solely through professional clinical review, with clinical conclusions made independently by the provider without platform influence.",
  },
  {
    num: "03.",
    q: "Does My ESA Therapist provide nationwide coverage?",
    a: "Yes. My ESA Therapist offers ESA evaluations in all 50 states, providing accessible telehealth services while ensuring evaluations meet local licensing requirements.",
  },
  {
    num: "04.",
    q: "Who does My ESA Therapist help?",
    a: "My ESA Therapist serves renters facing housing restrictions on pets, individuals experiencing mental health concerns, remote or telehealth users, first-time and returning ESA applicants, and people seeking a professional assessment of whether an emotional support animal may be clinically appropriate.",
  },
  {
    num: "05.",
    q: "How is My ESA Therapist different from automated ESA services?",
    a: "The difference is a professional, evaluation-based process. My ESA Therapist works with state-licensed professionals, secure consultations, confidential systems, and guidelines relevant to ESA housing accommodations.",
  },
  {
    num: "06.",
    q: "What does the ESA evaluation process involve?",
    a: "The clinical process includes a review of relevant mental health concerns, symptoms, and history, followed by an individualized assessment by a licensed mental health professional. If documentation is clinically appropriate, it is prepared in line with applicable legal requirements.",
  },
  {
    num: "07.",
    q: "What happens if a refund is needed?",
    a: "Your card is charged when you book. If the evaluation cannot be completed, you receive a full refund. A completed evaluation is non-refundable, whether or not a letter is issued.",
  },
  {
    num: "08.",
    q: "Are there hidden fees?",
    a: "No. Pricing is upfront and transparent, with no surprise charges or recurring fees. One payment covers the complete evaluation, and all payments are processed securely through encrypted systems.",
  },
];

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-between selection:bg-accent/30 selection:text-current">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeLd(withFeatureImage(pruneSchema(aboutUsSchema, { types: ["Service"] }), "about-us")) }}
      />

      <TopBanner />
      <Header />
      <main className="flex-1 bg-background">
        <AboutHeroSection />

        <AboutTrustStrip />
        <AboutMission />
        <AboutWhoWeHelp />
        <AboutVsFakeSection />
        <AboutPolicies />

        <FaqSection
          bg="bg-background"
          title="Frequently Asked Questions About My ESA Therapist and Our Process"
          subtitle="Get answers to common questions about our mission, evaluations, and process."
          faqs={ABOUT_FAQS}
        />

        <CtaBanner
          title="Ready to Start Your ESA Evaluation With a Licensed Professional?"
          description="Begin the evaluation process today and connect with your state-licensed mental health professional for a clinical assessment."
          buttonText="Start Evaluation"
          buttonHref="/pricing/"
          bgColor="bg-white"
        />
      </main>
      <Footer bgColor="bg-background" />
    </div>
  );
}
