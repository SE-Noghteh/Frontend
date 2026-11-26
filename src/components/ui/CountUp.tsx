import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

import { EASE_OUT } from "@/constants/motion";
import { toPersianDigits } from "@/utils/toPersianDigits";

interface CountUpProps {
  to: number;
  suffix?: string;
}

/** Counts from 0 to `to` (Persian digits) once it scrolls into view. */
export function CountUp({ to, suffix = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const value = useMotionValue(0);
  const text = useTransform(
    value,
    (current) => toPersianDigits(Math.round(current).toLocaleString("en")) + suffix,
  );

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(value, to, { duration: 1.6, ease: EASE_OUT });
    return () => controls.stop();
  }, [isInView, to, value]);

  return <motion.span ref={ref}>{text}</motion.span>;
}
