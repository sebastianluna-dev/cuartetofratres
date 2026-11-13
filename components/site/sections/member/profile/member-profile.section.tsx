import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/site/shared/arrow-icon.comp";
import { StaffMusic } from "@/components/site/shared/staff-music.comp";
import { MEMBER_MUSIC_STAGES, MEMBER_PAGE_COPY, MEMBER_STAGE_FIGURE } from "@/constants/members.const";
import { CONTACT_ANCHOR } from "@/constants/navigation.const";
import { StaffLines } from "@/components/site/shared/staff-lines.comp";
import { splitParagraphs } from "@/lib/text-blocks";
import type { MemberContent } from "@/services/members/members.types";
import "./member-profile.section.css";

interface MemberProfileSectionProps {
  member: MemberContent;
}

// First screen of a musician's page: the instrument, the name and the
// biography on the left, centred against the portrait standing on the right
// over the staff lines, and two ways on (listen, hire) at the foot of the
// text. On the phone the portrait goes between the name and the text.
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
          <StaffMusic
            stages={MEMBER_MUSIC_STAGES}
            figures={MEMBER_STAGE_FIGURE}
            id="member-music"
            className="member-profile__music"
          />
          <div className="member-profile__frame">
            {/* Five twelfths of the page on desktop, most of the screen on the phone. */}
            <Image
              src={member.photo.src}
              alt=""
              fill
              priority
              quality={100}
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
          <div className="member-profile__actions">
            <Link href="/#repertorio" className="pill-button pill-button_size_small">
              {MEMBER_PAGE_COPY.listen}
              <ArrowIcon className="pill-button__icon" />
            </Link>
            <Link href={`/${CONTACT_ANCHOR}`} className="member-profile__link">
              {MEMBER_PAGE_COPY.hire}
              <ArrowIcon className="member-profile__link-icon" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
