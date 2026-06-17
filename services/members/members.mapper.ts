import type { Member, MembersSection } from "@/payload-types";
import { INSTRUMENT_LABELS, MEMBERS_SECTION_DEFAULTS, type Member as MemberDefault } from "@/constants/members.const";
import { shortenName } from "@/lib/shorten-name";
import { mapContentImage } from "@/services/shared/map-content-image";
import type { MemberContent, MembersSectionContent } from "./members.types";

function orNull(value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export function mapMember(member: Member): MemberContent | null {
  const photo = mapContentImage(member.photo);
  if (!photo) return null;
  return {
    id: String(member.id),
    name: member.name,
    instrument: INSTRUMENT_LABELS[member.instrument],
    shortName: orNull(member.shortName) ?? shortenName(member.name),
    origin: orNull(member.origin),
    bio: member.bio,
    photo,
    photoPosition: member.photoPosition || "50% 30%",
  };
}

export function mapDefaultMember(member: MemberDefault): MemberContent {
  return {
    id: member.id,
    name: member.name,
    instrument: INSTRUMENT_LABELS[member.instrument],
    shortName: member.shortName,
    origin: member.origin ?? null,
    bio: member.bio,
    photo: { src: member.photo.src, alt: member.photo.alt },
    photoPosition: member.photo.position,
  };
}

export function mapMembersSection(section: MembersSection, members: MemberContent[]): MembersSectionContent {
  return {
    eyebrow: section.eyebrow || MEMBERS_SECTION_DEFAULTS.eyebrow,
    title: section.title || MEMBERS_SECTION_DEFAULTS.title,
    hint: section.hint || MEMBERS_SECTION_DEFAULTS.hint,
    members,
  };
}
