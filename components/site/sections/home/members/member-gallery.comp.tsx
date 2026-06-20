"use client";

import { useState } from "react";
import type { MemberContent } from "@/services/members/members.types";
import { MemberDetail } from "./member-detail.comp";
import { MemberStrip } from "./member-strip.comp";
import "./member-gallery.comp.css";

interface MemberGalleryProps {
  members: readonly MemberContent[];
}

// Four portrait strips and, beside them, the card of the musician chosen.
// One is always open (the first by default); choosing another widens its
// strip and swaps the card. Click only: a hover would open strips while the
// pointer merely crosses them.
export function MemberGallery({ members }: MemberGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = members[selectedIndex] ?? members[0];
  if (!selected) return null;

  return (
    <div className="member-gallery">
      <div className="member-gallery__strips">
        {members.map((member, index) => (
          <MemberStrip
            key={member.id}
            member={member}
            active={member.id === selected.id}
            onSelect={() => setSelectedIndex(index)}
          />
        ))}
      </div>
      <MemberDetail key={selected.id} member={selected} />
    </div>
  );
}
