import { useState } from "react";

import { JALALI_MONTH_NAMES } from "@/utils/jalali";
import { toPersianDigits } from "@/utils/toPersianDigits";

import { CalendarHeader } from "./CalendarHeader";

const YEARS_PER_PAGE = 12;

interface CalendarPickerProps {
  year: number;
  month: number;
  minYear: number;
  maxYear: number;
  onPick: (year: number, month: number) => void;
}

/** Month & year chooser: a month grid, with the year title opening a paged year grid. */
export function CalendarPicker({ year, month, minYear, maxYear, onPick }: CalendarPickerProps) {
  const [view, setView] = useState<"months" | "years">("months");
  const [draftYear, setDraftYear] = useState(year);
  const [pageStart, setPageStart] = useState(() => Math.floor((year - minYear) / YEARS_PER_PAGE) * YEARS_PER_PAGE + minYear);

  if (view === "years") {
    const years = Array.from({ length: YEARS_PER_PAGE }, (_, i) => pageStart + i).filter(
      (value) => value >= minYear && value <= maxYear,
    );
    return (
      <div className="cal__picker" role="dialog" aria-label="انتخاب سال">
        <CalendarHeader
          title={`${toPersianDigits(years[0])} – ${toPersianDigits(years[years.length - 1])}`}
          pickerOpen
          prevLabel="سال‌های قبل"
          nextLabel="سال‌های بعد"
          prevDisabled={pageStart <= minYear}
          nextDisabled={pageStart + YEARS_PER_PAGE > maxYear}
          onPrev={() => setPageStart(pageStart - YEARS_PER_PAGE)}
          onNext={() => setPageStart(pageStart + YEARS_PER_PAGE)}
        />
        <div className="cal__picker-grid">
          {years.map((value) => (
            <button
              key={value}
              type="button"
              className="cal__picker-item"
              data-active={value === year || undefined}
              onClick={() => {
                setDraftYear(value);
                setView("months");
              }}
            >
              {toPersianDigits(value)}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="cal__picker" role="dialog" aria-label="انتخاب ماه و سال">
      <CalendarHeader
        title={toPersianDigits(draftYear)}
        pickerOpen
        prevLabel="سال قبل"
        nextLabel="سال بعد"
        prevDisabled={draftYear <= minYear}
        nextDisabled={draftYear >= maxYear}
        onTitleClick={() => {
          setPageStart(Math.floor((draftYear - minYear) / YEARS_PER_PAGE) * YEARS_PER_PAGE + minYear);
          setView("years");
        }}
        onPrev={() => setDraftYear(draftYear - 1)}
        onNext={() => setDraftYear(draftYear + 1)}
      />
      <div className="cal__picker-grid">
        {JALALI_MONTH_NAMES.map((name, index) => (
          <button
            key={name}
            type="button"
            className="cal__picker-item"
            data-active={(draftYear === year && index + 1 === month) || undefined}
            onClick={() => onPick(draftYear, index + 1)}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
