import { siteConfig } from "@/config/site.config";
import { Header } from "@/components/site/sections/shell/header/header.section";
import { Footer } from "@/components/site/sections/shell/footer/footer.section";
import { HeroSection } from "@/components/site/sections/home/hero/hero.section";
import { AboutSection } from "@/components/site/sections/home/about/about.section";
import { MembersSection } from "@/components/site/sections/home/members/members.section";
import { RepertoireSection } from "@/components/site/sections/home/repertoire/repertoire.section";

export default function LandingPage() {
  const { sections } = siteConfig.home;

  return (
    <div className="landing-page">
      <Header />
      <main id="contenido">
        {sections.hero && <HeroSection />}
        {sections.about && <AboutSection />}
        {sections.members && <MembersSection />}
        {sections.repertoire && <RepertoireSection />}
      </main>
      <Footer />
    </div>
  );
}
