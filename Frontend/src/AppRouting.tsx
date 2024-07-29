import { Navigate, createBrowserRouter } from "react-router-dom";
import AuthRoutes from "./components/Auth/AuthRoutes";
import { moduleName } from "./GlobalVariables";
import ProtectedModuleRoute from "./.utils/ProtectedModuleRoute";
import ProtectedAuthRoute from "./.utils/ProtectedAuthRoute";
import ModuleRoutes from "./components/ModuleLayout/ModuleRoutes";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth" />,
  },
  {
    path: "/auth",
    element: <ProtectedAuthRoute />,
    children: AuthRoutes,
  },
  {
    path: `/${moduleName}`,
    element: <ProtectedModuleRoute />,
    children: ModuleRoutes,
  },
]);
