import { Reveal } from "@/components/site/shared/reveal.comp";
import { SectionEyebrow } from "@/components/site/shared/section-eyebrow.comp";
import { getMembersData } from "@/services/members/members.service";
import { MemberGallery } from "./member-gallery.comp";
import "./members.section.css";

export async function MembersSection() {
  const content = await getMembersData();

  return (
    <section id="integrantes" className="section section_theme_ink members">
      <div className="section__inner section__inner_width_narrow members__inner">
        <div className="members__head">
          <div className="members__eyebrow">
            <SectionEyebrow label={content.eyebrow} theme="ink" />
          </div>
          <h2 className="members__title">{content.title}</h2>
        </div>

        <Reveal>
          <MemberGallery members={content.members} />
        </Reveal>
      </div>
    </section>
  );
}
