import { useState } from "react";
import { AuthLayout } from "@/components/features/Auth/EmployerAuthLayout";
import { EmployerLoginForm } from "@/components/features/Auth/Employer/EmployerLoginForm";
import { EmployerSignupForm } from "@/components/features/Auth/Employer/EmployerSignupForm";

export function EmployerLoginPage() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  return (
    <AuthLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      userType="employer"
    >
      <div className="w-full">
        {activeTab === "login" ? (
          <EmployerLoginForm />
        ) : (
          <EmployerSignupForm />
        )}
      </div>
    </AuthLayout>
  );
}