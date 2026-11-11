import { Reveal } from "@/components/site/shared/reveal.comp";
import { StaffLines } from "@/components/site/shared/staff-lines.comp";
import { MEMBERS_COPY } from "@/constants/members.const";
import { getMembers } from "@/services/members/members.service";
import { MemberCast } from "./member-cast.comp";
import "./members.section.css";

const TITLE_ID = "integrantes-titulo";

export async function MembersSection() {
  const members = await getMembers();

  return (
    <section id="integrantes" className="section section_theme_ink ink-grain members" aria-labelledby={TITLE_ID}>
      <StaffLines kind="wide" className="members__staff" />
      <div className="section__inner members__inner">
        <Reveal>
          <h2 id={TITLE_ID} className="section-title">
            {MEMBERS_COPY.title}
          </h2>
        </Reveal>
        <Reveal>
          <MemberCast members={members} />
        </Reveal>
      </div>
    </section>
  );
}
