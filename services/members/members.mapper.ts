import type { Member } from "@/payload-types";
import { INSTRUMENT_LABELS, type Member as MemberDefault } from "@/constants/members.const";
import { dropSecondSurname, shortenName } from "@/lib/shorten-name";
import { mapContentImage } from "@/services/shared/map-content-image";
import type { MemberContent } from "./members.types";

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
    displayName: dropSecondSurname(member.name),
    instrument: INSTRUMENT_LABELS[member.instrument],
    shortName: orNull(member.shortName) ?? shortenName(member.name),
    bio: member.bio,
    photo,
    photoPosition: member.photoPosition || "50% 30%",
  };
}

export function mapDefaultMember(member: MemberDefault): MemberContent {
  return {
    id: member.id,
    name: member.name,
    displayName: dropSecondSurname(member.name),
    instrument: INSTRUMENT_LABELS[member.instrument],
    shortName: member.shortName,
    bio: member.bio,
    photo: { src: member.photo.src, alt: member.photo.alt },
    photoPosition: member.photo.position,
  };
}
