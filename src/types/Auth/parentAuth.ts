export type ParentRelationship = "father" | "mother" | "guardian";
export type ParentAdminReviewStatus = "pending" | "approved" | "rejected";

export interface ParentAccount {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  relationship: string;
  created_at?: string;
  admin_approval_status?: ParentAdminReviewStatus;
  admin_review_message?: string;
  admin_reviewed_at?: string;
}

export interface ParentLoginResponse {
  access_token: string;
  token_type?: string;
  expires_at?: string;
  data: ParentAccount;
}

export interface ParentInvitationInfo {
  first_name: string;
  last_name: string;
  phone: string;
  job_seeker_first_name?: string;
  expires_at?: string;
}

export interface OtpResponse {
  expires_in?: number;
  resend_after?: number;
  message?: string;
}

export interface ParentSignupResponse {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  relationship: string;
  message?: string;
  admin_approval_status?: ParentAdminReviewStatus;
  admin_review_message?: string;
  admin_reviewed_at?: string;
}

export interface PasswordResetTokenResponse {
  reset_token: string;
  expires_in?: number;
}

export interface PasswordResetResponse {
  message?: string;
}

export interface ParentSignupPayload {
  code: string;
  relationship: ParentRelationship;
  password: string;
  consentAccepted: boolean;
  identityDocument: File;
  consentVideo: File;
}
