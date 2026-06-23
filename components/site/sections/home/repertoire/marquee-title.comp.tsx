"use client";

import type { ElementType } from "react";
import { useMarquee } from "@/hooks/use-marquee.hook";
import "./marquee-title.comp.css";

interface MarqueeTitleProps {
  text: string;
  /** The heading level of the card (`h3`) or a plain span in the mini player. */
  as?: ElementType;
  className?: string;
}

// A one-line title that scrolls sideways when it does not fit. The text is
// rendered twice so the loop has no gap; the second copy is decoration and
// only shows while scrolling (hooks/use-marquee.hook.ts).
export function MarqueeTitle({ text, as: Tag = "h3", className }: MarqueeTitleProps) {
  const ref = useMarquee<HTMLElement>(text);

  return (
    <div className="marquee-box">
      <Tag ref={ref} className={["marquee", className].filter(Boolean).join(" ")}>
        <span className="marquee__copy">{text}</span>
        <span className="marquee__copy marquee__copy_role_echo" aria-hidden="true">
          {text}
        </span>
      </Tag>
    </div>
  );
}
