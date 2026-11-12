import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";
import { getMembers } from "@/services/members/members.service";

// The home page and one page per musician. Anchors (#repertorio…) are not
// separate URLs for a crawler.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const members = await getMembers();
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    ...members.map((member) => ({
      url: `${SITE_URL}/integrantes/${member.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
