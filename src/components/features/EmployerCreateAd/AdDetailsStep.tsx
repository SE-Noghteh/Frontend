
import { useState } from "react";
import { CloudUpload, FileText, X } from "lucide-react";
import { SKILL_LEVEL_LABELS, SKILL_LEVEL_OPTIONS, levelFromLabel, ATTACHMENT_ACCEPT, validateAttachments } from "@/utils/employerAdFields";
import { AdFormField } from "./AdFormField";

import { Dropdown } from "@/components/ui/Dropdown";
import { MultiSelectDropdown } from "@/components/ui/MultiSelectDropdown";
import { skillOptions } from "@/data/skillOptions";

import type {
  CreateAdForm,
  CreateAdErrors,
} from "@/types/Employer/createAd";

interface AdDetailsStepProps {
  form: CreateAdForm;
  hideAttachments?: boolean;
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
  hideAttachments = false,
}: AdDetailsStepProps) {
  const isInternship = form.kind === "internship";
  const [attachmentError, setAttachmentError] = useState("");

  function addAttachments(files: File[]) {
    const next = [...form.attachments, ...files];
    const error = validateAttachments(next);
    if (error) { setAttachmentError(error); return; }
    setAttachmentError("");
    updateField("attachments", next);
  }

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
          renderOptionAccessory={(skill, selected) => selected ? (
            <div className="w-28 shrink-0">
              <label htmlFor={`employer-skill-level-${skillOptions.indexOf(skill)}`} className="sr-only">
                سطح مهارت {skill}
              </label>
              <Dropdown
                id={`employer-skill-level-${skillOptions.indexOf(skill)}`}
                value={form.skillLevels[skill] ? SKILL_LEVEL_LABELS[form.skillLevels[skill]!] : ""}
                options={SKILL_LEVEL_OPTIONS}
                placeholder="انتخاب سطح"
                className="h-8! min-h-8! gap-1! px-2! py-1! text-caption! [&_svg]:size-3.5"
                onChange={label => {
                  const next = { ...form.skillLevels };
                  const level = levelFromLabel(label);
                  if (level) next[skill] = level;
                  else delete next[skill];
                  updateField("skillLevels", next);
                }}
              />
            </div>
          ) : null}
          formatSelectedOption={skill => {
            const level = form.skillLevels[skill];
            return level ? `${skill} (${SKILL_LEVEL_LABELS[level]})` : `${skill} (تعیین نشده)`;
          }}
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

      {!isInternship && !hideAttachments && (
        <div className="flex min-w-0 flex-col gap-2">
          <p className="text-label font-bold">پیوست‌های آگهی (اختیاری)</p>
          <label
            className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed border-ocean-blue p-5 text-center focus-within:ring-2 focus-within:ring-blue"
            onDragOver={event => event.preventDefault()}
            onDrop={event => { event.preventDefault(); addAttachments(Array.from(event.dataTransfer.files)); }}
          >
            <CloudUpload size={28} className="text-blue" aria-hidden="true" />
            <span className="text-label font-bold">انتخاب فایل یا کشیدن فایل به اینجا</span>
            <span className="text-caption text-text-secondary">PDF، PNG، JPG — حداکثر ۵ فایل، هر فایل ۱۰ مگابایت</span>
            <input type="file" multiple accept={ATTACHMENT_ACCEPT} className="sr-only"
              aria-label="انتخاب پیوست‌های آگهی"
              onChange={event => { addAttachments(Array.from(event.currentTarget.files ?? [])); event.currentTarget.value = ""; }} />
          </label>
          {(attachmentError || errors.attachments) && <p role="alert" className="text-caption text-error">{attachmentError || errors.attachments}</p>}
          {form.attachments.map((file, index) => (
            <div key={`${index}-${file.name}`} className="flex min-w-0 items-center gap-2 rounded-lg border border-border-soft p-3">
              <FileText size={18} className="shrink-0 text-blue" aria-hidden="true" />
              <span className="min-w-0 flex-1 break-all text-label">{file.name}</span>
              <span className="shrink-0 text-caption text-text-secondary">{(file.size / 1024 / 1024).toLocaleString("fa-IR", { maximumFractionDigits: 2 })} MB</span>
              <button type="button" className="shrink-0 rounded p-1 text-error" aria-label={`حذف ${file.name}`}
                onClick={() => { setAttachmentError(""); updateField("attachments", form.attachments.filter((_, i) => i !== index)); }}><X size={18} /></button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
