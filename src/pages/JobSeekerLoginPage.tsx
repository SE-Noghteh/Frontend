import { useState } from "react";
import { AuthLayout } from "@/components/features/Auth/AuthLayout";
import { JobSeekerLoginForm } from "@/components/features/Auth/JobSeeker/JobSeekerLoginForm";

export function JobSeekerLoginPage() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  return (
    <AuthLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="w-full ">
        {activeTab === "login" ? (
          <JobSeekerLoginForm />
        ) : (
          <div className="flex items-center justify-center h-full text-text-secondary">
            فرم ساخت حساب کارجو به زودی...
          </div>
        )}
      </div>
    </AuthLayout>
  );
}