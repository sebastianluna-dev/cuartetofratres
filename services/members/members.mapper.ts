import type { Member } from "@/payload-types";
import { INSTRUMENT_LABELS, type Member as MemberDefault } from "@/constants/members.const";
import { shortenName } from "@/lib/shorten-name";
import { slugify } from "@/lib/slugify";
import { MEMBER_PHOTOS } from "@/constants/member-photos.const";
import type { MemberContent } from "./members.types";

function orNull(value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

// The CMS only edits the biography; the photo comes from code, by the slug of
// the page. A musician with no photo in code is left out.
export function mapMember(member: Member): MemberContent | null {
  const shortName = orNull(member.shortName) ?? shortenName(member.name);
  const slug = slugify(shortName);
  const photo = MEMBER_PHOTOS[slug];
  if (!photo) return null;
  return {
    id: String(member.id),
    slug,
    name: member.name,
    instrument: INSTRUMENT_LABELS[member.instrument],
    shortName,
    bio: member.bio,
    photo,
  };
}

export function mapDefaultMember(member: MemberDefault): MemberContent {
  const slug = slugify(member.shortName);
  return {
    id: member.id,
    slug,
    name: member.name,
    instrument: INSTRUMENT_LABELS[member.instrument],
    shortName: member.shortName,
    bio: member.bio,
    photo: MEMBER_PHOTOS[slug],
  };
}
