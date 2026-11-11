"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { fitFontSize } from "@/lib/fit-font-size";
import "./fit-title.comp.css";

interface FitTitleProps {
  id?: string;
  children: ReactNode;
  /** Largest and smallest size in px the title may take. */
  max?: number;
  min?: number;
  className?: string;
}

/** Size at which the text is measured before scaling it. */
const PROBE_SIZE = 100;

// A one-line title that fills the width of its column. The size is written on
// the node, not kept in state: nothing else depends on it. Until the script
// runs, the stylesheet gives a size relative to the viewport.
export function FitTitle({ id, children, max = 300, min = 34, className }: FitTitleProps) {
  const ref = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const title = ref.current;
    const text = title?.firstElementChild;
    if (!title || !text) return;

    const fit = () => {
      title.style.fontSize = `${PROBE_SIZE}px`;
      const size = fitFontSize(text.getBoundingClientRect().width, title.clientWidth, PROBE_SIZE, { min, max });
      title.style.fontSize = `${size}px`;
    };

    fit();
    // The display face arrives after the first paint and is narrower than its fallback.
    void document.fonts?.ready.then(fit);
    const observer = new ResizeObserver(fit);
    observer.observe(title);
    return () => observer.disconnect();
  }, [min, max]);

  return (
    <h2 ref={ref} id={id} className={["fit-title", className ?? ""].filter(Boolean).join(" ")}>
      <span className="fit-title__text">{children}</span>
    </h2>
  );
}
