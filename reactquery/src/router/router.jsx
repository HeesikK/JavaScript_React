import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/homepage";
import DetailPage from "../pages/detailpage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/detail",
    element: <DetailPage />,
  },
]);
