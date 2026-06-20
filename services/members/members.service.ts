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
