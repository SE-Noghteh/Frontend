import { createBrowserRouter } from "react-router-dom";
import { JobSeekerLoginPage } from "@/pages/JobSeekerLoginPage";
import { JobSeekerOtpLoginPage } from "@/pages/JobSeekerOtpLoginPage";

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
    path: "/jobseekerlogin/otp",
    element: <JobSeekerOtpLoginPage />,
  },
]);