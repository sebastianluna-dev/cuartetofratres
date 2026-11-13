import { Reveal } from "@/components/site/shared/reveal.comp";
import { getRepertoireData } from "@/services/repertoire/repertoire.service";
import { RepertoirePlayer } from "./repertoire-player.comp";
import "./repertoire.section.css";

const TITLE_ID = "repertorio-titulo";

// The programme on plain ivory paper. The player owns everything that moves.
export async function RepertoireSection() {
  const repertoire = await getRepertoireData();

  return (
    <section id="repertorio" className="section section_theme_wood repertoire" aria-labelledby={TITLE_ID}>
      <div className="section__inner repertoire__inner">
        <Reveal className="repertoire__content">
          <RepertoirePlayer content={repertoire} titleId={TITLE_ID} />
        </Reveal>
      </div>
    </section>
  );
}
