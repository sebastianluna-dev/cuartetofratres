import { siteConfig } from "@/config/site.config";
import { Logo } from "@/components/site/shared/logo.comp";
import { HERO_COPY } from "@/constants/hero.const";
import { HERO_STAGE_FIGURES } from "@/constants/hero-stage.const";
import { HERO_MUSIC_STAGES } from "@/constants/hero-music.const";
import { StaffMusic } from "@/components/site/shared/staff-music.comp";
import { getHeroData } from "@/services/hero/hero.service";
import { getSiteSettingsData } from "@/services/site-settings/site-settings.service";
import { HeroStage } from "./hero-stage.comp";
import "./hero.section.css";

// First screen, with no top bar and nothing else over it: the label, the name
// and the four musicians. Two layouts (siteConfig.home.heroLayout): `centered`
// sets the name on one line across the top with the four centred beneath it;
// `split` sets it in two lines on the left with the four standing on the
// right. On the phone both take the name in two lines over the stage.
export async function HeroSection() {
  const [hero, settings] = await Promise.all([getHeroData(), getSiteSettingsData()]);
  const titleWords = hero.title.trim().split(/\s+/);

  return (
    <section id="inicio" className={`section section_theme_ink hero hero_layout_${siteConfig.home.heroLayout}`}>
      <div className="hero__inner">
        {/* The monogram signs the page from the top-left corner, in line with the name. */}
        <div className="hero__mark">
          <Logo theme="ivory" height={40} />
        </div>
        <p className="hero__eyebrow">
          <span>{HERO_COPY.kicker}</span>
          <span className="hero__eyebrow-dot" aria-hidden="true">
            ·
          </span>
          <span>{settings.location}</span>
        </p>
        <h1 className="hero__title">
          {/* A space keeps the name whole for readers and copy-paste. */}
          {titleWords.map((word, index) => (
            <span key={index} className="hero__title-word">
              {word}{" "}
            </span>
          ))}
        </h1>
      </div>

      <HeroStage
        figures={HERO_STAGE_FIGURES}
        music={
          <StaffMusic
            stages={HERO_MUSIC_STAGES}
            figures={HERO_STAGE_FIGURES}
            id="hero-music"
            className="hero-stage__music"
          />
        }
      />
    </section>
  );
}
