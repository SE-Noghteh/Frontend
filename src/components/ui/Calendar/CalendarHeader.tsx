import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarHeaderProps {
  title: string;
  pickerOpen: boolean;
  prevLabel: string;
  nextLabel: string;
  prevDisabled?: boolean;
  nextDisabled?: boolean;
  /** Title is a button that opens the picker only when this is provided. */
  onTitleClick?: () => void;
  onPrev: () => void;
  onNext: () => void;
}

/** Title row: previous / title (opens the month & year picker) / next. Chevrons mirror in RTL. */
export function CalendarHeader({
  title,
  pickerOpen,
  prevLabel,
  nextLabel,
  prevDisabled,
  nextDisabled,
  onTitleClick,
  onPrev,
  onNext,
}: CalendarHeaderProps) {
  return (
    <div className="cal__header">
      <button type="button" className="cal__nav" onClick={onPrev} disabled={prevDisabled} aria-label={prevLabel}>
        <ChevronRight aria-hidden="true" />
      </button>
      {onTitleClick ? (
        <button
          type="button"
          className="cal__title cal__title--button"
          onClick={onTitleClick}
          aria-expanded={pickerOpen}
          aria-haspopup="dialog"
        >
          {title}
        </button>
      ) : (
        <span className="cal__title">{title}</span>
      )}
      <button type="button" className="cal__nav" onClick={onNext} disabled={nextDisabled} aria-label={nextLabel}>
        <ChevronLeft aria-hidden="true" />
      </button>
    </div>
  );
}
