import type { ReactNode } from "react";

/**
 * Flat, two-color illustrations for each opportunity category (viewBox 120x90).
 * Unknown category ids fall back to the "graphic" scene.
 */

const WHITE = "#fff";

interface CategoryPalette {
  /** Background tint. */
  tone: string;
  /** Accent color of the objects. */
  accent: string;
}

const CATEGORY_PALETTE: Record<string, CategoryPalette> = {
  graphic: { tone: "#eef3f8", accent: "#457b9d" },
  video: { tone: "#eef3f8", accent: "#1d3557" },
  code: { tone: "#dae5eb", accent: "#294a5e" },
  writing: { tone: "#eef3f8", accent: "#37627e" },
  audio: { tone: "#dae5eb", accent: "#457b9d" },
  tutoring: { tone: "#eef3f8", accent: "#294a5e" },
  data: { tone: "#dae5eb", accent: "#1d3557" },
  craft: { tone: "#eef3f8", accent: "#6a95b1" },
  kids: { tone: "#dae5eb", accent: "#37627e" },
  pets: { tone: "#eef3f8", accent: "#457b9d" },
  garden: { tone: "#dae5eb", accent: "#294a5e" },
  store: { tone: "#eef3f8", accent: "#1d3557" },
  events: { tone: "#dae5eb", accent: "#6a95b1" },
};

