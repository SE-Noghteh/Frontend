import { useState } from "react";
import { AuthLayout } from "@/components/features/Auth/EmployerAuthLayout";
import { EmployerForgotPasswordForm } from "@/components/features/Auth/Employer/EmployerForgotPasswordForm";

export function EmployerForgotPasswordPage() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  return (
    <AuthLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      userType="employer"
    >
      <div className="w-full">
        <EmployerForgotPasswordForm />
      </div>
    </AuthLayout>
  );
}