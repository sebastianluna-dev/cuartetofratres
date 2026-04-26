"use client";

import type { ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal.hook";

interface RevealProps {
  children: ReactNode;
  className?: string;
}

// Wraps a block so it fades in the first time it scrolls into view. Only the
// wrapper is a Client Component; what it wraps stays a Server Component.
export function Reveal({ children, className }: RevealProps) {
  const { ref, seen } = useReveal<HTMLDivElement>();
  const classes = ["reveal", seen ? "reveal_seen" : "", className ?? ""].filter(Boolean).join(" ");

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
}