const SCENES: Record<string, (accent: string) => ReactNode> = {
  graphic: (a) => (
    <>
      <rect x="22" y="18" width="62" height="52" rx="8" fill={WHITE} />
      <circle cx="43" cy="38" r="9" fill={a} />
      <path d="M26 66l20-18 14 12 10-8 14 14z" fill={a} opacity=".35" />
      <rect x="78" y="14" width="8" height="52" rx="3" transform="rotate(28 82 40)" fill="#1d3557" />
      <path d="M82 66l-4 10 10-4z" fill="#1d3557" transform="translate(6 -2)" />
    </>
  ),
  video: (a) => (
    <>
      <rect x="20" y="28" width="66" height="44" rx="9" fill="#1d3557" />
      <circle cx="53" cy="50" r="15" fill={WHITE} />
      <circle cx="53" cy="50" r="9" fill={a} />
      <rect x="30" y="20" width="22" height="10" rx="3" fill="#1d3557" />
      <circle cx="77" cy="37" r="3" fill={a} />
      <path d="M92 40l14-8v36l-14-8z" fill={a} />
    </>
  ),
  code: (a) => (
    <>
      <rect x="16" y="16" width="88" height="56" rx="8" fill="#1d3557" />
      <circle cx="26" cy="26" r="2.5" fill="#f7b1b0" /><circle cx="34" cy="26" r="2.5" fill="#d3dfb9" /><circle cx="42" cy="26" r="2.5" fill={a} />
      <path d="M40 42l-10 9 10 9M80 42l10 9-10 9" stroke={WHITE} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M64 38l-8 26" stroke={a} strokeWidth="5" strokeLinecap="round" />
      <rect x="40" y="74" width="40" height="6" rx="3" fill="#1d3557" opacity=".3" />
    </>
  ),
  writing: (a) => (
    <>
      <rect x="26" y="12" width="60" height="68" rx="7" fill={WHITE} />
      <rect x="35" y="26" width="42" height="5" rx="2.5" fill={a} />
      <rect x="35" y="38" width="42" height="4" rx="2" fill="#1d3557" opacity=".25" />
      <rect x="35" y="47" width="34" height="4" rx="2" fill="#1d3557" opacity=".25" />
      <rect x="35" y="56" width="38" height="4" rx="2" fill="#1d3557" opacity=".25" />
      <path d="M84 30l10 10-26 26-14 4 4-14z" fill="#1d3557" />
      <path d="M84 30l10 10" stroke={a} strokeWidth="5" />
    </>
  ),
  audio: (a) => (
    <>
      <path d="M26 56V46a34 34 0 0168 0v10" stroke="#1d3557" strokeWidth="8" fill="none" strokeLinecap="round" />
      <rect x="18" y="52" width="18" height="28" rx="8" fill={a} />
      <rect x="84" y="52" width="18" height="28" rx="8" fill={a} />
      <path d="M48 56v12M56 48v28M64 52v20M72 58v8" stroke="#1d3557" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  tutoring: (a) => (
    <>
      <path d="M60 24L16 40l44 16 44-16z" fill="#1d3557" />
      <path d="M34 50v16c0 6 12 12 26 12s26-6 26-12V50l-26 9z" fill={a} />
      <path d="M104 42v22" stroke="#1d3557" strokeWidth="3" />
      <circle cx="104" cy="68" r="5" fill={a} />
    </>
  ),
  data: (a) => (
    <>
      <rect x="18" y="16" width="84" height="60" rx="8" fill={WHITE} />
      <rect x="18" y="16" width="84" height="14" rx="7" fill={a} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={26 + i * 26} y="38" width="20" height="8" rx="2" fill="#1d3557" opacity=".18" />
          <rect x={26 + i * 26} y="52" width="20" height="8" rx="2" fill="#1d3557" opacity=".18" />
          <rect x={26 + i * 26} y="66" width={i === 1 ? 20 : 14} height="6" rx="2" fill={a} opacity=".6" />
        </g>
      ))}
    </>
  ),
  craft: (a) => (
    <>
      <circle cx="52" cy="50" r="26" fill={a} />
      <path d="M32 42c14 8 30 8 40-4M28 54c16 8 34 8 48-4M34 66c12 4 26 2 36-6" stroke={WHITE} strokeWidth="3" fill="none" opacity=".7" />
      <path d="M78 24l22 30M100 24L74 54" stroke="#1d3557" strokeWidth="5" strokeLinecap="round" />
      <circle cx="76" cy="62" r="6" fill="none" stroke="#1d3557" strokeWidth="4" />
      <circle cx="100" cy="62" r="6" fill="none" stroke="#1d3557" strokeWidth="4" />
    </>
  ),
  kids: (a) => (
    <>
      <rect x="18" y="46" width="30" height="30" rx="5" fill={a} />
      <rect x="50" y="46" width="30" height="30" rx="5" fill="#1d3557" />
      <rect x="34" y="16" width="30" height="30" rx="5" fill={WHITE} />
      <text x="25" y="68" fontSize="18" fontWeight="800" fill={WHITE} fontFamily="sans-serif">A</text>
      <text x="58" y="68" fontSize="18" fontWeight="800" fill={WHITE} fontFamily="sans-serif">B</text>
      <path d="M92 70l6-24 6 24-12-14h12z" fill={a} />
    </>
  ),
  pets: (a) => (
    <>
      <ellipse cx="60" cy="58" rx="22" ry="18" fill={a} />
      <ellipse cx="30" cy="40" rx="8" ry="11" fill={a} />
      <ellipse cx="48" cy="26" rx="8" ry="11" fill={a} />
      <ellipse cx="72" cy="26" rx="8" ry="11" fill={a} />
      <ellipse cx="90" cy="40" rx="8" ry="11" fill={a} />
      <circle cx="104" cy="70" r="7" fill="#1d3557" />
    </>
  ),
  garden: (a) => (
    <>
      <path d="M44 56h32l-4 24H48z" fill="#1d3557" />
      <path d="M60 56V28" stroke={a} strokeWidth="5" strokeLinecap="round" />
      <path d="M60 40c-16 0-24-8-24-20 14 0 24 6 24 20z" fill={a} />
      <path d="M60 34c14 0 22-8 22-18-14 0-22 6-22 18z" fill={a} opacity=".6" />
      <circle cx="96" cy="24" r="9" fill="#d3dfb9" />
    </>
  ),
  store: (a) => (
    <>
      <path d="M30 34h60l6 44H24z" fill={WHITE} />
      <path d="M42 34c0-14 36-14 36 0" stroke="#1d3557" strokeWidth="6" fill="none" strokeLinecap="round" />
      <rect x="24" y="34" width="72" height="10" rx="3" fill={a} />
      <circle cx="46" cy="58" r="5" fill="#1d3557" opacity=".2" /><circle cx="74" cy="58" r="5" fill="#1d3557" opacity=".2" />
    </>
  ),
  events: (a) => (
    <>
      <rect x="14" y="18" width="92" height="10" rx="4" fill="#1d3557" />
      <path d="M22 28l-4 32h20l-2-32zM58 28l-4 32h24l-4-32z" fill={a} opacity=".35" />
      <path d="M26 66h68v10H26z" fill="#1d3557" />
      <circle cx="30" cy="44" r="5" fill={a} /><circle cx="90" cy="44" r="5" fill={a} />
      <path d="M60 34l4 10h10l-8 6 3 10-9-6-9 6 3-10-8-6h10z" fill="#d3dfb9" />
    </>
  ),
}

interface CategoryIllustrationProps {
  categoryId: string;
  className?: string;
}

export function CategoryIllustration({ categoryId, className }: CategoryIllustrationProps) {
  const palette = CATEGORY_PALETTE[categoryId] ?? CATEGORY_PALETTE.graphic;
  const gradientId = `category-gradient-${categoryId}`;
  const renderScene = SCENES[categoryId] ?? SCENES.graphic;

  return (
    <svg
      viewBox="0 0 120 90"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={palette.tone} />
          <stop offset="1" stopColor={palette.tone} stopOpacity=".6" />
        </linearGradient>
      </defs>
      <rect width="120" height="90" fill={`url(#${gradientId})`} />
      <circle cx="104" cy="12" r="22" fill={WHITE} opacity=".35" />
      <circle cx="10" cy="86" r="26" fill={palette.accent} opacity=".12" />
      {renderScene(palette.accent)}
    </svg>
  );
}
