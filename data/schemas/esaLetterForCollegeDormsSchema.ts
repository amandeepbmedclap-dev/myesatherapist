export const esaLetterForCollegeDormsSchema = {
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
      "publisher": {
        "@id": "https://myesatherapist.com/#organization",
      },
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
      "worksFor": {
        "@id": "https://myesatherapist.com/#organization",
      },
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
      "@id": "https://myesatherapist.com/blog/esa-guide/esa-letter-for-college-dorms/#primaryimage",
      "url": "https://myesatherapist.com/images/blog/og/esa-letter-for-college-dorms.jpg",
      "contentUrl": "https://myesatherapist.com/images/blog/og/esa-letter-for-college-dorms.jpg",
      "width": 1200,
      "height": 630,
      "caption": "College student with emotional support animal in a dorm room",
    },
    {
      "@type": "WebPage",
      "@id": "https://myesatherapist.com/blog/esa-guide/esa-letter-for-college-dorms/#webpage",
      "url": "https://myesatherapist.com/blog/esa-guide/esa-letter-for-college-dorms/",
      "name": "ESA Letter for College Dorms: Step-by-Step Guide | My ESA Therapist",
      "isPartOf": {
        "@id": "https://myesatherapist.com/#website",
      },
      "primaryImageOfPage": {
        "@id": "https://myesatherapist.com/blog/esa-guide/esa-letter-for-college-dorms/#primaryimage",
      },
      "mainEntity": {
        "@id": "https://myesatherapist.com/blog/esa-guide/esa-letter-for-college-dorms/#article",
      },
      "breadcrumb": {
        "@id": "https://myesatherapist.com/blog/esa-guide/esa-letter-for-college-dorms/#breadcrumb",
      },
      "datePublished": "2026-11-26",
      "dateModified": "2026-11-26",
      "inLanguage": "en-US",
    },
    {
      "@type": ["Article", "BlogPosting"],
      "@id": "https://myesatherapist.com/blog/esa-guide/esa-letter-for-college-dorms/#article",
      "url": "https://myesatherapist.com/blog/esa-guide/esa-letter-for-college-dorms/",
      "mainEntityOfPage": {
        "@id": "https://myesatherapist.com/blog/esa-guide/esa-letter-for-college-dorms/#webpage",
      },
      "headline": "ESA Letter for College Dorms: How to Request ESA Housing Accommodations",
      "description":
        "Moving into a dorm with an emotional support animal? Learn the ESA letter requirements, approval steps, and campus rules before move-in day.",
      "image": {
        "@id": "https://myesatherapist.com/blog/esa-guide/esa-letter-for-college-dorms/#primaryimage",
      },
      "datePublished": "2026-11-26",
      "dateModified": "2026-11-26",
      "author": {
        "@id": "https://myesatherapist.com/contributors/allyson-valley/#person",
      },
      "reviewedBy": {
        "@id": "https://www.linkedin.com/in/max-phillips-883485a5/",
      },
      "publisher": {
        "@id": "https://myesatherapist.com/#organization",
      },
      "articleSection": "ESA Guide",
      "about": [
        {
          "@type": "Thing",
          "name": "Emotional support animals",
        },
        {
          "@type": "Thing",
          "name": "College dorm housing accommodations",
        },
        {
          "@type": "Thing",
          "name": "Fair Housing Act",
        },
      ],
      "inLanguage": "en-US",
      "isAccessibleForFree": true,
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://myesatherapist.com/blog/esa-guide/esa-letter-for-college-dorms/#breadcrumb",
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
          "name": "Blog",
          "item": "https://myesatherapist.com/blog/",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "ESA Guide",
          "item": "https://myesatherapist.com/blog/esa-guide/",
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "ESA Letter for College Dorms",
          "item": "https://myesatherapist.com/blog/esa-guide/esa-letter-for-college-dorms/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://myesatherapist.com/blog/esa-guide/esa-letter-for-college-dorms/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Can a college deny an ESA request?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, a college may deny an ESA request if the student doesn't meet the applicable requirements or a legal exception applies. However, eligible requests should be reviewed individually, not rejected simply because the university has a no-pets policy.",
          },
        },
        {
          "@type": "Question",
          "name": "Do college students need an ESA letter for dorm accommodation?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In many cases, yes. If your need for an emotional support animal isn't already known or obvious, the university may ask for supporting documentation from a qualified healthcare professional. The exact requirements can vary depending on your circumstances and the college's ESA accommodation process.",
          },
        },
        {
          "@type": "Question",
          "name": "Can I bring my ESA to college without prior approval?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It's better to complete the accommodation process before moving your ESA into a dorm. Contact your college's housing or disability services department first, as having an ESA letter doesn't automatically mean you can bring your animal onto campus without following the required steps.",
          },
        },
        {
          "@type": "Question",
          "name": "Are students with an ESA required to pay pet fees?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Generally, no. Under the Fair Housing Act, colleges and other covered housing providers cannot charge pet fees or deposits for an approved assistance animal. However, students can still be held responsible for any damage caused by their ESA.",
          },
        },
        {
          "@type": "Question",
          "name": "What happens if my ESA letter expires during the semester?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "If your ESA letter expires during the semester, contact your college's housing or disability services office to ask whether updated documentation is required. The Fair Housing Act doesn't set a universal expiration date for ESA letters, but colleges may have their own documentation renewal policies.",
          },
        },
      ],
    },
    {
      "@type": "HowTo",
      "@id": "https://myesatherapist.com/blog/esa-guide/esa-letter-for-college-dorms/#howto",
      "name": "How to Request an ESA Accommodation in College Housing",
      "description":
        "Steps students generally follow to request an emotional support animal accommodation in campus housing.",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Contact Your College",
          "text": "Reach out to the disability services or housing department to understand the ESA application process, required documents, and submission deadlines. Doing this at least 30 days before your move-in date will help set you up for success.",
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Consult a Mental Health Professional",
          "text": "Schedule an evaluation to speak with a qualified mental health professional who can evaluate your circumstances and determine whether an emotional support animal may help with your disability-related needs.",
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Submit Your Documents",
          "text": "Complete the college's accommodation form and submit the requested supporting documentation, including your ESA letter. Check that all information is accurate and up to date before submitting.",
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Wait for Approval",
          "text": "The university will review your application and may contact you if additional information is needed. Respond promptly to university communication to avoid delays.",
        },
        {
          "@type": "HowToStep",
          "position": 5,
          "name": "Understand the Housing Rules",
          "text": "Once approved, review the accommodation terms carefully. Make sure you understand your responsibilities for your ESA's care, cleanliness, and behavior in shared spaces.",
        },
      ],
    },
  ],
};
