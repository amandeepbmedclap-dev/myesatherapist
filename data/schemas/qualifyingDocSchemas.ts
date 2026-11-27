const organization = {
  "@type": "Organization",
  "@id": "https://myesatherapist.com/#organization",
  name: "My ESA Therapist",
  url: "https://myesatherapist.com/",
  logo: {
    "@type": "ImageObject",
    "@id": "https://myesatherapist.com/#logo",
    url: "https://myesatherapist.com/images/logo/my-esa-therapist-logo.webp",
    contentUrl: "https://myesatherapist.com/images/logo/my-esa-therapist-logo.webp",
  },
};

const website = {
  "@type": "WebSite",
  "@id": "https://myesatherapist.com/#website",
  url: "https://myesatherapist.com/",
  name: "My ESA Therapist",
  publisher: { "@id": "https://myesatherapist.com/#organization" },
  inLanguage: "en-US",
};

const allyson = {
  "@type": "Person",
  "@id": "https://myesatherapist.com/contributors/allyson-valley/#person",
  name: "Allyson Valley",
  url: "https://myesatherapist.com/contributors/allyson-valley/",
  image: {
    "@type": "ImageObject",
    url: "https://myesatherapist.com/images/authors/allyson-valley-profile-image.webp",
  },
  jobTitle: "Mental Health Writer & Research Contributor",
  worksFor: { "@id": "https://myesatherapist.com/#organization" },
};

const max = {
  "@type": "Person",
  "@id": "https://www.linkedin.com/in/max-phillips-883485a5/",
  name: "Max Phillips",
  url: "https://www.linkedin.com/in/max-phillips-883485a5/",
  image: {
    "@type": "ImageObject",
    url: "https://myesatherapist.com/images/authors/max-phillips-image.webp",
  },
  honorificSuffix: "MSW, LCSW",
  jobTitle: "Licensed Clinical Social Worker",
};

const robert = {
  "@type": "Person",
  "@id": "https://myesatherapist.com/esa-doctors/dr-robert-staaf/#person",
  name: "Robert Staaf",
  url: "https://myesatherapist.com/esa-doctors/dr-robert-staaf/",
  jobTitle: "Licensed Clinical Social Worker",
  worksFor: { "@id": "https://myesatherapist.com/#organization" },
};

function faq(name: string, text: string) {
  return { "@type": "Question", name, acceptedAnswer: { "@type": "Answer", text } };
}

function postGraph(opts: {
  slug: string;
  pageName: string;
  headline: string;
  description: string;
  caption: string;
  crumb: string;
  about: string[];
  faqs: { name: string; text: string }[];
  extra?: Record<string, unknown>[];
}) {
  const url = `https://myesatherapist.com/blog/qualifying-conditions/${opts.slug}/`;
  const image = `https://myesatherapist.com/images/blog/og/${opts.slug}.webp`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      website,
      allyson,
      max,
      ...(opts.extra ?? []),
      {
        "@type": "ImageObject",
        "@id": `${url}#primaryimage`,
        url: image,
        contentUrl: image,
        width: 1200,
        height: 630,
        caption: opts.caption,
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: opts.pageName,
        isPartOf: { "@id": "https://myesatherapist.com/#website" },
        primaryImageOfPage: { "@id": `${url}#primaryimage` },
        mainEntity: { "@id": `${url}#article` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        datePublished: "2026-11-27",
        dateModified: "2026-11-27",
        inLanguage: "en-US",
      },
      {
        "@type": ["Article", "BlogPosting"],
        "@id": `${url}#article`,
        url,
        mainEntityOfPage: { "@id": `${url}#webpage` },
        headline: opts.headline,
        description: opts.description,
        image: { "@id": `${url}#primaryimage` },
        datePublished: "2026-11-27",
        dateModified: "2026-11-27",
        author: { "@id": "https://myesatherapist.com/contributors/allyson-valley/#person" },
        reviewedBy: { "@id": "https://www.linkedin.com/in/max-phillips-883485a5/" },
        publisher: { "@id": "https://myesatherapist.com/#organization" },
        articleSection: "Qualifying Conditions",
        about: opts.about.map((name) => ({ "@type": "Thing", name })),
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://myesatherapist.com/" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://myesatherapist.com/blog/" },
          {
            "@type": "ListItem",
            position: 3,
            name: "Qualifying Conditions",
            item: "https://myesatherapist.com/blog/qualifying-conditions/",
          },
          { "@type": "ListItem", position: 4, name: opts.crumb, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: opts.faqs.map((item) => faq(item.name, item.text)),
      },
    ],
  };
}

