import { DateObject } from "react-multi-date-picker";

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
  birthDateObj: DateObject | null;
  interests: string[];
  idCardImage?: File | null;
  identityVideo?: File | null;
}

export interface SignupBackendPayload {
  first_name: string;
  last_name: string;
  national_code: string;
  province: string; 
  city: string;
  address: string;
  postal_code: string;
  birth_year: number;
  birth_month: number;
  birth_day: number;
  gender: "male" | "female"; 
  interests: string[]; 
  phone: string;
  password: string;
  identity_document: File;
  verification_video: File; 
}

export interface ProvinceItem {
  id: number | string;
  name: string;
}
export type ProvincesResponse = ProvinceItem[]; 

export interface SignupResponse {
  expires_in: number;
  message: string;
  resend_after: number;
  accessToken?: string; 
  access_token?: string; 
}

// parent step
export interface ParentRegisteredPayload {
  phone: string;
}

export interface ParentInvitePayload {
  first_name: string;
  last_name: string;
  phone: string;
}

export interface ParentRegisteredResponse {
  message: string;
}

export interface ParentInviteResponse {
  admin_approved: boolean;
  admin_approved_parent: boolean;
  expires_at: string;
  invitation_code: string;
  parent_approval_required: boolean;
  parent_connected: boolean;
  parent_id: number;
  signup_status: string;
}