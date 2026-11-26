
import { useState } from "react";
import { AuthLayout } from "@/components/features/Auth/AuthLayout";
import { JobSeekerResetPassword } from "@/components/features/Auth/JobSeeker/JobSeekerResetPassword";

export function JobSeekerResetPasswordPage() {
  return (
    <AuthLayout>
      <div className="w-full">
        <JobSeekerResetPassword />
      </div>
    </AuthLayout>
  );
}
