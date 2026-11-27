export const esaVsServiceAnimalSchema = {
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
      "@id": "https://myesatherapist.com/blog/esa-guide/esa-vs-service-animal/#primaryimage",
      "url": "https://myesatherapist.com/images/blog/og/esa-vs-service-animal.jpg",
      "contentUrl": "https://myesatherapist.com/images/blog/og/esa-vs-service-animal.jpg",
      "width": 1200,
      "height": 630,
      "caption": "Handler with a service dog at a cafe entrance",
    },
    {
      "@type": "WebPage",
      "@id": "https://myesatherapist.com/blog/esa-guide/esa-vs-service-animal/#webpage",
      "url": "https://myesatherapist.com/blog/esa-guide/esa-vs-service-animal/",
      "name": "ESA vs. Service Animal: What's the Difference? | My ESA Therapist",
      "isPartOf": { "@id": "https://myesatherapist.com/#website" },
      "primaryImageOfPage": {
        "@id": "https://myesatherapist.com/blog/esa-guide/esa-vs-service-animal/#primaryimage",
      },
      "mainEntity": { "@id": "https://myesatherapist.com/blog/esa-guide/esa-vs-service-animal/#article" },
      "breadcrumb": { "@id": "https://myesatherapist.com/blog/esa-guide/esa-vs-service-animal/#breadcrumb" },
      "datePublished": "2026-11-26",
      "dateModified": "2026-11-26",
      "inLanguage": "en-US",
    },
    {
      "@type": ["Article", "BlogPosting"],
      "@id": "https://myesatherapist.com/blog/esa-guide/esa-vs-service-animal/#article",
      "url": "https://myesatherapist.com/blog/esa-guide/esa-vs-service-animal/",
      "mainEntityOfPage": { "@id": "https://myesatherapist.com/blog/esa-guide/esa-vs-service-animal/#webpage" },
      "headline": "ESA vs. Service Animal: Which One Fits Your Situation?",
      "description":
        "Not sure if you need an ESA or a service animal? Compare training, documentation, housing protections, and public access rights under federal law.",
      "image": { "@id": "https://myesatherapist.com/blog/esa-guide/esa-vs-service-animal/#primaryimage" },
      "datePublished": "2026-11-26",
      "dateModified": "2026-11-26",
      "author": { "@id": "https://myesatherapist.com/contributors/allyson-valley/#person" },
      "reviewedBy": { "@id": "https://www.linkedin.com/in/max-phillips-883485a5/" },
      "publisher": { "@id": "https://myesatherapist.com/#organization" },
      "articleSection": "ESA Guide",
      "about": [
        { "@type": "Thing", "name": "Emotional support animals" },
        { "@type": "Thing", "name": "Service animals" },
        { "@type": "Thing", "name": "Americans with Disabilities Act" },
        { "@type": "Thing", "name": "Fair Housing Act" },
      ],
      "inLanguage": "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://myesatherapist.com/blog/esa-guide/esa-vs-service-animal/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://myesatherapist.com/" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://myesatherapist.com/blog/" },
        { "@type": "ListItem", position: 3, name: "ESA Guide", item: "https://myesatherapist.com/blog/esa-guide/" },
        {
          "@type": "ListItem",
          position: 4,
          name: "ESA vs. Service Animal: Which One Fits Your Situation?",
          item: "https://myesatherapist.com/blog/esa-guide/esa-vs-service-animal/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://myesatherapist.com/blog/esa-guide/esa-vs-service-animal/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is an ESA the same as a service animal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. An ESA provides emotional support through companionship, while a service dog performs specific tasks related to a person's disability. Service animals typically have some form of specialized or specific training, while ESAs do not.",
          },
        },
        {
          "@type": "Question",
          "name": "Can an ESA go everywhere a service dog can?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. ESAs don't have general public access rights under the ADA. Service animals generally can accompany their handlers in covered public places.",
          },
        },
        {
          "@type": "Question",
          "name": "Does a service animal need certification?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. The ADA doesn't require official certification, registration, or identification cards for service dogs. However, service animals are still held to safety and behavior standards in public, one of the many reasons why service animal training is important.",
          },
        },
        {
          "@type": "Question",
          "name": "Can a service animal help with mental health conditions?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Psychiatric service animals can be trained to perform specific tasks that assist people with mental health disabilities. While service animals are typically dogs, there are cases of other animals being service animals.",
          },
        },
        {
          "@type": "Question",
          "name": "Can an ESA and a service dog both live in rental housing?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Both may qualify as assistance animals under the FHA and the ADA, provided the applicable requirements are met and no legal exception applies.",
          },
        },
      ],
    },
  ],
};
