import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";
import type { AdminApprovalStatus } from "@/types/Auth/jobSeeker_registrationReview";

interface Props {
  status: AdminApprovalStatus; 
  onEdit?: () => void;
}

export function RegistrationReviewActions({ status, onEdit }: Props) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3 mt-6 w-full">
      {status === "approved" && (
        <Button variant="primary" fullWidth onClick={() => navigate("/seeker")}>
          ورود به حساب کارجویی
        </Button>
      )}

      {status === "pending" && (
        <Button variant="primary" fullWidth disabled>
          ورود به حساب کارجویی
        </Button>
      )}

      {(status === "needs_correction" || status === "rejected") && (
        <Button variant="primary" fullWidth onClick={onEdit}>
          شروع اصلاح اطلاعات
        </Button>
      )}

      {status === "cancelled" && (
        <Button variant="primary" fullWidth onClick={() => navigate("/jobseekerlogin?mode=signup")}>
          شروع ثبت‌نام جدید
        </Button>
      )}

      <Button variant="secondary" fullWidth onClick={() => navigate("/support")}>
        تماس با پشتیبانی
      </Button>

      <Button variant="secondary" fullWidth onClick={() => {
        localStorage.removeItem("hasSeenApprovalToast");
        localStorage.removeItem("hasSeenCancelledToast");
        localStorage.removeItem("accessToken"); 
        navigate("/jobseekerlogin");
      }}>
        خروج از پرونده
      </Button>
    </div>
  );
}