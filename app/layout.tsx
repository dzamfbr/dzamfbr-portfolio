import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://dzamfbr-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Dzamfbr — Portfolio of a Web Developer & Programmer based in Indonesia.",
    template: "%s | Dzamfbr",
  },
  description:
    "Portfolio resmi Dimas Azzam sebagai seorang yang terus berkembang dalam membangun keterampilan di bidang pengembangan web, pemrograman, dan teknologi.",
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
  authors: [{ name: "Dimas Azzam" }],
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
    title:
      "Dzamfbr — Portfolio of a Web Developer & Programmer based in Indonesia.",
    description:
      "Portfolio resmi Dimas Azzam sebagai seorang yang terus berkembang dalam membangun keterampilan di bidang pengembangan web, pemrograman, dan teknologi.",
    url: siteUrl,
    siteName: "Dzamfbr Portfolio",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: `${siteUrl}/logo_dzamfbr.png`,
        width: 1200,
        height: 630,
        alt: "Dzamfbr portfolio landing page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Dzamfbr — Portfolio of a Web Developer & Programmer based in Indonesia.",
    description:
      "Portfolio resmi Dimas Azzam sebagai seorang yang terus berkembang dalam membangun keterampilan di bidang pengembangan web, pemrograman, dan teknologi.",
  },
  icons: {
    icon: "/icon_web_dzamfbr.png",
    shortcut: "/icon_web_dzamfbr.png",
    apple: "/icon_web_dzamfbr.png",
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dimas Azzam",
  alternateName: "Dzamfbr",
  url: siteUrl,
  jobTitle: "Web Developer",
  description:
    "Portfolio resmi Dimas Azzam sebagai seorang yang terus berkembang dalam membangun keterampilan di bidang pengembangan web, pemrograman, dan teknologi.",
  image: `${siteUrl}/logo_dzamfbr.png`,
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
        <meta
          name="google-site-verification"
          content="8JH4wtQG9lL6ChQ37hgPrrYi9uVAkmJXCXCOQYaNSRI"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
        <link rel="icon" href="/logo_dzamfbr.png" />
        <link rel="shortcut icon" href="/logo_dzamfbr.png" />
        <link rel="apple-touch-icon" href="/logo_dzamfbr.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
