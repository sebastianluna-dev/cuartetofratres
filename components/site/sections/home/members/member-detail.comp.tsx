import type { MemberContent } from "@/services/members/members.types";
import "./member-detail.comp.css";

interface MemberDetailProps {
  member: MemberContent;
}

// The card of the musician whose strip is open: instrument, full name,
// origin and the biography. Remounted on each choice (keyed by the
// parent) so the fade-in plays again.
export function MemberDetail({ member }: MemberDetailProps) {
  return (
    <article className="member-detail" aria-live="polite">
      <span className="member-detail__role">{member.instrument}</span>
      <h3 className="member-detail__name">{member.name}</h3>
      {member.origin && <span className="member-detail__origin">{member.origin}</span>}
      <p className="member-detail__bio">{member.bio}</p>
    </article>
  );
}
