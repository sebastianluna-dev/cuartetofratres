import type { Metadata } from "next";
import LandingPage from "./landing-page";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Static home page: prerendered at build time and served from the CDN. It
// reads no cookies or headers, so it stays static; the only date-dependent
// piece (which concerts are still ahead) is decided with the build date and
// refreshed daily by `revalidate`.
export const revalidate = 86400;

export default function HomePage() {
  return <LandingPage />;
}
