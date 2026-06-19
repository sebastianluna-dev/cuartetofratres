import type { CSSProperties } from "react";
import Image from "next/image";
import { Reveal } from "@/components/site/shared/reveal.comp";
import { SectionEyebrow } from "@/components/site/shared/section-eyebrow.comp";
import { getAboutData } from "@/services/about/about.service";
import { getSiteSettingsData } from "@/services/site-settings/site-settings.service";
import { SocialColumn } from "./social-column.comp";
import { StaffDivider } from "./staff-divider.comp";
import "./about.section.css";

export async function AboutSection() {
  const [about, settings] = await Promise.all([getAboutData(), getSiteSettingsData()]);

  return (
    <section id="cuarteto" className="section section_theme_ivory about">
      <div className="section__inner">
        <Reveal className="about__content">
          <div className="about__grid">
            <div className="about__text">
              <div className="about__eyebrow">
                <SectionEyebrow label={about.eyebrow} />
              </div>
              <h2 className="about__title">{about.title}</h2>
              <p className="about__lead">{about.lead}</p>
            </div>

            <div className="about__media">
              <figure className="about__figure">
                {/* The frame keeps the photo's own proportions: the CMS knows them,
                  the launch file falls back to the ratio in the stylesheet. */}
                <div
                  className="about__frame"
                  style={
                    about.photo.width && about.photo.height
                      ? ({ "--about-photo-ratio": `${about.photo.width} / ${about.photo.height}` } as CSSProperties)
                      : undefined
                  }
                >
                  <Image
                    src={about.photo.src}
                    alt={about.photo.alt}
                    fill
                    sizes="(max-width: 767px) 100vw, 300px"
                    className="about__photo"
                  />
                </div>
                <figcaption className="about__caption">{about.photoCaption}</figcaption>
              </figure>
              <SocialColumn links={settings.social} />
            </div>
          </div>
        </Reveal>
      </div>
      <StaffDivider />
    </section>
  );
}
