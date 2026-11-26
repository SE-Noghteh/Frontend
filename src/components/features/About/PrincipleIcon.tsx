import type { AboutPrincipleIcon } from "@/types/About/about";

interface PrincipleIconProps {
  name: AboutPrincipleIcon;
  className?: string;
}

const ICON_PATHS: Record<AboutPrincipleIcon, string> = {
  shield: "M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3zm-3 9l2 2 4-4",
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zm10 3a3 3 0 100-6 3 3 0 000 6z",
  scale: "M12 4v16M6 20h12M5 8h14M5 8l-3 7a3 3 0 006 0L5 8zm14 0l-3 7a3 3 0 006 0l-3-7z",
  lock: "M6 11h12v9H6v-9zm3 0V8a3 3 0 016 0v3",
};

export function PrincipleIcon({ name, className = "size-7" }: PrincipleIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}
