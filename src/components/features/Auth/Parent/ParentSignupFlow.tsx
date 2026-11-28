import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { AuthField } from "@/components/features/Auth/Parent/AuthField";
import { AuthNotice } from "@/components/features/Auth/Parent/AuthNotice";
import { ParentConsentVideo } from "@/components/features/Auth/Parent/ParentConsentVideo";
import { ParentDocumentUpload } from "@/components/features/Auth/Parent/ParentDocumentUpload";
import { ParentOtpDialog } from "@/components/features/Auth/Parent/ParentOtpDialog";
import {
  isValidParentPassword,
  ParentPasswordCriteria,
} from "@/components/features/Auth/Parent/ParentPasswordCriteria";
import { ParentStepper } from "@/components/features/Auth/Parent/ParentStepper";
import { Button } from "@/components/ui/Button";
import { Dropdown } from "@/components/ui/Dropdown";
import {
  getParentAuthErrorMessage,
  resendParentSignupOtp,
  submitParentSignup,
  validateParentInvitation,
  verifyParentSignupOtp,
} from "@/services/Auth/Parent/parentAuthService";
import { normalizeInvitationCode } from "@/utils/normalizeDigits";
import type {
  OtpResponse,
  ParentInvitationInfo,
  ParentRelationship,
  ParentSignupResponse,
} from "@/types/Auth/parentAuth";

const RELATION_LABEL: Record<
  ParentRelationship,
  string
> = {
  father: "پدر",
  mother: "مادر",
  guardian: "سرپرست",
};

const LABEL_TO_RELATION = Object.fromEntries(
  Object.entries(RELATION_LABEL).map(
    ([value, label]) => [label, value],
  ),
) as Record<string, ParentRelationship>;

const MAX_IDENTITY_BYTES = 5 * 1024 * 1024;
const MAX_VIDEO_BYTES = 50 * 1024 * 1024;

interface FormErrors {
  relationship?: string;
  password?: string;
  confirmPassword?: string;
  identity?: string;
  video?: string;
  consent?: string;
  global?: string;
}

function validateIdentityFile(
  file: File | null,
): string | undefined {
  if (!file) return "تصویر مدرک هویتی را انتخاب کن.";

  if (
    !["image/png", "image/jpeg"].includes(file.type)
  ) {
    return "فرمت مدرک باید PNG یا JPEG باشد.";
  }

  if (file.size > MAX_IDENTITY_BYTES) {
    return "حجم تصویر نباید بیشتر از ۵ مگابایت باشد.";
  }

  return undefined;
}

function validateVideoFile(
  file: File | null,
): string | undefined {
  if (!file) return "ویدئوی رضایت را بارگذاری یا ضبط کن.";

  if (
    ![
      "video/mp4",
      "video/quicktime",
      "video/webm",
    ].includes(file.type)
  ) {
    return "فرمت ویدئو باید MP4، MOV یا WebM باشد.";
  }

  if (file.size > MAX_VIDEO_BYTES) {
    return "حجم ویدئو نباید بیشتر از ۵۰ مگابایت باشد.";
  }

  return undefined;
}

