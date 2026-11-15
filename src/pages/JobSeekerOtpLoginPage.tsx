import { JobSeekerOtpLogin } from "@/components/features/Auth/JobSeeker/JobSeekerOtpLogin";
import { useState } from "react";
import { AuthLayout } from "@/components/features/Auth/AuthLayout";

export function JobSeekerOtpLoginPage() {
    const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  return (
    <AuthLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="w-full">
        <JobSeekerOtpLogin />
      </div>
    </AuthLayout>
  );
}