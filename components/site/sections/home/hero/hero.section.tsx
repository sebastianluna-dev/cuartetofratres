import { ArrowIcon } from "@/components/site/shared/arrow-icon.comp";
import { HERO_COPY } from "@/constants/hero.const";
import { HERO_STAGE_BACKDROP, HERO_STAGE_FIGURES } from "@/constants/hero-stage.const";
import { getHeroData } from "@/services/hero/hero.service";
import { getSiteSettingsData } from "@/services/site-settings/site-settings.service";
import { HeroStage } from "./hero-stage.comp";
import "./hero.section.css";

// First screen: the name on the left and, on the right, the four musicians
// standing on a dark stage with the staff behind them. On the phone the stage
// goes under the text. The top bar (shell/header) lies over the first 86px.
export async function HeroSection() {
  const [hero, settings] = await Promise.all([getHeroData(), getSiteSettingsData()]);
  const titleWords = hero.title.trim().split(/\s+/);

  return (
    <section id="inicio" className="section section_theme_ink hero">
      <div className="hero__inner">
        <div className="hero__content">
          <p className="hero__eyebrow">
            {HERO_COPY.kicker} · {settings.location}
          </p>
          <h1 className="hero__title">
            {/* One word per line; a space keeps the name whole for readers and copy-paste. */}
            {titleWords.map((word, index) => (
              <span key={index} className="hero__title-line">
                {word}{" "}
              </span>
            ))}
          </h1>
          <p className="hero__lead">{hero.lead}</p>
          <div className="hero__actions">
            <a href="#repertorio" className="pill-button">
              {hero.listenLabel}
              <ArrowIcon className="pill-button__icon" />
            </a>
            <a href="#integrantes" className="hero__link">
              <svg className="hero__link-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path
                  d="M5 19 17 7M17 7l2-2M14 6l4 4M5 19l-1 1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span className="hero__link-text">{HERO_COPY.membersLink}</span>
            </a>
          </div>
        </div>

        <p className="hero__foot">
          <svg className="hero__foot-staff" viewBox="0 0 34 20" aria-hidden="true" focusable="false">
            <path d="M0 2h34M0 6h34M0 10h34M0 14h34M0 18h34" fill="none" stroke="currentColor" />
          </svg>
          {HERO_COPY.occasions}
        </p>
      </div>

      <HeroStage figures={HERO_STAGE_FIGURES} backdrop={HERO_STAGE_BACKDROP} />
    </section>
  );
}
