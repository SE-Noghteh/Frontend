import axios from "axios";
import { useEffect } from "react";
import {
  Navigate,
  useNavigate,
} from "react-router-dom";

import { AuthNotice } from "@/components/features/Auth/Parent/AuthNotice";
import { ParentAuthLayout } from "@/components/features/Auth/Parent/ParentAuthLayout";
import { ParentCaseCorrectionForm } from "@/components/features/Auth/Parent/ParentCaseCorrectionForm";
import { SectionCard } from "@/components/ui/SectionCard";
import { useParentProfile } from "@/hooks/useParentProfile";
import { getParentAuthErrorMessage } from "@/services/Auth/Parent/parentAuthService";
import { useParentAuthStore } from "@/store/auth/useParentAuthStore";

export default function ParentCaseEditPage() {
  const navigate = useNavigate();
  const clearSession = useParentAuthStore(
    (state) => state.clearSession,
  );

  const {
    data: parent,
    isPending,
    isError,
    error,
  } = useParentProfile();

  useEffect(() => {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 401
    ) {
      clearSession();
      navigate("/parent/login", {
        replace: true,
      });
    }
  }, [clearSession, error, navigate]);

  if (isPending) {
    return (
      <ParentAuthLayout
        activeTab="login"
        hideTabs
      >
        <div className="mx-auto w-full max-w-[680px]">
          <SectionCard>
            <p className="text-label text-text-secondary">
              در حال دریافت پرونده...
            </p>
          </SectionCard>
        </div>
      </ParentAuthLayout>
    );
  }

  if (isError) {
    return (
      <ParentAuthLayout
        activeTab="login"
        hideTabs
      >
        <div className="mx-auto w-full max-w-[680px]">
          <AuthNotice tone="error">
            {getParentAuthErrorMessage(
              error,
              "دریافت پرونده انجام نشد.",
            )}
          </AuthNotice>
        </div>
      </ParentAuthLayout>
    );
  }

  if (!parent) {
    return (
      <Navigate
        to="/parent/login"
        replace
      />
    );
  }

  if (
    parent.admin_approval_status !== "rejected"
  ) {
    return (
      <Navigate
        to="/parent/case"
        replace
      />
    );
  }

  return (
    <ParentAuthLayout
      activeTab="login"
      hideTabs
    >
      <div className="mx-auto w-full max-w-[680px]">
        <ParentCaseCorrectionForm
          parent={parent}
        />
      </div>
    </ParentAuthLayout>
  );
}
