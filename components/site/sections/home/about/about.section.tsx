import Image from "next/image";
import { FitTitle } from "@/components/site/shared/fit-title.comp";
import { Reveal } from "@/components/site/shared/reveal.comp";
import { ABOUT_COPY, ABOUT_GROUP, OCCASIONS } from "@/constants/about.const";
import { splitParagraphs } from "@/lib/text-blocks";
import { getAboutData } from "@/services/about/about.service";
import { OccasionIcon } from "./occasion-icon.comp";
import "./about.section.css";

const TITLE_ID = "cuarteto-titulo";

// Two columns: on the left the title with the four, cut out of one group
// photo, standing in front of its lower half; on the right
// the description, a few paragraphs, and the occasions as a row of three
// cells. On the phone the columns stack and the row stays a row.
export async function AboutSection() {
  const about = await getAboutData();

  return (
    <section id="cuarteto" className="section section_theme_paper about" aria-labelledby={TITLE_ID}>
      <div className="section__inner about__layout">
        <div className="about__stage">
          <FitTitle id={TITLE_ID} max={250} className="about__title">
            {ABOUT_COPY.heading}
          </FitTitle>
          <Reveal className="about__group">
            {/* Most of the left column on desktop, the whole width on the phone. */}
            <Image
              src={ABOUT_GROUP.src}
              alt={ABOUT_GROUP.alt}
              width={ABOUT_GROUP.width}
              height={ABOUT_GROUP.height}
              quality={100}
              sizes="(max-width: 900px) 100vw, 46vw"
              className="about__group-photo"
            />
          </Reveal>
        </div>

        <div className="about__content">
          <Reveal className="about__lead">
            {splitParagraphs(about.lead).map((paragraph, index) => (
              <p key={index} className="about__paragraph">
                {paragraph}
              </p>
            ))}
          </Reveal>
          <Reveal>
            <ol className="about__occasions">
              {OCCASIONS.map((occasion, index) => (
                <li key={occasion} className="about__occasion">
                  <OccasionIcon index={index} />
                  <span className="about__occasion-name">{occasion}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
