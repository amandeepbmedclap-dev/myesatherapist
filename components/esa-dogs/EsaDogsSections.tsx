import Image from "next/image";
import { CtaButton } from "@/components/common/CtaButton";

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
    icon: "/esa-dogs/icon-housing.svg",
    title: "Housing Protection",
    description:
      "Keep your dog with you in rental housing and request a reasonable accommodation under the Fair Housing Act — no pet rent or pet deposit for a valid ESA.",
  },
  {
    icon: "/esa-dogs/icon-fast.svg",
    title: "Fast & Simple",
    description:
      "Complete a short questionnaire, meet your provider by video or phone, and get your letter as soon as the same day.",
  },
  {
    icon: "/esa-dogs/icon-licensed.svg",
    title: "Real Licensed Providers",
    description:
      "Every evaluation is done by a licensed therapist, counselor, or psychologist — never an automated form.",
  },
  {
    icon: "/esa-dogs/icon-secure.svg",
    title: "Private & Secure",
    description:
      "Your health information is encrypted and never shared with your landlord. They only see your letter.",
  },
  {
    icon: "/esa-dogs/icon-verified.svg",
    title: "Verifiable Letter",
    description:
      "Includes provider license number, issue date, and verification contact so your landlord can confirm it's real.",
  },
  {
    icon: "/esa-dogs/icon-phobia.svg",
    title: "Risk-Free",
    description:
      "Not approved after your evaluation? You get a full refund. No hidden fees, no auto-renewals.",
  },
];

export function EsaDogsWhy() {
  return (
    <section className="bg-background px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto flex max-w-[1283px] flex-col gap-16">
        <SectionIntro
          title="Why Dog Owners Choose Us"
          description="A legitimate letter from a real, licensed professional — the kind landlords actually accept."
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
    icon: "/esa-dogs/icon-anxiety.svg",
    title: "Reduces Stress & Anxiety",
    description:
      "Petting and being near your dog can help calm your nervous system, ease tension, and make stressful moments feel more manageable.",
  },
  {
    icon: "/esa-dogs/icon-companionship.svg",
    title: "Eases Loneliness",
    description:
      "A loyal companion at home can reduce feelings of isolation and give you someone to come home to every day.",
  },
  {
    icon: "/esa-dogs/icon-routine.svg",
    title: "Builds Daily Routine",
    description:
      "Regular feeding times and daily walks add structure to your day, which may help with depression and low motivation.",
  },
  {
    icon: "/esa-dogs/icon-activity.svg",
    title: "Encourages Activity",
    description:
      "Daily walks with your dog mean more movement, more fresh air, and steady habits that can support better physical health.",
  },
  {
    icon: "/esa-dogs/icon-sleep.svg",
    title: "Better Sleep",
    description:
      "Many owners feel safer and more settled at night with their dog nearby, which can make it easier to rest.",
  },
  {
    icon: "/esa-dogs/icon-social.svg",
    title: "Social Connection",
    description:
      "Dogs make it easier to start conversations, meet neighbors, and gradually rebuild confidence when you are around other people.",
  },
  {
    icon: "/esa-dogs/icon-purpose.svg",
    title: "Sense Of Purpose",
    description:
      "Caring for another living being each day can restore a sense of meaning and responsibility to your daily life.",
  },
  {
    icon: "/esa-dogs/icon-support.svg",
    title: "Unconditional Support",
    description:
      "Your dog offers constant, non-judgmental companionship during hard moments, stressful days, and panic episodes when you need it.",
  },
];

