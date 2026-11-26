import { X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";

import type { CalendarDayContext, CalendarEntry, CalendarTone } from "@/types/Calendar/calendar";
import { JALALI_MONTH_NAMES, JALALI_WEEKDAYS, jalaliWeekdayIndex } from "@/utils/jalali";
import { toPersianDigits } from "@/utils/toPersianDigits";

interface CalendarDayPopupProps {
  day: CalendarDayContext;
  palette: Record<string, CalendarTone>;
  onClose: () => void;
  onEntryClick?: (entry: CalendarEntry) => void;
  /** Replaces the default list of entries. */
  renderContent?: (day: CalendarDayContext) => ReactNode;
}

/** Day details: every entry of one day, shown over the calendar. Closes on Esc / backdrop / ✕. */
export function CalendarDayPopup({ day, palette, onClose, onEntryClick, renderContent }: CalendarDayPopupProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const title = `${JALALI_WEEKDAYS[jalaliWeekdayIndex(day.date)]} ${toPersianDigits(day.jalali.day)} ${JALALI_MONTH_NAMES[day.jalali.month - 1]}`;

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="cal__backdrop" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="cal__popup"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="cal__popup-header">
          <h3 className="cal__popup-title">{title}</h3>
          <button ref={closeRef} type="button" className="cal__nav" onClick={onClose} aria-label="بستن">
            <X aria-hidden="true" />
          </button>
        </div>

        {renderContent ? (
          renderContent(day)
        ) : day.entries.length === 0 ? (
          <p className="cal__popup-empty">رویدادی برای این روز ثبت نشده است.</p>
        ) : (
          <ul className="cal__popup-list">
            {day.entries.map((entry, index) => {
              const tone = palette[entry.tone ?? "neutral"] ?? palette.neutral;
              return (
                <li key={entry.id ?? index}>
                  <button
                    type="button"
                    className="cal__popup-item"
                    onClick={() => onEntryClick?.(entry)}
                    data-clickable={onEntryClick ? true : undefined}
                  >
                    <span
                      className="cal__legend-dot"
                      style={{ background: entry.color?.text ?? tone.text }}
                      aria-hidden="true"
                    />
                    <span>{entry.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
