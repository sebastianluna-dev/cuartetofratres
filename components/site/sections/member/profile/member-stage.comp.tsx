"use client";

import { useRef, type ReactNode } from "react";
import { usePointerLean } from "@/hooks/use-pointer-lean.hook";

// The portrait's stage, a Client Component only for the parallax: with a
// mouse it carries `--lean-x`/`--lean-y`, and member-profile.section.css moves
// the photo with the pointer and the staff a little the other way.
export function MemberStage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  usePointerLean(ref, ".member-profile");

  return (
    <div ref={ref} className="member-profile__stage" aria-hidden="true">
      {children}
    </div>
  );
}
