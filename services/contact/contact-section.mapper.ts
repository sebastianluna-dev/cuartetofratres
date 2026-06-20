import type { ContactSection } from "@/payload-types";
import { CONTACT_SECTION_DEFAULTS } from "@/constants/contact.const";
import type { ContactSectionContent } from "./contact-section.types";

export function mapContactSection(section: ContactSection): ContactSectionContent {
  const defaults = CONTACT_SECTION_DEFAULTS;
  return {
    title: section.title || defaults.title,
    lead: section.lead || defaults.lead,
    sentTitle: section.sentTitle || defaults.sentTitle,
    sentText: section.sentText || defaults.sentText,
  };
}
