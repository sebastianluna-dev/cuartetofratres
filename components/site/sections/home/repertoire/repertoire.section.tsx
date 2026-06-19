import { Reveal } from "@/components/site/shared/reveal.comp";
import { SectionEyebrow } from "@/components/site/shared/section-eyebrow.comp";
import { getRepertoireData } from "@/services/repertoire/repertoire.service";
import { RepertoirePlayer } from "./repertoire-player.comp";
import "./repertoire.section.css";

export async function RepertoireSection() {
  const repertoire = await getRepertoireData();

  return (
    <section id="repertorio" className="section section_theme_ink repertoire">
      <div className="section__inner">
        <Reveal className="repertoire__content">
          <div className="repertoire__eyebrow">
            <SectionEyebrow label={repertoire.eyebrow} theme="ink" />
          </div>
          <RepertoirePlayer content={repertoire} />
        </Reveal>
      </div>
    </section>
  );
}
