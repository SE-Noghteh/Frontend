import { AuthLayout } from "@/components/features/Auth/AuthLayout";
import { JobSeekerRegistrationReview } from "@/components/features/Auth/JobSeeker/RegistrationReview/JobSeekerRegistrationReview";

export function JobSeekerRegistrationReviewPage() {
  return (
    <AuthLayout>
      <div className="w-full">
        <JobSeekerRegistrationReview />
      </div>
    </AuthLayout>
  );
}