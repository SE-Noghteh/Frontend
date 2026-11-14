
import { apiClient } from "@/lib/apiClient";

import type {
  SignupResponse,
  RegisterBasicInfo,
} from "@/types/Auth/register";

import type {
  RegisterAccountFormValues,
} from "@/schemas/registerJobSeekerSchema";

import type {
  AuthResponse,
} from "@/types/Auth/authTypes";

export interface OtpResponse {
  expires_in: number;
  message: string;
  resend_after: number;
}

export interface SignupOptionsResponse {
  cities: string[];
  genders: string[];
  interests: string[];
}

const toFormString = (
  value: string | number | boolean | null | undefined
): string => {
  return value == null ? "" : String(value);
};

export const jobSeekerService = {
  sendOtp: async (phone: string): Promise<OtpResponse> => {
    const response = await apiClient.post<OtpResponse>(
      "/job-seekers/otp",
      { phone }
    );

    return response.data;
  },

  signup: async (
    basicData: RegisterBasicInfo,
    accountData: RegisterAccountFormValues
  ): Promise<SignupResponse> => {
    const formData = new FormData();

    formData.append("first_name", toFormString(basicData.firstName));
    formData.append("last_name", toFormString(basicData.lastName));
    formData.append("national_code", toFormString(basicData.nationalCode));
    formData.append("city", toFormString(basicData.city));
    formData.append("address", toFormString(basicData.address));

    formData.append("birth_year", toFormString(basicData.birthYear));
    formData.append("birth_month", toFormString(basicData.birthMonth));
    formData.append("birth_day", toFormString(basicData.birthDay));

    const genderMap: Record<string, string> = {
      "مرد": "male",
      "زن": "female",
      male: "male",
      female: "female",
    };

    const gender = genderMap[basicData.gender] ?? basicData.gender;

    formData.append("gender", toFormString(gender));

    if (Array.isArray(basicData.interests)) {
      basicData.interests.forEach((interest) => {
        formData.append("interests", toFormString(interest));
      });
    }

    formData.append("phone", toFormString(accountData.phone));
    formData.append("password", toFormString(accountData.password));

    const video = basicData.identityVideo;

    if (!(video instanceof Blob)) {
      throw new Error("فایل ویدیوی تأیید هویت معتبر نیست.");
    }

    formData.append(
      "verification_video",
      video,
      video instanceof File ? video.name : "verification-video"
    );

    const response = await apiClient.post<SignupResponse>(
      "/job-seekers/signup",
      formData,
      {
        headers: {
          "Content-Type": undefined,
        },
      }
    );

    return response.data;
  },

  verifyOtp: async (
    phone: string,
    code: string
  ): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      "/job-seekers/verify-otp",
      {
        phone,
        otp: code,
      }
    );

    return response.data;
  },

  resendOtp: async (phone: string): Promise<OtpResponse> => {
    return jobSeekerService.sendOtp(phone);
  },

  getSignupOptions: async (): Promise<SignupOptionsResponse> => {
    const response = await apiClient.get<SignupOptionsResponse>(
      "/job-seekers/signup-options"
    );

    return response.data;
  },
};
