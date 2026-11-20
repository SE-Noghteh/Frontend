import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { DatePicker } from "@/components/ui/DatePicker";
import { AgeStatusBox } from "./AgeStatusBox";
import { Toast } from "@/components/ui/Toast";
import type { RegisterBasicFormValues } from "@/schemas/registerJobSeekerSchema";

type AgeMode = "minor" | "adult" | null;

const MINOR_VARIANT =
  "bg-surface-warning border-status-warning text-status-warning";
const ADULT_VARIANT =
  "bg-surface-info border-interface-secondary text-action-primary";

export function FormBirthDateInput() {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<RegisterBasicFormValues>();

  const birthDateObj = watch("birthDateObj") as DateObject | null;
  const year = birthDateObj?.year?.toString() || "";
  const month = birthDateObj?.month?.number?.toString() || "";
  const day = birthDateObj?.day?.toString() || "";

  const currentDate = new DateObject({ calendar: persian, locale: persian_fa });

  const [ageMode, setAgeMode] = useState<AgeMode>(null);

  useEffect(() => {
    if (!year || !month || !day) {
      setAgeMode(null);
      return;
    }

    const y = parseInt(year, 10);
    const m = parseInt(month, 10);
    const d = parseInt(day, 10);

    const formatter = new Intl.DateTimeFormat("en-US-u-ca-persian", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
    const now = new Date();
    const parts = formatter.formatToParts(now);
    const currentYear = parseInt(parts.find(p => p.type === "year")!.value, 10);
    const currentMonth = parseInt(parts.find(p => p.type === "month")!.value, 10);
    const currentDay = parseInt(parts.find(p => p.type === "day")!.value, 10);

    let age = currentYear - y;
    if (currentMonth < m || (currentMonth === m && currentDay < d)) age--;

    if (age < 15 || age > 22) {
      setAgeMode(null); 
    } else if (age >= 15 && age < 18) {
      setAgeMode("minor");
    } else {
      setAgeMode("adult");
    }
  }, [year, month, day]);

  const toastContent =
    ageMode === "minor"
      ? {
          title: "برای شروع کار، تأیید والد لازم است",
          description:
            "در گروه سنی ۱۵ تا ۱۷ سال هستی. می‌توانی ثبت‌نام را ادامه بدهی؛ ارسال درخواست کار به تکمیل اطلاعات والد و تأیید او نیاز دارد.",
          variantClass: MINOR_VARIANT,
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          ),
        }
      : ageMode === "adult"
      ? {
          title: "می‌توانی بدون نیاز به اطلاعات والد ثبت‌نام را ادامه بدی",
          description: "",
          variantClass: ADULT_VARIANT,
          icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          ),
        }
      : null;

  return (
    <div className="flex flex-col gap-1.5">
      <Controller
        name="birthDateObj"
        control={control}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            label="تاریخ تولد شمسی"
            isRequired
            value={(value as DateObject) || null}
            onChange={(date) => {
              onChange(date); 
            }}
            maxDate={currentDate}
            error={errors.birthDateObj?.message as string}
          />
        )}
      />

      <AgeStatusBox year={year} month={month} day={day} />

      {toastContent && (
        <Toast
          title={toastContent.title}
          description={toastContent.description}
          icon={toastContent.icon}
          variantClass={toastContent.variantClass}
          onClose={() => setAgeMode(null)}
          duration={7000}
        />
      )}
    </div>
  );
}