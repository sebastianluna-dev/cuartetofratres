import type { CSSProperties } from "react";
import Image from "next/image";
import { Reveal } from "@/components/site/shared/reveal.comp";
import { SectionHeader } from "@/components/site/shared/section-header.comp";
import { StaffOrnament } from "@/components/site/shared/staff-ornament.comp";
import { ABOUT_COPY, OCCASIONS } from "@/constants/about.const";
import { getAboutData } from "@/services/about/about.service";
import { getSiteSettingsData } from "@/services/site-settings/site-settings.service";
import { OccasionIcon } from "./occasion-icon.comp";
import "./about.section.css";

const TITLE_ID = "cuarteto-titulo";

export async function AboutSection() {
  const [about, settings] = await Promise.all([getAboutData(), getSiteSettingsData()]);

  return (
    <section id="cuarteto" className="section section_theme_paper about" aria-labelledby={TITLE_ID}>
      <div className="section__inner">
        <Reveal>
          <SectionHeader titleId={TITLE_ID} title={ABOUT_COPY.heading} note={`${settings.location}.`} />
        </Reveal>

        <div className="about__grid">
          <Reveal className="about__text">
            <StaffOrnament width={240} />
            <p className="about__statement">{about.title}.</p>
            <p className="about__lead">{about.lead}</p>
            <ol className="about__occasions">
              {OCCASIONS.map((occasion, index) => (
                <li key={occasion} className="about__occasion">
                  <OccasionIcon index={index} />
                  <span className="about__occasion-name">{occasion}</span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal className="about__media">
            {/* The frame keeps the photo's own proportions, so nobody is cropped out:
                the CMS knows them, and so does the launch file. */}
            <figure
              className="about__frame"
              style={
                about.photo.width && about.photo.height
                  ? ({ "--about-photo-ratio": `${about.photo.width} / ${about.photo.height}` } as CSSProperties)
                  : undefined
              }
            >
              {/* Seven twelfths of the page on desktop, the whole width on the phone. */}
              <Image
                src={about.photo.src}
                alt={about.photo.alt}
                fill
                sizes="(max-width: 900px) 100vw, 56vw"
                className="about__photo"
              />
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
