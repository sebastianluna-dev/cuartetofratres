import { MemberPortrait } from "@/components/site/shared/member-portrait.comp";
import { Reveal } from "@/components/site/shared/reveal.comp";
import { MEMBERS_COPY } from "@/constants/members.const";
import { getMembers } from "@/services/members/members.service";
import "./members.section.css";

const TITLE_ID = "integrantes-titulo";

// The four musicians in a row; each portrait opens that musician's page
// (app/(site)/integrantes/[slug]), where their profile is.
export async function MembersSection() {
  const members = await getMembers();

  return (
    <section id="integrantes" className="section section_theme_ink members" aria-labelledby={TITLE_ID}>
      <div className="section__inner members__inner">
        <Reveal>
          <h2 id={TITLE_ID} className="section-title">
            {MEMBERS_COPY.title}
          </h2>
        </Reveal>
        <Reveal>
          <ul className="members__row">
            {members.map((member) => (
              <li key={member.id}>
                {/* Four to a row on desktop, two on the phone. */}
                <MemberPortrait member={member} sizes="(max-width: 900px) 50vw, 25vw" />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
