import type { ContactSection } from "@/payload-types";
import { CONTACT_SECTION_DEFAULTS } from "@/constants/contact.const";
import type { ContactSectionContent } from "./contact-section.types";

export function mapContactSection(section: ContactSection): ContactSectionContent {
  const defaults = CONTACT_SECTION_DEFAULTS;
  return {
    eyebrow: section.eyebrow || defaults.eyebrow,
    title: section.title || defaults.title,
    lead: section.lead || defaults.lead,
    notice: section.notice || defaults.notice,
    sentTitle: section.sentTitle || defaults.sentTitle,
    sentText: section.sentText || defaults.sentText,
  };
}
