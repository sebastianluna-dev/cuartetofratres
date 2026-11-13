"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import { StaffLines } from "@/components/site/shared/staff-lines.comp";
import type { StageFigure } from "@/constants/hero-stage.const";
import { usePointerLean } from "@/hooks/use-pointer-lean.hook";
import "./hero-stage.comp.css";

interface HeroStageProps {
  figures: readonly StageFigure[];
  /** The music engraved on the staff lines, rendered on the server and passed in ready. */
  music?: ReactNode;
}

// The musicians on the stage: a glow, the staff lines with their music and the four cut-outs,
// each rising into place on load. A Client Component only for the parallax:
// with a mouse, the figures lean a little towards the pointer, the ones in
// front more (usePointerLean).
export function HeroStage({ figures, music }: HeroStageProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  usePointerLean(ref, ".hero");

  return (
    <div ref={ref} className="hero-stage" aria-hidden="true">
      <div className="hero-stage__glow" />
      <StaffLines kind="hero" className="hero-stage__staff" />
      {music}
      {figures.map((figure, index) => (
        <div
          key={figure.id}
          className="hero-stage__figure"
          style={
            {
              "--x": `${figure.x}%`,
              "--top": `${figure.top}%`,
              "--height": `${figure.height}%`,
              "--layer": figure.layer,
              "--depth": figure.depth,
              "--order": index,
              "--fade-left": `${figure.fade?.left ?? 0}%`,
              "--fade-right": `${figure.fade?.right ?? 0}%`,
              "--fade-bottom": `${figure.fade?.bottom ?? 34}%`,
            } as CSSProperties
          }
        >
          <Image
            src={figure.src}
            alt=""
            fill
            priority
            quality={100}
            sizes="(max-width: 760px) 90vw, 44vw"
            className="hero-stage__image"
          />
        </div>
      ))}
      <div className="hero-stage__floor" />
    </div>
  );
}
