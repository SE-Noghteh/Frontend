import { useState, useEffect } from "react";
import { RegistrationReviewStatusCard } from "./RegistrationReviewStatusCard";
import { RegistrationReviewCorrectionList } from "./RegistrationReviewCorrectionList";
import { RegistrationReviewActions } from "./RegistrationReviewActions";
import { RegistrationReviewEditForm } from "./RegistrationReviewEditForm";
import { useJobSeekerMe, useParentApprovalRequest, useVideoLink, useJobSeekerSkills } from "@/hooks/JobSeeker/useRegistrationReview";
import { Toast } from "@/components/ui/Toast";
import { useNavigate } from "react-router-dom";

export function JobSeekerRegistrationReview() {
  const { data, isLoading, isError } = useJobSeekerMe();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false); 
  
  const { data: parentData } = useParentApprovalRequest(
    data?.data?.parent_approval_required || false
  );

  const { data: videoData, isLoading: isVideoLoading } = useVideoLink();
  const { data: skillsData, isLoading: isSkillsLoading } = useJobSeekerSkills();
  
  const [showApprovedToast, setShowApprovedToast] = useState(false);
  const [showCancelledToast, setShowCancelledToast] = useState(false);

  const handleEditClick = () => {
    if (isVideoLoading || isSkillsLoading) {
      return; 
    }
    setIsEditing(true);
  };


  useEffect(() => {
    const status = data?.data?.admin_approval_status;
    
    if (status === "approved") {
      const hasSeenApproval = localStorage.getItem("hasSeenApprovalToast");
      if (hasSeenApproval) {
        navigate("/seeker", { replace: true });
      } else {
        setShowApprovedToast(true);
        localStorage.setItem("hasSeenApprovalToast", "true");
        const timer = setTimeout(() => setShowApprovedToast(false), 5000);
        return () => clearTimeout(timer);
      }
    } 
    else if (status === "cancelled") {
      const hasSeenCancelled = localStorage.getItem("hasSeenCancelledToast");
      if (!hasSeenCancelled) {
        setShowCancelledToast(true);
        localStorage.setItem("hasSeenCancelledToast", "true");
        const timer = setTimeout(() => setShowCancelledToast(false), 5000);
        return () => clearTimeout(timer);
      }
    }
  }, [data, navigate]);

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
  const isErrorState = status === "needs_correction" || status === "rejected";

  if (isEditing) {
    if (isVideoLoading || isSkillsLoading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-text-secondary text-label">
          در حال دریافت اطلاعات فرم...
        </div>
      );
    }
    
    return (
      <RegistrationReviewEditForm 
        data={data.data} 
        videoUrl={videoData?.url} 
        currentSkills={skillsData?.skills} 
      />
    );
  }

  return (
    <>
      <div className="w-full flex flex-col gap-6 pb-12">
        <RegistrationReviewStatusCard data={data.data} parentApprovalData={parentData} />

        {isErrorState && (
          <RegistrationReviewCorrectionList data={data.data} />
        )}

        <RegistrationReviewActions 
          status={status} 
          onEdit={handleEditClick} 
        />
      </div>

      {showApprovedToast && (
        <Toast
          title="تبریک می‌گوییم!"
          description="پرونده شما تایید شد. اکنون می‌توانید وارد حساب خود شوید."
          variantClass="bg-surface-success border-status-success text-status-success"
          onClose={() => setShowApprovedToast(false)}
          duration={5000}
        />
      )}

      {showCancelledToast && (
        <Toast
          title="ثبت‌نام لغو شد"
          description="به دلیل اتمام فرصت‌های اصلاح، ثبت‌نام شما لغو شده است. می‌توانید دوباره ثبت‌نام کنید."
          variantClass="bg-surface-error border-status-error text-status-error"
          onClose={() => setShowCancelledToast(false)}
          duration={5000}
        />
      )}
    </>
  );
}