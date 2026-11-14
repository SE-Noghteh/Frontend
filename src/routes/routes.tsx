import { createBrowserRouter } from "react-router-dom";

import AboutPage from "@/pages/AboutPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Home</div>,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
]);
