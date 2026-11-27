import Image from "next/image";
import Link from "next/link";
import { CtaButton } from "@/components/common/CtaButton";
import { QualifyingConditions } from "@/components/home/QualifyingConditions";

function Glyph({ src }: { src: string }) {
  return <Image src={src} alt="" width={32} height={32} unoptimized />;
}

function SectionIntro({ title, description }: { title: string; description: string }) {
  return (
    <div className="mx-auto flex max-w-[1062px] flex-col items-center gap-4 text-center">
      <h2 className="heading-h2 text-primary">{title}</h2>
      <p className="body-large max-w-[1062px] text-body-text">{description}</p>
    </div>
  );
}

const WHY = [
  {
    icon: "/esa-dogs/icon-licensed.svg",
    title: "One-on-One Evaluation",
    description:
      "Your dog is a part of your daily life. Discuss your emotional support needs directly with a licensed professional, never through group appointments or automated AI responses.",
  },
  {
    icon: "/esa-dogs/icon-verified.svg",
    title: "State-Specific Expertise",
    description:
      "You will be evaluated by a professional licensed in your state, who follows that state's requirements.",
  },
  {
    icon: "/esa-dogs/icon-fast.svg",
    title: "Clear & Honest Pricing",
    description:
      "Enjoy transparent pricing without hidden fees. The $99 ESA letter fee includes an individual professional evaluation and documentation, if applicable.",
  },
  {
    icon: "/esa-dogs/icon-phobia.svg",
    title: "No Guaranteed Approvals",
    description:
      "ESA letter for dogs should reflect a genuine clinical need. Your provider makes an independent decision rather than promising a letter before the evaluation.",
  },
  {
    icon: "/esa-dogs/icon-housing.svg",
    title: "Support Beyond the Letter",
    description:
      "Getting an ESA letter for dog doesn’t mean our support stops after you receive the letter. Our support team remains available 24/7 to answer your questions and guide you further.",
  },
  {
    icon: "/esa-dogs/icon-secure.svg",
    title: "No Unnecessary Add-ons",
    description:
      "You don’t need to purchase registrations, vests, or certificates to get ESA letter for dog. Only relevant documentation issued by a state-licensed mental health professional matters.",
  },
];

