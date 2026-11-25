
import { AdFormField } from "./AdFormField";

import { MultiSelectDropdown } from "@/components/ui/MultiSelectDropdown";
import { skillOptions } from "@/data/skillOptions";

import type {
  CreateAdForm,
  CreateAdErrors,
} from "@/types/Employer/createAd";

interface AdDetailsStepProps {
  form: CreateAdForm;
  errors: CreateAdErrors;
  updateField: <K extends keyof CreateAdForm>(
    key: K,
    value: CreateAdForm[K],
  ) => void;
}

const CATEGORIES = [
  "طراحی و گرافیک",
  "تولید محتوا",
  "برنامه‌نویسی",
  "بازاریابی",
  "عکاسی و تدوین",
  "سایر",
];

export function AdDetailsStep({
  form,
  errors,
  updateField,
}: AdDetailsStepProps) {
  const isInternship = form.kind === "internship";

  return (
    <div className="flex min-w-0 flex-col gap-5">

      {/* Section title */}

      <h2 className="text-card-title font-bold">
        {isInternship
          ? "مشخصات کارآموزی"
          : "مشخصات آگهی"}
      </h2>

      {/* Ad title */}

      <AdFormField
        label="عنوان آگهی"
        value={form.title}
        onChange={(value) =>
          updateField("title", value)
        }
        error={errors.title}
        placeholder="مثلاً طراحی پست‌های پاییز"
      />

      {/* Category */}

      <AdFormField
        label={
          isInternship
            ? "حوزه کارآموزی"
            : "دسته‌بندی"
        }
        type="select"
        options={CATEGORIES}
        value={form.category}
        onChange={(value) =>
          updateField("category", value)
        }
        error={errors.category}
      />

      {/* Required skills */}

      <div className="flex min-w-0 flex-col gap-2">

        <label
          htmlFor="employer-skills"
          className="text-label font-bold text-text-primary"
        >
          مهارت‌های موردنیاز
        </label>

        <MultiSelectDropdown
          id="employer-skills"
          options={skillOptions}
          value={form.skills}
          onChange={(value) =>
            updateField("skills", value)
          }
          placeholder="مهارت‌های موردنیاز را انتخاب کنید"
          error={Boolean(errors.skills)}
        />

        {errors.skills && (
          <p
            role="alert"
            className="text-caption text-error"
          >
            {errors.skills}
          </p>
        )}

      </div>

      {/* Description */}

      <AdFormField
        label={
          isInternship
            ? "شرح کارآموزی"
            : "شرح کار"
        }
        type="textarea"
        value={form.description}
        onChange={(value) =>
          updateField("description", value)
        }
        error={errors.description}
      />

      {/* Expected deliverables */}

      <AdFormField
        label={
          isInternship
            ? "اهداف یادگیری"
            : "خروجی مورد انتظار"
        }
        type="textarea"
        value={form.deliverables}
        onChange={(value) =>
          updateField("deliverables", value)
        }
      />

      {/* Delivery format */}

      <AdFormField
        label="فرمت تحویل یا پیش‌نیازها"
        value={form.deliveryFormat}
        onChange={(value) =>
          updateField("deliveryFormat", value)
        }
      />

    </div>
  );
}
