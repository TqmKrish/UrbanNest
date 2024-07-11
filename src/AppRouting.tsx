import { Navigate, createBrowserRouter } from "react-router-dom";
import AuthLayout from "./components/Auth/AuthLayout";
import AuthRoutes from "./components/Auth/AuthRoutes";
import { moduleName } from "./GlobalVariables";
import AdminLayout from "./components/ModuleLayout/AdminLayout/AdminLayout";
import UserLayout from "./components/ModuleLayout/UserLayout/UserLayout";
import AdminRoutes from "./components/ModuleLayout/AdminLayout/AdminRoutes";
import UserRoutes from "./components/ModuleLayout/UserLayout/UserRoutes";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth" />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: AuthRoutes,
  },
  {
    path: `/${moduleName}/admin`,
    element: <AdminLayout />,
    children: AdminRoutes,
  },
  {
    path: `/${moduleName}/user`,
    element: <UserLayout />,
    children: UserRoutes,
  },
]);
