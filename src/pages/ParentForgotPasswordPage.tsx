import { ParentAuthLayout } from "@/components/features/Auth/Parent/ParentAuthLayout";
import { ParentForgotPasswordFlow } from "@/components/features/Auth/Parent/ParentForgotPasswordFlow";

export default function ParentForgotPasswordPage() {
  return (
    <ParentAuthLayout activeTab="login">
      <ParentForgotPasswordFlow />
    </ParentAuthLayout>
  );
}
