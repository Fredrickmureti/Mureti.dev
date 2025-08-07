import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

const defaultSEO = {
  title: "Fredrick Mureti - Full Stack Software Engineer | React, Node.js, TypeScript Expert",
  description: "Experienced Full Stack Software Engineer specializing in React, Node.js, TypeScript, and modern web technologies. View my portfolio of scalable web applications and get in touch for your next project.",
  keywords: "Full Stack Developer, Software Engineer, React Developer, Node.js, TypeScript, JavaScript, Web Development, Frontend, Backend, Portfolio, Fredrick Mureti",
  image: "https://mureti.dev/Profile-pic.jpg",
  url: "https://mureti.dev",
  type: "website"
};

export const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  article
}: SEOProps) => {
  const seoTitle = title ? `${title} | Fredrick Mureti` : defaultSEO.title;
  const seoDescription = description || defaultSEO.description;
  const seoKeywords = keywords || defaultSEO.keywords;
  const seoImage = image || defaultSEO.image;
  const seoUrl = url || defaultSEO.url;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": type === "article" ? "Article" : "WebPage",
    "headline": seoTitle,
    "description": seoDescription,
    "url": seoUrl,
    "image": seoImage,
    "author": {
      "@type": "Person",
      "name": "Fredrick Mureti",
      "url": "https://mureti.dev"
    },
    ...(type === "article" && article && {
      "datePublished": article.publishedTime,
      "dateModified": article.modifiedTime,
      "articleSection": article.section,
      "keywords": article.tags?.join(", ")
    })
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="title" content={seoTitle} />
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <link rel="canonical" href={seoUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:site_name" content="Fredrick Mureti Portfolio" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={seoUrl} />
      <meta property="twitter:title" content={seoTitle} />
      <meta property="twitter:description" content={seoDescription} />
      <meta property="twitter:image" content={seoImage} />

      {/* Article specific meta tags */}
      {type === "article" && article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          <meta property="article:modified_time" content={article.modifiedTime} />
          <meta property="article:author" content={article.author} />
          <meta property="article:section" content={article.section} />
          {article.tags?.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};
