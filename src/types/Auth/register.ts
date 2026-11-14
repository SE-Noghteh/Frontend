export interface Skill {
  id: string;
  title: string;
  category: string;
  isDisabled?: boolean;
}

export interface RegisterBasicInfo {
  firstName: string;
  lastName: string;
  nationalCode: string;
  gender: string;
  province: string;
  city: string;
  postalCode: string;
  address: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  interests: string[];
  idCardImage?: File | null;
  identityVideo?: File | null;
}

export interface SignupBackendPayload {
  first_name: string;
  last_name: string;
  national_code: string;
  city: string;
  address: string;
  birth_year: number;
  birth_month: number;
  birth_day: number;
  gender: "male" | "female"; 
  interests: string[]; 
  phone: string;
  password: string;
  verification_video: File; 
}

export interface SignupResponse {
  expires_in: number;
  message: string;
  resend_after: number;
}