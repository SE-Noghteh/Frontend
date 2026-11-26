import DatePickerModule from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import type { DateObject } from "react-multi-date-picker";

const DatePickerLib = (DatePickerModule as any).default || DatePickerModule;

interface DatePickerProps {
  label: string;
  value: DateObject | null;
  onChange: (date: DateObject | null) => void;
  isRequired?: boolean;
  error?: string;
  maxDate?: DateObject;
}

export function DatePicker({ 
  label, 
  value, 
  onChange, 
  isRequired, 
  error,
  maxDate
}: DatePickerProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-label text-text-primary font-medium">
        {label} {isRequired && <span className="text-status-error">*</span>}
      </label>
      
      <div className="relative w-full">
        <DatePickerLib
          value={value}
          onChange={onChange}
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-right"
          maxDate={maxDate}
          format="YYYY/MM/DD"
          editable={false}
          className="w-full"
          render={(value: string, openCalendar: () => void) => (
            <div
              onClick={openCalendar}
              className={`w-full appearance-none rounded-md border px-3 py-2 text-body text-text-primary focus:outline-none focus:ring-1 focus:ring-focus-ring transition-colors bg-surface-card cursor-pointer flex items-center justify-between h-[42px]
              ${
                error ? "border-status-error" : "border-border-decorative"
              }`}
            >
              <span className={value ? "text-text-primary" : "text-text-disabled"}>
                {value || "انتخاب تاریخ تولد"}
              </span>
              
              <div className="pointer-events-none text-text-secondary mr-2 flex items-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
            </div>
          )}
        />
      </div>
      
      {error && (
        <p className="text-caption text-status-error mt-1">{error}</p>
      )}
    </div>
  );
}