import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import { authRoutes } from "./pages/auth/Routes";

const allRoutes = authRoutes;

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home
  },
  ...allRoutes
]);

export { router };