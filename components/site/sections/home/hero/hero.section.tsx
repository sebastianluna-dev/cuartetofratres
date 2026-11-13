import { HERO_COPY } from "@/constants/hero.const";
import { HERO_STAGE_FIGURES } from "@/constants/hero-stage.const";
import { getHeroData } from "@/services/hero/hero.service";
import { getSiteSettingsData } from "@/services/site-settings/site-settings.service";
import { HeroStage } from "./hero-stage.comp";
import "./hero.section.css";

// First screen, with no top bar and nothing else over it: the label and the
// name on one line across the top, and the four musicians standing in the
// centre beneath it. On the phone the name takes two lines over the stage.
export async function HeroSection() {
  const [hero, settings] = await Promise.all([getHeroData(), getSiteSettingsData()]);
  const titleWords = hero.title.trim().split(/\s+/);

  return (
    <section id="inicio" className="section section_theme_ink hero">
      <div className="hero__inner">
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

      <HeroStage figures={HERO_STAGE_FIGURES} />
    </section>
  );
}
