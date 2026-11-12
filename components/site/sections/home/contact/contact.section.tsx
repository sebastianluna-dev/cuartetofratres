import { LOGO_MARK_PATHS, LOGO_MARK_VIEW_BOX } from "@/components/site/shared/logo-mark.const";
import { Reveal } from "@/components/site/shared/reveal.comp";
import { CONTACT_COPY } from "@/constants/contact.const";
import { buildMailtoUrl } from "@/lib/build-mailto-url";
import { getContactSectionData } from "@/services/contact/contact-section.service";
import { getSiteSettingsData } from "@/services/site-settings/site-settings.service";
import { ContactForm } from "./contact-form.comp";
import "./contact.section.css";

const TITLE_ID = "contacto-titulo";

// The form as a letter to the quartet: a sheet of paper on the ivory ground,
// with ruled lines to write on, the monogram as its seal and the contact
// details at the foot of the page.
export async function ContactSection() {
  const [content, settings] = await Promise.all([getContactSectionData(), getSiteSettingsData()]);

  return (
    <section id="contacto" className="section section_theme_ivory contact" aria-labelledby={TITLE_ID}>
      <div className="section__inner">
        <Reveal>
          <p className="label label_ground_ivory contact__label">{CONTACT_COPY.label}</p>
          <h2 id={TITLE_ID} className="section-title">
            {content.title}
          </h2>
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
            <p className="contact__head">
              <span>{CONTACT_COPY.addressee}</span>
              <span>{settings.location}</span>
            </p>
            <p className="contact__lead">{content.lead}</p>

            <ContactForm sentTitle={content.sentTitle} sentText={content.sentText} />

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
                      +{settings.whatsapp}
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}
