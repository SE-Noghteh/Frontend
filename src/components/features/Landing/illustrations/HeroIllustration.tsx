/** تصویرسازی اصلی هیرو: نوجوانی با هدفون و گوشی، با چهره‌ی ساده و دوستانه */
const BLUE = '#1d3557'
const PINK = '#f7b1b0'
const SKIN = '#e8b896'
const HAIR = '#262321'

export function HeroIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 460" className={className} role="img" aria-label="نوجوانی با هدفون که با گوشی پروژه‌اش را مرور می‌کند">
      {/* قاب و زمینه */}
      <path d="M50 460V170C50 90 115 30 200 30s150 60 150 140v290z" fill="#dae5eb" />

      {/* موی پشت سر */}
      <ellipse cx="200" cy="190" rx="66" ry="68" fill={HAIR} />
      {/* بدن (هودی) */}
      <path d="M70 460c0-92 50-148 130-148s130 56 130 148z" fill={PINK} />
      <path d="M140 316c14-26 106-26 120 0-18 22-102 22-120 0z" fill="#c68e8d" />
      {/* گردن */}
      <rect x="182" y="258" width="36" height="58" rx="16" fill="#d9a27c" />
      {/* هدفون دور گردن */}
      <path d="M138 300c0 72 124 72 124 0" stroke={BLUE} strokeWidth="9" fill="none" strokeLinecap="round" />
      <rect x="124" y="286" width="26" height="42" rx="12" fill={BLUE} /><rect x="250" y="286" width="26" height="42" rx="12" fill={BLUE} />
      {/* گوش‌ها و سر */}
      <circle cx="146" cy="206" r="10" fill={SKIN} /><circle cx="254" cy="206" r="10" fill={SKIN} />
      <ellipse cx="200" cy="200" rx="54" ry="60" fill={SKIN} />
      {/* مو */}
      <path d="M144 196c-8-50 28-80 64-80 40 0 62 34 52 80-12-30-30-44-56-44-28 0-46 14-60 44z" fill={HAIR} />
      <path d="M170 134c10-16 40-22 62-6-18-2-40 0-62 6z" fill={HAIR} />
      {/* صورت */}
      <path d="M170 187q9-8 18 0M212 187q9-8 18 0" stroke={HAIR} strokeWidth="3.4" fill="none" strokeLinecap="round" />
      <ellipse cx="180" cy="208" rx="4.6" ry="5.6" fill={HAIR} /><ellipse cx="222" cy="208" rx="4.6" ry="5.6" fill={HAIR} />
      <circle cx="166" cy="228" r="8" fill="#f7b1b0" opacity=".55" /><circle cx="236" cy="228" r="8" fill="#f7b1b0" opacity=".55" />
      <path d="M186 232q15 14 30 0" stroke={HAIR} strokeWidth="3.4" fill="none" strokeLinecap="round" />

      {/* بازوها و گوشی */}
      <path d="M96 372c4 36 36 56 76 52M304 372c-4 36-36 56-76 52" stroke={PINK} strokeWidth="38" fill="none" strokeLinecap="round" />
      <g transform="rotate(-4 200 400)">
        <rect x="150" y="352" width="100" height="130" rx="16" fill="#fff" stroke={BLUE} strokeWidth="5" />
        <rect x="164" y="372" width="48" height="8" rx="4" fill="#6d7953" /><rect x="164" y="390" width="72" height="6" rx="3" fill="#d2d7dd" /><rect x="164" y="404" width="58" height="6" rx="3" fill="#d2d7dd" />
        <circle cx="200" cy="440" r="14" fill="#d3dfb9" /><path d="M193 440l5 5 10-10" stroke="#485037" strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <circle cx="160" cy="418" r="14" fill={SKIN} /><circle cx="242" cy="418" r="14" fill={SKIN} />
    </svg>
  )
}