export function ParentSignupFlow() {
  const [searchParams] = useSearchParams();

  const initialCode =
    searchParams.get("code")?.trim() ?? "";

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [code, setCode] = useState(normalizeInvitationCode(initialCode));
  const [invitation, setInvitation] =
    useState<ParentInvitationInfo | null>(null);

  const [relationship, setRelationship] =
    useState<ParentRelationship | "">("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [identityDocument, setIdentityDocument] =
    useState<File | null>(null);
  const [consentVideo, setConsentVideo] =
    useState<File | null>(null);
  const [consentAccepted, setConsentAccepted] =
    useState(false);

  const [errors, setErrors] =
    useState<FormErrors>({});
  const [inviteError, setInviteError] =
    useState<string | null>(null);
  const [isCheckingInvite, setIsCheckingInvite] =
    useState(false);
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [otpOpen, setOtpOpen] = useState(false);
  const [otpInfo, setOtpInfo] =
    useState<OtpResponse | null>(null);
  const [otpError, setOtpError] =
    useState<string | null>(null);
  const [isVerifyingOtp, setIsVerifyingOtp] =
    useState(false);
  const [isResendingOtp, setIsResendingOtp] =
    useState(false);

  const [result, setResult] =
    useState<ParentSignupResponse | null>(null);

  const relationLabel = useMemo(
    () =>
      relationship
        ? RELATION_LABEL[relationship]
        : "",
    [relationship],
  );

  const handleValidateInvitation = async (
    event: React.FormEvent,
  ) => {
    event.preventDefault();

    if (!code.trim()) {
      setInviteError("کد دعوت را وارد کن.");
      return;
    }

    setIsCheckingInvite(true);
    setInviteError(null);

    try {
      const data = await validateParentInvitation(
        normalizeInvitationCode(code),
      );

      setInvitation(data);
      setStep(2);
    } catch (error) {
      setInviteError(
        getParentAuthErrorMessage(
          error,
          "کد دعوت معتبر نیست یا منقضی شده است.",
        ),
      );
    } finally {
      setIsCheckingInvite(false);
    }
  };

  const validateForm = (): boolean => {
    const next: FormErrors = {};

    if (!relationship) {
      next.relationship =
        "نسبت خود با کارجو را انتخاب کن.";
    }

    if (!isValidParentPassword(password)) {
      next.password =
        "رمز عبور باید بین ۸ تا ۷۲ بایت باشد.";
    }

    if (confirmPassword !== password) {
      next.confirmPassword =
        "تکرار رمز عبور یکسان نیست.";
    }

    next.identity =
      validateIdentityFile(identityDocument);
    next.video = validateVideoFile(consentVideo);

    if (!consentAccepted) {
      next.consent =
        "برای ادامه باید رضایت و قوانین را تأیید کنی.";
    }

    setErrors(next);

    return Object.values(next).every(
      (value) => !value,
    );
  };

  const handleSubmitSignup = async (
    event: React.FormEvent,
  ) => {
    event.preventDefault();

    const formIsValid = validateForm();

    if (
      !invitation ||
      !relationship ||
      !identityDocument ||
      !consentVideo ||
      !formIsValid
    ) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await submitParentSignup({
        code: normalizeInvitationCode(code),
        relationship,
        password,
        consentAccepted,
        identityDocument,
        consentVideo,
      });

      setOtpInfo(response);
      setOtpError(null);
      setOtpOpen(true);
      setStep(3);
    } catch (error) {
      setErrors({
        global: getParentAuthErrorMessage(error),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    if (!invitation) return;

    setIsVerifyingOtp(true);
    setOtpError(null);

    try {
      const response =
        await verifyParentSignupOtp(
          invitation.phone,
          otp,
        );

      setResult(response);
      setOtpOpen(false);
      setStep(3);
    } catch (error) {
      setOtpError(
        getParentAuthErrorMessage(
          error,
          "کد تأیید درست نیست یا اعتبارش تمام شده است.",
        ),
      );
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleResendOtp = async () => {
    setIsResendingOtp(true);
    setOtpError(null);

    try {
      const response =
        await resendParentSignupOtp(normalizeInvitationCode(code));
      setOtpInfo(response);
    } catch (error) {
      setOtpError(
        getParentAuthErrorMessage(error),
      );
    } finally {
      setIsResendingOtp(false);
    }
  };

  if (result) {
    return (
      <div className="mx-auto w-full max-w-[650px]">
        <ParentStepper step={3} />

        <div className="rounded-2xl border border-success/20 bg-success-soft p-6 text-center">
          <h1 className="text-section-title font-black text-text-primary">
            حساب والد ساخته شد
          </h1>
          <p className="mt-2 text-label leading-7 text-text-secondary">
            {result.first_name} {result.last_name}، شماره
            همراهت تأیید شد و حساب با موفقیت ایجاد شد.
          </p>

          {result.admin_approval_status ===
          "pending" ? (
            <AuthNotice
              tone="warning"
              className="mt-4 text-start"
            >
              مدارک برای بررسی مدیر سامانه ثبت شده‌اند.
              پس از تأیید، امکانات مربوط به والد فعال
              می‌شوند.
            </AuthNotice>
          ) : null}

          <Link
            to="/parent/login"
            className="btn mt-5"
            data-variant="primary"
            data-size="md"
            data-color="blue"
          >
            ورود و پیگیری پرونده
          </Link>
        </div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <form
        onSubmit={handleValidateInvitation}
        className="mx-auto w-full max-w-[620px]"
      >
        <ParentStepper step={1} />

        <h1 className="text-page-title font-black text-text-primary">
          ساخت حساب والد
        </h1>
        <p className="mt-1 text-label leading-7 text-text-secondary">
          برای امنیت کارجو، ساخت حساب والد فقط با کد
          دعوتی که از طرف کارجو دریافت کرده‌ای امکان‌پذیر
          است.
        </p>

        <div className="mt-5">
          <AuthField
            label="کد دعوت"
            requiredMark
            dir="rtl"
            autoComplete="one-time-code"
            placeholder="کد دعوت"
            value={code}
            error={inviteError ?? undefined}
            helperText="کد را دقیقاً مطابق پیام دعوت وارد کن."
            onChange={(event) => {
              setCode(normalizeInvitationCode(event.target.value));
              setInviteError(null);
            }}
          />
        </div>

        <Button
          type="submit"
          fullWidth
          loading={isCheckingInvite}
          className="mt-5"
        >
          بررسی کد دعوت
        </Button>

        <p className="mt-4 text-center text-caption text-text-secondary">
          قبلاً حساب ساخته‌ای؟{" "}
          <Link
            to="/parent/login"
            className="font-bold text-action-primary hover:underline"
          >
            ورود والد
          </Link>
        </p>
      </form>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmitSignup}
        className="mx-auto w-full max-w-[680px]"
      >
        <ParentStepper step={step} />

        <div>
          <h1 className="text-page-title font-black text-text-primary">
            تکمیل اطلاعات والد
          </h1>
          <p className="mt-1 text-label leading-7 text-text-secondary">
            اطلاعات هویتی از دعوت کارجو دریافت شده و
            قابل تغییر نیست.
          </p>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <AuthField
            label="نام و نام خانوادگی"
            value={
              invitation
                ? `${invitation.first_name} ${invitation.last_name}`
                : ""
            }
            disabled
            readOnly
          />

          <AuthField
            label="شماره موبایل"
            value={invitation?.phone ?? ""}
            dir="ltr"
            disabled
            readOnly
          />
        </div>

        {invitation?.job_seeker_first_name ? (
          <AuthNotice className="mt-4">
            این دعوت از طرف کارجو{" "}
            <b>{invitation.job_seeker_first_name}</b>{" "}
            ثبت شده است.
          </AuthNotice>
        ) : null}

        <div className="mt-5">
          <label className="mb-1.5 block text-label font-medium text-text-primary">
            نسبت با کارجو{" "}
            <span className="text-error">*</span>
          </label>

          <Dropdown
            value={relationLabel}
            options={Object.values(RELATION_LABEL)}
            placeholder="انتخاب نسبت"
            error={Boolean(errors.relationship)}
            onChange={(label) => {
              setRelationship(
                LABEL_TO_RELATION[label],
              );
              setErrors((current) => ({
                ...current,
                relationship: undefined,
              }));
            }}
          />

          {errors.relationship ? (
            <p className="mt-1 text-caption text-error">
              {errors.relationship}
            </p>
          ) : null}
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <AuthField
            label="رمز عبور"
            requiredMark
            password
            dir="ltr"
            value={password}
            error={errors.password}
            onChange={(event) => {
              setPassword(event.target.value);
              setErrors((current) => ({
                ...current,
                password: undefined,
              }));
            }}
          />

          <AuthField
            label="تکرار رمز عبور"
            requiredMark
            password
            dir="ltr"
            value={confirmPassword}
            error={errors.confirmPassword}
            onChange={(event) => {
              setConfirmPassword(
                event.target.value,
              );
              setErrors((current) => ({
                ...current,
                confirmPassword: undefined,
              }));
            }}
          />
        </div>

        <div className="mt-3">
          <ParentPasswordCriteria
            password={password}
            confirmPassword={confirmPassword}
            showMatch
          />
        </div>

        <div className="mt-6">
          <ParentDocumentUpload
            file={identityDocument}
            error={errors.identity}
            onChange={(file) => {
              setIdentityDocument(file);
              setErrors((current) => ({
                ...current,
                identity: undefined,
              }));
            }}
          />
        </div>

        <div className="mt-6">
          <ParentConsentVideo
            file={consentVideo}
            error={errors.video}
            onChange={(file) => {
              setConsentVideo(file);
              setErrors((current) => ({
                ...current,
                video: undefined,
              }));
            }}
          />
        </div>

        <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl border border-border-decorative bg-background-page p-3">
          <input
            type="checkbox"
            checked={consentAccepted}
            onChange={(event) => {
              setConsentAccepted(
                event.target.checked,
              );
              setErrors((current) => ({
                ...current,
                consent: undefined,
              }));
            }}
            className="mt-1 size-4 shrink-0 accent-action-primary"
          />

          <span>
            <span className="text-label font-bold text-text-primary">
              قوانین را می‌پذیرم و رضایت خود را برای
              اتصال حساب والد به حساب کارجو تأیید می‌کنم.
            </span>
            <span className="mt-1 block text-caption leading-6 text-text-secondary">
              این تأیید به معنی پذیرش مسئولیت والد در
              فرایندهای مرتبط با کارجوی زیر ۱۸ سال است.
            </span>
          </span>
        </label>

        {errors.consent ? (
          <p className="mt-1 text-caption text-error">
            {errors.consent}
          </p>
        ) : null}

        {errors.global ? (
          <AuthNotice tone="error" className="mt-4">
            {errors.global}
          </AuthNotice>
        ) : null}

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setStep(1)}
            className="sm:min-w-32"
          >
            بازگشت
          </Button>

          <Button
            type="submit"
            fullWidth
            loading={isSubmitting}
          >
            ثبت اطلاعات و ارسال کد
          </Button>
        </div>
      </form>

      <ParentOtpDialog
        isOpen={otpOpen}
        phone={invitation?.phone ?? ""}
        title="تأیید شماره همراه"
        submitLabel="تأیید و ساخت حساب"
        expiresIn={otpInfo?.expires_in ?? 300}
        resendAfter={otpInfo?.resend_after ?? 60}
        error={otpError}
        isLoading={isVerifyingOtp}
        isResending={isResendingOtp}
        onVerify={handleVerifyOtp}
        onResend={handleResendOtp}
        onClose={() => {
          if (!isVerifyingOtp) setOtpOpen(false);
        }}
      />
    </>
  );
}
