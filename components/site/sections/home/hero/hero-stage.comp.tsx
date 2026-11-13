"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import { StaffLines } from "@/components/site/shared/staff-lines.comp";
import type { StageFigure } from "@/constants/hero-stage.const";
import "./hero-stage.comp.css";

interface HeroStageProps {
  figures: readonly StageFigure[];
  /** The music engraved on the staff lines, rendered on the server and passed in ready. */
  music?: ReactNode;
}

/** How far the stage leans towards the pointer, in px, across and down. */
const LEAN_X = 22;
const LEAN_Y = 14;
/** Share of the remaining distance covered per frame. */
const EASING = 0.08;

// The musicians on the stage: a glow, the staff lines with their music and the four cut-outs,
// each rising into place on load. A Client Component only for the parallax:
// with a mouse, the figures lean a little towards the pointer, the ones in
// front more. The offsets go to the node as custom properties, not to state.
export function HeroStage({ figures, music }: HeroStageProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const stage = ref.current;
    const hero = stage?.closest<HTMLElement>(".hero");
    if (!stage || !hero) return;
    if (!window.matchMedia("(hover: hover) and (min-width: 901px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let frame = 0;

    const step = () => {
      x += (targetX - x) * EASING;
      y += (targetY - y) * EASING;
      stage.style.setProperty("--lean-x", `${x.toFixed(2)}px`);
      stage.style.setProperty("--lean-y", `${y.toFixed(2)}px`);
      frame = Math.abs(targetX - x) > 0.05 || Math.abs(targetY - y) > 0.05 ? requestAnimationFrame(step) : 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      const box = hero.getBoundingClientRect();
      targetX = ((event.clientX - box.left) / box.width - 0.5) * -LEAN_X;
      targetY = ((event.clientY - box.top) / box.height - 0.5) * -LEAN_Y;
      if (!frame) frame = requestAnimationFrame(step);
    };

    hero.addEventListener("pointermove", onPointerMove);
    return () => {
      hero.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(frame);
    };
  }, []);

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
