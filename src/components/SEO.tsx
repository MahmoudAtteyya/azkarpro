import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description = 'Islamic daily remembrance and prayers app',
  keywords = ['azkar', 'islamic', 'prayers', 'remembrance', 'muslim'],
  image = '/og-image.png',
  url = window.location.href
}) => {
  return (
    <Helmet>
      <title>{title} | Azkar App</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#ffffff" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Azkar App" />
    </Helmet>
  );
};

export default SEO; 