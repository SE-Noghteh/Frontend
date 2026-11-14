import { motion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";

import { EASE_OUT } from "@/constants/motion";

interface HeroFloatingBadgeProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  /** Positioning classes (absolute offsets). */
  className: string;
  /** Pixels the badge drifts while scrolling the first 600px (negative = up). */
  parallaxDepth: number;
  /** Entrance delay in seconds. */
  delay: number;
}

/** Small info card floating around the hero illustration with a light parallax. */
export function HeroFloatingBadge({
  icon,
  title,
  subtitle,
  className,
  parallaxDepth,
  delay,
}: HeroFloatingBadgeProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, parallaxDepth]);

  return (
    <motion.div style={{ y }} className={`absolute ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay, ease: EASE_OUT }}
        className="flex items-center gap-2.5 rounded-2xl border border-white bg-surface-card py-2.5 pe-4 ps-2.5 shadow-[0_16px_36px_-16px_rgba(29,53,87,.4)]"
      >
        <span className="grid size-9 place-items-center rounded-xl bg-surface-info text-blue">
          {icon}
        </span>
        <div>
          <div className="text-caption font-bold text-text-primary">{title}</div>
          <div className="text-caption text-charcoal-2">{subtitle}</div>
        </div>
      </motion.div>
    </motion.div>
  );
}
