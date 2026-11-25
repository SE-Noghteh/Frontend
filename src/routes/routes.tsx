import { createBrowserRouter } from "react-router-dom";
import { JobSeekerLoginPage } from "@/pages/JobSeekerLoginPage";
import { JobSeekerForgotPasswordPage } from "@/pages/JobSeekerForgotPasswordPage";
import { JobSeekerResetPasswordPage } from "@/pages/JobSeekerResetPasswordPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Home</div>,
  },
  {
    path: "/jobseekerlogin",
    element: <JobSeekerLoginPage />, 
  },
  {
    path: "/jobseekerlogin/forgot-password",
    element: <JobSeekerForgotPasswordPage />,
  },
  {
    path: "/jobseekerlogin/reset-password",
    element: <JobSeekerResetPasswordPage />,
  },
]);