import { useState } from "react";
import { AuthLayout } from "@/components/features/Auth/AuthLayout";
import { JobSeekerLoginForm } from "@/components/features/Auth/JobSeeker/JobSeekerLoginForm";
import { JobSeekerRegisterForm } from "@/components/features/Auth/JobSeeker/JobSeekerRegisterForm";

export function JobSeekerLoginPage() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  return (
    <AuthLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="w-full ">
        {activeTab === "login" ? (
          <JobSeekerLoginForm />
        ) : (
          <JobSeekerRegisterForm />
        )}
      </div>
    </AuthLayout>
  );
}