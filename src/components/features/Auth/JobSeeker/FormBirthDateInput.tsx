import { Controller, useFormContext } from "react-hook-form";
import { DateObject } from "react-multi-date-picker"; 
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { DatePicker } from "@/components/ui/DatePicker";
import { AgeStatusBox } from "./AgeStatusBox"; 
import type { RegisterBasicFormValues } from "@/schemas/registerJobSeekerSchema";

export function FormBirthDateInput() {
  const { control, watch, formState: { errors } } = useFormContext<RegisterBasicFormValues>();

  const birthDateObj = watch("birthDateObj") as DateObject | null;
  const year = birthDateObj?.year?.toString() || "";
  const month = birthDateObj?.month?.number?.toString() || "";
  const day = birthDateObj?.day?.toString() || "";

  const currentDate = new DateObject({ calendar: persian, locale: persian_fa });

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
      
      {year && month && day && (
        <AgeStatusBox year={year} month={month} day={day} />
      )}
    </div>
  );
}