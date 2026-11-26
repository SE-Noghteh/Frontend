/**
 * Calendar demo (shown inside the components test page).
 * 1. Backend-style data with `fixedCells` (equal cell size; overflow → "+N" → day popup).
 * 2. Phone width: dots layout, tap a day to open its popup.
 * 3. Fluid cells (default): a cell grows with its entries.
 * 4. Re-themed: same component, different colors, only through CSS variables and tones.
 * 5. Custom cell content with `renderDay`.
 */

import { useEffect, useState, type CSSProperties } from "react";

import { Calendar } from "@/components/ui/Calendar/Calendar";
import type { CalendarEntry, CalendarMonth } from "@/types/Calendar/calendar";
import { jalaliToDate } from "@/utils/jalali";
import { toPersianDigits } from "@/utils/toPersianDigits";

/** Fake backend response: Gregorian ISO dates, like a real API would send. */
function fetchEntries(month: CalendarMonth): Promise<CalendarEntry[]> {
  const iso = (day: number) => {
    const date = jalaliToDate({ ...month, day });
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };
  const rows: CalendarEntry[] = [
    { id: 1, date: iso(8), label: "تحویل ویدیو", tone: "warning" },
    { id: 2, date: iso(12), label: "جلسه هماهنگی", tone: "success" },
    { id: 3, date: iso(15), label: "مهلت درخواست آگهی", tone: "info" },
    { id: 4, date: iso(18), label: "مهلت پرداخت - نیما", tone: "error" },
    { id: 5, date: iso(18), label: "پایان آگهی لوگو", tone: "success" },
    { id: 6, date: iso(18), label: "تحویل نهایی", tone: "warning" },
    { id: 7, date: iso(18), label: "مورد چهارم", tone: "info" },
    { id: 8, date: iso(20), label: "پایان مهلت پاسخ تغییر شرایط", tone: "warning" },
    { id: 9, date: iso(24), label: "تحویل میانی", tone: "warning" },
    { id: 10, date: iso(29), label: "مهلت کارنمایی", tone: "info" },
  ];
  return new Promise((resolve) => window.setTimeout(() => resolve(rows), 600));
}

const LEGEND = [
  { tone: "info", label: "مهلت" },
  { tone: "warning", label: "تحویل" },
  { tone: "success", label: "جلسه / پایان" },
  { tone: "error", label: "پرداخت" },
];

function BackendCalendar({ fixedCells }: { fixedCells: boolean }) {
  const [month, setMonth] = useState<CalendarMonth>({ year: 1405, month: 8 });
  const [entries, setEntries] = useState<CalendarEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [picked, setPicked] = useState<string>("—");

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    fetchEntries(month).then((rows) => {
      if (cancelled) return;
      setEntries(rows);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [month]);

  return (
    <div className="flex flex-col gap-3">
      <Calendar
        month={month}
        onMonthChange={setMonth}
        entries={entries}
        loading={loading}
        legend={LEGEND}
        fixedCells={fixedCells}
        onSelectDate={(date, jalali) =>
          setPicked(`${toPersianDigits(`${jalali.year}/${jalali.month}/${jalali.day}`)} (${date.toDateString()})`)
        }
        onEntryClick={(entry) => setPicked(`رویداد: ${String(entry.label)}`)}
      />
      <p className="text-caption text-charcoal-1">آخرین انتخاب: {picked}</p>
    </div>
  );
}

const BLUE_THEME = {
  "--cal-surface": "var(--color-blue)",
  "--cal-text": "var(--color-white)",
  "--cal-muted": "var(--color-blue-7)",
  "--cal-border": "color-mix(in oklab, white 14%, transparent)",
  "--cal-accent": "var(--color-white)",
  "--cal-accent-text": "var(--color-blue)",
  "--cal-selected-bg": "color-mix(in oklab, white 12%, transparent)",
  "--cal-hover-bg": "color-mix(in oklab, white 12%, transparent)",
  "--cal-radius": "16px",
} as CSSProperties;

const DARK_TONES = {
  info: { background: "color-mix(in oklab, white 16%, transparent)", text: "var(--color-white)" },
  warning: { background: "var(--color-brand-peach)", text: "var(--color-charcoal)" },
  success: { background: "var(--color-green)", text: "var(--color-charcoal)" },
  error: { background: "var(--color-error-soft)", text: "var(--color-error)" },
};

export default function CalendarDemo() {
  const [entries, setEntries] = useState<CalendarEntry[]>([]);
  useEffect(() => {
    fetchEntries({ year: 1405, month: 8 }).then(setEntries);
  }, []);

  return (
    <div dir="rtl" className="mx-auto flex max-w-6xl flex-col gap-10 p-6">
      <section className="flex flex-col gap-3">
        <h2 className="text-card-title font-bold text-charcoal">۱) داده از بک + خانه‌های ثابت (fixedCells)</h2>
        <BackendCalendar fixedCells />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-card-title font-bold text-charcoal">۲) عرض گوشی (نقطه‌ها؛ با لمس روز، پاپ‌آپ باز می‌شود)</h2>
        <div className="max-w-[390px]">
          <BackendCalendar fixedCells />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-card-title font-bold text-charcoal">۳) خانه‌های انعطاف‌پذیر (پیش‌فرض)</h2>
        <BackendCalendar fixedCells={false} />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-card-title font-bold text-charcoal">۴) رنگ‌بندی دیگر (فقط با متغیرهای CSS و tones)</h2>
        <Calendar
          defaultMonth={{ year: 1405, month: 8 }}
          entries={entries}
          tones={DARK_TONES}
          fixedCells
          legend={LEGEND}
          style={BLUE_THEME}
        />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-card-title font-bold text-charcoal">۵) محتوای دلخواه هر خانه (renderDay)</h2>
        <Calendar
          defaultMonth={{ year: 1405, month: 8 }}
          renderDay={(day) =>
            day.jalali.day % 5 === 0 ? (
              <span className="text-caption font-bold text-charcoal-1">
                {toPersianDigits(day.jalali.day * 1000)} تومان
              </span>
            ) : null
          }
        />
      </section>
    </div>
  );
}
