import type { Metadata } from "next";
import LandingPage from "./landing-page";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Static home page: prerendered from Payload at build time and served from the
// CDN. It reads no cookies or headers, so it stays static; a save in /admin
// expires it through the collections' hooks (lib/payload/revalidate-site.ts),
// and `revalidate` refreshes daily the only date-dependent piece (which
// concerts are still ahead).
export const revalidate = 86400;

export default function HomePage() {
  return <LandingPage />;
}
