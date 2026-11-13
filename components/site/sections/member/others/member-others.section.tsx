import { MemberPortrait } from "@/components/site/shared/member-portrait.comp";
import { StaffLines } from "@/components/site/shared/staff-lines.comp";
import { StaffMusic } from "@/components/site/shared/staff-music.comp";
import { RUNNING_MUSIC_FRAGMENTS } from "@/constants/hero-music.const";
import { MEMBER_OTHERS_MUSIC_STAGES, MEMBER_PAGE_COPY } from "@/constants/members.const";
import type { MemberContent } from "@/services/members/members.types";
import "./member-others.section.css";

interface MemberOthersSectionProps {
  members: readonly MemberContent[];
}

const TITLE_ID = "otros-integrantes-titulo";

// The rest of the quartet under the profile: the same portraits as the home
// page's row, over the same faint score running behind them, each one leading
// to its page.
export function MemberOthersSection({ members }: MemberOthersSectionProps) {
  if (members.length === 0) return null;

  return (
    <section className="section section_theme_ink member-others" aria-labelledby={TITLE_ID}>
      <div className="section__inner">
        <h2 id={TITLE_ID} className="section-title">
          {MEMBER_PAGE_COPY.others}
        </h2>
        <div className="member-others__stage">
          <StaffLines kind="hero" className="member-others__staff" />
          <StaffMusic
            stages={MEMBER_OTHERS_MUSIC_STAGES}
            figures={[]}
            fragments={RUNNING_MUSIC_FRAGMENTS}
            id="member-others-music"
            className="member-others__music"
          />
          <ul className="member-others__row">
            {members.map((member) => (
              <li key={member.id}>
                {/* Three to a row: a quarter of the page on desktop, a third on the phone. */}
                <MemberPortrait member={member} sizes="(max-width: 900px) 33vw, 25vw" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
