import React from "react";
import AdminLayout from "./AdminLayout/AdminLayout";
import UserLayout from "./UserLayout/UserLayout";

const ModuleRoutes = [
  { path: "admin", element: <AdminLayout /> },
  { path: "user", element: <UserLayout /> },
];

export default ModuleRoutes;
