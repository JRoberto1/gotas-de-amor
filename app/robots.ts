// robots.ts — permite indexação de todo o site pelo Google e demais crawlers
import type { MetadataRoute } from "next";

const BASE_URL = "https://gotasdeamor.com.br";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
