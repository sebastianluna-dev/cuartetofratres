import Image from "next/image";
import type { MemberContent } from "@/services/members/members.types";
import "./member-portrait.comp.css";

interface MemberPortraitProps {
  member: MemberContent;
  active: boolean;
  onSelect: () => void;
}

// One musician of the row: the cut-out portrait and, under it, the short name
// and the instrument. The whole block is the button that chooses them.
export function MemberPortrait({ member, active, onSelect }: MemberPortraitProps) {
  return (
    <button
      type="button"
      className={`member-portrait${active ? " member-portrait_active" : ""}`}
      aria-pressed={active}
      aria-label={`${member.name}, ${member.instrument}`}
      onClick={onSelect}
    >
      <span className="member-portrait__glow" />
      <span className="member-portrait__frame">
        {/* Four to a row on desktop, two on the phone. */}
        <Image
          src={member.photo.src}
          alt=""
          fill
          sizes="(max-width: 900px) 50vw, 25vw"
          className="member-portrait__photo"
          style={{ objectPosition: member.photoPosition }}
        />
      </span>
      <span className="member-portrait__caption" aria-hidden="true">
        <span className="member-portrait__name">{member.shortName}</span>
        <span className="member-portrait__instrument">{member.instrument}</span>
      </span>
    </button>
  );
}
