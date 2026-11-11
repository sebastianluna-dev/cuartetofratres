import { siteConfig } from "@/config/site.config";
import { Header } from "@/components/site/sections/shell/header/header.section";
import { FloatingNav } from "@/components/site/sections/shell/floating-nav/floating-nav.section";
import { Footer } from "@/components/site/sections/shell/footer/footer.section";
import { HeroSection } from "@/components/site/sections/home/hero/hero.section";
import { ShowsSection } from "@/components/site/sections/home/shows/shows.section";
import { MembersSection } from "@/components/site/sections/home/members/members.section";
import { RepertoireSection } from "@/components/site/sections/home/repertoire/repertoire.section";
import { AboutSection } from "@/components/site/sections/home/about/about.section";
import { ContactSection } from "@/components/site/sections/home/contact/contact.section";

export default function LandingPage() {
  const { sections } = siteConfig.home;

  return (
    <div className="landing-page">
      <Header />
      <main id="contenido">
        {sections.hero && <HeroSection />}
        {sections.shows && <ShowsSection />}
        {sections.members && <MembersSection />}
        {sections.repertoire && <RepertoireSection />}
        {sections.about && <AboutSection />}
        {sections.contact && <ContactSection />}
      </main>
      <Footer />
      <FloatingNav />
    </div>
  );
}
