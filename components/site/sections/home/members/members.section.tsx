import { Reveal } from "@/components/site/shared/reveal.comp";
import { SectionEyebrow } from "@/components/site/shared/section-eyebrow.comp";
import { MEMBERS } from "@/constants/members.const";
import { MemberList } from "./member-list.comp";
import "./members.section.css";

export function MembersSection() {
  return (
    <section id="integrantes" className="section section_theme_ivory members">
      <div className="section__inner section__inner_width_narrow members__inner">
        <div className="members__head">
          <div className="members__intro">
            <div className="members__eyebrow">
              <SectionEyebrow label="Integrantes" />
            </div>
            <h2 className="members__title">Cuatro trayectorias, un mismo atril.</h2>
          </div>
          <p className="members__hint">Pasa el cursor o pulsa un nombre para ver su retrato y su semblanza.</p>
        </div>

        <Reveal>
          <MemberList members={MEMBERS} />
        </Reveal>
      </div>
    </section>
  );
}
