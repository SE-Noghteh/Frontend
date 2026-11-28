import axios from "axios";
import {
  ArrowLeft,
  LogOut,
  RefreshCw,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import { AuthNotice } from "@/components/features/Auth/Parent/AuthNotice";
import { ParentAuthLayout } from "@/components/features/Auth/Parent/ParentAuthLayout";
import { ParentCaseSummary } from "@/components/features/Auth/Parent/ParentCaseSummary";
import { ParentReviewStatus } from "@/components/features/Auth/Parent/ParentReviewStatus";
import { Button } from "@/components/ui/Button";
import { SectionCard } from "@/components/ui/SectionCard";
import { useParentProfile } from "@/hooks/useParentProfile";
import { getParentAccessToken } from "@/services/Auth/Parent/parentToken";
import {
  getParentAuthErrorMessage,
  logoutParent,
} from "@/services/Auth/Parent/parentAuthService";
import { useParentAuthStore } from "@/store/auth/useParentAuthStore";

export default function ParentCasePage() {
  const navigate = useNavigate();
  const {
    data: parent,
    isPending,
    isFetching,
    isError,
    error,
    refetch,
  } = useParentProfile();

  const setParent = useParentAuthStore(
    (state) => state.setParent,
  );
  const clearSession = useParentAuthStore(
    (state) => state.clearSession,
  );

  const [isLoggingOut, setIsLoggingOut] =
    useState(false);

  useEffect(() => {
    if (parent) setParent(parent);
  }, [parent, setParent]);

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

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await logoutParent();
    } catch {
      // Local session must still be cleared even if server logout fails.
    } finally {
      clearSession();
      navigate("/parent/login", {
        replace: true,
      });
      setIsLoggingOut(false);
    }
  };

  const renderStatusContent = () => {
    if (!parent) return null;

    const status =
      parent.admin_approval_status ?? "pending";

    if (status === "approved") {
      return (
        <AuthNotice tone="success">
          پرونده هویتی والد تأیید شده است. حساب آماده
          استفاده از امکانات والد است.
        </AuthNotice>
      );
    }

    if (status === "rejected") {
      return (
        <div className="space-y-3">
          <AuthNotice tone="error">
            <b className="block">
              پرونده نیاز به اصلاح دارد.
            </b>
            <span className="mt-1 block">
              {parent.admin_review_message ||
                "مدیر سامانه برای پرونده پیام اصلاح ثبت کرده است."}
            </span>
          </AuthNotice>

          <Link
            to="/parent/case/edit"
            className="btn w-full"
            data-variant="primary"
            data-size="md"
            data-color="blue"
            data-full-width="true"
          >
            اصلاح پرونده
            <ArrowLeft size={17} />
          </Link>
        </div>
      );
    }

    return (
      <AuthNotice tone="warning">
        پرونده ثبت شده و در صف بررسی مدیر سامانه است.
        نتیجه بررسی از همین صفحه قابل پیگیری است.
      </AuthNotice>
    );
  };

  return (
    <ParentAuthLayout
      activeTab="login"
      hideTabs
    >
      <div className="mx-auto w-full max-w-[680px]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-caption font-bold text-action-primary">
              حساب والد
            </p>
            <h1 className="mt-1 text-page-title font-black text-text-primary">
              پیگیری پرونده والد
            </h1>
            <p className="mt-1 text-label leading-7 text-text-secondary">
              وضعیت بررسی اطلاعات هویتی و مدارک را اینجا
              می‌بینی.
            </p>
          </div>

          {parent ? (
            <ParentReviewStatus
              status={
                parent.admin_approval_status ??
                "pending"
              }
            />
          ) : null}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            loading={isFetching}
            startIcon={
              <RefreshCw
                size={15}
                aria-hidden="true"
              />
            }
            onClick={() => void refetch()}
          >
            به‌روزرسانی وضعیت
          </Button>

          <Button
            type="button"
            variant="text"
            size="sm"
            color="error"
            loading={isLoggingOut}
            startIcon={
              <LogOut size={15} aria-hidden="true" />
            }
            onClick={handleLogout}
          >
            خروج از حساب
          </Button>
        </div>

        {isPending ? (
          <SectionCard className="mt-5">
            <p className="text-label text-text-secondary">
              در حال دریافت وضعیت پرونده...
            </p>
          </SectionCard>
        ) : isError ? (
          <AuthNotice
            tone="error"
            className="mt-5"
          >
            {!getParentAccessToken()
              ? "نشست ورود والد پیدا نشد. یک‌بار از حساب خارج شو و دوباره به‌عنوان والد وارد شو."
              : getParentAuthErrorMessage(
                  error,
                  "دریافت وضعیت پرونده انجام نشد. اتصال به API را بررسی کن.",
                )}
          </AuthNotice>
        ) : parent ? (
          <div className="mt-5 space-y-4">
            {renderStatusContent()}
            <ParentCaseSummary parent={parent} />
          </div>
        ) : null}
      </div>
    </ParentAuthLayout>
  );
}
