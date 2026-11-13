"use client";

import { useEffect, type RefObject } from "react";

/** How far a stage leans towards the pointer, in px, across and down. */
const LEAN_X = 10;
const LEAN_Y = 6;
/** Share of the remaining distance covered per frame. */
const EASING = 0.08;

// With a mouse on a wide screen, writes how far the pointer sits from the
// centre of `scopeSelector` (the closest ancestor matching it) as `--lean-x`
// and `--lean-y` on the node, eased frame by frame. The CSS decides what
// moves and how much; nothing goes to React state. Off under reduced motion.
export function usePointerLean(ref: RefObject<HTMLElement | null>, scopeSelector: string) {
  useEffect(() => {
    const stage = ref.current;
    const scope = stage?.closest<HTMLElement>(scopeSelector);
    if (!stage || !scope) return;
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
      const box = scope.getBoundingClientRect();
      targetX = ((event.clientX - box.left) / box.width - 0.5) * -LEAN_X;
      targetY = ((event.clientY - box.top) / box.height - 0.5) * -LEAN_Y;
      if (!frame) frame = requestAnimationFrame(step);
    };

    scope.addEventListener("pointermove", onPointerMove);
    return () => {
      scope.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(frame);
    };
  }, [ref, scopeSelector]);
}