export const esaForSocialAnxietySchema = postGraph({
  slug: "esa-for-social-anxiety",
  pageName: "Can You Get an ESA for Social Anxiety? What to Know - My ESA Therapist",
  headline: "ESA for Social Anxiety Disorder: Qualification and Benefits",
  description:
    "Social anxiety may qualify you for an ESA if it affects daily life. See what a licensed professional looks at and how an ESA can support you.",
  caption: "Person sitting by a window with a dog resting against them",
  crumb: "ESA for Social Anxiety Disorder",
  about: ["Social anxiety disorder", "Emotional support animals", "Fair Housing Act"],
  faqs: [
    {
      name: "Is an ESA a treatment for social anxiety disorder?",
      text: "No, it's not a treatment on its own. Social anxiety is usually treated with psychotherapy, medication, or both. An ESA can add support on top of those treatments when a qualified professional says it's appropriate, but it's not a substitute for treatment.",
    },
    {
      name: "Can I get an ESA letter for social anxiety if I already take medication?",
      text: "Yes. Taking medication or attending therapy does not automatically disqualify you. A mental health professional will consider your current treatment, symptoms, and disability-related needs when determining whether an ESA may provide additional support.",
    },
    {
      name: "What if my social anxiety gets worse after getting an ESA?",
      text: "An ESA is not guaranteed to improve everyone's symptoms. If your anxiety worsens, discuss the changes with your mental health professional. Your treatment plan may need to be reassessed.",
    },
    {
      name: "Can two people with social anxiety share the same ESA?",
      text: "Possibly. However, each person's disability-related need must be considered individually. One person's ESA documentation does not automatically establish another person's eligibility or accommodation rights.",
    },
    {
      name: "Can my ESA accompany me to social gatherings, restaurants, or public places?",
      text: "No. An ESA does not have the same public access rights as a trained service animal under the ADA. Businesses such as restaurants generally do not have to allow ESAs inside.",
    },
  ],
});

export const esaForPanicDisorderSchema = postGraph({
  slug: "esa-for-panic-disorder",
  pageName: "Can You Get an ESA for Panic Disorder? What to Know - My ESA Therapist",
  headline: "ESA for Panic Disorder: Eligibility and Emotional Support Benefits",
  description:
    "Not sure if panic disorder qualifies for an ESA? Find out how licensed professionals assess your needs and what an ESA can realistically offer.",
  caption: "Person sitting on the floor with a dog close beside them",
  crumb: "ESA for Panic Disorder",
  about: ["Panic disorder", "Emotional support animals", "Fair Housing Act"],
  faqs: [
    {
      name: "Can panic disorder qualify me for an ESA?",
      text: "It can factor into an evaluation, but having the diagnosis by itself doesn't guarantee anything. A licensed mental health professional needs to look at your specific situation and what kind of support you actually need to manage your disability and improve overall functioning.",
    },
    {
      name: "Can an ESA stop panic attacks?",
      text: "Not really. You shouldn't count on an ESA to stop an attack once it starts. Some people do find comfort in having their animal around during anxious moments, but it's different for everyone. An ESA is not a cure for panic disorder.",
    },
    {
      name: "Can I take my ESA everywhere?",
      text: "No. ESAs generally don't have the same public access rights as service animals under the ADA. It comes down to the state, city, and local laws that apply and how the animal is legally classified in your state.",
    },
    {
      name: "Can a dog with panic-attack training be a service animal instead?",
      text: "It's possible. If a dog is trained to recognize or respond to specific disability-related needs, that could put it under the ADA's service animal definition. That's different from just being emotionally comforting, as service animals require specific training to support an individual with their disability symptoms.",
    },
    {
      name: "Who can evaluate me for an ESA?",
      text: "A licensed mental health professional. They look at your mental health symptoms and daily needs and decide whether recommending an ESA makes sense clinically for you and your life. What kind of documentation you need can depend on your situation and local laws.",
    },
  ],
});

export const esaForGriefSchema = postGraph({
  slug: "esa-for-grief-and-bereavement",
  pageName: "Can an ESA Help With Grief or Bereavement? - My ESA Therapist",
  headline: "Can an ESA Help With Grief or Bereavement? What Therapists Say",
  description:
    "An ESA may offer comfort, routine, and companionship after a loss. Learn how it can help with grief, who may qualify, and what therapists say.",
  caption: "Woman sitting at a kitchen table with a cat on her lap",
  crumb: "ESA for Grief and Bereavement",
  about: ["Grief", "Bereavement", "Emotional support animals"],
  extra: [robert],
  faqs: [
    {
      name: "Can an ESA help with grief and sadness?",
      text: "Yes. An ESA can offer companionship, comfort, and routine while you grieve. The benefits vary from person to person, and it doesn't replace professional treatment when you need it, such as therapy and medication management.",
    },
    {
      name: "Can you get an ESA letter after a loved one dies?",
      text: "Possibly. A licensed mental health professional has to assess whether you have a qualifying disability-related need for an ESA. Losing someone alone doesn't guarantee you'll qualify.",
    },
    {
      name: "Can an emotional support animal help with depression after a loss?",
      text: "It can offer companionship and encourage daily routines if you're feeling depressed after a loss. It can work alongside professional treatment, but it shouldn't replace care you need.",
    },
    {
      name: "Can you get an ESA for losing a pet?",
      text: "Potentially. If losing a pet leads to a mental health condition that creates a qualifying disability-related need, an ESA may make sense. It comes down to an individual assessment, symptoms, needs, and the letter writer's clinical decision-making.",
    },
    {
      name: "Does an ESA replace grief counseling?",
      text: "No. An ESA can go hand in hand with grief counseling, but it can't replace a professional assessment or treatment when you need them.",
    },
    {
      name: "Do you need an ESA letter for housing?",
      text: "If you ask for an ESA as a reasonable accommodation in US housing, you may need to give reliable information supporting your disability-related need, especially when that need isn't obvious or already known to the housing provider. A letter doesn't guarantee approval in every case.",
    },
  ],
});
