export const esaLetterForDogSchema = {
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
        "caption": "My ESA Therapist Logo",
      },
      "image": {
        "@id": "https://myesatherapist.com/#logo",
      },
      "email": "info@myesatherapist.com",
      "telephone": "+1-888-412-4041",
      "contactPoint": [
        {
          "@id": "https://myesatherapist.com/#contactpoint",
        },
      ],
      "areaServed": {
        "@type": "Country",
        "name": "United States",
      },
      "sameAs": [
        "https://www.facebook.com/myesatherapy",
        "https://www.instagram.com/myesatherapist/",
        "https://x.com/myesatherapist",
        "https://www.youtube.com/@myesatherapist",
        "https://www.linkedin.com/company/myesatherapist/",
        "https://www.trustpilot.com/review/myesatherapist.com",
        "https://www.consumeraffairs.com/pets/my-esa-therapist.html",
        "https://www.yelp.com/biz/my-esa-therapist-jacksonville",
      ],
    },
    {
      "@type": "ContactPoint",
      "@id": "https://myesatherapist.com/#contactpoint",
      "telephone": "+1-888-412-4041",
      "email": "info@myesatherapist.com",
      "contactType": "customer service",
      "areaServed": "US",
      "availableLanguage": ["English"],
    },
    {
      "@type": "WebSite",
      "@id": "https://myesatherapist.com/#website",
      "url": "https://myesatherapist.com/",
      "name": "My ESA Therapist",
      "publisher": {
        "@id": "https://myesatherapist.com/#organization",
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://myesatherapist.com/?s={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://myesatherapist.com/esa-letter-for-dog/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://myesatherapist.com/",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "ESA Letter for Dog",
          "item": "https://myesatherapist.com/esa-letter-for-dog/",
        },
      ],
    },
    {
      "@type": "ImageObject",
      "@id": "https://myesatherapist.com/esa-letter-for-dog/#primaryimage",
      "url": "https://myesatherapist.com/esa-dogs/hero.webp",
      "contentUrl": "https://myesatherapist.com/esa-dogs/hero.webp",
      "width": 1200,
      "height": 630,
      "caption": "Woman sitting with her emotional support dog",
    },
    {
      "@type": "WebPage",
      "@id": "https://myesatherapist.com/esa-letter-for-dog/#webpage",
      "url": "https://myesatherapist.com/esa-letter-for-dog/",
      "name": "ESA Letter for Dog: Get Evaluated Online | My ESA Therapist",
      "description":
        "Need an ESA letter for your dog? Connect with a licensed mental health professional online, get evaluated, and receive your letter if you qualify.",
      "isPartOf": {
        "@id": "https://myesatherapist.com/#website",
      },
      "about": {
        "@id": "https://myesatherapist.com/esa-letter-for-dog/#service",
      },
      "mainEntity": {
        "@id": "https://myesatherapist.com/esa-letter-for-dog/#service",
      },
      "primaryImageOfPage": {
        "@id": "https://myesatherapist.com/esa-letter-for-dog/#primaryimage",
      },
      "image": {
        "@id": "https://myesatherapist.com/esa-letter-for-dog/#primaryimage",
      },
      "breadcrumb": {
        "@id": "https://myesatherapist.com/esa-letter-for-dog/#breadcrumb",
      },
      "publisher": {
        "@id": "https://myesatherapist.com/#organization",
      },
      "inLanguage": "en-US",
    },
    {
      "@type": "Service",
      "@id": "https://myesatherapist.com/esa-letter-for-dog/#service",
      "name": "ESA evaluation and letter for dog owners",
      "description":
        "A HIPAA-compliant online evaluation with a state-licensed mental health professional to determine whether an emotional support dog letter is clinically appropriate.",
      "url": "https://myesatherapist.com/esa-letter-for-dog/",
      "serviceType": "ESA evaluation and letter for dog owners",
      "image": {
        "@id": "https://myesatherapist.com/esa-letter-for-dog/#primaryimage",
      },
      "provider": {
        "@id": "https://myesatherapist.com/#organization",
      },
      "areaServed": {
        "@type": "Country",
        "name": "United States",
      },
      "offers": {
        "@id": "https://myesatherapist.com/esa-letter-for-dog/#offer",
      },
      "termsOfService": "https://myesatherapist.com/terms-of-use/",
    },
    {
      "@type": "Offer",
      "@id": "https://myesatherapist.com/esa-letter-for-dog/#offer",
      "price": "99",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "areaServed": {
        "@type": "Country",
        "name": "United States",
      },
      "url": "https://myesatherapist.com/esa-letter-for-dog/",
      "itemOffered": {
        "@id": "https://myesatherapist.com/esa-letter-for-dog/#service",
      },
      "seller": {
        "@id": "https://myesatherapist.com/#organization",
      },
      "description":
        "Includes an individual professional evaluation by a state-licensed mental health professional and ESA letter documentation if clinically appropriate. 100% refund if you do not qualify.",
    },
    {
      "@type": "FAQPage",
      "@id": "https://myesatherapist.com/esa-letter-for-dog/#faq",
      "isPartOf": {
        "@id": "https://myesatherapist.com/esa-letter-for-dog/#webpage",
      },
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can I get an ESA letter for more than one dog?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. You can get an ESA letter for multiple emotional support dogs. However, a licensed mental health professional must assess the need for each dog, and the housing request must be reasonable. Additionally, landlords can evaluate each request.",
          },
        },
        {
          "@type": "Question",
          "name": "Can I use an ESA letter for dog in another state?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "An ESA letter is generally issued by the professional licensed in the state where you receive mental health services. If you move away, you may need an evaluation from a professional licensed in the new state.",
          },
        },
        {
          "@type": "Question",
          "name": "How long does an ESA evaluation for a dog take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The time depends on your availability, the professional’s schedule, and the information required for the evaluation. An online appointment may make it easier to complete the process from home.",
          },
        },
        {
          "@type": "Question",
          "name": "Can my landlord contact the professional who issued my dog’s ESA letter?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. A landlord may contact the professional to verify the documentation’s authenticity. Landlords generally may not ask for your diagnosis or medical records, only reliable documentation of the disability-related need.",
          },
        },
        {
          "@type": "Question",
          "name": "Can I get an ESA letter for a puppy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. A puppy can qualify as an emotional support animal if it provides disability-related support. There is no federal minimum age requirement for an ESA. However, the professional will consider your needs and whether the puppy is suitable for the requested housing accommodation.",
          },
        },
      ],
    },
  ],
};
