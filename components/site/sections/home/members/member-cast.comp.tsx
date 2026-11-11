"use client";

import { useState } from "react";
import { MEMBERS_COPY } from "@/constants/members.const";
import type { MemberContent } from "@/services/members/members.types";
import { MemberBio } from "./member-bio.comp";
import { MemberPortrait } from "./member-portrait.comp";
import "./member-cast.comp.css";

interface MemberCastProps {
  members: readonly MemberContent[];
}

// The musicians in a row and, under them, the profile of the one chosen. One
// is always lit (the first by default) and the rest stay in half-light.
// Click only: a hover would light portraits the pointer merely crosses.
export function MemberCast({ members }: MemberCastProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = members[selectedIndex] ?? members[0];
  if (!selected) return null;

  return (
    <div className="member-cast">
      <div className="member-cast__row" role="group" aria-label={MEMBERS_COPY.group}>
        {members.map((member, index) => (
          <MemberPortrait
            key={member.id}
            member={member}
            active={member.id === selected.id}
            onSelect={() => setSelectedIndex(index)}
          />
        ))}
      </div>
      {/* The key remounts the profile, which replays its entrance. */}
      <MemberBio key={selected.id} member={selected} />
    </div>
  );
}
