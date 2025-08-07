import { Helmet } from 'react-helmet-async';

export const OrganizationStructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://mureti.dev/#website",
        "url": "https://mureti.dev/",
        "name": "Fredrick Mureti - Full Stack Software Engineer",
        "description": "Portfolio of Fredrick Mureti, Full Stack Software Engineer specializing in React, Node.js, TypeScript, and modern web technologies.",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://mureti.dev/blog?search={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "Person",
        "@id": "https://mureti.dev/#person",
        "name": "Fredrick Mureti",
        "url": "https://mureti.dev/",
        "image": {
          "@type": "ImageObject",
          "url": "https://mureti.dev/Profile-pic.jpg",
          "width": 400,
          "height": 400,
          "caption": "Fredrick Mureti - Full Stack Software Engineer"
        },
        "sameAs": [
          "https://github.com/fredrickmureti",
          "https://linkedin.com/in/fredrickmureti",
          "https://twitter.com/fredrickmureti"
        ],
        "jobTitle": "Full Stack Software Engineer",
        "worksFor": {
          "@type": "Organization",
          "name": "Freelance"
        },
        "knowsAbout": [
          "JavaScript",
          "TypeScript", 
          "React",
          "Node.js",
          "Full Stack Development",
          "Web Development",
          "Software Engineering",
          "Modern Web Technologies"
        ],
        "description": "Full Stack Software Engineer specializing in React, Node.js, TypeScript, and modern web technologies. Passionate about building scalable web applications.",
        "email": "fredrick@mureti.dev",
        "nationality": "Kenyan",
        "alumniOf": {
          "@type": "Organization",
          "name": "University"
        }
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://mureti.dev/#service",
        "name": "Full Stack Development Services",
        "description": "Professional full stack web development services including React applications, Node.js APIs, and modern web solutions.",
        "provider": {
          "@id": "https://mureti.dev/#person"
        },
        "serviceType": "Web Development",
        "areaServed": "Worldwide",
        "availableLanguage": "English"
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};
