import type { MetadataRoute } from "next";

export const revalidate = 86400;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://dzamfbr-portfolio.vercel.app";
  const lastModified = new Date("2026-07-20T00:00:00.000Z");

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
