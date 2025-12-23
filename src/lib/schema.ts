import { Organization, WebSite, Service, LocalBusiness } from 'schema-dts'

// Organization Schema
export const organizationSchema: Organization = {
  "@type": "Organization",
  "@id": "https://uplab.dev/#organization",
  "name": "Uplab",
  "alternateName": "Uplab Digital Agency",
  "description": "Transform your digital presence with Uplab. We offer exceptional web development, mobile apps, SEO optimization, and social media advertising services.",
  "url": "https://uplab.dev",
  "logo": "https://uplab.dev/images/logo/uplab-logo.png",
  "image": "https://uplab.dev/images/hero/uplab-hero.jpg",
  "foundingDate": "2020",
  "founder": {
    "@type": "Person",
    "name": "Uplab Team"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-9876543210",
    "contactType": "customer service",
    "areaServed": "IN",
    "availableLanguage": ["English", "Hindi"]
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Tech Hub, Digital Valley",
    "addressLocality": "Mumbai",
    "addressRegion": "Maharashtra",
    "postalCode": "400001",
    "addressCountry": "IN"
  },
  "sameAs": [
    "https://twitter.com/uplab_agency",
    "https://instagram.com/uplab.agency",
    "https://linkedin.com/company/uplab-agency",
    "https://github.com/uplab-agency"
  ],
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "19.0760",
      "longitude": "72.8777"
    },
    "geoRadius": "100000"
  }
}

// Website Schema
export const websiteSchema: any = {
  "@type": "WebSite",
  "@id": "https://uplab.dev/#website",
  "name": "Uplab - Digital Agency That Delivers",
  "description": "Transform your digital presence with exceptional web development, mobile apps, and digital marketing services.",
  "url": "https://uplab.dev",
  "publisher": {
    "@id": "https://uplab.dev/#organization"
  },
  "inLanguage": "en-US",
  "copyrightYear": 2025,
  "copyrightHolder": {
    "@id": "https://uplab.dev/#organization"
  }
}

// Services Schema
export const servicesSchema: Service[] = [
  {
    "@type": "Service",
    "@id": "https://uplab.dev/#web-development",
    "name": "Web Development",
    "description": "Custom website development with modern technologies like React, Next.js, and responsive design.",
    "provider": {
      "@id": "https://uplab.dev/#organization"
    },
    "serviceType": "Web Development",
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Web Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Website Development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "E-commerce Development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Responsive Design"
          }
        }
      ]
    }
  },
  {
    "@type": "Service",
    "@id": "https://uplab.dev/#mobile-development",
    "name": "Mobile App Development",
    "description": "Native and cross-platform mobile applications that engage users and drive business growth.",
    "provider": {
      "@id": "https://uplab.dev/#organization"
    },
    "serviceType": "Mobile App Development",
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Mobile Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "iOS App Development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Android App Development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "React Native Development"
          }
        }
      ]
    }
  },
  {
    "@type": "Service",
    "@id": "https://uplab.dev/#seo-optimization",
    "name": "SEO Optimization",
    "description": "Comprehensive SEO strategies to improve your search rankings and drive organic traffic.",
    "provider": {
      "@id": "https://uplab.dev/#organization"
    },
    "serviceType": "SEO Optimization",
    "areaServed": "Worldwide"
  },
  {
    "@type": "Service",
    "@id": "https://uplab.dev/#digital-marketing",
    "name": "Digital Marketing",
    "description": "Strategic digital marketing campaigns that convert prospects into loyal customers.",
    "provider": {
      "@id": "https://uplab.dev/#organization"
    },
    "serviceType": "Digital Marketing",
    "areaServed": "Worldwide"
  }
]

// Local Business Schema (combines with Organization)
export const localBusinessSchema: LocalBusiness = {
  "@type": "LocalBusiness",
  "@id": "https://uplab.dev/#localbusiness",
  "name": "Uplab Digital Agency",
  "description": "Leading digital agency specializing in web development, mobile apps, SEO, and digital marketing services.",
  "url": "https://uplab.dev",
  "telephone": "+91-9876543210",
  "email": "hello@uplab.dev",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Tech Hub, Digital Valley",
    "addressLocality": "Mumbai",
    "addressRegion": "Maharashtra",
    "postalCode": "400001",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "19.0760",
    "longitude": "72.8777"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "priceRange": "₹₹-₹₹₹",
  "image": "https://uplab.dev/images/office/uplab-office.jpg",
  "logo": "https://uplab.dev/images/logo/uplab-logo.png",
  "sameAs": [
    "https://twitter.com/uplab_agency",
    "https://instagram.com/uplab.agency",
    "https://linkedin.com/company/uplab-agency"
  ]
}

// Breadcrumb Schema Generator
export const createBreadcrumbSchema = (items: Array<{ name: string, url: string }>) => {
  return {
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }
}

// FAQ Schema Generator
export const createFAQSchema = (faqs: Array<{ question: string, answer: string }>) => {
  return {
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
}

// Review Schema Generator
export const createReviewSchema = (reviews: Array<{
  author: string,
  rating: number,
  reviewBody: string,
  datePublished: string
}>) => {
  return reviews.map(review => ({
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": review.author
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating,
      "bestRating": 5
    },
    "reviewBody": review.reviewBody,
    "datePublished": review.datePublished,
    "publisher": {
      "@id": "https://uplab.dev/#organization"
    }
  }))
}

// Portfolio/Projects Schema
export const createPortfolioSchema = (projects: Array<{
  title: string,
  description: string,
  url?: string,
  image?: string,
  technologies: string[],
  datePublished: string,
  client?: string
}>) => {
  return {
    "@type": "ItemList",
    "name": "Uplab Portfolio Projects",
    "description": "Showcase of web development, mobile app, and digital marketing projects by Uplab",
    "itemListElement": projects.map((project, index) => ({
      "@type": "CreativeWork",
      "position": index + 1,
      "name": project.title,
      "description": project.description,
      "url": project.url,
      "image": project.image,
      "creator": {
        "@id": "https://uplab.dev/#organization"
      },
      "datePublished": project.datePublished,
      "keywords": project.technologies.join(", "),
      "client": project.client,
      "genre": "Web Development"
    }))
  }
}

