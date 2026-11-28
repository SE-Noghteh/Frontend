import { Navigate, createBrowserRouter } from "react-router-dom";

import PublicLayout from "@/layouts/PublicLayout";
import SeekerDashboardLayout from "@/layouts/SeekerDashboardLayout";
import AboutPage from "@/pages/AboutPage";
import ComponentsTestPage from "@/pages/ComponentsTestPage";
import FaqPage from "@/pages/FaqPage";
import LandingPage from "@/pages/LandingPage";
import OpportunitySearchPage from "@/pages/OpportunitySearchPage";
import ParentCaseEditPage from "@/pages/ParentCaseEditPage";
import ParentCasePage from "@/pages/ParentCasePage";
import ParentForgotPasswordPage from "@/pages/ParentForgotPasswordPage";
import ParentLoginPage from "@/pages/ParentLoginPage";
import ParentSignupPage from "@/pages/ParentSignupPage";
import SeekerAdDetailPage from "@/pages/SeekerAdDetailPage";
import SeekerAdsPage from "@/pages/SeekerAdsPage";
import SeekerCollabDetailPage from "@/pages/SeekerCollabDetailPage";
import SeekerCollabsPage from "@/pages/SeekerCollabsPage";
import SeekerOpportunityDetailPage from "@/pages/SeekerOpportunityDetailPage";
import SeekerRequestDetailPage from "@/pages/SeekerRequestDetailPage";
import SeekerRequestsPage from "@/pages/SeekerRequestsPage";
import SupportPage from "@/pages/SupportPage";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      {
        path: "/search",
        element: <OpportunitySearchPage />,
      },
      { path: "/faq", element: <FaqPage /> },
      { path: "/support", element: <SupportPage /> },
      { path: "/about", element: <AboutPage /> },
    ],
  },

  {
    path: "/parent",
    element: (
      <Navigate to="/parent/login" replace />
    ),
  },
  {
    path: "/parent/login",
    element: <ParentLoginPage />,
  },
  {
    path: "/parent/signup",
    element: <ParentSignupPage />,
  },
  {
    path: "/parent/forgot-password",
    element: <ParentForgotPasswordPage />,
  },
  {
    path: "/parent/case",
    element: <ParentCasePage />,
  },
  {
    path: "/parent/case/edit",
    element: <ParentCaseEditPage />,
  },

  // Backward-friendly alias for links that may already use the older naming style.
  {
    path: "/parentlogin",
    element: (
      <Navigate to="/parent/login" replace />
    ),
  },

  {
    path: "/seeker",
    element: <SeekerDashboardLayout />,
    children: [
      {
        index: true,
        element: (
          <Navigate
            to="/seeker/ads"
            replace
          />
        ),
      },
      {
        path: "ads",
        element: <SeekerAdsPage />,
      },
      {
        path: "ads/:adId",
        element: <SeekerAdDetailPage />,
      },
      {
        path: "opportunities/:opportunityId",
        element: <SeekerOpportunityDetailPage />,
      },
      {
        path: "requests",
        element: <SeekerRequestsPage />,
      },
      {
        path: "collabs",
        element: <SeekerCollabsPage />,
      },
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
    path: "/components-test",
    element: <ComponentsTestPage />,
  },
]);
