export const howToGetAnEsaLetterOnlineSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://myesatherapist.com/#organization",
      "name": "My ESA Therapist",
      "url": "https://myesatherapist.com/",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://myesatherapist.com/#logo",
        "url": "https://myesatherapist.com/images/logo/my-esa-therapist-logo.webp",
        "contentUrl": "https://myesatherapist.com/images/logo/my-esa-therapist-logo.webp",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://myesatherapist.com/#website",
      "url": "https://myesatherapist.com/",
      "name": "My ESA Therapist",
      "publisher": { "@id": "https://myesatherapist.com/#organization" },
      "inLanguage": "en-US",
    },
    {
      "@type": "Person",
      "@id": "https://myesatherapist.com/contributors/allyson-valley/#person",
      "name": "Allyson Valley",
      "url": "https://myesatherapist.com/contributors/allyson-valley/",
      "image": {
        "@type": "ImageObject",
        "url": "https://myesatherapist.com/images/authors/allyson-valley-profile-image.webp",
      },
      "jobTitle": "Mental Health Writer & Research Contributor",
      "worksFor": { "@id": "https://myesatherapist.com/#organization" },
    },
    {
      "@type": "Person",
      "@id": "https://www.linkedin.com/in/max-phillips-883485a5/",
      "name": "Max Phillips",
      "url": "https://www.linkedin.com/in/max-phillips-883485a5/",
      "image": {
        "@type": "ImageObject",
        "url": "https://myesatherapist.com/images/authors/max-phillips-image.webp",
      },
      "honorificSuffix": "MSW, LCSW",
      "jobTitle": "Licensed Clinical Social Worker",
    },
    {
      "@type": "ImageObject",
      "@id": "https://myesatherapist.com/blog/esa-guide/how-to-get-an-esa-letter-online/#primaryimage",
      "url": "https://myesatherapist.com/images/blog/og/how-to-get-an-esa-letter-online.jpg",
      "contentUrl": "https://myesatherapist.com/images/blog/og/how-to-get-an-esa-letter-online.jpg",
      "width": 1200,
      "height": 630,
      "caption": "Man reviewing housing papers at a desk with an orange cat nearby",
    },
    {
      "@type": "WebPage",
      "@id": "https://myesatherapist.com/blog/esa-guide/how-to-get-an-esa-letter-online/#webpage",
      "url": "https://myesatherapist.com/blog/esa-guide/how-to-get-an-esa-letter-online/",
      "name": "How to Get an ESA Letter Online: Step-by-Step Guide | My ESA Therapist",
      "isPartOf": { "@id": "https://myesatherapist.com/#website" },
      "primaryImageOfPage": {
        "@id": "https://myesatherapist.com/blog/esa-guide/how-to-get-an-esa-letter-online/#primaryimage",
      },
      "mainEntity": { "@id": "https://myesatherapist.com/blog/esa-guide/how-to-get-an-esa-letter-online/#article" },
      "breadcrumb": { "@id": "https://myesatherapist.com/blog/esa-guide/how-to-get-an-esa-letter-online/#breadcrumb" },
      "datePublished": "2026-11-27",
      "dateModified": "2026-11-27",
      "inLanguage": "en-US",
    },
    {
      "@type": ["Article", "BlogPosting"],
      "@id": "https://myesatherapist.com/blog/esa-guide/how-to-get-an-esa-letter-online/#article",
      "url": "https://myesatherapist.com/blog/esa-guide/how-to-get-an-esa-letter-online/",
      "mainEntityOfPage": { "@id": "https://myesatherapist.com/blog/esa-guide/how-to-get-an-esa-letter-online/#webpage" },
      "headline": "How to Get an ESA Letter Online: Step-by-Step Guide",
      "description":
        "Not sure where to start with an ESA letter? This guide walks you through eligibility, choosing a provider, your evaluation, and next steps.",
      "image": { "@id": "https://myesatherapist.com/blog/esa-guide/how-to-get-an-esa-letter-online/#primaryimage" },
      "datePublished": "2026-11-27",
      "dateModified": "2026-11-27",
      "author": { "@id": "https://myesatherapist.com/contributors/allyson-valley/#person" },
      "reviewedBy": { "@id": "https://www.linkedin.com/in/max-phillips-883485a5/" },
      "publisher": { "@id": "https://myesatherapist.com/#organization" },
      "articleSection": "ESA Guide",
      "about": [
        { "@type": "Thing", "name": "Emotional support animal letters" },
        { "@type": "Thing", "name": "Telehealth" },
        { "@type": "Thing", "name": "Fair Housing Act" },
      ],
      "inLanguage": "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://myesatherapist.com/blog/esa-guide/how-to-get-an-esa-letter-online/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://myesatherapist.com/" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://myesatherapist.com/blog/" },
        { "@type": "ListItem", position: 3, name: "ESA Guide", item: "https://myesatherapist.com/blog/esa-guide/" },
        {
          "@type": "ListItem",
          position: 4,
          name: "How to Get an ESA Letter Online",
          item: "https://myesatherapist.com/blog/esa-guide/how-to-get-an-esa-letter-online/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://myesatherapist.com/blog/esa-guide/how-to-get-an-esa-letter-online/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can I get an ESA letter online?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. You can get an ESA letter through a legitimate online healthcare service if a qualified professional evaluates your circumstances and determines that you have a disability-related need for an emotional support animal.",
          },
        },
        {
          "@type": "Question",
          "name": "How do I qualify for an ESA letter?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You must meet the applicable disability requirements and have a disability-related need for an ESA. A qualified healthcare professional can evaluate your situation and determine whether an ESA recommendation is appropriate.",
          },
        },
        {
          "@type": "Question",
          "name": "Are online ESA letters legitimate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, they can be. The important thing is that the letter comes from a qualified healthcare professional following a genuine evaluation. Buying an ESA certificate or registration without an assessment doesn't establish eligibility.",
          },
        },
        {
          "@type": "Question",
          "name": "Does an ESA letter expire?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Fair Housing Act doesn't set a universal expiration date for ESA letters. However, housing providers may ask for updated information when there are reasonable grounds to believe the existing documentation no longer reflects your needs.",
          },
        },
        {
          "@type": "Question",
          "name": "Does an ESA letter guarantee housing approval?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. An ESA letter supports your accommodation request, but it doesn't guarantee approval. Housing providers can review the request under applicable fair housing laws and consider any legally recognized exceptions, such as undue financial burden or major changes to the property infrastructure.",
          },
        },
      ],
    },
    {
      "@type": "HowTo",
      "@id": "https://myesatherapist.com/blog/esa-guide/how-to-get-an-esa-letter-online/#howto",
      "name": "How to Get an ESA Letter Online",
      "description":
        "Requesting an ESA letter online involves checking your eligibility, choosing a legitimate provider, attending an evaluation with a qualified healthcare professional, and receiving documentation if you qualify.",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Find Out If You May Qualify for an ESA",
          "text": "Before starting the process, take some time to understand whether an emotional support animal could help with your disability-related needs. Having a diagnosis doesn't automatically make you eligible for an ESA accommodation.",
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Choose a Trusted Online ESA Service",
          "text": "A genuine ESA evaluation should involve a real consultation with a live provider, not just a form or instant approval upon payment. Check that the professional is licensed to provide services in your state.",
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Attend Your ESA Evaluation",
          "text": "Speak with a licensed healthcare professional about your mental health symptoms, what struggles you experience in your daily life, and how an emotional support animal might help in managing them.",
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Find Out If You Qualify",
          "text": "If the professional determines that you meet the relevant requirements, they may issue an ESA letter. If you don't meet the criteria, they should not issue a letter simply because you've requested one.",
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": "Receive and Review Your ESA Letter",
          "text": "Before submitting the letter to a housing provider, check that it includes your name, the professional's credentials and license number, confirmation of your disability-related need, and contact information where appropriate.",
        },
        {
          "@type": "HowToStep",
          "position": 6,
          "name": "Submit Your Letter for Housing Accommodation",
          "text": "Contact your landlord or housing provider to request an ESA accommodation under the Fair Housing Act. Keep a copy of your letter and all related communication.",
        },
      ],
    },
  ],
};
