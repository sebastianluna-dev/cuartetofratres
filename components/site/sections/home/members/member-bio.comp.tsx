import type { MemberContent } from "@/services/members/members.types";
import "./member-bio.comp.css";

interface MemberBioProps {
  member: MemberContent;
}

// Profile of the musician chosen: instrument, name and biography.
// `aria-live` announces the change when another portrait is picked.
export function MemberBio({ member }: MemberBioProps) {
  return (
    <article className="member-bio" aria-live="polite">
      <div className="member-bio__head">
        <span className="member-bio__instrument">{member.instrument}</span>
        <h3 className="member-bio__name">{member.displayName}</h3>
      </div>
      <p className="member-bio__text">{member.bio}</p>
    </article>
  );
}
