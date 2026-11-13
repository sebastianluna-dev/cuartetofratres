import { useCallback, useEffect, useRef, useState, type FocusEvent, type PointerEvent, type RefObject } from "react";
import { useMediaQuery } from "@/hooks/use-media-query.hook";
import { CARD_CLOSE_DELAY_MS, CARD_TOUCH_IDLE_MS, isCardOpen, recordTapAction } from "@/lib/mini-player-card";

/** A screen that cannot hover: the card opens with a tap instead. */
const TOUCH_QUERY = "(hover: none)";

interface MiniPlayerCard {
  /** Whether the card shows. */
  open: boolean;
  /** Whether the record opens the card instead of playing (first tap on a touch screen). */
  recordOpens: boolean;
  /** Whether this is a touch screen, where the record discloses the card. */
  touch: boolean;
  /** Handlers for the mini player's root. */
  rootHandlers: {
    onPointerEnter: (event: PointerEvent) => void;
    onPointerLeave: (event: PointerEvent) => void;
    onPointerDown: () => void;
    onFocus: (event: FocusEvent) => void;
    onBlur: () => void;
  };
  /** Click on the record: opens the card or plays/pauses (lib/mini-player-card.ts). */
  onRecordClick: () => void;
}

/**
 * When the mini player's card shows. It opens while the pointer is over the
 * record or the card and while the keyboard focus is inside, and hides a
 * moment after both have left, so crossing the gap does not make it flicker.
 * A mouse click does not count as keyboard focus: after one, the card still
 * hides when the pointer leaves. On a touch screen the first tap on the record
 * opens it, a tap elsewhere closes it and, while the work plays, it closes on
 * its own after a few seconds untouched. A paused player keeps it open.
 */
export function useMiniPlayerCard(
  rootRef: RefObject<HTMLElement | null>,
  playing: boolean,
  onTogglePlay: () => void,
): MiniPlayerCard {
  const touch = useMediaQuery(TOUCH_QUERY);
  const [requested, setRequested] = useState(false);
  const open = isCardOpen(requested, playing);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const playingRef = useRef(playing);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  const clearClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  const show = () => {
    clearClose();
    setRequested(true);
  };

  // On a touch screen focus moves with every tap, so only a tap outside or the idle timer close it.
  const hideSoon = () => {
    clearClose();
    if (touch) return;
    closeTimer.current = setTimeout(() => {
      const root = rootRef.current;
      if (root?.matches(":hover")) return;
      if (root?.querySelector(":focus-visible")) return;
      setRequested(false);
    }, CARD_CLOSE_DELAY_MS);
  };

  const armIdle = useCallback(() => {
    if (!touch) return;
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      if (playingRef.current) setRequested(false);
    }, CARD_TOUCH_IDLE_MS);
  }, [touch]);

  // A tap outside the player closes the card.
  useEffect(() => {
    if (!touch || !requested) return;
    const onDown = (event: globalThis.PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setRequested(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [touch, requested, rootRef]);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    },
    [],
  );

  return {
    open,
    touch,
    recordOpens: recordTapAction(touch, open) === "open",
    rootHandlers: {
      onPointerEnter: (event) => {
        if (event.pointerType !== "touch") show();
      },
      onPointerLeave: (event) => {
        if (event.pointerType !== "touch") hideSoon();
      },
      onPointerDown: armIdle,
      onFocus: (event) => {
        if (event.target instanceof Element && event.target.matches(":focus-visible")) show();
      },
      onBlur: hideSoon,
    },
    onRecordClick: () => {
      if (recordTapAction(touch, open) === "open") {
        show();
        armIdle();
        return;
      }
      // On a touch screen the card stays through the tap that plays, then the idle timer closes it.
      if (touch) {
        setRequested(true);
        armIdle();
      }
      onTogglePlay();
    },
  };
}
