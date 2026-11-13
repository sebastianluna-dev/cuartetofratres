import { siteConfig } from "@/config/site.config";
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
      <main id="contenido">
        {sections.hero && <HeroSection />}
        {sections.repertoire && <RepertoireSection />}
        {sections.about && <AboutSection />}
        {sections.members && <MembersSection />}
        {sections.shows && <ShowsSection />}
        {sections.contact && <ContactSection />}
      </main>
      <Footer />
    </div>
  );
}
