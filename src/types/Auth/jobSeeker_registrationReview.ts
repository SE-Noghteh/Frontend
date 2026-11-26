export type AdminApprovalStatus = "pending" | "approved" | "needs_correction" | "rejected";

export interface JobSeekerMeResponse {
  data: {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    admin_approval_status: AdminApprovalStatus;
    admin_approved: boolean;
    admin_approved_parent: boolean;
    admin_review_message: string;
    admin_reviewed_at: string | null;
    created_at: string;
    parent_approval_required: boolean;
    parent_connected: boolean;
    parent_id: number;
    parent_relationship: string;
    signup_status: string;
    correction_attempts_left?: number; 
  };
}

export interface ParentApprovalRequestResponse {
  admin_approved: boolean;
  admin_approved_parent: boolean;
  connection_status: string;
  expires_at: string;
  invitation_code: string;
  invitation_sms_sent: boolean;
  parent_approval_required: boolean;
  parent_connected: boolean;
  parent_id: number;
  signup_status: string;
  phone?: string;
}