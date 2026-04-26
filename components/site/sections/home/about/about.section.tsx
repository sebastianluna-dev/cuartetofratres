import Image from "next/image";
import { Reveal } from "@/components/site/shared/reveal.comp";
import { SectionEyebrow } from "@/components/site/shared/section-eyebrow.comp";
import { SITE_LOCATION, SITE_NAME } from "@/constants/site.const";
import { Pillar } from "./pillar.comp";
import { StaffDivider } from "./staff-divider.comp";
import "./about.section.css";

const PILLARS = [
  {
    title: "Interpretación",
    text: "Cada obra se aborda desde su propio lenguaje. El fraseo, el color y la articulación se deciden en el atril.",
  },
  {
    title: "Preparación",
    text: "Los programas se estudian por separado y se afinan en conjunto, con el tiempo que cada repertorio exige.",
  },
  {
    title: "Ensamble",
    text: "Afinación, ataque y respiración común son el trabajo diario del cuarteto. De ahí sale su sonido.",
  },
] as const;

export function AboutSection() {
  return (
    <section id="cuarteto" className="section section_theme_ivory about">
      <div className="section__inner">
        <Reveal className="about__content">
          <div className="about__grid">
            <div className="about__text">
              <div className="about__eyebrow">
                <SectionEyebrow label="El cuarteto" />
              </div>
              <h2 className="about__title">El sonido se construye escuchando</h2>
              <p className="about__lead">
                {SITE_NAME} reúne a cuatro músicos con formación profesional y actividad orquestal en México. Trabajan
                el repertorio de cámara con la misma exigencia en una sala de concierto que en una ceremonia privada: el
                programa se elige para el lugar y para quien escucha.
              </p>
              <ul className="about__pillars">
                {PILLARS.map((pillar, index) => (
                  <Pillar key={pillar.title} index={index} title={pillar.title} text={pillar.text} />
                ))}
              </ul>
            </div>

            <figure className="about__figure">
              <div className="about__frame">
                <Image
                  src="/images/cuarteto-escalinata.jpg"
                  alt="Los cuatro integrantes del Cuarteto Fratres en una escalinata"
                  fill
                  sizes="(max-width: 767px) 100vw, 460px"
                  className="about__photo"
                />
              </div>
              <figcaption className="about__caption">
                {SITE_NAME} — {SITE_LOCATION}
              </figcaption>
            </figure>
          </div>
        </Reveal>
      </div>
      <StaffDivider />
    </section>
  );
}
