import { getGlobals } from "@/services/shared/read-cms";
import { mapContactSection } from "./contact-section.mapper";
import type { ContactSectionContent } from "./contact-section.types";

export async function getContactSectionData(): Promise<ContactSectionContent> {
  const { contactSection } = await getGlobals();
  return mapContactSection(contactSection);
}
