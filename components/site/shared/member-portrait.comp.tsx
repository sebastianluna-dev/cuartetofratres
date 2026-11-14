import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/site/shared/arrow-icon.comp";
import { MEMBER_PAGE_COPY, memberPath } from "@/constants/members.const";
import { photoFadeStyle } from "@/lib/photo-fades";
import type { MemberContent } from "@/services/members/members.types";
import "./member-portrait.comp.css";

interface MemberPortraitProps {
  member: MemberContent;
  /** Width the portrait takes in its row, for `next/image`. */
  sizes: string;
}

// One musician: the cut-out portrait and, under it, the short name and the
// instrument. The whole block links to their page. Used by the home page's
// row and by the «others» row of every musician's page.
export function MemberPortrait({ member, sizes }: MemberPortraitProps) {
  const { portrait } = member.photo;
  const bleed = portrait.bleedLeft ?? 0;

  return (
    <Link href={memberPath(member.slug)} className="member-portrait">
      <span className="member-portrait__glow" aria-hidden="true" />
      <span
        className={`member-portrait__frame${bleed ? " member-portrait__frame_bleed_left" : ""}`}
        style={
          {
            ...photoFadeStyle(member.photo.portrait.fades),
            "--portrait-zoom": String(portrait.zoom ?? 1),
            "--portrait-bleed": String(bleed),
          } as CSSProperties
        }
      >
        <Image
          src={member.photo.src}
          alt=""
          fill
          quality={100}
          sizes={sizes}
          className="member-portrait__photo"
          // With room on the left, the photo keeps the box it had: the right
          // part of the wider frame (next/image's own `fill` styles give way to these).
          style={{
            objectPosition: portrait.position,
            ...(bleed && { left: `${(bleed / (100 + bleed)) * 100}%`, width: `${(100 / (100 + bleed)) * 100}%` }),
          }}
        />
      </span>
      <span className="member-portrait__caption">
        <span className="member-portrait__name">
          {member.shortName}
          <ArrowIcon className="member-portrait__arrow" />
        </span>
        <span className="member-portrait__instrument">
          {member.instrument}
          <span className="visually-hidden">, {MEMBER_PAGE_COPY.linkHint}</span>
        </span>
      </span>
    </Link>
  );
}