export function EsaDogsBenefits() {
  return (
    <section className="bg-white">
      <div className="mx-auto flex max-w-[1281px] flex-col gap-12 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <SectionIntro
          title="Benefits Of Having An Emotional Support Dog"
          description="Dogs provide steady comfort and structure. Here's how an ESA dog can support your daily life."
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

const CONDITIONS = [
  { icon: "/esa-dogs/icon-anxiety-2.svg", label: "Anxiety Disorders" },
  { icon: "/esa-dogs/icon-depression.svg", label: "Depression" },
  { icon: "/esa-dogs/icon-ocd.svg", label: "OCD" },
  { icon: "/esa-dogs/icon-trauma.svg", label: "PTSD & Trauma" },
  { icon: "/esa-dogs/icon-mood.svg", label: "Bipolar Disorders" },
  { icon: "/esa-dogs/icon-neuro.svg", label: "ADHD" },
  { icon: "/esa-dogs/icon-phobia-2.svg", label: "Phobias & Fears" },
  { icon: "/esa-dogs/icon-companionship-2.svg", label: "Grief & Other" },
];

export function EsaDogsConditions() {
  return (
    <section className="bg-background px-4 pb-16 pt-16 sm:px-6 sm:pb-16 lg:px-8 lg:pb-0 lg:pt-20">
      <div className="mx-auto flex max-w-[1278px] flex-col items-center">
        <SectionIntro
          title="Conditions That May Qualify You For An ESA Letter"
          description="To qualify, a licensed professional must find that you have a diagnosed mental or emotional condition that substantially limits a major life activity, and that your dog helps ease it."
        />

        <div className="relative mt-16 w-full">
          <div className="relative mx-auto aspect-[952/493] w-full max-w-[952px]">
            <Image
              src="/esa-dogs/conditions-photo.webp"
              alt="Woman sitting on a sofa with her golden retriever"
              fill
              quality={85}
              sizes="(min-width: 1024px) 952px, 100vw"
              className="object-contain"
            />
          </div>
          <ul className="mt-6 flex flex-wrap justify-center gap-3 lg:absolute lg:inset-0 lg:mt-0 lg:block">
            {CONDITIONS.map((item, index) => {
              const spots = [
                "lg:left-[18%] lg:top-[2%]",
                "lg:left-[58%] lg:-top-8",
                "lg:left-[2%] lg:top-[28%]",
                "lg:left-[22%] lg:top-[24%]",
                "lg:left-[74%] lg:top-[20%]",
                "lg:left-[82%] lg:top-[40%]",
                "lg:left-[0%] lg:top-[62%]",
                "lg:right-0 lg:top-[58%]",
              ];
              return (
                <li
                  key={item.label}
                  className={`flex h-12 items-center gap-2.5 rounded-[10px] bg-white px-6 shadow-[0px_2px_4px_rgba(0,0,0,0.15)] lg:absolute ${spots[index]}`}
                >
                  <Image src={item.icon} alt="" width={20} height={20} unoptimized />
                  <span className="whitespace-nowrap font-sans text-[18px] font-medium leading-7 text-primary">{item.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
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

export function EsaDogsRights() {
  return (
    <IconRow
      tone="cream"
      title="Your ESA Dog Housing Rights"
      description="With a valid ESA letter, the Fair Housing Act gives you important protections when renting."
      items={[
        { icon: "/esa-dogs/icon-rights-pet.svg", title: "Pet Deposit", description: "ESAs are not treated as pets, so landlords generally can't charge pet fees for them" },
        { icon: "/esa-dogs/icon-rights-phobia.svg", title: "Weight Limits", description: 'Standard "no large dogs" or breed rules generally don\'t apply to a valid ESA.' },
        { icon: "/esa-dogs/icon-service-dog.svg", title: '"No Pets" Buildings', description: "You can request a reasonable accommodation even where pets are normally banned." },
        { icon: "/esa-dogs/icon-rights-verified.svg", title: "Protection", description: "Landlords can't refuse housing just because you have an ESA, with limited exceptions." },
      ]}
    />
  );
}

const COMPARE = [
  { icon: "/esa-dogs/icon-compare-purpose.svg", label: "Purpose", esa: "Comfort for a mental or emotional condition", service: "Trained tasks for a disability", pet: "Companionship" },
  { icon: "/esa-dogs/icon-compare-agreement.svg", label: "Requires", esa: "Letter from a licensed professional", service: "Individual task training", pet: "Nothing" },
  { icon: "/esa-dogs/icon-compare-law.svg", label: "Housing Rights", esa: "Yes (Fair Housing Act)", service: "Yes", pet: "No" },
  { icon: "/esa-dogs/icon-compare-social.svg", label: "Public Access", esa: "No", service: "Yes (ADA)", pet: "No" },
  { icon: "/esa-dogs/icon-compare-pet.svg", label: "Pet Fees Waived", esa: "Yes", service: "Yes", pet: "No" },
];

export function EsaDogsComparison() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto flex max-w-[1210px] flex-col items-center gap-12">
        <SectionIntro
          title="Compare To Other ESA Letter Services"
          description="We set the standard for professional care, compliance, and trust."
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
  { image: "/esa-dogs/breed-labrador.webp", name: "Labrador Retriever", text: "Gentle, patient, and eager to bond. A classic choice for emotional support.", tags: ["Large", "Friendly", "Loyal"] },
  { image: "/esa-dogs/breed-golden.webp", name: "Golden Retriever", text: "Warm and intuitive, known for sensing and responding to their owner's mood.", tags: ["Large", "Gentle", "Affection"] },
  { image: "/esa-dogs/breed-cavalier.webp", name: "Cavalier King Charles Spaniel", text: "Born companions who love cuddles and adapt well to apartment living.", tags: ["Small", "Cuddly", "Friendly"] },
  { image: "/esa-dogs/breed-poodle.webp", name: "Poodle", text: "Smart, calm, and low-shedding. Great for allergy-prone owners.", tags: ["Toy–Standard", "Smart", "Hypoallergenic"] },
  { image: "/esa-dogs/breed-pug.webp", name: "Pug", text: "Playful and clingy, a comforting lap companion with a big personality.", tags: ["Small", "Playful", "Low exercise"] },
  { image: "/esa-dogs/breed-greyhound.webp", name: "Greyhound", text: "Surprisingly calm and quiet indoors. A gentle, low-key companion.", tags: ["Large", "Surprisingly calm", "Quiet"] },
  { image: "/esa-dogs/breed-frenchie.webp", name: "French Bulldog", text: "Easygoing, quiet, and affectionate. Ideal for small homes.", tags: ["Small", "Quiet", "Loving"] },
  { image: "/esa-dogs/breed-corgi.webp", name: "Pembroke Welsh Corgi", text: "Cheerful and loyal, lifting your mood with constant energy and humor.", tags: ["Medium", "Cheerful", "Loyal"] },
  { image: "/esa-dogs/breed-bichon.webp", name: "Bichon Frise", text: "Happy, gentle, and social. Low-shedding and easy to love.", tags: ["Small", "Allergic", "Happy"] },
];

export function EsaDogsBreeds() {
  return (
    <section className="bg-background px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-12">
        <SectionIntro
          title="Best ESA Dog Breeds"
          description="Any dog can be an ESA, whatever the breed, size, or age. These breeds are popular for their calm, affectionate temperaments."
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
