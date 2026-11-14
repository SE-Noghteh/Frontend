import { createBrowserRouter } from "react-router-dom";

import AboutPage from "@/pages/AboutPage";
import ComponentsTestPage from "@/pages/ComponentsTestPage";
import HomePage from "@/pages/HomePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
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
