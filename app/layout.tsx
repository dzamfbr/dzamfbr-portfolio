import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://dzamfbr-portfolio.vercel.app";
const siteName = "Dzamfbr Portfolio";
const siteTitle =
  "Dzamfbr Portfolio | Web Developer & Programmer from Indonesia";
const siteDescription =
  "Dzamfbr Portfolio adalah portofolio resmi Dimas Azzam sebagai web developer dan programmer berbasis di Indonesia, menampilkan karya, skill, dan pengalaman teknologi.";
const defaultImage = `${siteUrl}/screenshoot_portofolio_web_dzamfbr.png`;
const logoUrl = `${siteUrl}/logo_dzamfbr.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: siteTitle,
    template: "%s | Dzamfbr Portfolio",
  },
  description: siteDescription,
  keywords: [
    "dzamfbr",
    "dimas azzam",
    "portfolio dzamfbr",
    "web developer indonesia",
    "nextjs developer",
    "react developer",
    "programmer indonesia",
    "ui ux designer",
  ],
  authors: [{ name: "Dimas Azzam", url: siteUrl }],
  alternates: {
    canonical: siteUrl,
    languages: {
      id: "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
    locale: "id_ID",
    images: [
      {
        url: defaultImage,
        width: 1200,
        height: 630,
        alt: "Dzamfbr Portfolio landing page preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    creator: "@dzamfbr",
    site: "@dzamfbr",
    images: [
      {
        url: defaultImage,
        alt: "Dzamfbr Portfolio preview",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/logo_dzamfbr.png", type: "image/png", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/logo_dzamfbr.png", type: "image/png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
  other: {
    "theme-color": "#0f172a",
    "msapplication-TileColor": "#0f172a",
  },
  verification: {
    google: "TYcEMxZTJIN9tC00jnZcP48Y92puHkrbcyu4OTxETC4",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  alternateName: "Dzamfbr",
  url: siteUrl,
  inLanguage: "id-ID",
  description: siteDescription,
  publisher: {
    "@id": `${siteUrl}/#organization`,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: siteName,
  url: siteUrl,
  logo: logoUrl,
  description: siteDescription,
  sameAs: [
    "https://www.instagram.com/dzamfbr/",
    "https://github.com/dzamfbr",
    "https://www.youtube.com/@rayoonn_5",
  ],
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dimas Azzam",
  alternateName: "Dzamfbr",
  url: siteUrl,
  jobTitle: "Web Developer",
  description: siteDescription,
  image: defaultImage,
  sameAs: [
    "https://www.instagram.com/dzamfbr/",
    "https://github.com/dzamfbr",
    "https://www.youtube.com/@rayoonn_5",
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: siteTitle,
  url: siteUrl,
  description: siteDescription,
  inLanguage: "id-ID",
  isPartOf: {
    "@id": `${siteUrl}/#website`,
  },
  about: {
    "@id": `${siteUrl}/#organization`,
  },
  primaryImageOfPage: {
    "@id": `${siteUrl}/#primaryimage`,
  },
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: `About ${siteName}`,
  url: siteUrl,
  description: siteDescription,
  mainEntity: {
    "@id": `${siteUrl}/#person`,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteUrl,
    },
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
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
