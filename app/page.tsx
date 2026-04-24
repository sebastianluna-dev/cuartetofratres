import type { Metadata } from "next";
import LandingPage from "./landing-page";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Static home page: prerendered at build time and served from the CDN.
export default function HomePage() {
  return <LandingPage />;
}
