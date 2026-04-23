import type { MetadataRoute } from "next";
import { collection } from "@/lib/collection";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://gospastatuary.com";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/collection`, lastModified: now, changeFrequency: "daily", priority: 0.95 },
    { url: `${base}/coleccion`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
  ];

  const productRoutes: MetadataRoute.Sitemap = collection.map((p) => ({
    url: `${base}/collection/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: p.status === "Available" ? 0.9 : 0.4,
  }));

  return [...staticRoutes, ...productRoutes];
}
