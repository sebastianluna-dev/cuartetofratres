import { LOGO_MARK_PATHS, LOGO_MARK_VIEW_BOX } from "@/components/site/shared/logo-mark.const";
import { Reveal } from "@/components/site/shared/reveal.comp";
import { CONTACT_COPY } from "@/constants/contact.const";
import { buildMailtoUrl } from "@/lib/build-mailto-url";
import { formatWhatsapp } from "@/lib/format-whatsapp";
import { getContactSectionData } from "@/services/contact/contact-section.service";
import { getSiteSettingsData } from "@/services/site-settings/site-settings.service";
import { ContactForm } from "./contact-form.comp";
import "./contact.section.css";

const TITLE_ID = "contacto-titulo";

// Two columns: on the left what to tell the quartet and the other ways to
// reach it; on the right the form alone, as a letter to the quartet (a sheet
// of paper with ruled lines to write on and the monogram as its seal).
export async function ContactSection() {
  const [content, settings] = await Promise.all([getContactSectionData(), getSiteSettingsData()]);

  return (
    <section id="contacto" className="section section_theme_cream contact" aria-labelledby={TITLE_ID}>
      <div className="section__inner">
        <Reveal>
          <h2 id={TITLE_ID} className="section-title">
            {content.title}
          </h2>
        </Reveal>

        <div className="contact__layout">
          <Reveal className="contact__aside">
            <p className="contact__lead">{content.lead}</p>
            <dl className="contact__details">
              <div className="contact__detail">
                <dt className="contact__detail-name">{CONTACT_COPY.email}</dt>
                <dd className="contact__detail-value">
                  <a href={buildMailtoUrl(settings.email)} className="contact__link">
                    {settings.email}
                  </a>
                </dd>
              </div>
              <div className="contact__detail">
                <dt className="contact__detail-name">{CONTACT_COPY.whatsapp}</dt>
                <dd className="contact__detail-value">
                  {settings.whatsapp ? (
                    <a
                      href={`https://wa.me/${settings.whatsapp}`}
                      className="contact__link"
                      target="_blank"
                      rel="noopener"
                    >
                      {formatWhatsapp(settings.whatsapp)}
                    </a>
                  ) : (
                    CONTACT_COPY.whatsappPending
                  )}
                </dd>
              </div>
              <div className="contact__detail">
                <dt className="contact__detail-name">{CONTACT_COPY.social}</dt>
                <dd className="contact__detail-value contact__detail-value_kind_list">
                  {/* A network with no public account yet is named without a link. */}
                  {settings.social.map((network) =>
                    network.href ? (
                      <a
                        key={network.label}
                        href={network.href}
                        className="contact__link"
                        target="_blank"
                        rel="noopener"
                      >
                        {network.label}
                      </a>
                    ) : (
                      <span key={network.label}>{network.label}</span>
                    ),
                  )}
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal className="contact__desk">
            {/* A second sheet under the letter, slightly turned. */}
            <div className="contact__under" aria-hidden="true" />
            <div className="contact__sheet">
              <span className="contact__seal" aria-hidden="true">
                <svg className="contact__seal-mark" viewBox={LOGO_MARK_VIEW_BOX} focusable="false">
                  {LOGO_MARK_PATHS.map((d) => (
                    <path key={d} d={d} />
                  ))}
                </svg>
              </span>
              <ContactForm sentTitle={content.sentTitle} sentText={content.sentText} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
