import type { Metadata } from "next";
import "./globals.css";

// Primary domain for all metadata URLs
const siteUrl = "https://dzamfbr-portfolio.vercel.app";

/**
 * ROOT LAYOUT METADATA
 *
 * SEO Configuration following Next.js 15 App Router best practices:
 * - metadataBase: Enables relative URLs to be converted to absolute URLs
 * - robots: Optimized for Google Search indexing with aggressive crawling permissions
 * - icons: Uses PNG as primary favicon (favicon.ico can be added to public/ if needed)
 * - openGraph & twitter: Ensures proper rich results on social platforms
 * - Structured data (JSON-LD): Helps Google understand content and display rich results
 */
export const metadata: Metadata = {
  // CRITICAL: metadataBase enables all relative URLs to be converted to absolute
  metadataBase: new URL(siteUrl),

  // Title configuration with template for child pages
  title: {
    default:
      "Dzamfbr — Portfolio of a Web Developer & Programmer based in Indonesia.",
    template: "%s | Dzamfbr",
  },

  // Primary meta description (55-160 characters optimal for Google Search)
  description:
    "Portfolio resmi Dimas Azzam sebagai seorang yang terus berkembang dalam membangun keterampilan di bidang pengembangan web, pemrograman, dan teknologi.",

  // Keywords for search relevance (max 10 for effectiveness)
  keywords: [
    "dzamfbr",
    "dimas azzam",
    "portfolio dzamfbr",
    "web developer indonesia",
    "nextjs developer",
    "react developer",
    "ui ux designer",
    "programmer indonesia",
  ],

  // Author metadata for Google About Box
  authors: [{ name: "Dimas Azzam" }],

  // Canonical URL: tells search engines this is the primary URL
  alternates: {
    canonical: "/",
  },

  // ROBOTS META TAGS: Aggressive SEO settings for maximum indexing
  robots: {
    index: true, // Allow indexing in search results
    follow: true, // Follow all links for crawling
    // GoogleBot specific settings for enhanced indexing
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1, // -1 = unlimited video preview
      "max-image-preview": "large", // Allow large image previews in search results
      "max-snippet": -1, // -1 = unlimited snippet length
    },
  },

  // OPEN GRAPH METADATA: Controls how content appears on social platforms (Facebook, LinkedIn, etc.)
  openGraph: {
    title:
      "Dzamfbr — Portfolio of a Web Developer & Programmer based in Indonesia.",
    description:
      "Portfolio resmi Dimas Azzam sebagai seorang yang terus berkembang dalam membangun keterampilan di bidang pengembangan web, pemrograman, dan teknologi.",
    url: siteUrl, // Absolute URL
    siteName: "Dzamfbr Portfolio",
    locale: "id_ID", // Indonesian locale for regional targeting
    type: "website",
    images: [
      {
        // OG Image: Must be 1200x630px, JPEG or PNG for optimal compatibility
        url: `${siteUrl}/screenshoot_portofolio_web_dzamfbr.png`,
        width: 1200,
        height: 630,
        alt: "Dzamfbr portfolio landing page", // Descriptive alt text for accessibility
      },
    ],
  },

  // TWITTER CARD METADATA: Optimizes appearance on Twitter/X
  twitter: {
    card: "summary_large_image", // Use large image card for better visibility
    title:
      "Dzamfbr — Portfolio of a Web Developer & Programmer based in Indonesia.",
    description:
      "Portfolio resmi Dimas Azzam sebagai seorang yang terus berkembang dalam membangun keterampilan di bidang pengembangan web, pemrograman, dan teknologi.",
    // NOTE: To verify Twitter account, add to social links in schema.org sameAs
    creator: "@dzamfbr", // Twitter handle (update if available; helps Twitter card validation)
  },

  // FAVICON CONFIGURATION: Multiple formats for comprehensive browser support
  // Best practices: favicon.ico in public/, PNG for Apple Touch Icon
  icons: {
    icon: [
      // Primary favicon (Next.js will auto-serve from public/favicon.ico if it exists)
      {
        url: "/logo_dzamfbr.png",
        type: "image/png",
        sizes: "any",
      },
    ],
    apple: [
      // Apple Touch Icon: Used on iOS home screen
      {
        url: "/logo_dzamfbr.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
    // NOTE: If favicon.ico is added to public/, Next.js will auto-detect it
    // No need to declare it in metadata; browsers will find it at /favicon.ico
  },

  // VERIFICATION: Google Search Console verification
  // NOTE: This is handled via head tag below to ensure it's included
};

/**
 * STRUCTURED DATA (JSON-LD): Schema.org Person markup
 *
 * Purpose: Helps Google understand who you are and what you do
 * Results: Google People Card, Knowledge Panel (if eligible), Rich Results
 *
 * Best practices implemented:
 * - @context & @type: Proper schema.org syntax
 * - sameAs: Links to verified social profiles for entity consolidation
 * - jobTitle: Current professional role
 * - Image: Photo representing the person (must be absolute URL)
 */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dimas Azzam",
  alternateName: "Dzamfbr",
  url: siteUrl,
  jobTitle: "Web Developer",
  description:
    "Portfolio resmi Dimas Azzam sebagai seorang yang terus berkembang dalam membangun keterampilan di bidang pengembangan web, pemrograman, dan teknologi.",
  // FIXED: Added missing "/" in image URL (was: ${siteUrl}screenshoot... now: ${siteUrl}/screenshoot...)
  image: `${siteUrl}/screenshoot_portofolio_web_dzamfbr.png`,
  // Social profiles for entity consolidation (helps Google connect all mentions)
  sameAs: [
    "https://www.instagram.com/dzamfbr/",
    "https://github.com/dzamfbr",
    "https://www.youtube.com/@rayoonn_5",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" data-theme="light" className="h-full antialiased">
      <head>
        {/* GOOGLE SEARCH CONSOLE VERIFICATION: Required for Search Console access */}
        <meta
          name="google-site-verification"
          content="8JH4wtQG9lL6ChQ37hgPrrYi9uVAkmJXCXCOQYaNSRI"
        />

        {/* EXTERNAL STYLESHEET: DevIcon library for tech stack icons */}
        {/* Best practice: Consider self-hosting this CDN resource for better privacy/control */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />

        {/* 
          FAVICON REMOVAL NOTICE:
          
          The following favicon link tags have been REMOVED because Next.js Metadata API
          (configured in metadata export above) now handles them:
          - <link rel="icon" href="/logo_dzamfbr.png" />
          - <link rel="shortcut icon" href="/logo_dzamfbr.png" />
          - <link rel="apple-touch-icon" href="/logo_dzamfbr.png" />
          
          WHY: Duplicate declarations conflict with Metadata API. The Metadata API 
          generates these tags automatically based on the `icons` configuration.
          
          IMPORTANT: For favicon.ico support:
          1. If you have a favicon.ico file in public/, Next.js auto-detects it
          2. Browsers automatically request /favicon.ico (no declaration needed)
          3. If you add favicon.ico, it will be used alongside the PNG
          4. PNG remains for Apple Touch Icon on iOS devices
          
          VERIFICATION: Check Network tab in DevTools - you should see:
          - favicon.ico request (auto-detected from public/ folder)
          - Or logo_dzamfbr.png if favicon.ico doesn't exist yet
        */}

        {/* STRUCTURED DATA: JSON-LD Schema.org Person markup */}
        {/* Purpose: Helps Google understand the page subject for Rich Results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
