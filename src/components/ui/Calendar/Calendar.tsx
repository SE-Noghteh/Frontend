/**
 * Jalali month calendar (week starts on Saturday, RTL).
 *
 * Data in:   `entries` — backend items, each with a Gregorian `date` (Date or ISO string),
 *            a `label` and an optional `tone`. Or take full control of a cell with `renderDay`.
 * Data out:  `onMonthChange` (fetch the new month from the backend), `onSelectDate`, `onEntryClick`.
 * Month/year: click the title to open the picker; arrows move one month.
 * Visible month and selection work controlled (`month` / `selectedDate`) or uncontrolled
 * (`defaultMonth` / `defaultSelectedDate`).
 *
 * Size: the calendar fills its container and never scrolls sideways. Cell height follows the
 * container width, so it grows by itself when e.g. a sidebar collapses. Below `compactBelow` px
 * (phones) cells show colored dots instead of chips and a tap opens the day popup.
 * `fixedCells` keeps every cell the same height: at most `maxEntriesPerDay` rows are shown and
 * the rest collapse into "+N", which opens the popup listing the whole day.
 *
 * Colors: everything comes from CSS variables (see `styles/calendar.css`) — override them with
 * `style` / `className` on the calendar or a wrapper, e.g.
 * `style={{ "--cal-accent": "#b5c98a" } as CSSProperties}`.
 * Chip colors come from the `tones` prop (merged over the defaults) or per-entry `color`.
 */

import { useCallback, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";

import { useElementWidth } from "@/hooks/useElementWidth";
import type {
  CalendarDayContext,
  CalendarEntry,
  CalendarLegendItem,
  CalendarMonth,
  CalendarTone,
} from "@/types/Calendar/calendar";
import { cn } from "@/utils/cn";
import {
  JALALI_MONTH_NAMES,
  JALALI_WEEKDAYS,
  JALALI_WEEKDAYS_SHORT,
  jalaliMonthLength,
  jalaliToDate,
  jalaliWeekdayIndex,
  parseCalendarDate,
  toJalali,
} from "@/utils/jalali";
import { toPersianDigits } from "@/utils/toPersianDigits";

import { CalendarDayPopup } from "./CalendarDayPopup";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarPicker } from "./CalendarPicker";
import { DEFAULT_CALENDAR_TONES } from "./calendarTones";

export interface CalendarProps {
  entries?: CalendarEntry[];
  /** Replaces the default entry list inside a day cell (desktop layout). */
  renderDay?: (day: CalendarDayContext) => ReactNode;
  /** Replaces the default content of the day popup. */
  renderPopup?: (day: CalendarDayContext) => ReactNode;
  /** Controlled visible month. */
  month?: CalendarMonth;
  /** Initial visible month when uncontrolled (defaults to the current month). */
  defaultMonth?: CalendarMonth;
  onMonthChange?: (month: CalendarMonth) => void;
  selectedDate?: Date | string | null;
  defaultSelectedDate?: Date | string | null;
  onSelectDate?: (date: Date, jalali: CalendarDayContext["jalali"]) => void;
  onEntryClick?: (entry: CalendarEntry) => void;
  /** Extra / overridden tone colors, merged over the defaults. */
  tones?: Record<string, CalendarTone>;
  /** Small colored key shown above the grid. */
  legend?: CalendarLegendItem[];
  /**
   * Same height for every cell regardless of how many entries it has. Entries beyond
   * `maxEntriesPerDay` collapse into a "+N" button that opens the day popup.
   */
  fixedCells?: boolean;
  /** Rows (chips + "+N") a cell may show before collapsing. Default 2. */
  maxEntriesPerDay?: number;
  /**
   * When the day popup opens: "overflow" (default — via "+N", and by tapping a day in the compact
   * layout), "always" (clicking any day opens it) or "none".
   */
  dayPopup?: "overflow" | "always" | "none";
  /** Container width (px) below which the compact (dots) layout is used. Default 520. */
  compactBelow?: number;
  /** Dims the grid and sets `aria-busy` while the parent loads a month. */
  loading?: boolean;
  /** Allowed Jalali years in the picker / navigation. Default [1300, 1500]. */
  yearRange?: [number, number];
  /** Disable the month & year picker (title becomes plain text). */
  hidePicker?: boolean;
  className?: string;
  style?: CSSProperties;
}

const dayKey = (year: number, month: number, day: number) => `${year}-${month}-${day}`;
const MAX_DOTS = 3;

