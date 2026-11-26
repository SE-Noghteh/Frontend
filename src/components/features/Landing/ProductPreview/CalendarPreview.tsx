import { CalendarDays } from "lucide-react";

import { ROLE_STYLES } from "@/constants/roles";
import { toPersianDigits } from "@/utils/toPersianDigits";

import { PreviewCard } from "./PreviewCard";
import { PreviewIconTile } from "./PreviewIconTile";

const WEEK_DAYS = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
const TODAY_INDEX = 3;
const DEADLINE_INDEX = 4;
const FIRST_DAY_NUMBER = 12;

export function CalendarPreview() {
  const style = ROLE_STYLES.seeker;

  return (
    <PreviewCard className="p-4">
      <div className="flex items-center gap-2 text-caption font-bold text-text-primary">
        <PreviewIconTile role="seeker">
          <CalendarDays />
        </PreviewIconTile>
        تقویم این هفته
      </div>
      <div className="mt-3 grid grid-cols-7 gap-1.5 text-center text-caption">
        {WEEK_DAYS.map((day, index) => (
          <div
            key={day}
            className={`rounded-lg py-1.5 ${
              index === TODAY_INDEX ? style.solid : "bg-blue-8/40 text-blue-5"
            }`}
          >
            <div>{day}</div>
            <div className="font-bold">{toPersianDigits(FIRST_DAY_NUMBER + index)}</div>
            <div
              className={`mx-auto mt-0.5 size-1 rounded-full ${
                index === DEADLINE_INDEX ? "bg-status-error" : "bg-transparent"
              }`}
            />
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-xl border border-border-decorative p-2.5 text-caption">
        <span className="size-2 rounded-full bg-status-error" />
        <span className="font-semibold text-text-primary">مهلت تحویل پست‌ها</span>
        <span className="ms-auto text-charcoal-2">پنجشنبه</span>
      </div>
    </PreviewCard>
  );
}
