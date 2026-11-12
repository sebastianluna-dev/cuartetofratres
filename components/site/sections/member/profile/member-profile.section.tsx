import Image from "next/image";
import { StaffLines } from "@/components/site/shared/staff-lines.comp";
import { splitParagraphs } from "@/lib/text-blocks";
import type { MemberContent } from "@/services/members/members.types";
import "./member-profile.section.css";

interface MemberProfileSectionProps {
  member: MemberContent;
}

// First screen of a musician's page: the instrument, the name and the
// biography on the left; the portrait standing on the right, over the
// staff lines. On the phone the portrait goes between the name and the text.
export function MemberProfileSection({ member }: MemberProfileSectionProps) {
  return (
    <article className="section section_theme_ink member-profile" aria-labelledby="semblanza-titulo">
      <div className="member-profile__inner">
        <header className="member-profile__head">
          <p className="member-profile__instrument">{member.instrument}</p>
          <h1 id="semblanza-titulo" className="member-profile__name">
            {member.displayName}
          </h1>
        </header>

        <div className="member-profile__stage" aria-hidden="true">
          <div className="member-profile__glow" />
          <StaffLines kind="hero" className="member-profile__staff" />
          <div className="member-profile__frame">
            {/* Five twelfths of the page on desktop, most of the screen on the phone. */}
            <Image
              src={member.photo.src}
              alt=""
              fill
              priority
              sizes="(max-width: 900px) 90vw, 42vw"
              className="member-profile__photo"
              style={{ objectPosition: member.photoPosition }}
            />
          </div>
        </div>

        <div className="member-profile__bio">
          {splitParagraphs(member.bio).map((paragraph, index) => (
            <p key={index} className="member-profile__paragraph">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
