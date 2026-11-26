import { useState, useEffect } from "react";
import { RegistrationReviewStatusCard } from "./RegistrationReviewStatusCard";
import { RegistrationReviewCorrectionList } from "./RegistrationReviewCorrectionList";
import { RegistrationReviewActions } from "./RegistrationReviewActions";
import { useJobSeekerMe, useParentApprovalRequest } from "@/hooks/JobSeeker/useRegistrationReview";
import { Toast } from "@/components/ui/Toast";
import { useNavigate } from "react-router-dom";

export function JobSeekerRegistrationReview() {
  const { data, isLoading, isError } = useJobSeekerMe();
  const navigate = useNavigate();
  
  const { data: parentData } = useParentApprovalRequest(
    data?.data?.parent_approval_required || false
  );
  
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (data?.data?.admin_approval_status === "approved") {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-text-secondary text-label">
        در حال دریافت وضعیت پرونده...
      </div>
    );
  }

  if (isError || !data || !data.data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-text-secondary text-label gap-4">
        <p>خطایی در دریافت اطلاعات پرونده رخ داد یا پرونده‌ای یافت نشد.</p>
        <button 
          onClick={() => navigate("/jobseekerlogin")}
          className="text-action-primary hover:underline"
        >
          بازگشت به صفحه ورود
        </button>
      </div>
    );
  }

  const status = data.data.admin_approval_status || "pending";

  return (
    <>
      <div className="w-full flex flex-col gap-6 pb-12">
        <RegistrationReviewStatusCard data={data.data} parentApprovalData={parentData} />

        {status === "needs_correction" && (
          <RegistrationReviewCorrectionList data={data.data} />
        )}

        <RegistrationReviewActions status={status} />
      </div>

      {showToast && (
        <Toast
          title="تبریک می‌گوییم!"
          description="پرونده شما تایید شد. اکنون می‌توانید وارد حساب خود شوید."
          onClose={() => setShowToast(false)}
          duration={5000}
        />
      )}
    </>
  );
}