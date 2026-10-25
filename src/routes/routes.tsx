import { createBrowserRouter } from "react-router-dom";
import { JobSeekerLoginPage } from "@/pages/JobSeekerLoginPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Home</div>,
  },
  {
    path: "/jobseekerlogin",
    element: <JobSeekerLoginPage />, 
  },
]);