import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AuthLayout } from "@/components/features/Auth/JobseekerAuthLayout";
import { JobSeekerLoginForm } from "@/components/features/Auth/JobSeeker/JobSeekerLoginForm";
import { JobSeekerRegisterForm } from "@/components/features/Auth/JobSeeker/JobSeekerRegisterForm";

export function JobSeekerLoginPage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  useEffect(() => {
    if (location.state?.tab === "signup") {
      setActiveTab("signup");
    }
  }, [location.state]);

  return (
    <AuthLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="w-full">
        {activeTab === "login" ? <JobSeekerLoginForm /> : <JobSeekerRegisterForm />}
      </div>
    </AuthLayout>
  );
}