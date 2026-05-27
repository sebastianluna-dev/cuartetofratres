import { MEMBERS } from "@/constants/members.const";
import { getCatalog, getGlobals } from "@/services/shared/read-cms";
import { mapDefaultMember, mapMember, mapMembersSection } from "./members.mapper";
import type { MemberContent, MembersSectionContent } from "./members.types";

export async function getMembersData(): Promise<MembersSectionContent> {
  const [{ membersSection }, { members }] = await Promise.all([getGlobals(), getCatalog()]);
  const mapped = members.map(mapMember).filter((member): member is MemberContent => member !== null);
  return mapMembersSection(membersSection, mapped.length > 0 ? mapped : MEMBERS.map(mapDefaultMember));
}
