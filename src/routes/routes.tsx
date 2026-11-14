import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "@/layouts/PublicLayout";
import AboutPage from "@/pages/AboutPage";
import ComponentsTestPage from "@/pages/ComponentsTestPage";
import FaqPage from "@/pages/FaqPage";
import LandingPage from "@/pages/LandingPage";
import OpportunitySearchPage from "@/pages/OpportunitySearchPage";
import SupportPage from "@/pages/SupportPage";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/search", element: <OpportunitySearchPage /> },
      { path: "/faq", element: <FaqPage /> },
      { path: "/support", element: <SupportPage /> },
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
