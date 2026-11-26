import { apiClient } from "@/lib/apiClient";
import type { SignupResponse, RegisterBasicInfo, ProvincesResponse } from "@/types/Auth/jobSeekerRegister";
import type { RegisterAccountFormValues } from "@/schemas/registerJobSeekerSchema";
import type { AuthResponse } from "@/types/Auth/authTypes";
import type {
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  VerifyResetOtpRequest,
  VerifyResetOtpResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
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

const toFormString = (value: string | number | boolean | null | undefined): string => {
  return value == null ? "" : String(value);
};

export const jobSeekerService = {
  sendOtp: async (phone: string): Promise<OtpResponse> => {
    const response = await apiClient.post<OtpResponse>("/job-seekers/otp", { phone });
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
    formData.append("province", toFormString(basicData.province));
    formData.append("city", toFormString(basicData.city));
    formData.append("address", toFormString(basicData.address));
    formData.append("postal_code", toFormString(basicData.postalCode)); 

    const birthDate = basicData.birthDateObj;
    formData.append("birth_year", String(Number(birthDate?.year || 0)));
    formData.append("birth_month", String(Number(birthDate?.month?.number || 0)));
    formData.append("birth_day", String(Number(birthDate?.day || 0)));

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

    const idCard = basicData.idCardImage;
    if (!(idCard instanceof Blob)) {
      throw new Error("فایل تصویر صفحه اول شناسنامه معتبر نیست.");
    }
    formData.append(
      "identity_document",
      idCard,
      idCard instanceof File ? idCard.name : "identity-document"
    );

    const video = basicData.identityVideo;
    if (!(video instanceof Blob)) {
      throw new Error("فایل ویدیوی تأیید هویت معتبر نیست.");
    }
    formData.append(
      "verification_video",
      video,
      video instanceof File ? video.name : "verification-video"
    );

    formData.append("phone", toFormString(accountData.phone));
    formData.append("password", toFormString(accountData.password));

    const response = await apiClient.post<SignupResponse>("/job-seekers/signup", formData, {
      headers: { "Content-Type": undefined },
    });

    return response.data;
  },

  verifyOtp: async (phone: string, code: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/job-seekers/verify-otp", {
      phone,
      otp: code,
    });
    return response.data;
  },

  resendOtp: async (phone: string): Promise<OtpResponse> => {
    return jobSeekerService.sendOtp(phone);
  },

  getSignupOptions: async (): Promise<SignupOptionsResponse> => {
    const response = await apiClient.get<SignupOptionsResponse>("/job-seekers/signup-options");
    return response.data;
  },

  getProvinces: async (): Promise<ProvincesResponse> => {
    const response = await apiClient.get<ProvincesResponse>("/provinces");
    return response.data;
  },

  getCities: async (province: string): Promise<any> => {
    const response = await apiClient.get("/cities", {
      params: { province }
    });
    return response.data;
  },

  // reset password
  forgotPassword: async (
    data: ForgotPasswordRequest
  ): Promise<ForgotPasswordResponse> => {
    const response = await apiClient.post<ForgotPasswordResponse>(
      "/job-seekers/forgot-password",
      data
    );
    return response.data;
  },

  verifyResetOtp: async (
    data: VerifyResetOtpRequest
  ): Promise<VerifyResetOtpResponse> => {
    const response = await apiClient.post<VerifyResetOtpResponse>(
      "/job-seekers/verify-reset-otp",
      data
    );
    return response.data;
  },

  resetPassword: async (
    data: ResetPasswordRequest
  ): Promise<ResetPasswordResponse> => {
    const response = await apiClient.post<ResetPasswordResponse>(
      "/job-seekers/reset-password",
      data
    );
    return response.data;
  },
};