export function EsaDogsWhy() {
  return (
    <section className="bg-background px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto flex max-w-[1283px] flex-col gap-16">
        <SectionIntro
          title="Why Choose My ESA Therapist?"
          description="Your ESA letter for emotional support dog request receives individual attention from a licensed professional. Each step is handled with care and confidentiality."
        />
        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map((item) => (
            <article key={item.title} className="relative">
              <div className="absolute inset-x-0 top-0 h-[234px] rounded-[20px] bg-accent shadow-[0px_2px_4px_rgba(0,0,0,0.15)]" aria-hidden="true" />
              <div className="relative mt-2 flex min-h-[228px] flex-col items-center rounded-[20px] bg-white px-8 pb-8 pt-14 text-center shadow-[0px_1px_4px_rgba(0,0,0,0.15)]">
                <h3 className="heading-h3 text-primary">{item.title}</h3>
                <p className="body mt-2 text-body-text">{item.description}</p>
              </div>
              <span className="absolute left-1/2 top-0 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.15)]">
                <Glyph src={item.icon} />
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const BENEFITS = [
  {
    icon: "/esa-dogs/icon-support.svg",
    title: "Emotional Comfort",
    description:
      "An emotional support dog can offer comfort during difficult moments and help you feel less alone when life gets hard.",
  },
  {
    icon: "/esa-dogs/icon-anxiety.svg",
    title: "Less Stress Daily",
    description:
      "Spending time with your support dog can create calming moments and help you take a break from daily worries and pressure.",
  },
  {
    icon: "/esa-dogs/icon-companionship.svg",
    title: "Steady Companionship",
    description:
      "Having your dog can make everyday life feel less lonely and give you a familiar place to turn to each day.",
  },
  {
    icon: "/esa-dogs/icon-routine.svg",
    title: "Better Daily Routines",
    description:
      "Feeding, walking, and caring for your dog can add structure to your day and encourage more consistent daily habits.",
  },
  {
    icon: "/esa-dogs/icon-purpose.svg",
    title: "A Sense of Purpose",
    description:
      "Caring for your dog gives a sense of responsibility and can bring a greater sense of purpose and connection to your routine.",
  },
  {
    icon: "/esa-dogs/icon-social.svg",
    title: "Comfort During Change",
    description:
      "An emotional support dog can provide a lot of comfort, especially during life changes, new environments, and challenging periods.",
  },
  {
    icon: "/esa-dogs/icon-sleep.svg",
    title: "Improved Sleep Habits",
    description:
      "A consistent bedtime routine with your dog can create a sense of comfort and help evenings feel more settled.",
  },
  {
    icon: "/esa-dogs/icon-activity.svg",
    title: "Greater Self-Care",
    description:
      "Looking after your dog’s daily needs can encourage you to maintain daily habits, including regular meals, walks, and routines.",
  },
];

export function EsaDogsBenefits() {
  return (
    <section className="bg-white">
      <div className="mx-auto flex max-w-[1281px] flex-col gap-12 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionIntro
          title="Benefits of Having an Emotional Support Dog"
          description="An emotional support dog can not only offer company, but also provide comfort and bring a sense of connection to everyday life."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((item) => (
            <article key={item.title} className="flex min-h-[300px] flex-col items-center rounded-[20px] border border-[#E7E1D8] bg-white px-6 py-8 text-center shadow-[0px_1px_4px_rgba(0,0,0,0.06)]">
              <span className="flex size-16 items-center justify-center rounded-full bg-[#F6F1E8]">
                <Glyph src={item.icon} />
              </span>
              <h3 className="heading-h3 mt-5 text-primary">{item.title}</h3>
              <p className="body mt-2 text-body-text">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const CONDITION_DESCRIPTIONS: Record<string, string> = {
  "Anxiety Disorders":
    "An emotional support dog can make stressful days feel easier by offering a familiar presence when anxious thoughts become difficult to handle.",
  "Panic Disorders":
    "Having a dog nearby brings reassurance during frightening moments and helps individuals feel less alone when panic sets in.",
  "Bipolar Disorders":
    "A support dog can bring a sense of routine and familiarity during periods of changing moods and emotional ups and downs.",
  "Social Anxiety":
    "For those who feel uncomfortable around others, an emotional support dog can make everyday situations feel a little less intimidating.",
  "Mood Disorders":
    "A dog’s affection and daily presence can add moments of connection and familiarity when emotions feel difficult to manage.",
  Depression:
    "On days when getting out of bed feels difficult, caring for a dog can give daily activities a little more purpose.",
  Agoraphobia:
    "An emotional support dog can offer a familiar source of reassurance when certain places or everyday outings feel overwhelming.",
  PTSD:
    "A dog’s familiar presence can bring comfort during periods when past trauma is triggered and help people feel more at ease.",
  OCD:
    "An emotional support dog can offer a familiar source of comfort during periods of intrusive thoughts, recurring worries, and OCD stress.",
  ADHD:
    "Daily activities like feeding, walking, and playing with a dog can add structure and encourage more consistent routines.",
  Schizophrenia:
    "An emotional support dog can provide a familiar connection and a comforting presence throughout everyday activities.",
  "Other Mental Health Conditions":
    "People with other mental health conditions may also benefit from an emotional support dog, depending on their individual needs and circumstances.",
};

export function EsaDogsConditions() {
  return (
    <QualifyingConditions
      id="conditions"
      className="bg-background"
      title="Conditions That May Qualify You for an Emotional Support Dog Letter"
      description="Mental health conditions affect everyone differently. A licensed healthcare professional considers your symptoms, daily challenges, and need for a support dog before issuing a letter for ESA dog."
      introMaxClass="max-w-[1062px]"
      descriptionOverrides={CONDITION_DESCRIPTIONS}
      footer={
        <div className="mx-auto w-full rounded-[20px] border-l-[5px] border-[#EFBF2F] bg-[#FEF8EC] p-6 shadow-[0px_1px_4px_rgba(0,0,0,0.06)] sm:p-8">
          <p className="body text-body-text">
            <strong className="font-bold text-primary">Important Note:</strong> Having the above conditions alone does not make you eligible for an emotional support dog. An emotional support dog is not a replacement for medical treatment. Approval for an ESA letter is not guaranteed. An{" "}
            <Link href="/esa-letter-online/" className="font-semibold text-[#8A6A0B] hover:underline">
              online ESA letter
            </Link>{" "}
            for dog from therapist is issued only after the professional determines it is appropriate after an individual evaluation. Since ESAs are not the same as Psychiatric Service Dogs, they are not covered under the Americans with Disabilities Act and have no public access rights. Under{" "}
            <a
              href="https://www.transportation.gov/briefing-room/us-department-transportation-announces-final-rule-traveling-air-service-animals"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#8A6A0B] hover:underline"
            >
              DOT rules
            </a>
            , airlines no longer have to accommodate ESAs. Airlines treat ESAs as pets, so check your airline&apos;s pet policy and fees before booking.
          </p>
        </div>
      }
    />
  );
}

function IconRow({
  title,
  description,
  items,
  tone = "white",
}: {
  title: string;
  description: string;
  items: { icon: string; title: string; description: string }[];
  tone?: "white" | "cream";
}) {
  return (
    <section className={`${tone === "cream" ? "bg-background" : "bg-white"} px-4 py-16 sm:px-6 lg:px-8 lg:py-[72px]`}>
      <div className="mx-auto flex max-w-[1280px] flex-col gap-16">
        <SectionIntro title={title} description={description} />
        <div className={`grid gap-x-6 gap-y-14 ${items.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
          {items.map((item) => (
            <article key={item.title} className="relative">
              <div className="absolute inset-x-0 top-0 h-[176px] rounded-[20px] bg-accent shadow-[0px_2px_4px_rgba(0,0,0,0.15)]" aria-hidden="true" />
              <div className="relative mt-2 flex min-h-[168px] flex-col items-center rounded-[20px] bg-white px-5 pb-6 pt-12 text-center shadow-[0px_1px_4px_rgba(0,0,0,0.15)]">
                <h3 className="heading-h3 text-primary">{item.title}</h3>
                <p className="body mt-2 text-body-text">{item.description}</p>
              </div>
              <span className="absolute left-1/2 top-0 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.15)]">
                <Glyph src={item.icon} />
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EsaDogsVetting() {
  return (
    <IconRow
      title="How We Vet Every Provider"
      description="Only providers who pass all four checks can issue ESA letters."
      items={[
        { icon: "/esa-dogs/icon-vet-verified.svg", title: "License Check", description: "Verified directly with the state licensing board." },
        { icon: "/esa-dogs/icon-reviews.svg", title: "Background Review", description: "Clean disciplinary record and professional history." },
        { icon: "/esa-dogs/icon-pet.svg", title: "ESA Training", description: "Trained on Fair Housing Act letter requirements." },
        { icon: "/esa-dogs/icon-research.svg", title: "Ongoing Audits", description: "Regular quality reviews of every evaluation." },
      ]}
    />
  );
}

export function EsaDogsSampleNote() {
  return (
    <section className="bg-white px-4 pb-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1062px] rounded-[20px] border-l-[5px] border-[#EFBF2F] bg-[#FEF8EC] p-6 sm:p-8 shadow-[0px_1px_4px_rgba(0,0,0,0.06)]">
        <p className="body text-body-text">
          <strong className="font-bold text-primary">Note:</strong> Want to see what an emotional support letter for a dog looks like? View a{" "}
          <Link href="/blog/esa-guide/esa-letter-sample/" className="font-semibold text-[#8A6A0B] hover:underline">
            sample ESA letter for dog
          </Link>{" "}
          to understand what information is typically included in an ESA letter.
        </p>
      </div>
    </section>
  );
}

export function EsaDogsRights() {
  return (
    <IconRow
      tone="cream"
      title="Your Emotional Support Dog Housing Rights"
      description="A letter from a licensed professional who knows your condition can support a reasonable accommodation request under the Fair Housing Act. Landlords may verify it, while some housing is exempt."
      items={[
        { icon: "/esa-dogs/icon-rights-pet.svg", title: "Pet Fee Relief", description: "An ESA letter may support a housing request and may waive pet rent or deposits. However, damage costs may still apply." },
        { icon: "/esa-dogs/icon-rights-phobia.svg", title: "Breed Freedom", description: "Your dog’s breed or size alone generally cannot be used to deny a reasonable housing accommodation request." },
        { icon: "/esa-dogs/icon-service-dog.svg", title: "No-Pet Policies", description: "A property’s no-pet policy does not automatically prevent you from requesting an ESA accommodation." },
        { icon: "/esa-dogs/icon-rights-verified.svg", title: "Legal Support", description: "The Fair Housing Act protects renters from discrimination while requesting an ESA accommodation." },
      ]}
    />
  );
}

const COMPARE = [
  { icon: "/esa-dogs/icon-compare-purpose.svg", label: "Purpose", esa: "Comfort for a mental or emotional condition", service: "Trained tasks for a disability", pet: "Companionship" },
  { icon: "/esa-dogs/icon-compare-agreement.svg", label: "Requires", esa: "ESA letter from a licensed clinician", service: "Individual task training", pet: "Nothing" },
  { icon: "/esa-dogs/icon-compare-law.svg", label: "Housing Rights", esa: "Yes (FHA & State-specific laws)", service: "Yes", pet: "No" },
  { icon: "/esa-dogs/icon-compare-social.svg", label: "Public Access", esa: "No", service: "Yes (ADA)", pet: "No" },
  { icon: "/esa-dogs/icon-compare-pet.svg", label: "Pet Fees Waived", esa: "Yes (with FHA approval)", service: "Yes", pet: "No" },
];

export function EsaDogsComparison() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto flex max-w-[1210px] flex-col items-center gap-12">
        <SectionIntro
          title="Compared Emotional Support Dogs, Service Animals & Regular Pets"
          description="Understand how emotional support dogs, service animals, and regular pets differ in their purpose, documentation, and legal protections"
        />
        <div className="w-full overflow-x-auto rounded-[24px] bg-background px-4 py-6 sm:px-8">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="text-primary">
                <th className="w-[28%] px-3 py-4" />
                <th className="heading-h3 px-3 py-4 font-bold">Emotional Support Dog</th>
                <th className="heading-h3 px-3 py-4 font-bold">Service Dog</th>
                <th className="heading-h3 px-3 py-4 font-bold">Regular Pet</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((row) => (
                <tr key={row.label} className="border-t border-[#E4DDD2]">
                  <th scope="row" className="px-3 py-5 font-sans text-base font-semibold text-primary">
                    <span className="flex items-center gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.12)]">
                        <Image src={row.icon} alt="" width={20} height={20} unoptimized />
                      </span>
                      {row.label}
                    </span>
                  </th>
                  <td className="body px-3 py-5 text-body-text">{row.esa}</td>
                  <td className="body px-3 py-5 text-body-text">{row.service}</td>
                  <td className="body px-3 py-5 text-body-text">{row.pet}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CtaButton href="/pricing/" variant="accent" className="w-[174px]">
          Get Started
        </CtaButton>
      </div>
    </section>
  );
}

const BREEDS = [
  { image: "/esa-dogs/breed-labrador.webp", name: "Labrador Retriever", text: "Gentle, patient, and eager to bond. A classic choice for emotional support.", tags: ["Friendly", "Large", "Loyal"] },
  { image: "/esa-dogs/breed-golden.webp", name: "Golden Retriever", text: "Warm and intuitive, known for sensing and responding to their owner's mood.", tags: ["Gentle", "Large", "Affection"] },
  { image: "/esa-dogs/breed-cavalier.webp", name: "Cavalier King Charles Spaniel", text: "Born companions who love cuddles and adapt well to apartment living.", tags: ["Cuddly", "Small", "Friendly"] },
  { image: "/esa-dogs/breed-poodle.webp", name: "Poodle", text: "Smart, calm, and low-shedding. Great for allergy-prone owners.", tags: ["Intelligent", "Toy–Standard", "Hypoallergenic"] },
  { image: "/esa-dogs/breed-pug.webp", name: "Pug", text: "Playful and clingy, a comforting lap companion with a big personality.", tags: ["Playful", "Small", "Low exercise"] },
  { image: "/esa-dogs/breed-greyhound.webp", name: "Greyhound", text: "Surprisingly calm and quiet indoors. A gentle, low-key companion.", tags: ["Calm", "Large", "Quiet"] },
  { image: "/esa-dogs/breed-frenchie.webp", name: "French Bulldog", text: "Easygoing, quiet, and affectionate. Ideal for small homes.", tags: ["Easygoing", "Small", "Loving"] },
  { image: "/esa-dogs/breed-corgi.webp", name: "Pembroke Welsh Corgi", text: "Cheerful and loyal, lifting your mood with constant energy and humor.", tags: ["Cheerful", "Medium", "Loyal"] },
  { image: "/esa-dogs/breed-bichon.webp", name: "Bichon Frisé", text: "Happy, gentle, and social. Low-shedding and easy to love.", tags: ["Happy", "Small", "Allergic"] },
];

export function EsaDogsBreeds() {
  return (
    <section className="bg-background px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-12">
        <SectionIntro
          title="Top Emotional Support Dog Breeds"
          description="There is no single breed or size that makes the perfect emotional support dog. Some breeds are especially popular for their calm, affectionate, and gentle temperaments."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {BREEDS.map((breed) => (
            <article key={breed.name} className="flex min-h-[284px] overflow-hidden rounded-[30px] bg-white shadow-[0px_1px_4px_rgba(0,0,0,0.08)]">
              <div className="relative w-[134px] shrink-0">
                <Image src={breed.image} alt={breed.name} fill quality={85} sizes="134px" className="object-cover" />
              </div>
              <div className="flex flex-col justify-center gap-3 px-5 py-6">
                <h3 className="heading-h3 text-primary">{breed.name}</h3>
                <p className="body text-body-text">{breed.text}</p>
                <ul className="flex flex-wrap gap-1">
                  {breed.tags.map((tag) => (
                    <li key={tag} className="rounded-full bg-[#D8F3DC] px-3 py-0.5 font-sans text-sm font-medium text-primary">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EsaDogsLetterIncludes() {
  return (
    <IconRow
      title="What A Valid ESA Letter Includes"
      description="Landlords look for these details. Every letter from us includes all of them."
      items={[
        { icon: "/esa-dogs/icon-req-licensed.svg", title: "Provider's License Details", description: "License number, state, and issue date." },
        { icon: "/esa-dogs/icon-req-evaluation.svg", title: "Letterhead & Signature", description: "Printed on professional letterhead with a signature." },
        { icon: "/esa-dogs/icon-req-licensed.svg", title: "Statement Of Need", description: "Confirms that an ESA helps with, without disclosing your diagnosis." },
        { icon: "/esa-dogs/icon-req-schedule.svg", title: "Current Date & Verification", description: "Dated within 12 months, with contact info for verification." },
      ]}
    />
  );
}
