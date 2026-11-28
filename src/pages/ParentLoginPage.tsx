import { ParentAuthLayout } from "@/components/features/Auth/Parent/ParentAuthLayout";
import { ParentLoginForm } from "@/components/features/Auth/Parent/ParentLoginForm";

export default function ParentLoginPage() {
  return (
    <ParentAuthLayout activeTab="login">
      <ParentLoginForm />
    </ParentAuthLayout>
  );
}
