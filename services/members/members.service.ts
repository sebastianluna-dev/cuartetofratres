import { MEMBERS } from "@/constants/members.const";
import { getCatalog } from "@/services/shared/read-cms";
import { mapDefaultMember, mapMember } from "./members.mapper";
import type { MemberContent } from "./members.types";

/** The musicians in seating order; the launch four while the collection is empty. */
export async function getMembers(): Promise<MemberContent[]> {
  const { members } = await getCatalog();
  const mapped = members.map(mapMember).filter((member): member is MemberContent => member !== null);
  return mapped.length > 0 ? mapped : MEMBERS.map(mapDefaultMember);
}

export interface MemberPage {
  member: MemberContent;
  /** The rest of the quartet, in seating order. */
  others: MemberContent[];
}

/** The musician whose page is `slug`, with the others; `null` when nobody has that page. */
export async function getMemberPage(slug: string): Promise<MemberPage | null> {
  const members = await getMembers();
  const member = members.find((candidate) => candidate.slug === slug);
  if (!member) return null;
  return { member, others: members.filter((other) => other.id !== member.id) };
}
