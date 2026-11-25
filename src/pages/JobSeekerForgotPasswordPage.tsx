
import { useState } from "react";
import { AuthLayout } from "@/components/features/Auth/AuthLayout";
import { JobSeekerForgotPassword } from "@/components/features/Auth/JobSeeker/JobSeekerForgotPassword";

export function JobSeekerForgotPasswordPage() {
  return (
    <AuthLayout>
      <div className="w-full">
        <JobSeekerForgotPassword />
      </div>
    </AuthLayout>
  );
}
