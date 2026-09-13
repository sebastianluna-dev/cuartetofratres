import { Reveal } from "@/components/site/shared/reveal.comp";
import { getMembers } from "@/services/members/members.service";
import { MemberGallery } from "./member-gallery.comp";
import "./members.section.css";

// No heading of its own: the gallery is the section.
export async function MembersSection() {
  const members = await getMembers();

  return (
    <section id="integrantes" className="section section_theme_ink ink-grain members">
      <div className="section__inner members__inner">
        <Reveal>
          <MemberGallery members={members} />
        </Reveal>
      </div>
    </section>
  );
}
