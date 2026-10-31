import { createBrowserRouter } from "react-router-dom";
import { JobSeekerLoginPage } from "@/pages/JobSeekerLoginPage";
import { EmployerLoginPage } from "@/pages/EmployerLoginPage";
import { EmployerForgotPasswordPage } from "@/pages/EmployerForgotPasswordPage";

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
    path: "/employerlogin",
    element: <EmployerLoginPage />, 
  },
  {
    path: "/employer/forgot-password",
    element: <EmployerForgotPasswordPage />,
  },
]);