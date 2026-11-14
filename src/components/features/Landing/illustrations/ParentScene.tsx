/** Parent illustration: shield, consent and calendar. */

import { IllustrationCheckMark } from "./IllustrationCheckMark";

interface SceneProps {
  className?: string;
  /** Background fill of the rounded panel; transparent by default. */
  background?: string;
}

const BLUE = "#1d3557";
const PINK = "#f7b1b0";
const GREEN = "#6d7953";

export function ParentScene({ className, background = "transparent" }: SceneProps) {
  return (
    <svg viewBox="0 0 400 320" className={className} role="img" aria-label="سپر امنیت، رضایت و تقویم">
      <rect x="22" y="34" width="356" height="264" rx="28" fill={background} />
      <g transform="rotate(-5 124 196)">
        <rect x="62" y="144" width="124" height="112" rx="14" fill="#fff" />
        <path d="M62 158a14 14 0 0114-14h96a14 14 0 0114 14v10H62z" fill={GREEN} />
        {[0, 1, 2].map((r) => [0, 1, 2, 3, 4].map((c) => (
          <circle key={`${r}${c}`} cx={82 + c * 21} cy={190 + r * 20} r={r === 1 && c === 3 ? 8 : 5} fill={r === 1 && c === 3 ? PINK : GREEN} opacity={r === 1 && c === 3 ? 1 : 0.25} />
        )))}
      </g>
      <g transform="translate(192 46)">
        <path d="M74 0l68 22v58c0 46-31 76-68 90C37 156 6 126 6 80V22z" fill={BLUE} />
        <path d="M40 84l24 24 46-52" stroke="#fff" strokeWidth="12" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <rect x="62" y="68" width="124" height="44" rx="22" fill="#fff" />
      <circle cx="88" cy="90" r="12" fill={GREEN} /><IllustrationCheckMark x={82} y={90} scale={0.5} />
      <rect x="108" y="82" width="58" height="7" rx="3.5" fill={BLUE} opacity=".25" /><rect x="108" y="95" width="38" height="6" rx="3" fill={BLUE} opacity=".15" />
    </svg>
  )
}
