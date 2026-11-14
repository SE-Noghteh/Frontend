import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

import { EASE_OUT } from "@/constants/motion";

interface AnimatedProgressBarProps {
  /** 0 - 1 */
  ratio: number;
  /** Tailwind class for the fill color. */
  fillClassName: string;
  /** Seconds. */
  delay?: number;
  /** Tailwind class for the track color. */
  trackClassName?: string;
}

/** Progress bar that fills up when it scrolls into view. */
export function AnimatedProgressBar({
  ratio,
  fillClassName,
  delay = 0,
  trackClassName = "bg-white/15",
}: AnimatedProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const progress = useMotionValue(0);
  const width = useTransform(progress, (value) => `${value * 100}%`);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(progress, ratio, {
      duration: 1.6,
      delay,
      ease: EASE_OUT,
    });
    return () => controls.stop();
  }, [isInView, ratio, delay, progress]);

  return (
    <div
      ref={ref}
      className={`h-1.5 w-full overflow-hidden rounded-full ${trackClassName}`}
    >
      <motion.div
        style={{ width }}
        className={`h-full rounded-full ${fillClassName}`}
      />
    </div>
  );
}
