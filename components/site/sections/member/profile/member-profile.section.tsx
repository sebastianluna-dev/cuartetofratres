import type { CSSProperties } from "react";
import Image from "next/image";
import { StaffMusic } from "@/components/site/shared/staff-music.comp";
import { MEMBER_MUSIC_STAGES, MEMBER_STAGE_FIGURE } from "@/constants/members.const";
import { StaffLines } from "@/components/site/shared/staff-lines.comp";
import { photoFadeStyle } from "@/lib/photo-fades";
import { splitParagraphs } from "@/lib/text-blocks";
import type { MemberContent } from "@/services/members/members.types";
import "./member-profile.section.css";

interface MemberProfileSectionProps {
  member: MemberContent;
}

// First screen of a musician's page: the instrument, the name and the
// biography on the left, centred against the portrait standing on the right
// over the staff lines. On the phone the portrait goes between the name and the text.
export function MemberProfileSection({ member }: MemberProfileSectionProps) {
  return (
    <article className="section section_theme_ink member-profile" aria-labelledby="semblanza-titulo">
      <div className="member-profile__inner">
        <header className="member-profile__head">
          {/* The instrument is drawn as a note on the photo, hidden from readers;
              they hear it here, before the name. */}
          <p className="visually-hidden">{member.instrument}</p>
          <h1 id="semblanza-titulo" className="member-profile__name">
            {member.displayName}
          </h1>
        </header>

        <div className="member-profile__stage" aria-hidden="true">
          <div className="member-profile__glow" />
          <StaffLines kind="hero" className="member-profile__staff" />
          <StaffMusic
            stages={MEMBER_MUSIC_STAGES}
            figures={MEMBER_STAGE_FIGURE}
            id="member-music"
            className="member-profile__music"
          />
          <div
            className="member-profile__photo-box"
            style={
              {
                "--note-x": `${member.photo.note.x}%`,
                "--note-y": `${member.photo.note.y}%`,
              } as CSSProperties
            }
          >
            <div className="member-profile__frame" style={photoFadeStyle(member.photo.page.fades)}>
              {/* Five twelfths of the page on desktop, most of the screen on the phone. */}
              <Image
                src={member.photo.src}
                alt=""
                fill
                priority
                quality={100}
                sizes="(max-width: 900px) 90vw, 42vw"
                className="member-profile__photo"
                style={{ objectPosition: member.photo.page.position }}
              />
            </div>
            <p className={`member-profile__note member-profile__note_points_${member.photo.note.points}`}>
              {member.instrument}
              <svg className="member-profile__note-line" viewBox="0 0 70 50" focusable="false">
                <path d="M64 4C46 6 22 14 10 40" />
                <path d="M4 31l6 10 9-6" />
              </svg>
            </p>
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
