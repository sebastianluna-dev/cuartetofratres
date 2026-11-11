import Image from "next/image";
import { Reveal } from "@/components/site/shared/reveal.comp";
import { SectionHeader } from "@/components/site/shared/section-header.comp";
import { StaffOrnament } from "@/components/site/shared/staff-ornament.comp";
import { ABOUT_COPY, OCCASIONS } from "@/constants/about.const";
import { getAboutData } from "@/services/about/about.service";
import { getSiteSettingsData } from "@/services/site-settings/site-settings.service";
import "./about.section.css";

const TITLE_ID = "cuarteto-titulo";

export async function AboutSection() {
  const [about, settings] = await Promise.all([getAboutData(), getSiteSettingsData()]);

  return (
    <section id="cuarteto" className="section section_theme_ivory about" aria-labelledby={TITLE_ID}>
      <div className="section__inner">
        <Reveal>
          <SectionHeader
            titleId={TITLE_ID}
            title={ABOUT_COPY.heading}
            label={ABOUT_COPY.label}
            note={`${settings.location}.`}
            ground="ivory"
          />
        </Reveal>

        <div className="about__grid">
          <Reveal className="about__text">
            <StaffOrnament width={240} />
            <p className="about__statement">{about.title}.</p>
            <p className="about__lead">{about.lead}</p>
            <ol className="about__occasions">
              {OCCASIONS.map((occasion, index) => (
                <li key={occasion} className="about__occasion">
                  <span className="about__occasion-number" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <span className="about__occasion-name">{occasion}</span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal className="about__media">
            <figure className="about__frame grain">
              {/* Five twelfths of the page on desktop, the whole width on the phone. */}
              <Image
                src={about.photo.src}
                alt={about.photo.alt}
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
                className="about__photo"
              />
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
