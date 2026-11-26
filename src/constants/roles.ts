/**
 * Visual identity of each user role.
 * Seeker = peach, employer = blue, parent = green.
 */

import type { UserRole } from "@/types/Landing/landing";

export interface RoleStyle {
  name: string;
  /** Small colored dot. */
  dot: string;
  /** Soft tinted background. */
  soft: string;
  /** Chip: soft background + readable text. */
  chip: string;
  /** Solid fill with readable text (no hover). */
  solid: string;
  /** Hover variant for the solid fill. */
  solidHover: string;
  /** Text color for headings/labels of the role. */
  text: string;
  /** Progress bar fill. */
  bar: string;
}

export const ROLE_ORDER: UserRole[] = ["seeker", "employer", "parent"];

export const ROLE_STYLES: Record<UserRole, RoleStyle> = {
  seeker: {
    name: "کارجو",
    dot: "bg-brand-peach",
    soft: "bg-peach-7",
    chip: "bg-peach-7 text-peach-3",
    solid: "bg-brand-peach text-charcoal",
    solidHover: "hover:bg-peach-5",
    text: "text-peach-3",
    bar: "bg-brand-peach",
  },
  employer: {
    name: "کارفرما",
    dot: "bg-blue",
    soft: "bg-ocean-8",
    chip: "bg-ocean-8 text-blue",
    solid: "bg-blue text-white",
    solidHover: "hover:bg-action-hover",
    text: "text-blue",
    bar: "bg-blue",
  },
  parent: {
    name: "والد",
    dot: "bg-green-3",
    soft: "bg-green-7",
    chip: "bg-green-7 text-green-2",
    solid: "bg-green-3 text-white",
    solidHover: "hover:bg-green-2",
    text: "text-green-2",
    bar: "bg-green-3",
  },
};
