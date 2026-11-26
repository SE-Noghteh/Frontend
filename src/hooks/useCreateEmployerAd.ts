
import { useState } from "react";

import {
  INITIAL_CREATE_AD_FORM,
} from "@/types/Employer/createAd";

import type {
  CreateAdForm,
  CreateAdErrors,
  CreateAdStep,
} from "@/types/Employer/createAd";

import {
  validateAdDates,
  isValidISODate,
} from "@/utils/dateValidation";

export function useCreateEmployerAd(
  initialForm: CreateAdForm = INITIAL_CREATE_AD_FORM,
  isEdit = false,
) {
  const [step, setStep] = useState<CreateAdStep>(1);

  const [originalForm] = useState<CreateAdForm>(
    () => ({
      ...initialForm,
      skills: [...initialForm.skills],
    }),
  );

  const [form, setForm] = useState<CreateAdForm>(
    () => ({
      ...initialForm,
      skills: [...initialForm.skills],
    }),
  );

  const [errors, setErrors] =
    useState<CreateAdErrors>({});

  // Date validation for create and edit modes

  function validateFormDates(
    currentForm: CreateAdForm,
  ) {
    const isInternship =
      currentForm.kind === "internship";

    const dateErrors = validateAdDates(
      currentForm.deadline,
      currentForm.deliveryDate,
      isInternship,
    );

    if (isEdit) {
      // Allow unchanged existing deadlines

      if (
        currentForm.deadline === originalForm.deadline &&
        dateErrors.deadline?.includes("قبل از امروز")
      ) {
        delete dateErrors.deadline;
      }

      // Allow unchanged existing delivery dates

      if (
        currentForm.deliveryDate ===
          originalForm.deliveryDate &&
        dateErrors.deliveryDate?.includes("قبل از امروز")
      ) {
        delete dateErrors.deliveryDate;
      }

      // Always validate the chronological order

      if (
        !dateErrors.deadline &&
        !dateErrors.deliveryDate &&
        isValidISODate(currentForm.deadline) &&
        isValidISODate(currentForm.deliveryDate) &&
        currentForm.deliveryDate <= currentForm.deadline
      ) {
        dateErrors.deliveryDate = isInternship
          ? "تاریخ شروع دوره باید بعد از مهلت درخواست باشد"
          : "مهلت تحویل باید بعد از مهلت درخواست باشد";
      }
    }

    return dateErrors;
  }

  // Update form fields

  function updateField<K extends keyof CreateAdForm>(
    key: K,
    value: CreateAdForm[K],
  ) {
    const nextForm = {
      ...form,
      [key]: value,
    };

    setForm(nextForm);

    setErrors((previous) => {
      const nextErrors = {
        ...previous,
        [key]: undefined,
      };

      // Revalidate both dates when either changes

      if (
        key === "deadline" ||
        key === "deliveryDate"
      ) {
        const dateErrors = validateFormDates(nextForm);

        nextErrors.deadline = nextForm.deadline
          ? dateErrors.deadline
          : undefined;

        nextErrors.deliveryDate = nextForm.deliveryDate
          ? dateErrors.deliveryDate
          : undefined;
      }

      return nextErrors;
    });
  }

  // Validate the current step

  function validateStep(): boolean {
    const nextErrors: CreateAdErrors = {};

    // Step 1: Ad type

    if (step === 1 && !form.kind) {
      nextErrors.kind =
        "نوع آگهی را انتخاب کنید";
    }

    // Step 2: Ad details

    if (step === 2) {
      if (!form.title.trim()) {
        nextErrors.title =
          "عنوان آگهی الزامی است";
      }

      if (!form.category) {
        nextErrors.category =
          "دسته‌بندی را انتخاب کنید";
      }

      if (!form.description.trim()) {
        nextErrors.description =
          "شرح آگهی را وارد کنید";
      }
    }

    // Step 3: Dates and conditions

    if (step === 3) {
      const isInternship =
        form.kind === "internship";

      // Date validation

      Object.assign(
        nextErrors,
        validateFormDates(form),
      );

      // Budget validation

      const requiresBudget =
        form.kind === "work" || form.hasAllowance;

      if (
        requiresBudget &&
        (
          !form.budget.trim() ||
          !Number.isFinite(Number(form.budget)) ||
          Number(form.budget) <= 0
        )
      ) {
        nextErrors.budget =
          "مبلغ معتبر وارد کنید";
      }

      // Collaboration mode

      if (!form.collaborationMode) {
        nextErrors.collaborationMode =
          "نحوه همکاری را مشخص کنید";
      }

      // Age range

      if (!form.ageRange) {
        nextErrors.ageRange =
          "بازه سنی را مشخص کنید";
      }

      // Internship-specific validation

      if (isInternship) {
        const duration = Number(
          form.internshipDuration,
        );

        // Duration in weeks

        if (
          !/^[0-9]+$/.test(form.internshipDuration) ||
          !Number.isSafeInteger(duration) ||
          duration <= 0
        ) {
          nextErrors.internshipDuration =
            "تعداد هفته باید یک عدد صحیح مثبت باشد";
        }

        // Weekly working hours

        if (!form.weeklyHours) {
          nextErrors.weeklyHours =
            "ساعت کار هفتگی را انتخاب کنید";
        }
      }
    }

    // Step 4: Review and confirmation

    if (step === 4 && !form.acceptedTerms) {
      nextErrors.acceptedTerms =
        "تأیید اطلاعات الزامی است";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  // Navigate to the next step

  function nextStep() {
    if (!validateStep()) return;

    const maxStep = isEdit ? 4 : 5;

    setStep((previous) =>
      Math.min(previous + 1, maxStep) as CreateAdStep,
    );
  }

  // Navigate to the previous step

  function previousStep() {
    setErrors({});

    setStep((previous) =>
      Math.max(previous - 1, 1) as CreateAdStep,
    );
  }

  // Navigate to a completed step

  function goToStep(target: CreateAdStep) {
    if (target >= step) return;

    setErrors({});
    setStep(target);
  }

  return {
    step,
    form,
    errors,
    updateField,
    validateStep,
    nextStep,
    previousStep,
    goToStep,
  };
}
