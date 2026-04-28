"use client";

import { useState } from "react";
import type { Member } from "@/constants/members.const";
import { MemberRow } from "./member-row.comp";
import "./member-list.comp.css";

interface MemberListProps {
  members: readonly Member[];
}

// Accordion of the four musicians. More than one can stay open: each row
// holds its own flag here, and hovering expands a row without changing it.
export function MemberList({ members }: MemberListProps) {
  const [openIds, setOpenIds] = useState<readonly string[]>([]);

  const toggle = (id: string) =>
    setOpenIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));

  return (
    <ol className="member-list">
      {members.map((member, index) => (
        <MemberRow
          key={member.id}
          member={member}
          index={index}
          open={openIds.includes(member.id)}
          onToggle={() => toggle(member.id)}
        />
      ))}
    </ol>
  );
}
