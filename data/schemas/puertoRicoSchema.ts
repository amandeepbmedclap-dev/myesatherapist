export const puertoRicoSchema = {
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
        "caption": "My ESA Therapist Logo"
      },
      "image": {
        "@id": "https://myesatherapist.com/#logo"
      },
      "email": "info@myesatherapist.com",
      "telephone": "+1-888-412-4041",
      "contactPoint": [
        {
          "@id": "https://myesatherapist.com/#contactpoint"
        }
      ],
      "areaServed": {
        "@type": "Country",
        "name": "United States"
      },
      "sameAs": [
        "https://www.facebook.com/myesatherapy",
        "https://www.instagram.com/myesatherapist/",
        "https://x.com/myesatherapist",
        "https://www.youtube.com/@myesatherapist",
        "https://www.linkedin.com/company/myesatherapist/"
      ]
    },
    {
      "@type": "ContactPoint",
      "@id": "https://myesatherapist.com/#contactpoint",
      "telephone": "+1-888-412-4041",
      "email": "info@myesatherapist.com",
      "contactType": "customer service",
      "areaServed": "US",
      "availableLanguage": [
        "English"
      ]
    },
    {
      "@type": "Place",
      "@id": "https://myesatherapist.com/esa-letter-puerto-rico/#place",
      "name": "Puerto Rico",
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "PR",
        "addressCountry": "US"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://myesatherapist.com/#website",
      "url": "https://myesatherapist.com/",
      "name": "My ESA Therapist",
      "publisher": {
        "@id": "https://myesatherapist.com/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://myesatherapist.com/?s={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "WebPage",
      "@id": "https://myesatherapist.com/esa-letter-puerto-rico/#webpage",
      "url": "https://myesatherapist.com/esa-letter-puerto-rico/",
      "name": "ESA Letter in Puerto Rico Online | Licensed Evaluations | My ESA Therapist",
      "description": "Get an ESA letter in Puerto Rico through a secure online evaluation with a licensed mental health professional. ESA documentation is provided when clinically appropriate under federal housing guidelines.",
      "isPartOf": {
        "@id": "https://myesatherapist.com/#website"
      },
      "about": {
        "@id": "https://myesatherapist.com/esa-letter-puerto-rico/#service"
      },
      "mainEntity": {
        "@id": "https://myesatherapist.com/esa-letter-puerto-rico/#service"
      },
      "primaryImageOfPage": {
        "@id": "https://myesatherapist.com/esa-letter-puerto-rico/#primaryimage"
      },
      "image": {
        "@id": "https://myesatherapist.com/esa-letter-puerto-rico/#primaryimage"
      },
      "breadcrumb": {
        "@id": "https://myesatherapist.com/esa-letter-puerto-rico/#breadcrumb"
      },
      "publisher": {
        "@id": "https://myesatherapist.com/#organization"
      },
      "datePublished": "2026-11-22T00:00:00+00:00",
      "dateModified": "2026-11-22T00:00:00+00:00",
      "inLanguage": "en-US",
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [
          "h1"
        ]
      }
    },
    {
      "@type": "ImageObject",
      "@id": "https://myesatherapist.com/esa-letter-puerto-rico/#primaryimage",
      "url": "https://myesatherapist.com/images/blog/emotional-support-animal-letter-sample-image.webp",
      "contentUrl": "https://myesatherapist.com/images/blog/emotional-support-animal-letter-sample-image.webp",
      "caption": "ESA Letter Online Evaluations for Puerto Rico Residents"
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://myesatherapist.com/esa-letter-puerto-rico/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://myesatherapist.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "ESA by State",
          "item": "https://myesatherapist.com/state/"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "ESA Letter Puerto Rico",
          "item": "https://myesatherapist.com/esa-letter-puerto-rico/"
        }
      ]
    },
    {
      "@type": "Service",
      "@id": "https://myesatherapist.com/esa-letter-puerto-rico/#service",
      "name": "Puerto Rico ESA Letter Evaluation",
      "description": "Online Emotional Support Animal evaluations by licensed mental health professionals for Puerto Rico residents, delivered entirely via telehealth. ESA letters are issued only when clinically appropriate after an independent mental health assessment aligned with Fair Housing Act (FHA) guidelines.",
      "url": "https://myesatherapist.com/esa-letter-puerto-rico/",
      "serviceType": "Online ESA Letter Evaluation (Telehealth)",
      "image": {
        "@id": "https://myesatherapist.com/esa-letter-puerto-rico/#primaryimage"
      },
      "provider": {
        "@id": "https://myesatherapist.com/#organization"
      },
      "areaServed": {
        "@id": "https://myesatherapist.com/esa-letter-puerto-rico/#place"
      },
      "audience": {
        "@type": "Audience",
        "@id": "https://myesatherapist.com/esa-letter-puerto-rico/#audience",
        "audienceType": "Adults in Puerto Rico seeking Emotional Support Animal evaluations"
      },
      "availableChannel": {
        "@type": "ServiceChannel",
        "serviceUrl": "https://myesatherapist.com/esa-letter-puerto-rico/",
        "servicePhone": "+1-888-412-4041",
        "availableLanguage": [
          "English"
        ],
        "processingTime": "P1D"
      },
      "hoursAvailable": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      },
      "offers": {
        "@id": "https://myesatherapist.com/esa-letter-puerto-rico/#offer"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "ESA Letter Services - Puerto Rico",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Online ESA Letter Evaluation"
            }
          }
        ]
      },
      "termsOfService": "https://myesatherapist.com/terms-of-use/"
    },
    {
      "@type": "Offer",
      "@id": "https://myesatherapist.com/esa-letter-puerto-rico/#offer",
      "price": "99",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "eligibleRegion": {
        "@id": "https://myesatherapist.com/esa-letter-puerto-rico/#place"
      },
      "url": "https://myesatherapist.com/esa-letter-puerto-rico/",
      "itemOffered": {
        "@id": "https://myesatherapist.com/esa-letter-puerto-rico/#service"
      },
      "seller": {
        "@id": "https://myesatherapist.com/#organization"
      }
    },
    {
      "@type": "MedicalClinic",
      "@id": "https://myesatherapist.com/#medicalprovider",
      "name": "My ESA Therapist",
      "url": "https://myesatherapist.com/",
      "medicalSpecialty": "Psychiatric",
      "isAcceptingNewPatients": true,
      "availableService": {
        "@type": "MedicalTherapy",
        "name": "Online ESA Letter Evaluation",
        "url": "https://myesatherapist.com/esa-letter-puerto-rico/"
      },
      "audience": {
        "@type": "MedicalAudience",
        "audienceType": "Patient",
        "requiredMinAge": 18
      }
    },
    {
      "@type": "Person",
      "@id": "https://myesatherapist.com/esa-doctors/dr-robert-staaf/#person",
      "name": "Robert Staaf",
      "jobTitle": "Licensed Clinical Social Worker",
      "description": "Licensed Clinical Social Worker licensed in 30+ states specializing in psychotherapy and ESA evaluations.",
      "image": {
        "@type": "ImageObject",
        "url": "https://myesatherapist.com/images/doctors/robert-staaf-profile-image.webp"
      },
      "url": "https://myesatherapist.com/esa-doctors/dr-robert-staaf/",
      "sameAs": [
        "https://www.linkedin.com/in/robert-staaf-b57b53333/"
      ],
      "worksFor": {
        "@id": "https://myesatherapist.com/#organization"
      },
      "knowsAbout": [
        "Emotional Support Animal Evaluations",
        "Psychotherapy",
        "Anxiety",
        "Stress Management",
        "Emotional Well-being"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://myesatherapist.com/esa-doctors/dr-leslie-k-gamble/#person",
      "name": "Leslie K. Gamble",
      "jobTitle": "Licensed Independent Clinical Social Worker",
      "description": "Licensed Independent Clinical Social Worker with 13+ years of experience providing behavioral health care and ESA evaluations.",
      "image": {
        "@type": "ImageObject",
        "url": "https://myesatherapist.com/images/doctors/leslie-k.-gamble-licsw-image.webp"
      },
      "url": "https://myesatherapist.com/esa-doctors/dr-leslie-k-gamble/",
      "sameAs": [
        "https://www.linkedin.com/in/leslie-gamble-727571366"
      ],
      "worksFor": {
        "@id": "https://myesatherapist.com/#organization"
      },
      "knowsAbout": [
        "Emotional Support Animal Evaluations",
        "Behavioral Health Care",
        "Anxiety",
        "Depression",
        "PTSD"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://myesatherapist.com/esa-doctors/dr-gaurav-patel/#person",
      "name": "Gaurav Patel, MD",
      "jobTitle": "Family Medicine Physician",
      "description": "Board-certified family medicine physician with experience providing evidence-based, patient-focused care across inpatient, urgent care, outpatient, and telemedicine settings.",
      "image": {
        "@type": "ImageObject",
        "url": "https://myesatherapist.com/images/doctors/dr-gaurav-patel-image.webp"
      },
      "url": "https://myesatherapist.com/esa-doctors/dr-gaurav-patel/",
      "sameAs": [
        "https://www.linkedin.com/in/gaurav-patel-m-d-b5565916"
      ],
      "worksFor": {
        "@id": "https://myesatherapist.com/#organization"
      },
      "knowsAbout": [
        "Emotional Support Animal Evaluations",
        "Depression",
        "Anxiety",
        "Chronic Conditions",
        "Sleep Concerns"
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://myesatherapist.com/esa-letter-puerto-rico/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How can an emotional support animal benefit my mental health?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "An emotional support animal may help reduce anxiety, offer support after trauma, ease feelings of loneliness, and provide steady companionship. Whether an ESA is appropriate for you is decided by a licensed mental health professional after an evaluation."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between psychiatric service dogs and emotional support animals in Puerto Rico?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Psychiatric service dogs are individually trained to perform specific tasks related to a disability and have public access rights under the ADA. Emotional support animals provide comfort through companionship, do not require task training, and are primarily protected for housing under the Fair Housing Act."
          }
        },
        {
          "@type": "Question",
          "name": "How long does it take to get an ESA letter in Puerto Rico?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Timing depends on scheduling and your evaluation. Many clients complete their evaluation within a day or two of booking. If the clinician determines an ESA letter is appropriate, it is delivered to you via secure email."
          }
        },
        {
          "@type": "Question",
          "name": "Are there any local emotional support animal laws in Puerto Rico?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Puerto Rico does not have a separate ESA statute. ESA housing accommodations in Puerto Rico are protected primarily by the federal Fair Housing Act, which applies there as it does in the 50 states."
          }
        },
        {
          "@type": "Question",
          "name": "Do I need to register my emotional support animal in Puerto Rico?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. There is no official ESA registry in Puerto Rico. An online registration, ID card, or certificate alone does not establish eligibility for housing accommodations."
          }
        },
        {
          "@type": "Question",
          "name": "How much does an ESA letter cost in Puerto Rico?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "At My ESA Therapist, the fee is $99, which includes the professional assessment and the ESA letter if you are approved."
          }
        }
      ]
    },
    {
      "@type": "VideoObject",
      "@id": "https://myesatherapist.com/esa-letter-puerto-rico/#video-1",
      "name": "ESA Letter Puerto Rico - Client Testimonial 1",
      "description": "Client testimonial video shared by My ESA Therapist about the Puerto Rico online ESA letter evaluation experience.",
      "thumbnailUrl": [
        "https://i.ytimg.com/vi/vId0sRVPY0I/hqdefault.jpg"
      ],
      "embedUrl": "https://www.youtube.com/embed/vId0sRVPY0I",
      "contentUrl": "https://www.youtube.com/shorts/vId0sRVPY0I",
      "uploadDate": "2026-07-08T00:00:00+00:00",
      "uploader": {
        "@id": "https://myesatherapist.com/#organization"
      },
      "publisher": {
        "@id": "https://myesatherapist.com/#organization"
      }
    },
    {
      "@type": "VideoObject",
      "@id": "https://myesatherapist.com/esa-letter-puerto-rico/#video-2",
      "name": "ESA Letter Puerto Rico - Client Testimonial 2",
      "description": "Client testimonial video shared by My ESA Therapist about the Puerto Rico online ESA letter evaluation experience.",
      "thumbnailUrl": [
        "https://i.ytimg.com/vi/gxdipq0J2No/hqdefault.jpg"
      ],
      "embedUrl": "https://www.youtube.com/embed/gxdipq0J2No",
      "contentUrl": "https://www.youtube.com/shorts/gxdipq0J2No",
      "uploadDate": "2026-06-02T00:00:00+00:00",
      "uploader": {
        "@id": "https://myesatherapist.com/#organization"
      },
      "publisher": {
        "@id": "https://myesatherapist.com/#organization"
      }
    },
    {
      "@type": "VideoObject",
      "@id": "https://myesatherapist.com/esa-letter-puerto-rico/#video-3",
      "name": "ESA Letter Puerto Rico - Client Testimonial 3",
      "description": "Client testimonial video shared by My ESA Therapist about the Puerto Rico online ESA letter evaluation experience.",
      "thumbnailUrl": [
        "https://i.ytimg.com/vi/Mjf33Y0NvVc/hqdefault.jpg"
      ],
      "embedUrl": "https://www.youtube.com/embed/Mjf33Y0NvVc",
      "contentUrl": "https://www.youtube.com/shorts/Mjf33Y0NvVc",
      "uploadDate": "2026-06-05T00:00:00+00:00",
      "uploader": {
        "@id": "https://myesatherapist.com/#organization"
      },
      "publisher": {
        "@id": "https://myesatherapist.com/#organization"
      }
    },
    {
      "@type": "VideoObject",
      "@id": "https://myesatherapist.com/esa-letter-puerto-rico/#video-4",
      "name": "ESA Letter Puerto Rico - Client Testimonial 4",
      "description": "Client testimonial video shared by My ESA Therapist about the Puerto Rico online ESA letter evaluation experience.",
      "thumbnailUrl": [
        "https://i.ytimg.com/vi/CybsnJUGzTM/hqdefault.jpg"
      ],
      "embedUrl": "https://www.youtube.com/embed/CybsnJUGzTM",
      "contentUrl": "https://www.youtube.com/shorts/CybsnJUGzTM",
      "uploadDate": "2026-06-03T00:00:00+00:00",
      "uploader": {
        "@id": "https://myesatherapist.com/#organization"
      },
      "publisher": {
        "@id": "https://myesatherapist.com/#organization"
      }
    },
    {
      "@type": "VideoObject",
      "@id": "https://myesatherapist.com/esa-letter-puerto-rico/#video-5",
      "name": "ESA Letter Puerto Rico - Client Testimonial 5",
      "description": "Client testimonial video shared by My ESA Therapist about the Puerto Rico online ESA letter evaluation experience.",
      "thumbnailUrl": [
        "https://i.ytimg.com/vi/figN4V7ThbM/hqdefault.jpg"
      ],
      "embedUrl": "https://www.youtube.com/embed/figN4V7ThbM",
      "contentUrl": "https://www.youtube.com/shorts/figN4V7ThbM",
      "uploadDate": "2026-05-27T00:00:00+00:00",
      "uploader": {
        "@id": "https://myesatherapist.com/#organization"
      },
      "publisher": {
        "@id": "https://myesatherapist.com/#organization"
      }
    },
    {
      "@type": "VideoObject",
      "@id": "https://myesatherapist.com/esa-letter-puerto-rico/#video-6",
      "name": "ESA Letter Puerto Rico - Client Testimonial 6",
      "description": "Client testimonial video shared by My ESA Therapist about the Puerto Rico online ESA letter evaluation experience.",
      "thumbnailUrl": [
        "https://i.ytimg.com/vi/TV4dghtuqak/hqdefault.jpg"
      ],
      "embedUrl": "https://www.youtube.com/embed/TV4dghtuqak",
      "contentUrl": "https://www.youtube.com/shorts/TV4dghtuqak",
      "uploadDate": "2026-05-21T00:00:00+00:00",
      "uploader": {
        "@id": "https://myesatherapist.com/#organization"
      },
      "publisher": {
        "@id": "https://myesatherapist.com/#organization"
      }
    },
    {
      "@type": "VideoObject",
      "@id": "https://myesatherapist.com/esa-letter-puerto-rico/#video-7",
      "name": "ESA Letter Puerto Rico - Client Testimonial 7",
      "description": "Client testimonial video shared by My ESA Therapist about the Puerto Rico online ESA letter evaluation experience.",
      "thumbnailUrl": [
        "https://i.ytimg.com/vi/rPtmxr05tsc/hqdefault.jpg"
      ],
      "embedUrl": "https://www.youtube.com/embed/rPtmxr05tsc",
      "contentUrl": "https://www.youtube.com/shorts/rPtmxr05tsc",
      "uploadDate": "2026-05-14T00:00:00+00:00",
      "uploader": {
        "@id": "https://myesatherapist.com/#organization"
      },
      "publisher": {
        "@id": "https://myesatherapist.com/#organization"
      }
    }
  ]
};
