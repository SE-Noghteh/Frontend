import { createBrowserRouter } from "react-router-dom";

import ComponentsTestPage from "@/pages/ComponentsTestPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Home</div>,
  },
  {
    path: "/components-test",
    element: <ComponentsTestPage />,
  },
]);
