import { Reveal } from "@/components/site/shared/reveal.comp";
import { getRepertoireData } from "@/services/repertoire/repertoire.service";
import { RepertoirePlayer } from "./repertoire-player.comp";
import "./repertoire.section.css";

export async function RepertoireSection() {
  const repertoire = await getRepertoireData();

  return (
    <section id="repertorio" className="section section_theme_ink section_grain repertoire">
      <div className="section__inner">
        <Reveal className="repertoire__content">
          <RepertoirePlayer content={repertoire} />
        </Reveal>
      </div>
    </section>
  );
}
