import { apiClient } from "@/lib/apiClient";
import type { SignupResponse, RegisterBasicInfo } from "@/types/Auth/register";
import type { RegisterAccountFormValues } from "@/schemas/registerJobSeekerSchema";
import type { AuthResponse } from "@/types/Auth/authTypes";


export interface SignupOptionsResponse {
    cities: string[];
    genders: string[];
    interests: string[];
}

export const jobSeekerService = {
  signup: async (
    basicData: RegisterBasicInfo, 
    accountData: RegisterAccountFormValues
  ): Promise<SignupResponse> => {
    const formData = new FormData();

    formData.append("first_name", basicData.firstName);
    formData.append("last_name", basicData.lastName);
    formData.append("national_code", basicData.nationalCode);
    formData.append("city", basicData.city); 
    formData.append("address", basicData.address);
    formData.append("birth_year", basicData.birthYear);
    formData.append("birth_month", basicData.birthMonth);
    formData.append("birth_day", basicData.birthDay);
    
    const genderMap: Record<string, string> = {
      "مرد": "male", "زن": "female", "male": "male", "female": "female"
    };
    formData.append("gender", genderMap[basicData.gender] || "male");

    basicData.interests .forEach((interest ) => {
      formData.append("interests", interest); 
    });

    formData.append("phone", accountData.phone);
    formData.append("password", accountData.password);

    if (basicData.identityVideo) {
      formData.append("verification_video", basicData.identityVideo);
    } else {
      throw new Error("ویدیو تایید هویت الزامی است.");
    }

    const response = await apiClient.post<SignupResponse>(
      "/job-seekers/signup", 
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    return response.data;
  },

  verifyOtp: async (phone: string, code: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      "/job-seekers/verify-otp",
      { phone, otp: code }
    );
    return response.data;
  },

  resendOtp: async (phone: string): Promise<{ expires_in: number, message: string, resend_after: number }> => {
    const response = await apiClient.post(
      "/job-seekers/otp",
      { phone }
    );
    return response.data;
  },

  getSignupOptions: async (): Promise<SignupOptionsResponse> => {
    const response = await apiClient.get<SignupOptionsResponse>("/job-seekers/signup-options");
    return response.data;
  },
};

  
