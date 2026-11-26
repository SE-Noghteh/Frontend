/** Employer illustration: agreement + secure wallet. */

interface SceneProps {
  className?: string;
  /** Background fill of the rounded panel; transparent by default. */
  background?: string;
}

const BLUE = "#1d3557";

export function EmployerScene({ className, background = "transparent" }: SceneProps) {
  return (
    <svg viewBox="0 0 400 320" className={className} role="img" aria-label="توافق‌نامه و کیف پول امن">
      <rect x="22" y="34" width="356" height="264" rx="28" fill={background} />
      <g transform="rotate(-6 190 150)">
        <rect x="112" y="46" width="150" height="196" rx="14" fill="#fff" />
        <rect x="130" y="68" width="70" height="8" rx="4" fill={BLUE} />
        {[92, 108, 124].map((y, i) => <rect key={y} x="130" y={y} width={[110, 96, 104][i]} height="7" rx="3.5" fill={BLUE} opacity=".15" />)}
        <rect x="130" y="148" width="54" height="26" rx="8" fill={'#8fb0c4'} opacity=".5" />
        <path d="M132 214c10-14 16 10 26-4s14 8 24-2" stroke={'#457b9d'} strokeWidth="3" fill="none" strokeLinecap="round" />
      </g>
      <g transform="rotate(4 270 216)">
        <rect x="196" y="168" width="148" height="96" rx="16" fill={BLUE} />
        <rect x="196" y="188" width="148" height="12" fill="#fff" opacity=".12" />
        <rect x="290" y="208" width="54" height="34" rx="10" fill="#fff" opacity=".18" />
        <circle cx="306" cy="225" r="6" fill={'#8fb0c4'} />
      </g>
      <circle cx="338" cy="126" r="26" fill={'#457b9d'} />
      <rect x="328" y="122" width="20" height="16" rx="4" fill="#fff" />
      <path d="M332 122v-5a6 6 0 0112 0v5" stroke="#fff" strokeWidth="3" fill="none" />
    </svg>
  )
}
