import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AuthLayout } from "@/components/features/Auth/EmployerAuthLayout";
import { EmployerLoginForm } from "@/components/features/Auth/Employer/EmployerLoginForm";
import { EmployerSignupForm } from "@/components/features/Auth/Employer/EmployerSignupForm";

export function EmployerLoginPage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  useEffect(() => {
    if (location.state?.tab === "signup") {
      setActiveTab("signup");
    }
  }, [location.state]);

  return (
    <AuthLayout activeTab={activeTab} onTabChange={setActiveTab} userType="employer">
      <div className="w-full">
        {activeTab === "login" ? <EmployerLoginForm /> : <EmployerSignupForm />}
      </div>
    </AuthLayout>
  );
}