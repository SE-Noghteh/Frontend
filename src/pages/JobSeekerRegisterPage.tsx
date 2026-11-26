import { useState } from "react";
import { AuthLayout } from "@/components/features/Auth/AuthLayout";
import { JobSeekerRegisterForm } from "@/components/features/Auth/JobSeeker/JobSeekerRegisterForm";

export function JobSeekerRegisterPage() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("signup");

  return (
    <AuthLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="w-full">
        <JobSeekerRegisterForm />
      </div>
    </AuthLayout>
  );
}