export function Calendar({
  entries = [],
  renderDay,
  renderPopup,
  month: controlledMonth,
  defaultMonth,
  onMonthChange,
  selectedDate: controlledSelected,
  defaultSelectedDate = null,
  onSelectDate,
  onEntryClick,
  tones,
  legend,
  fixedCells = false,
  maxEntriesPerDay = 2,
  dayPopup = "overflow",
  compactBelow = 520,
  loading = false,
  yearRange = [1300, 1500],
  hidePicker = false,
  className,
  style,
}: CalendarProps) {
  const rootRef = useRef<HTMLElement>(null);
  const width = useElementWidth(rootRef);
  const compact = width !== null && width < compactBelow;

  const today = useMemo(() => toJalali(new Date()), []);
  const [innerMonth, setInnerMonth] = useState<CalendarMonth>(
    defaultMonth ?? { year: today.year, month: today.month },
  );
  const [innerSelected, setInnerSelected] = useState<Date | string | null>(defaultSelectedDate);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [popupDay, setPopupDay] = useState<number | null>(null);
  const [minYear, maxYear] = yearRange;

  const visible = controlledMonth ?? innerMonth;
  const selected = controlledSelected !== undefined ? controlledSelected : innerSelected;
  const selectedJalali = selected ? toJalali(parseCalendarDate(selected)) : null;
  const selectedKey = selectedJalali ? dayKey(selectedJalali.year, selectedJalali.month, selectedJalali.day) : null;
  const palette = useMemo(() => ({ ...DEFAULT_CALENDAR_TONES, ...tones }), [tones]);

  const entriesByDay = useMemo(() => {
    const map = new Map<string, CalendarEntry[]>();
    for (const entry of entries) {
      const { year, month, day } = toJalali(parseCalendarDate(entry.date));
      const key = dayKey(year, month, day);
      map.set(key, [...(map.get(key) ?? []), entry]);
    }
    return map;
  }, [entries]);

  const goTo = (next: CalendarMonth) => {
    if (next.year < minYear || next.year > maxYear) return;
    setPopupDay(null);
    if (controlledMonth === undefined) setInnerMonth(next);
    onMonthChange?.(next);
  };

  const shiftMonth = (delta: number) => {
    const index = visible.year * 12 + (visible.month - 1) + delta;
    goTo({ year: Math.floor(index / 12), month: (index % 12) + 1 });
  };

  const activate = (day: CalendarDayContext) => {
    if (controlledSelected === undefined) setInnerSelected(day.date);
    onSelectDate?.(day.date, day.jalali);
    const opens =
      dayPopup === "always" || (dayPopup === "overflow" && compact && day.entries.length > 0);
    if (opens) setPopupDay(day.jalali.day);
  };

  const closePopup = useCallback(() => setPopupDay(null), []);

  const leadingBlanks = jalaliWeekdayIndex(jalaliToDate({ ...visible, day: 1 }));
  const length = jalaliMonthLength(visible.year, visible.month);
  const monthName = JALALI_MONTH_NAMES[visible.month - 1];
  const title = `${monthName} ${toPersianDigits(visible.year)}`;
  const todayKey = dayKey(today.year, today.month, today.day);

  const cells = Array.from({ length }, (_, index): CalendarDayContext => {
    const jalali = { ...visible, day: index + 1 };
    const key = dayKey(jalali.year, jalali.month, jalali.day);
    return {
      jalali,
      date: jalaliToDate(jalali),
      entries: entriesByDay.get(key) ?? [],
      isToday: key === todayKey,
      isSelected: key === selectedKey,
    };
  });
  const popupContext = popupDay === null ? null : cells[popupDay - 1];

  const toneOf = (entry: CalendarEntry): CalendarTone => {
    const tone = palette[entry.tone ?? "neutral"] ?? palette.neutral;
    return { background: entry.color?.background ?? tone.background, text: entry.color?.text ?? tone.text };
  };

  const chipStyle = (entry: CalendarEntry): CSSProperties => {
    const tone = toneOf(entry);
    return { "--cal-chip-bg": tone.background, "--cal-chip-text": tone.text } as CSSProperties;
  };

  const popupEnabled = dayPopup !== "none";
  const weekdays = compact ? JALALI_WEEKDAYS_SHORT : JALALI_WEEKDAYS;

  return (
    <section
      ref={rootRef}
      dir="rtl"
      className={cn("cal", className)}
      style={style}
      aria-busy={loading || undefined}
      data-compact={compact || undefined}
      data-fixed={fixedCells || undefined}
    >
      <CalendarHeader
        title={title}
        pickerOpen={pickerOpen}
        prevLabel="ماه قبل"
        nextLabel="ماه بعد"
        prevDisabled={visible.year === minYear && visible.month === 1}
        nextDisabled={visible.year === maxYear && visible.month === 12}
        onTitleClick={hidePicker ? undefined : () => setPickerOpen((open) => !open)}
        onPrev={() => shiftMonth(-1)}
        onNext={() => shiftMonth(1)}
      />

      {pickerOpen && (
        <CalendarPicker
          year={visible.year}
          month={visible.month}
          minYear={minYear}
          maxYear={maxYear}
          onPick={(year, month) => {
            goTo({ year, month });
            setPickerOpen(false);
          }}
        />
      )}

      {legend && legend.length > 0 && (
        <ul className="cal__legend">
          {legend.map((item) => (
            <li key={item.tone} className="cal__legend-item">
              <span
                className="cal__legend-dot"
                style={{ background: (palette[item.tone] ?? palette.neutral).text }}
                aria-hidden="true"
              />
              {item.label}
            </li>
          ))}
        </ul>
      )}

      <div role="grid" aria-label={title} className="cal__grid" data-loading={loading || undefined}>
        {JALALI_WEEKDAYS.map((name, index) => (
          <div key={name} role="columnheader" className="cal__weekday" aria-label={name}>
            {weekdays[index]}
          </div>
        ))}

        {Array.from({ length: leadingBlanks }, (_, index) => (
          <div key={`blank-${index}`} role="gridcell" aria-hidden="true" className="cal__cell cal__cell--blank" />
        ))}

        {cells.map((day) => {
          const label = `${toPersianDigits(day.jalali.day)} ${monthName}`;
          const overflowing = day.entries.length > maxEntriesPerDay;
          const shown = overflowing ? day.entries.slice(0, Math.max(maxEntriesPerDay - 1, 0)) : day.entries;
          const hidden = day.entries.length - shown.length;

          return (
            <div
              key={day.jalali.day}
              role="gridcell"
              aria-selected={day.isSelected}
              className="cal__cell"
              data-selected={day.isSelected || undefined}
            >
              {compact ? (
                <button
                  type="button"
                  className="cal__day cal__day--compact"
                  aria-label={day.entries.length ? `${label}، ${toPersianDigits(day.entries.length)} رویداد` : label}
                  aria-current={day.isToday ? "date" : undefined}
                  onClick={() => activate(day)}
                >
                  <span className="cal__day-number" data-today={day.isToday || undefined}>
                    {toPersianDigits(day.jalali.day)}
                  </span>
                  <span className="cal__dots" aria-hidden="true">
                    {day.entries.slice(0, MAX_DOTS).map((entry, index) => (
                      <span key={entry.id ?? index} className="cal__dot" style={{ background: toneOf(entry).text }} />
                    ))}
                  </span>
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className="cal__day"
                    aria-label={label}
                    aria-current={day.isToday ? "date" : undefined}
                    onClick={() => activate(day)}
                  >
                    <span className="cal__day-number" data-today={day.isToday || undefined}>
                      {toPersianDigits(day.jalali.day)}
                    </span>
                  </button>

                  {renderDay ? (
                    renderDay(day)
                  ) : (
                    <ul className="cal__entries">
                      {shown.map((entry, index) => (
                        <li key={entry.id ?? index}>
                          <button
                            type="button"
                            className="cal__chip"
                            style={chipStyle(entry)}
                            title={typeof entry.label === "string" ? entry.label : undefined}
                            onClick={() => onEntryClick?.(entry)}
                            tabIndex={onEntryClick ? 0 : -1}
                            data-clickable={onEntryClick ? true : undefined}
                          >
                            {entry.label}
                          </button>
                        </li>
                      ))}
                      {hidden > 0 && (
                        <li>
                          {popupEnabled ? (
                            <button type="button" className="cal__more" onClick={() => setPopupDay(day.jalali.day)}>
                              +{toPersianDigits(hidden)} مورد دیگر
                            </button>
                          ) : (
                            <span className="cal__more">+{toPersianDigits(hidden)} مورد دیگر</span>
                          )}
                        </li>
                      )}
                    </ul>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {popupContext && (
        <CalendarDayPopup
          day={popupContext}
          palette={palette}
          onClose={closePopup}
          onEntryClick={onEntryClick}
          renderContent={renderPopup}
        />
      )}
    </section>
  );
}
