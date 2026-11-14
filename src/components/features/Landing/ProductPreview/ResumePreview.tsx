import { Check } from "lucide-react";

import { ProgressBar } from "@/components/ui/ProgressBar";
import { ROLE_STYLES } from "@/constants/roles";

import { PreviewCard } from "./PreviewCard";

const CHECKLIST: readonly [label: string, isDone: boolean][] = [
  ["مهارت‌ها و علاقه‌مندی‌ها", true],
  ["۳ نمونه‌کار", true],
  ["معرفی کوتاه", true],
  ["نظر اولین کارفرما", false],
];

export function ResumePreview() {
  const style = ROLE_STYLES.seeker;

  return (
    <PreviewCard className="p-4">
      <div className="flex items-center justify-between text-caption">
        <span className="font-bold text-text-primary">قدرت رزومه</span>
        <span className="font-black text-text-primary">۷۲٪</span>
      </div>
      <div className="mt-2">
        <ProgressBar value={72} fillClassName={style.bar} />
      </div>
      <ul className="mt-3 space-y-2 text-caption">
        {CHECKLIST.map(([label, isDone]) => (
          <li key={label} className="flex items-center gap-2">
            <span
              className={`grid size-4 place-items-center rounded-full ${
                isDone ? "bg-status-success text-white" : "border border-blue-7"
              }`}
            >
              {isDone && <Check className="size-3" strokeWidth={3} />}
            </span>
            <span className={isDone ? "text-text-secondary" : "font-semibold text-text-primary"}>
              {label}
            </span>
          </li>
        ))}
      </ul>
      <div className={`mt-3 rounded-xl p-2.5 text-caption leading-6 ${style.soft} ${style.text}`}>
        با یک پروژه کوچک شروع کن؛ اولین نظر کارفرما رزومه‌ت رو جدی‌تر می‌کنه.
      </div>
    </PreviewCard>
  );
}
