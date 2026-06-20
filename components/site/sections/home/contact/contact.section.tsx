import Link from "next/link";
import { Reveal } from "@/components/site/shared/reveal.comp";
import { SectionEyebrow } from "@/components/site/shared/section-eyebrow.comp";
import { buildMailtoUrl } from "@/lib/build-mailto-url";
import { getContactSectionData } from "@/services/contact/contact-section.service";
import { getSiteSettingsData } from "@/services/site-settings/site-settings.service";
import { ContactForm } from "./contact-form.comp";
import "./contact.section.css";

const MAIL_SUBJECT = "Solicitud de presentación";

export async function ContactSection() {
  const [content, settings] = await Promise.all([getContactSectionData(), getSiteSettingsData()]);

  return (
    <section id="contacto" className="section section_theme_ivory contact">
      <div className="section__inner contact__inner">
        <div className="contact__grid">
          <Reveal className="contact__intro">
            <div className="contact__eyebrow">
              <SectionEyebrow label={content.eyebrow} />
            </div>
            <h2 className="contact__title">{content.title}</h2>
            <p className="contact__lead">{content.lead}</p>
            <div className="contact__direct">
              <span className="contact__direct-label">O directo al correo</span>
              <Link href={buildMailtoUrl(settings.email, MAIL_SUBJECT)} className="contact__email">
                {settings.email}
              </Link>
              <span className="contact__direct-line">{settings.locationFull}</span>
              <span className="contact__direct-line">
                {settings.whatsapp ? `WhatsApp: +${settings.whatsapp}` : "WhatsApp y redes por confirmar"}
              </span>
            </div>
          </Reveal>

          <Reveal className="contact__form">
            <ContactForm notice={content.notice} sentTitle={content.sentTitle} sentText={content.sentText} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
