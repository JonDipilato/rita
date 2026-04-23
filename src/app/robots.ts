import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://gospastatuary.com";
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/.data/"] },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
