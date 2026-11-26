interface ProgressBarProps {
  /** 0 - 100 */
  value: number;
  /** Tailwind class for the fill color. */
  fillClassName?: string;
}

export function ProgressBar({ value, fillClassName = "bg-blue" }: ProgressBarProps) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-blue-8/60">
      <div
        className={`h-full rounded-full ${fillClassName}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
