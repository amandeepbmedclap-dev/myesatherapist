export const areOnlineEsaLettersLegitSchema = {
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
      "@id": "https://myesatherapist.com/blog/esa-guide/are-online-esa-letters-legit/#primaryimage",
      "url": "https://myesatherapist.com/images/blog/og/are-online-esa-letters-legit.webp",
      "contentUrl": "https://myesatherapist.com/images/blog/og/are-online-esa-letters-legit.webp",
      "width": 1200,
      "height": 630,
      "caption": "Woman on a laptop at a kitchen table while a dog sleeps beside her",
    },
    {
      "@type": "WebPage",
      "@id": "https://myesatherapist.com/blog/esa-guide/are-online-esa-letters-legit/#webpage",
      "url": "https://myesatherapist.com/blog/esa-guide/are-online-esa-letters-legit/",
      "name": "Are Online ESA Letters Legit? How to Spot a Provider - My ESA Therapist",
      "isPartOf": { "@id": "https://myesatherapist.com/#website" },
      "primaryImageOfPage": {
        "@id": "https://myesatherapist.com/blog/esa-guide/are-online-esa-letters-legit/#primaryimage",
      },
      "mainEntity": { "@id": "https://myesatherapist.com/blog/esa-guide/are-online-esa-letters-legit/#article" },
      "breadcrumb": { "@id": "https://myesatherapist.com/blog/esa-guide/are-online-esa-letters-legit/#breadcrumb" },
      "datePublished": "2026-11-27",
      "dateModified": "2026-11-27",
      "inLanguage": "en-US",
    },
    {
      "@type": ["Article", "BlogPosting"],
      "@id": "https://myesatherapist.com/blog/esa-guide/are-online-esa-letters-legit/#article",
      "url": "https://myesatherapist.com/blog/esa-guide/are-online-esa-letters-legit/",
      "mainEntityOfPage": { "@id": "https://myesatherapist.com/blog/esa-guide/are-online-esa-letters-legit/#webpage" },
      "headline": "Are Online ESA Letters Legit? How to Spot a Legitimate Provider",
      "description":
        "Not sure if an online ESA letter is real? See the 6 signs of a legitimate provider, common red flags, and how telehealth evaluations work.",
      "image": { "@id": "https://myesatherapist.com/blog/esa-guide/are-online-esa-letters-legit/#primaryimage" },
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
      "@id": "https://myesatherapist.com/blog/esa-guide/are-online-esa-letters-legit/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://myesatherapist.com/" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://myesatherapist.com/blog/" },
        { "@type": "ListItem", position: 3, name: "ESA Guide", item: "https://myesatherapist.com/blog/esa-guide/" },
        {
          "@type": "ListItem",
          position: 4,
          name: "Are Online ESA Letters Legit?",
          item: "https://myesatherapist.com/blog/esa-guide/are-online-esa-letters-legit/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://myesatherapist.com/blog/esa-guide/are-online-esa-letters-legit/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can landlords reject online ESA letters?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A landlord shouldn't reject documentation simply because it was obtained online. However, they may assess whether it reliably establishes a disability-related need when that need isn't apparent or already known. Remember, an ESA letter that is not specific to you and your ESA may not provide any legal housing protections.",
          },
        },
        {
          "@type": "Question",
          "name": "Are ESA registration certificates legally required?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Federal law doesn't require an emotional support animal to have a registration certificate, ID card, or registration number. Purchasing these items doesn't automatically establish housing rights and provides no additional legal protections.",
          },
        },
        {
          "@type": "Question",
          "name": "Can I get a legitimate ESA letter through a video consultation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. A video consultation can be part of a legitimate evaluation when an appropriately qualified professional assesses your individual circumstances and follows applicable licensing requirements. The evaluation must take place on HIPAA-compliant telehealth software.",
          },
        },
        {
          "@type": "Question",
          "name": "How can I verify an ESA provider's state license?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ask for the professional's full name, license type, and license number. You can check these details through the official licensing board for the relevant state. You can also check their information through the National Provider Identifier (NPI) registry.",
          },
        },
        {
          "@type": "Question",
          "name": "Does a legitimate ESA letter guarantee housing accommodation approval?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. A letter may support a reasonable accommodation request, but the housing provider can assess it under applicable fair housing laws and recognized exceptions.",
          },
        },
      ],
    },
  ],
};
