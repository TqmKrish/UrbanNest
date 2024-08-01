import React from "react";
import AdminLayout from "./AdminLayout/AdminLayout";
import UserLayout from "./UserLayout/UserLayout";

const ModuleLayout: React.FC = () => {
  let userRole: string = JSON.parse(
    localStorage.getItem("userDetails") ?? "{}"
  );
  return <>{userRole === "user" ? <UserLayout /> : <AdminLayout />}</>;
};

export default ModuleLayout;
