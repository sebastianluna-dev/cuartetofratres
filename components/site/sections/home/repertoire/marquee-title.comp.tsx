"use client";

import type { ElementType } from "react";
import { useMarquee } from "@/hooks/use-marquee.hook";
import "./marquee-title.comp.css";

interface MarqueeTitleProps {
  text: string;
  /** The element of the line: a paragraph by default. */
  as?: ElementType;
  className?: string;
  /** Class of the clipping box around it, for the parent to show or hide. */
  boxClassName?: string;
}

// A one-line title that scrolls sideways when it does not fit. The text is
// rendered twice so the loop has no gap; the second copy is decoration and
// only shows while scrolling (hooks/use-marquee.hook.ts).
export function MarqueeTitle({ text, as: Tag = "p", className, boxClassName }: MarqueeTitleProps) {
  const ref = useMarquee<HTMLElement>(text);

  return (
    <div className={["marquee-box", boxClassName].filter(Boolean).join(" ")}>
      <Tag ref={ref} className={["marquee", className].filter(Boolean).join(" ")}>
        <span className="marquee__copy">{text}</span>
        <span className="marquee__copy marquee__copy_role_echo" aria-hidden="true">
          {text}
        </span>
      </Tag>
    </div>
  );
}
