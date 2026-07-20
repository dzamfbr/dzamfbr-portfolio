import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://dzamfbr-portfolio.vercel.app";
const siteName = "Dzamfbr Portfolio";
const siteTitle = "Dzamfbr | IT Programmer and Developer, based in Indonesia.";
const siteDescription =
  "Portfolio resmi Dimas Azzam (Dzamfbr) sebagai web developer dan programmer berbasis di Indonesia, menampilkan karya, skill, dan pengalaman teknologi.";
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
    canonical: "/",
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
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/logo_dzamfbr.png", type: "image/png", sizes: "any" },
    ],
    apple: [{ url: "/logo_dzamfbr.png", type: "image/png", sizes: "180x180" }],
  },
  verification: {
    google: "8JH4wtQG9lL6ChQ37hgPrrYi9uVAkmJXCXCOQYaNSRI",
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
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  logo: logoUrl,
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
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
