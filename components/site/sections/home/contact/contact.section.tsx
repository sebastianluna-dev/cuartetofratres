import { Reveal } from "@/components/site/shared/reveal.comp";
import { StaffOrnament } from "@/components/site/shared/staff-ornament.comp";
import { getContactSectionData } from "@/services/contact/contact-section.service";
import { ContactForm } from "./contact-form.comp";
import "./contact.section.css";

export async function ContactSection() {
  const content = await getContactSectionData();

  return (
    <section id="contacto" className="section section_theme_ivory contact">
      <div className="section__inner contact__inner">
        <div className="contact__grid">
          <Reveal className="contact__intro">
            <div className="contact__eyebrow">
              <StaffOrnament width={240} />
            </div>
            <h2 className="contact__title">{content.title}</h2>
            <p className="contact__lead">{content.lead}</p>
          </Reveal>

          <Reveal className="contact__form">
            <ContactForm sentTitle={content.sentTitle} sentText={content.sentText} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
