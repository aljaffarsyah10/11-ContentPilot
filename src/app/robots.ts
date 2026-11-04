import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://contentpilot.id";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/login", "/register"],
        disallow: [
          "/dashboard",
          "/dashboard/*",
          "/contents",
          "/contents/*",
          "/ideas",
          "/ideas/*",
          "/calendar",
          "/calendar/*",
          "/ai-generator",
          "/ai-generator/*",
          "/settings",
          "/settings/*",
          "/api/*",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
