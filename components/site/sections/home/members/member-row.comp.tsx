import Image from "next/image";
import type { Member } from "@/constants/members.const";
import "./member-row.comp.css";

interface MemberRowProps {
  member: Member;
  index: number;
  open: boolean;
  onToggle: () => void;
}

// One musician: a numbered name bar that is also the toggle, and under it the
// portrait with the biography. The collapsed height is the bar's own; the
// open one is a generous max-height so the transition has an end value.
//
// On the phone there is no accordion: the bar is hidden and the caption over
// the portrait (hidden on desktop) carries the same number, name and instrument.
export function MemberRow({ member, index, open, onToggle }: MemberRowProps) {
  const panelId = `integrante-${member.id}`;
  const number = `0${index + 1}`;

  return (
    <li className={`member-row${open ? " member-row_open" : ""}`}>
      <button type="button" className="member-row__bar" aria-expanded={open} aria-controls={panelId} onClick={onToggle}>
        <span className="member-row__index">{number}</span>
        <span className="member-row__name">{member.name}</span>
        <span className="member-row__instrument">{member.instrument}</span>
      </button>

      <div id={panelId} className="member-row__panel">
        <div className="member-row__portrait">
          <Image
            src={member.photo.src}
            alt={member.name}
            fill
            sizes="(max-width: 767px) 100vw, 264px"
            className="member-row__photo"
            style={{ objectPosition: member.photo.position }}
          />
          <div className="member-row__caption" aria-hidden="true">
            <span className="member-row__caption-meta">
              <span className="member-row__caption-index">{number}</span>
              <span className="member-row__caption-instrument">{member.instrument}</span>
            </span>
            <span className="member-row__caption-name">{member.name}</span>
            <span className="member-row__caption-short">{member.short}</span>
          </div>
        </div>
        <p className="member-row__bio">{member.bio}</p>
      </div>
    </li>
  );
}
