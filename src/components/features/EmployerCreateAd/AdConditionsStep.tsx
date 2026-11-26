
import { AdFormField } from "./AdFormField";

import type {
  CreateAdForm,
  CreateAdErrors,
} from "@/types/Employer/createAd";

interface AdConditionsStepProps {
  form: CreateAdForm;
  errors: CreateAdErrors;
  updateField: <K extends keyof CreateAdForm>(
    key: K,
    value: CreateAdForm[K],
  ) => void;
}

export function AdConditionsStep({
  form,
  errors,
  updateField,
}: AdConditionsStepProps) {
  const isInternship = form.kind === "internship";

  return (
    <div className="flex flex-col gap-5">

      <h2 className="text-card-title font-bold">
        زمان و شرایط
      </h2>

      {isInternship && (
        <div className="flex flex-wrap gap-4">

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="allowance"
              checked={form.hasAllowance}
              onChange={() =>
                updateField("hasAllowance", true)
              }
              className="accent-blue"
            />
            با کمک‌هزینه
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="allowance"
              checked={!form.hasAllowance}
              onChange={() =>
                updateField("hasAllowance", false)
              }
              className="accent-blue"
            />
            بدون کمک‌هزینه
          </label>

        </div>
      )}

      
<div className="grid gap-4 md:grid-cols-2">

  <AdFormField
    label="مهلت درخواست"
    type="date"
    value={form.deadline}
    onChange={(value) =>
      updateField("deadline", value)
    }
    error={errors.deadline}
    placeholder="انتخاب مهلت درخواست"
  />

  <AdFormField
    label={
      isInternship
        ? "تاریخ شروع دوره"
        : "مهلت تحویل"
    }
    type="date"
    value={form.deliveryDate}
    onChange={(value) =>
      updateField("deliveryDate", value)
    }
    error={errors.deliveryDate}
    placeholder={
  isInternship
    ? "انتخاب تاریخ شروع دوره"
    : "انتخاب مهلت تحویل"
}
  />

</div>


      

      {isInternship && (
        <div className="grid gap-4 md:grid-cols-2">

          <AdFormField
  label="مدت دوره (هفته)"
  type="number"
  min={1}
  step={1}
  placeholder="تعداد هفته را وارد کنید"
  value={form.internshipDuration}
  onChange={(value) =>
    updateField("internshipDuration", value)
  }
  error={errors.internshipDuration}
/>

          <AdFormField
            label="ساعت کار در هفته"
            type="select"
            options={[
              "۵ ساعت",
              "۱۰ ساعت",
              "۱۵ ساعت",
              "۲۰ ساعت",
            ]}
            value={form.weeklyHours}
            onChange={(value) =>
              updateField("weeklyHours", value)
            }
            error={errors.weeklyHours}
          />

        </div>
      )}

      {(!isInternship || form.hasAllowance) && (
  <AdFormField
    label={
      isInternship
        ? "کمک‌هزینه (تومان)"
        : "بودجه همکاری (تومان)"
    }
    type="number"
    min={0}
    step={10000}
    placeholder="مبلغ موردنظر را وارد کنید"
    value={form.budget}
    onChange={(value) =>
      updateField("budget", value)
    }
    error={errors.budget}
  />
)}

      <div className="grid gap-4 md:grid-cols-2">

        <AdFormField
          label="نحوه همکاری"
          type="select"
          options={["آنلاین", "حضوری", "ترکیبی"]}
          value={form.collaborationMode}
          onChange={(value) =>
            updateField("collaborationMode", value)
          }
          error={errors.collaborationMode}
        />

        <AdFormField
          label="بازه سنی مجاز"
          type="select"
          options={[
            "۱۵ تا ۱۸ سال",
            "۱۸ سال به بالا",
            "همه افراد واجد شرایط",
          ]}
          value={form.ageRange}
          onChange={(value) =>
            updateField("ageRange", value)
          }
          error={errors.ageRange}
        />

      </div>

      

    </div>
  );
}
