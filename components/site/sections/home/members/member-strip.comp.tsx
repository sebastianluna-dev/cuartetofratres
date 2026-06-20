import Image from "next/image";
import type { MemberContent } from "@/services/members/members.types";
import "./member-strip.comp.css";

interface MemberStripProps {
  member: MemberContent;
  active: boolean;
  onSelect: () => void;
}

// One tall strip of the gallery: the portrait as ground, the short name
// written upwards along the left edge and a lime rule at the foot when it is
// the one open. The button carries the full name, so the portrait itself is
// decorative.
export function MemberStrip({ member, active, onSelect }: MemberStripProps) {
  return (
    <button
      type="button"
      className={`member-strip${active ? " member-strip_active" : ""}`}
      aria-pressed={active}
      aria-label={member.name}
      onClick={onSelect}
    >
      <Image
        src={member.photo.src}
        alt=""
        fill
        sizes="(max-width: 767px) 45vw, 400px"
        className="member-strip__photo"
        style={{ objectPosition: member.photoPosition }}
      />
      <span className="member-strip__name" aria-hidden="true">
        {member.shortName}
      </span>
      <span className="member-strip__edge" aria-hidden="true" />
    </button>
  );
}
