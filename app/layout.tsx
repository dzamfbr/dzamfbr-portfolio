import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://dzamfbr.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Dzamfbr | Dimas Azzam - Portfolio Web Developer Indonesia",
    template: "%s | Dzamfbr",
  },
  description:
    "Portfolio resmi Dzamfbr dan Dimas Azzam sebagai Web Developer Indonesia. Menampilkan proyek web modern, Next.js, React, UI/UX, JavaScript, dan karya pengembangan aplikasi.",
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
    title: "Dzamfbr | Dimas Azzam - Portfolio Web Developer Indonesia",
    description:
      "Portfolio resmi Dzamfbr dan Dimas Azzam sebagai Web Developer Indonesia dengan proyek modern dan pengalaman di bidang teknologi.",
    url: siteUrl,
    siteName: "Dzamfbr Portfolio",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Dzamfbr portfolio landing page screenshot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dzamfbr | Dimas Azzam - Portfolio Web Developer Indonesia",
    description:
      "Portfolio resmi Dzamfbr dan Dimas Azzam sebagai Web Developer Indonesia.",
    images: [`${siteUrl}/og-image.png`],
  },
  icons: {
    icon: "/logo_dzamfbr.png",
    shortcut: "/logo_dzamfbr.png",
    apple: "/logo_dzamfbr.png",
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
    "Web Developer dan programmer Indonesia yang fokus pada pengembangan website modern, UI/UX, dan teknologi frontend.",
  image: `${siteUrl}/logo_dzamfbr.png`,
  sameAs: [
    "https://www.instagram.com/dzamfbr/",
    "https://github.com",
    "https://youtube.com",
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
