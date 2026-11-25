
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
} from "@/utils/dateValidation";

export function useCreateEmployerAd() {
  const [step, setStep] = useState<CreateAdStep>(1);

  const [form, setForm] = useState<CreateAdForm>(
    INITIAL_CREATE_AD_FORM,
  );

  const [errors, setErrors] =
    useState<CreateAdErrors>({});

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
        const dateErrors = validateAdDates(
          nextForm.deadline,
          nextForm.deliveryDate,
          nextForm.kind === "internship",
        );

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

  function validateStep(): boolean {
    const nextErrors: CreateAdErrors = {};

    // Step 1: Ad type

    if (step === 1 && !form.kind) {
      nextErrors.kind = "نوع آگهی را انتخاب کنید";
    }

    // Step 2: Ad details

    if (step === 2) {
      if (!form.title.trim()) {
        nextErrors.title = "عنوان آگهی الزامی است";
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
        validateAdDates(
          form.deadline,
          form.deliveryDate,
          isInternship,
        ),
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
        if (!form.internshipDuration) {
          nextErrors.internshipDuration =
            "مدت دوره را انتخاب کنید";
        }

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

  function nextStep() {
    if (!validateStep()) return;

    setStep((previous) =>
      Math.min(previous + 1, 5) as CreateAdStep,
    );
  }

  function previousStep() {
    setErrors({});

    setStep((previous) =>
      Math.max(previous - 1, 1) as CreateAdStep,
    );
  }

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
