import { ArrowIcon } from "@/components/site/shared/arrow-icon.comp";
import { HERO_COPY } from "@/constants/hero.const";
import { HERO_STAGE_FIGURES } from "@/constants/hero-stage.const";
import { CONTACT_ANCHOR } from "@/constants/navigation.const";
import { getHeroData } from "@/services/hero/hero.service";
import { getSiteSettingsData } from "@/services/site-settings/site-settings.service";
import { HeroStage } from "./hero-stage.comp";
import "./hero.section.css";

// First screen, with no top bar over it: the name on one line across the top,
// the four musicians standing in the centre beneath it, and two wings at the
// foot (the lead and the main button on the left; the links to the members
// and to contact, and the occasions, on the right). The contact link stands
// in for the top bar's call to action. On the phone: the name in two lines,
// the stage, the actions, the occasions and then the lead.
export async function HeroSection() {
  const [hero, settings] = await Promise.all([getHeroData(), getSiteSettingsData()]);
  const titleWords = hero.title.trim().split(/\s+/);

  return (
    <section id="inicio" className="section section_theme_ink hero">
      <div className="hero__inner">
        <div className="hero__top">
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

        <div className="hero__wings">
          <div className="hero__left">
            <p className="hero__lead">{hero.lead}</p>
            <div className="hero__actions">
              <a href="#repertorio" className="pill-button">
                {hero.listenLabel}
                <ArrowIcon className="pill-button__icon" />
              </a>
            </div>
          </div>

          <div className="hero__right">
            <nav className="hero__links" aria-label={HERO_COPY.linksLabel}>
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
              <a href={CONTACT_ANCHOR} className="hero__link">
                <ArrowIcon className="hero__link-icon hero__link-icon_arrow" />
                <span className="hero__link-text">{HERO_COPY.contactLink}</span>
              </a>
            </nav>
            <p className="hero__foot">
              {HERO_COPY.occasions}
              <svg className="hero__foot-staff" viewBox="0 0 34 20" aria-hidden="true" focusable="false">
                <path d="M0 2h34M0 6h34M0 10h34M0 14h34M0 18h34" fill="none" stroke="currentColor" />
              </svg>
            </p>
          </div>
        </div>
      </div>

      <HeroStage figures={HERO_STAGE_FIGURES} />
    </section>
  );
}
