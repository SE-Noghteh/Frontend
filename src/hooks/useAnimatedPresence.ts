/**
 * Keeps an element mounted long enough to play its exit animation.
 *
 * mounted : render the element
 * shown   : apply the "visible" classes (flips one frame after mount so the enter transition runs)
 */

import { useEffect, useState } from "react";

export function useAnimatedPresence(open: boolean, durationMs = 300) {
  const [mounted, setMounted] = useState(open);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let timer: number | undefined;
    let frame: number | undefined;

    if (open) {
      setMounted(true);
      // two frames: make sure the closed styles are painted before switching to open
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => setShown(true));
      });
    } else {
      setShown(false);
      timer = window.setTimeout(() => setMounted(false), durationMs);
    }

    return () => {
      if (frame !== undefined) cancelAnimationFrame(frame);
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [open, durationMs]);

  return { mounted, shown };
}
