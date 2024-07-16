import React from "react";
import AdminLayout from "./AdminLayout/AdminLayout";
import UserLayout from "./UserLayout/UserLayout";
import AdminRoutes from "./AdminLayout/AdminRoutes";
import UserRoutes from "./UserLayout/UserRoutes";

const ModuleRoutes = [
  {
    path: `admin`,
    element: <AdminLayout />,
    children: AdminRoutes,
  },
  {
    path: `user`,
    element: <UserLayout />,
    children: UserRoutes,
  },
];

export default ModuleRoutes;
