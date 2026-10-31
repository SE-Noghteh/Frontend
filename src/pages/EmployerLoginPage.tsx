import { useState } from "react";
import { AuthLayout } from "@/components/features/Auth/EmployerAuthLayout";
import { EmployerLoginForm } from "@/components/features/Auth/Employer/EmployerLoginForm";

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
          <div className="flex items-center justify-center h-full text-text-secondary py-10">
            فرم ساخت حساب کارفرما به زودی...
          </div>
        )}
      </div>
    </AuthLayout>
  );
}