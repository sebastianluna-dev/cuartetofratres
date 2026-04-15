import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every photo is served from public/images through next/image; there is no
  // remote host to allow. AVIF first: the portraits are large and mostly flat
  // tones, where it wins clearly over WebP.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
