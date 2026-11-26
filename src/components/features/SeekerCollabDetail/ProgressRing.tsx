import { toPersianDigits } from "@/utils/toPersianDigits";

interface ProgressRingProps {
  percent: number;
}

const SIZE = 40;
const STROKE = 4;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** Small circular progress with the percent in the middle. */
export function ProgressRing({ percent }: ProgressRingProps) {
  return (
    <span className="relative grid size-10 shrink-0 place-items-center" role="img" aria-label={`${percent} درصد`}>
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="-rotate-90" aria-hidden="true">
        <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" strokeWidth={STROKE} className="stroke-border-soft" />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          fill="none"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - percent / 100)}
          className="stroke-blue"
        />
      </svg>
      <span className="absolute text-[10px] font-bold text-text-primary">{toPersianDigits(percent)}٪</span>
    </span>
  );
}
