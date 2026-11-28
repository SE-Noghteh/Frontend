import { ParentAuthLayout } from "@/components/features/Auth/Parent/ParentAuthLayout";
import { ParentSignupFlow } from "@/components/features/Auth/Parent/ParentSignupFlow";

export default function ParentSignupPage() {
  return (
    <ParentAuthLayout activeTab="signup">
      <ParentSignupFlow />
    </ParentAuthLayout>
  );
}
