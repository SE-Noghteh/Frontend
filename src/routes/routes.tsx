
import { motion, useReducedMotion } from "framer-motion";
import { useLayoutEffect } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";

import { JobSeekerLoginPage } from "@/pages/JobSeekerLoginPage";
import { JobSeekerForgotPasswordPage } from "@/pages/JobSeekerForgotPasswordPage";
import { JobSeekerResetPasswordPage } from "@/pages/JobSeekerResetPasswordPage";

import PublicLayout from "@/layouts/PublicLayout";
import SeekerDashboardLayout from "@/layouts/SeekerDashboardLayout";

import AboutPage from "@/pages/AboutPage";
import ComponentsTestPage from "@/pages/ComponentsTestPage";
import FaqPage from "@/pages/FaqPage";
import LandingPage from "@/pages/LandingPage";
import OpportunitySearchPage from "@/pages/OpportunitySearchPage";
import RoleSelectionPage from "@/pages/RoleSelectionPage";
import SeekerAdDetailPage from "@/pages/SeekerAdDetailPage";
import SeekerAdsPage from "@/pages/SeekerAdsPage";
import SeekerCollabDetailPage from "@/pages/SeekerCollabDetailPage";
import SeekerCollabsPage from "@/pages/SeekerCollabsPage";
import SeekerRequestDetailPage from "@/pages/SeekerRequestDetailPage";
import SeekerRequestsPage from "@/pages/SeekerRequestsPage";
import SupportPage from "@/pages/SupportPage";

function AnimatedJobSeekerLogin() {
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <motion.div
      className="min-h-svh w-full"
      initial={
        reduceMotion
          ? false
          : { opacity: 0, y: 8 }
      }
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.6,
        ease: "easeInOut",
      }}
    >
      <JobSeekerLoginPage />
    </motion.div>
  );
}

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/search", element: <OpportunitySearchPage /> },
      { path: "/faq", element: <FaqPage /> },
      { path: "/support", element: <SupportPage /> },

      {
        path: "/login",
        element: <RoleSelectionPage />,
      },
      {
        path: "/signup",
        element: <RoleSelectionPage />,
      },
    ],
  },

  {
    path: "/jobseekerlogin",
    element: <AnimatedJobSeekerLogin />,
  },
  {
    path: "/jobseekerlogin/forgot-password",
    element: <JobSeekerForgotPasswordPage />,
  },
  {
    path: "/jobseekerlogin/reset-password",
    element: <JobSeekerResetPasswordPage />,
  },

  {
    path: "/seeker",
    element: <SeekerDashboardLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/seeker/ads" replace />,
      },
      { path: "ads", element: <SeekerAdsPage /> },
      { path: "ads/:adId", element: <SeekerAdDetailPage /> },
      { path: "requests", element: <SeekerRequestsPage /> },
      { path: "collabs", element: <SeekerCollabsPage /> },
      {
        path: "collabs/:collabId",
        element: <SeekerCollabDetailPage />,
      },
      {
        path: "requests/:requestId",
        element: <SeekerRequestDetailPage />,
      },
    ],
  },

  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/components-test",
    element: <ComponentsTestPage />,
  },
]);
