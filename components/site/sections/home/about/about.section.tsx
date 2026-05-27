import Image from "next/image";
import { Reveal } from "@/components/site/shared/reveal.comp";
import { SectionEyebrow } from "@/components/site/shared/section-eyebrow.comp";
import { getAboutData } from "@/services/about/about.service";
import { Pillar } from "./pillar.comp";
import { StaffDivider } from "./staff-divider.comp";
import "./about.section.css";

export async function AboutSection() {
  const about = await getAboutData();

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
              <ul className="about__pillars">
                {about.pillars.map((pillar, index) => (
                  <Pillar key={pillar.title} index={index} title={pillar.title} text={pillar.text} />
                ))}
              </ul>
            </div>

            <figure className="about__figure">
              <div className="about__frame">
                <Image
                  src={about.photo.src}
                  alt={about.photo.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, 460px"
                  className="about__photo"
                />
              </div>
              <figcaption className="about__caption">{about.photoCaption}</figcaption>
            </figure>
          </div>
        </Reveal>
      </div>
      <StaffDivider />
    </section>
  );
}
