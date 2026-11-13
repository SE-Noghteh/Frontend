import { createBrowserRouter } from "react-router-dom";
import { JobSeekerLoginPage } from "@/pages/JobSeekerLoginPage";
import { EmployerLoginPage } from "@/pages/EmployerLoginPage";
import { EmployerForgotPasswordPage } from "@/pages/EmployerForgotPasswordPage";
import { RoleSelectionPage } from "@/pages/RoleSelectionPage"; // ← اضافه شد
import { Header } from "@/components/shared/Header/Header";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="min-h-screen bg-action-primary w-full">
        <Header />
        <main className="w-full flex-1">
          {/* متن حذف شد و پس‌زمینه سرمه‌ای شد */}
        </main>
      </div>
    ),
  },
  {
    path: "/login",
    element: <RoleSelectionPage mode="login" />, // ← اضافه شد
  },
  {
    path: "/signup",
    element: <RoleSelectionPage mode="signup" />, // ← اضافه شد
  },
  {
    path: "/jobseekerlogin",
    element: <JobSeekerLoginPage />, 
  },
  {
    path: "/employerlogin",
    element: <EmployerLoginPage />, 
  },
  {
    path: "/employer/forgot-password",
    element: <EmployerForgotPasswordPage />,
  },
]);