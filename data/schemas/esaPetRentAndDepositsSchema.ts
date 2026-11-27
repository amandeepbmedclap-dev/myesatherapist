export const esaPetRentAndDepositsSchema = {
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
      "@id": "https://myesatherapist.com/blog/esa-guide/esa-pet-rent-and-deposits/#primaryimage",
      "url": "https://myesatherapist.com/images/blog/og/esa-pet-rent-and-deposits.jpg",
      "contentUrl": "https://myesatherapist.com/images/blog/og/esa-pet-rent-and-deposits.jpg",
      "width": 1200,
      "height": 630,
      "caption": "Tenant with emotional support dog reviewing a lease with a landlord",
    },
    {
      "@type": "WebPage",
      "@id": "https://myesatherapist.com/blog/esa-guide/esa-pet-rent-and-deposits/#webpage",
      "url": "https://myesatherapist.com/blog/esa-guide/esa-pet-rent-and-deposits/",
      "name": "Can a Landlord Charge Pet Rent or Deposit for an ESA? - My ESA Therapist",
      "isPartOf": { "@id": "https://myesatherapist.com/#website" },
      "primaryImageOfPage": {
        "@id": "https://myesatherapist.com/blog/esa-guide/esa-pet-rent-and-deposits/#primaryimage",
      },
      "mainEntity": {
        "@id": "https://myesatherapist.com/blog/esa-guide/esa-pet-rent-and-deposits/#article",
      },
      "breadcrumb": {
        "@id": "https://myesatherapist.com/blog/esa-guide/esa-pet-rent-and-deposits/#breadcrumb",
      },
      "datePublished": "2026-11-26",
      "dateModified": "2026-11-26",
      "inLanguage": "en-US",
    },
    {
      "@type": ["Article", "BlogPosting"],
      "@id": "https://myesatherapist.com/blog/esa-guide/esa-pet-rent-and-deposits/#article",
      "url": "https://myesatherapist.com/blog/esa-guide/esa-pet-rent-and-deposits/",
      "mainEntityOfPage": {
        "@id": "https://myesatherapist.com/blog/esa-guide/esa-pet-rent-and-deposits/#webpage",
      },
      "headline": "Can Landlords Charge Pet Rent or Deposits for an ESA?",
      "description":
        "Can landlords charge pet rent, deposits, or fees for an emotional support animal? Learn your FHA rights, the exceptions, and what to do if charged.",
      "image": {
        "@id": "https://myesatherapist.com/blog/esa-guide/esa-pet-rent-and-deposits/#primaryimage",
      },
      "datePublished": "2026-11-26",
      "dateModified": "2026-11-26",
      "author": { "@id": "https://myesatherapist.com/contributors/allyson-valley/#person" },
      "reviewedBy": { "@id": "https://www.linkedin.com/in/max-phillips-883485a5/" },
      "publisher": { "@id": "https://myesatherapist.com/#organization" },
      "articleSection": "ESA Guide",
      "about": [
        { "@type": "Thing", "name": "Emotional support animals" },
        { "@type": "Thing", "name": "Pet rent and pet deposits" },
        { "@type": "Thing", "name": "Fair Housing Act" },
      ],
      "inLanguage": "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://myesatherapist.com/blog/esa-guide/esa-pet-rent-and-deposits/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://myesatherapist.com/" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://myesatherapist.com/blog/" },
        { "@type": "ListItem", "position": 3, "name": "ESA Guide", "item": "https://myesatherapist.com/blog/esa-guide/" },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Can Landlords Charge Pet Rent or Deposits for an ESA?",
          "item": "https://myesatherapist.com/blog/esa-guide/esa-pet-rent-and-deposits/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://myesatherapist.com/blog/esa-guide/esa-pet-rent-and-deposits/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can a landlord charge monthly pet rent for an emotional support animal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Generally, no. A qualifying assistance animal is not considered an ordinary pet under the Fair Housing Act. When a reasonable accommodation applies, landlords generally cannot charge monthly pet rent for the animal.",
          },
        },
        {
          "@type": "Question",
          "name": "Can a landlord charge a nonrefundable pet fee for an ESA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Generally, no. Landlords cannot usually impose pet-related fees simply because a tenant has a qualifying assistance animal. State and local housing protections may also apply.",
          },
        },
        {
          "@type": "Question",
          "name": "Do I have to pay a regular security deposit if I have an ESA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. A landlord may generally collect the same standard security deposit required from other tenants. However, an additional deposit specifically for the ESA is generally not permitted.",
          },
        },
        {
          "@type": "Question",
          "name": "Can a landlord refuse an ESA because the property has a no-pet policy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Not automatically. A landlord may need to make an exception to a no-pet policy as a reasonable accommodation. However, certain exceptions to granting the accommodation may apply, including an undue financial burden, a fundamental alteration to the property, or an unresolved direct threat or risk of significant property damage.",
          },
        },
        {
          "@type": "Question",
          "name": "Does an ESA letter automatically mean I can avoid pet fees?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Not automatically. Supporting documentation may help establish a disability-related need, but the accommodation process and applicable legal requirements still matter. Online registrations and certificates alone do not establish eligibility for an ESA.",
          },
        },
      ],
    },
    {
      "@type": "HowTo",
      "@id": "https://myesatherapist.com/blog/esa-guide/esa-pet-rent-and-deposits/#howto",
      "name": "What Should You Do If a Landlord Charges Pet Fees for an ESA?",
      "description": "Practical steps if a landlord asks for pet rent or an additional deposit for an emotional support animal.",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Review your lease",
          "text": "Check the sections covering pets, deposits, monthly charges, and reasonable accommodations.",
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Submit an accommodation request",
          "text": "Explain that you need to keep an emotional support animal as an accommodation related to your disability.",
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Provide supporting documentation",
          "text": "If legally appropriate, share reliable information establishing your disability-related need for the animal, such as a letter by a qualified healthcare professional asserting your disability needs.",
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Ask about the charges",
          "text": "If your landlord still requests pet rent or a separate deposit, ask for an explanation regarding the charge in writing.",
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": "Keep communication records",
          "text": "Save emails, letters, payment requests, and other relevant documents.",
        },
        {
          "@type": "HowToStep",
          "position": 6,
          "name": "Seek local guidance",
          "text": "Contact a fair housing organization, state civil rights agency, or qualified attorney if you believe your rights have been violated. Contact one of these agencies for support prior to making any payment.",
        },
      ],
    },
  ],
};
