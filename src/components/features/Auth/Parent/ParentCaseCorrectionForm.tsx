import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import { AuthNotice } from "@/components/features/Auth/Parent/AuthNotice";
import { ParentConsentVideo } from "@/components/features/Auth/Parent/ParentConsentVideo";
import { ParentDocumentUpload } from "@/components/features/Auth/Parent/ParentDocumentUpload";
import { ParentReviewStatus } from "@/components/features/Auth/Parent/ParentReviewStatus";
import { Button } from "@/components/ui/Button";
import type { ParentAccount } from "@/types/Auth/parentAuth";

const MAX_IDENTITY_BYTES = 5 * 1024 * 1024;
const MAX_VIDEO_BYTES = 50 * 1024 * 1024;

interface ParentCaseCorrectionFormProps {
  parent: ParentAccount;
}

export function ParentCaseCorrectionForm({
  parent,
}: ParentCaseCorrectionFormProps) {
  const navigate = useNavigate();

  const [identityDocument, setIdentityDocument] =
    useState<File | null>(null);
  const [consentVideo, setConsentVideo] =
    useState<File | null>(null);
  const [identityError, setIdentityError] =
    useState<string | undefined>();
  const [videoError, setVideoError] =
    useState<string | undefined>();
  const [submitted, setSubmitted] =
    useState(false);

  const validate = () => {
    let valid = true;

    if (!identityDocument) {
      setIdentityError(
        "تصویر اصلاح‌شده مدرک هویتی را انتخاب کن.",
      );
      valid = false;
    } else if (
      !["image/png", "image/jpeg"].includes(
        identityDocument.type,
      )
    ) {
      setIdentityError(
        "فرمت مدرک باید PNG یا JPEG باشد.",
      );
      valid = false;
    } else if (
      identityDocument.size > MAX_IDENTITY_BYTES
    ) {
      setIdentityError(
        "حجم تصویر نباید بیشتر از ۵ مگابایت باشد.",
      );
      valid = false;
    } else {
      setIdentityError(undefined);
    }

    if (!consentVideo) {
      setVideoError(
        "ویدئوی اصلاح‌شده رضایت را انتخاب یا ضبط کن.",
      );
      valid = false;
    } else if (
      ![
        "video/mp4",
        "video/quicktime",
        "video/webm",
      ].includes(consentVideo.type)
    ) {
      setVideoError(
        "فرمت ویدئو باید MP4، MOV یا WebM باشد.",
      );
      valid = false;
    } else if (
      consentVideo.size > MAX_VIDEO_BYTES
    ) {
      setVideoError(
        "حجم ویدئو نباید بیشتر از ۵۰ مگابایت باشد.",
      );
      valid = false;
    } else {
      setVideoError(undefined);
    }

    return valid;
  };

  const handleSubmit = (
    event: React.FormEvent,
  ) => {
    event.preventDefault();

    if (!validate()) return;

    /**
     * IMPORTANT:
     * The supplied Swagger currently has no parent "edit/resubmit review"
     * endpoint. Keep the full UI ready, but do not fake a network request.
     */
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="space-y-4">
        <AuthNotice tone="success">
          فایل‌های اصلاح‌شده در رابط کاربری آماده ارسال
          هستند.
        </AuthNotice>

        <AuthNotice tone="warning">
          Endpoint ارسال مجدد پرونده والد هنوز در Swagger
          فعلی وجود ندارد؛ بنابراین این مرحله فعلاً به
          Backend ارسال نشده است.
        </AuthNotice>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            type="button"
            fullWidth
            onClick={() =>
              navigate("/parent/case")
            }
          >
            بازگشت به پیگیری پرونده
          </Button>

          <Button
            type="button"
            variant="secondary"
            fullWidth
            onClick={() => setSubmitted(false)}
          >
            ویرایش دوباره فایل‌ها
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-caption font-bold text-error">
            اصلاح پرونده
          </p>
          <h1 className="mt-1 text-page-title font-black text-text-primary">
            مدارک را اصلاح و دوباره آماده کن
          </h1>
          <p className="mt-1 text-label leading-7 text-text-secondary">
            پیام مدیر را بخوان و نسخه واضح و صحیح مدارک
            را بارگذاری کن.
          </p>
        </div>

        <ParentReviewStatus
          status="rejected"
        />
      </div>

      <AuthNotice tone="error">
        <b className="block">
          علت نیاز به اصلاح
        </b>
        <span className="mt-1 block">
          {parent.admin_review_message ||
            "مدیر سامانه برای پرونده پیام اصلاح ثبت کرده است."}
        </span>
      </AuthNotice>

      <div className="rounded-xl border border-border-decorative bg-background-page p-4">
        <dl className="grid gap-3 text-caption sm:grid-cols-2">
          <div>
            <dt className="text-text-secondary">
              نام والد
            </dt>
            <dd className="mt-1 font-bold text-text-primary">
              {parent.first_name} {parent.last_name}
            </dd>
          </div>
          <div>
            <dt className="text-text-secondary">
              شماره موبایل
            </dt>
            <dd
              dir="ltr"
              className="mt-1 text-end font-bold text-text-primary"
            >
              {parent.phone}
            </dd>
          </div>
        </dl>
      </div>

      <ParentDocumentUpload
        file={identityDocument}
        error={identityError}
        onChange={(file) => {
          setIdentityDocument(file);
          setIdentityError(undefined);
        }}
      />

      <ParentConsentVideo
        file={consentVideo}
        error={videoError}
        onChange={(file) => {
          setConsentVideo(file);
          setVideoError(undefined);
        }}
      />

      <AuthNotice>
        نام، شماره موبایل و نسبت والد از حساب ثبت‌شده
        خوانده می‌شوند و در این مرحله قابل تغییر نیستند.
      </AuthNotice>

      <div className="flex flex-col-reverse gap-2 sm:flex-row">
        <Link
          to="/parent/case"
          className="btn sm:min-w-32"
          data-variant="secondary"
          data-size="md"
          data-color="blue"
        >
          انصراف
        </Link>

        <Button
          type="submit"
          fullWidth
        >
          آماده‌سازی ارسال مجدد
        </Button>
      </div>
    </form>
  );
}
