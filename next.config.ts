import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  images: {
    // AVIF first: the portraits are large and mostly flat tones, where it wins
    // clearly over WebP.
    formats: ["image/avif", "image/webp"],
    // 75 is the default for every photo; 100 for the hero and the group photo
    // of «El cuarteto», where AVIF's smoothing at 75 shows on hair and wood.
    qualities: [75, 100],
    // Uploads served by Vercel Blob in production; locally Payload serves
    // them from /api/media/file/*, a same-origin path that needs no entry.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
  experimental: {
    // With two root layouts (site and CMS) there is no `not-found.tsx`
    // covering the URLs that match no route: app/global-not-found.tsx does that.
    globalNotFound: true,
  },
};

export default withPayload(nextConfig);
