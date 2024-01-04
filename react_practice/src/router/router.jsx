import { createBrowserRouter } from "react-router-dom";
import UseCallback from "../components/useCallback";
import UseMemo from "../components/useMemo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world</div>,
  },
  {
    path: "/useMemo",
    element: <UseMemo />,
  },
  {
    path: "/useCallback",
    element: <UseCallback />,
  },
]);

export default router;
