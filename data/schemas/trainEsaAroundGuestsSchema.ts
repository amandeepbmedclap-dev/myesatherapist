export const trainEsaAroundGuestsSchema = {
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
      "@id": "https://myesatherapist.com/blog/esa-training/train-esa-around-guests-and-strangers/#primaryimage",
      "url": "https://myesatherapist.com/images/blog/og/train-esa-around-guests-and-strangers.jpg",
      "contentUrl": "https://myesatherapist.com/images/blog/og/train-esa-around-guests-and-strangers.jpg",
      "width": 1200,
      "height": 630,
      "caption": "Woman asking a dog to sit on a mat while a guest waits at the door",
    },
    {
      "@type": "WebPage",
      "@id": "https://myesatherapist.com/blog/esa-training/train-esa-around-guests-and-strangers/#webpage",
      "url": "https://myesatherapist.com/blog/esa-training/train-esa-around-guests-and-strangers/",
      "name": "How to Train Your ESA to Behave Around Guests & Strangers - My ESA Therapist",
      "isPartOf": { "@id": "https://myesatherapist.com/#website" },
      "primaryImageOfPage": {
        "@id": "https://myesatherapist.com/blog/esa-training/train-esa-around-guests-and-strangers/#primaryimage",
      },
      "mainEntity": { "@id": "https://myesatherapist.com/blog/esa-training/train-esa-around-guests-and-strangers/#article" },
      "breadcrumb": { "@id": "https://myesatherapist.com/blog/esa-training/train-esa-around-guests-and-strangers/#breadcrumb" },
      "datePublished": "2026-11-27",
      "dateModified": "2026-11-27",
      "inLanguage": "en-US",
    },
    {
      "@type": ["Article", "BlogPosting"],
      "@id": "https://myesatherapist.com/blog/esa-training/train-esa-around-guests-and-strangers/#article",
      "url": "https://myesatherapist.com/blog/esa-training/train-esa-around-guests-and-strangers/",
      "mainEntityOfPage": {
        "@id": "https://myesatherapist.com/blog/esa-training/train-esa-around-guests-and-strangers/#webpage",
      },
      "headline": "Teaching Your ESA to Behave Around Guests and Strangers",
      "description":
        "Help your emotional support animal feel comfortable around visitors. Practice 5-10 minutes a day with doorbell drills, calm greetings, and rewards.",
      "image": {
        "@id": "https://myesatherapist.com/blog/esa-training/train-esa-around-guests-and-strangers/#primaryimage",
      },
      "datePublished": "2026-11-27",
      "dateModified": "2026-11-27",
      "author": { "@id": "https://myesatherapist.com/contributors/allyson-valley/#person" },
      "reviewedBy": { "@id": "https://www.linkedin.com/in/max-phillips-883485a5/" },
      "publisher": { "@id": "https://myesatherapist.com/#organization" },
      "articleSection": "ESA Training",
      "about": [
        { "@type": "Thing", "name": "Emotional support animals" },
        { "@type": "Thing", "name": "Animal training" },
        { "@type": "Thing", "name": "Positive reinforcement" },
      ],
      "inLanguage": "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://myesatherapist.com/blog/esa-training/train-esa-around-guests-and-strangers/#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://myesatherapist.com/" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://myesatherapist.com/blog/" },
        { "@type": "ListItem", position: 3, name: "ESA Training", item: "https://myesatherapist.com/blog/esa-training/" },
        {
          "@type": "ListItem",
          position: 4,
          name: "Teaching Your ESA to Behave Around Guests",
          item: "https://myesatherapist.com/blog/esa-training/train-esa-around-guests-and-strangers/",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://myesatherapist.com/blog/esa-training/train-esa-around-guests-and-strangers/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Should I tell my guests how to interact with my ESA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Let visitors know whether your ESA prefers space, gentle interaction, or limited physical contact. Ask them to avoid sudden movements, loud noises, or approaching your animal without giving it time to adjust. Children may need repeated reminders of these expectations.",
          },
        },
        {
          "@type": "Question",
          "name": "Can my ESA become protective when someone visits my home?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Some animals may become territorial or protective when unfamiliar people enter their living space, particularly if they are behaving loudly or moving quickly. Watch for signs such as blocking entrances, growling, or guarding furniture, and seek professional guidance if these behaviors become difficult to manage. Attempts at biting should be taken seriously and discussed with a trusted veterinarian or animal behavior expert.",
          },
        },
        {
          "@type": "Question",
          "name": "Should I keep my ESA on a leash when visitors arrive?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A leash can help you manage your ESA safely, especially if your animal tends to rush toward the entrance or becomes difficult to redirect. Use it calmly without pulling or forcing interactions. A leash should not be used as a punishment.",
          },
        },
        {
          "@type": "Question",
          "name": "How can I prepare my ESA for guests staying overnight?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Keep your animal's feeding, walking, and sleeping routines as consistent as possible. Introduce guests to your ESA gradually and make sure your animal has access to its usual resting area throughout the stay. It is important that this area is not intruded upon by the visitors.",
          },
        },
        {
          "@type": "Question",
          "name": "What should I do if my ESA does not like a particular visitor?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Do not force your ESA to interact with that person. Maintain a comfortable distance, provide a separate resting space, and observe what triggers the reaction. If the behavior involves aggression or persistent fear, consult a qualified animal behavior professional.",
          },
        },
      ],
    },
  ],
};
