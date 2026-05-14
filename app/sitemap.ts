import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

// One page for now. Anchors (#repertorio…) are not separate URLs for a crawler.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
