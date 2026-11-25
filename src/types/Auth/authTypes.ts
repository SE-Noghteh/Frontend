import type { User } from "@/types/User/user";

export interface LoginFormValues {
  mobile: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken?: string;
  access_token?: string;
}

export interface OtpLoginFormValues {
  phone: string;
}

