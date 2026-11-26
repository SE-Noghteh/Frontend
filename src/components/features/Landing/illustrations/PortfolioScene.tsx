/** Seeker illustration: skill passport and portfolio samples. */

import { IllustrationCheckMark } from "./IllustrationCheckMark";

interface SceneProps {
  className?: string;
  /** Background fill of the rounded panel; transparent by default. */
  background?: string;
}

const BLUE = "#1d3557";
const PINK = "#f7b1b0";

export function PortfolioScene({ className, background = "transparent" }: SceneProps) {
  const frame = (x: number, y: number, c: string, r: number) => (
    <g transform={`rotate(${r} ${x + 34} ${y + 26})`}>
      <rect x={x} y={y} width="68" height="52" rx="10" fill="#fff" />
      <rect x={x + 7} y={y + 7} width="54" height="38" rx="6" fill={c} opacity=".4" />
      <circle cx={x + 22} cy={y + 20} r="6" fill="#fff" /><path d={`M${x + 7} ${y + 45}l18-14 12 9 10-7 14 12z`} fill={c} />
    </g>
  )
  return (
    <svg viewBox="0 0 400 320" className={className} role="img" aria-label="پاسپورت مهارتی و نمونه‌کار">
      <rect x="22" y="34" width="356" height="264" rx="28" fill={background} />
      {frame(50, 78, '#c68e8d', -8)}
      {frame(288, 70, '#946a6a', 7)}
      <rect x="128" y="44" width="150" height="214" rx="18" fill="#fff" />
      <path d="M128 62a18 18 0 0118-18h114a18 18 0 0118 18v36H128z" fill={PINK} />
      <circle cx="203" cy="100" r="28" fill="#fff" />
      <path d="M203 84l5.4 11 12 1.6-8.8 8.4 2.2 12-10.8-5.9-10.8 5.9 2.2-12-8.8-8.4 12-1.6z" fill={PINK} />
      <rect x="152" y="144" width="102" height="8" rx="4" fill={BLUE} opacity=".22" /><rect x="152" y="162" width="78" height="8" rx="4" fill={BLUE} opacity=".14" />
      <rect x="152" y="192" width="102" height="8" rx="4" fill={BLUE} opacity=".12" /><rect x="152" y="192" width="74" height="8" rx="4" fill={'#c68e8d'} />
      <rect x="152" y="216" width="46" height="22" rx="11" fill={BLUE} /><IllustrationCheckMark x={166} y={228} scale={0.6} />
      {frame(262, 186, '#946a6a', -5)}
    </svg>
  )
}
