import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://techdexllc.com",
      lastModified: new Date("2026-05-22"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
