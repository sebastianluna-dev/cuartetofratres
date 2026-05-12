import Link from "next/link";
import { Reveal } from "@/components/site/shared/reveal.comp";
import { SectionEyebrow } from "@/components/site/shared/section-eyebrow.comp";
import { CONTACT_EMAIL, SITE_LOCATION_FULL } from "@/constants/site.const";
import { buildMailtoUrl } from "@/lib/build-mailto-url";
import { ContactForm } from "./contact-form.comp";
import "./contact.section.css";

const MAIL_SUBJECT = "Solicitud de presentación";

export function ContactSection() {
  return (
    <section id="contacto" className="section section_theme_ivory contact">
      <div className="section__inner section__inner_width_narrow contact__inner">
        <div className="contact__grid">
          <Reveal className="contact__intro">
            <div className="contact__eyebrow">
              <SectionEyebrow label="Contacto" />
            </div>
            <h2 className="contact__title">Cuéntanos qué ocasión quieres acompañar con música.</h2>
            <p className="contact__lead">
              Conciertos y actividades culturales, bodas y ceremonias, eventos privados. Escríbenos con la fecha, el
              lugar y la duración prevista y te enviamos propuesta de programa.
            </p>
            <div className="contact__direct">
              <span className="contact__direct-label">O directo al correo</span>
              <Link href={buildMailtoUrl(CONTACT_EMAIL, MAIL_SUBJECT)} className="contact__email">
                {CONTACT_EMAIL}
              </Link>
              <span className="contact__direct-line">{SITE_LOCATION_FULL}</span>
              <span className="contact__direct-line">WhatsApp y redes por confirmar</span>
            </div>
          </Reveal>

          <Reveal className="contact__form">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
