import { Reveal } from "@/components/site/shared/reveal.comp";
import { TRACKS } from "@/constants/repertoire.const";
import { RepertoirePlayer } from "./repertoire-player.comp";
import "./repertoire.section.css";

export function RepertoireSection() {
  return (
    <section id="repertorio" className="section section_theme_ink repertoire">
      <div className="section__inner">
        <Reveal className="repertoire__content">
          <RepertoirePlayer tracks={TRACKS} />
        </Reveal>
      </div>
    </section>
  );
}
