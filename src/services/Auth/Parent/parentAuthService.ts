import axios from "axios";

import { parentHttpClient } from "@/services/Auth/Parent/parentHttpClient";
import type {
  OtpResponse,
  ParentInvitationInfo,
  ParentLoginResponse,
  ParentSignupPayload,
  ParentSignupResponse,
  PasswordResetResponse,
  PasswordResetTokenResponse,
} from "@/types/Auth/parentAuth";

interface ApiErrorResponse {
  message?: string;
}

export function getParentAuthErrorMessage(
  error: unknown,
  fallback = "خطایی رخ داد. دوباره تلاش کن.",
): string {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const message = error.response?.data?.message?.trim();

    if (message) return message;

    if (error.response?.status === 401) {
      return "اطلاعات واردشده معتبر نیست.";
    }

    if (error.response?.status === 409) {
      return "این اطلاعات با وضعیت فعلی حساب سازگار نیست.";
    }

    if (error.response?.status === 413) {
      return "حجم فایل انتخاب‌شده بیشتر از حد مجاز است.";
    }

    if (error.response?.status === 429) {
      return "تعداد درخواست‌ها زیاد بوده است. کمی صبر کن و دوباره تلاش کن.";
    }

    if (error.response?.status === 503) {
      return "سرویس پیامک موقتاً در دسترس نیست.";
    }
  }

  return fallback;
}

export async function loginParent(
  phone: string,
  password: string,
): Promise<ParentLoginResponse> {
  const response = await parentHttpClient.post<ParentLoginResponse>(
    "/parents/login",
    { phone, password },
  );

  return response.data;
}


export async function getParentProfile() {
  const response = await parentHttpClient.get<ParentLoginResponse["data"]>(
    "/parents/me",
  );

  return response.data;
}

export async function logoutParent(): Promise<void> {
  await parentHttpClient.post("/parents/logout");
}

export async function validateParentInvitation(
  code: string,
): Promise<ParentInvitationInfo> {
  const response = await parentHttpClient.post<ParentInvitationInfo>(
    "/parents/invitations/validate",
    { code },
  );

  return response.data;
}

export async function submitParentSignup(
  payload: ParentSignupPayload,
): Promise<OtpResponse> {
  const form = new FormData();

  form.append("code", payload.code);
  form.append("relationship", payload.relationship);
  form.append("password", payload.password);
  form.append(
    "consent_accepted",
    payload.consentAccepted ? "true" : "false",
  );
  form.append("identity_document", payload.identityDocument);
  form.append("consent_video", payload.consentVideo);

  const response = await parentHttpClient.post<OtpResponse>(
    "/parents/signup",
    form,
  );

  return response.data;
}

export async function resendParentSignupOtp(
  code: string,
): Promise<OtpResponse> {
  const response = await parentHttpClient.post<OtpResponse>(
    "/parents/otp",
    { code },
  );

  return response.data;
}

export async function verifyParentSignupOtp(
  phone: string,
  otp: string,
): Promise<ParentSignupResponse> {
  const response = await parentHttpClient.post<ParentSignupResponse>(
    "/parents/verify-otp",
    { phone, otp },
  );

  return response.data;
}

export async function requestParentPasswordReset(
  phone: string,
): Promise<OtpResponse> {
  const response = await parentHttpClient.post<OtpResponse>(
    "/parents/forgot-password",
    { phone },
  );

  return response.data;
}

export async function verifyParentPasswordResetOtp(
  phone: string,
  otp: string,
): Promise<PasswordResetTokenResponse> {
  const response =
    await parentHttpClient.post<PasswordResetTokenResponse>(
      "/parents/verify-reset-otp",
      { phone, otp },
    );

  return response.data;
}

export async function setParentNewPassword(
  resetToken: string,
  newPassword: string,
): Promise<PasswordResetResponse> {
  const response = await parentHttpClient.post<PasswordResetResponse>(
    "/parents/reset-password",
    {
      reset_token: resetToken,
      new_password: newPassword,
    },
  );

  return response.data;
}
