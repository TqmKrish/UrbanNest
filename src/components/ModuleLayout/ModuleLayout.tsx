import React from "react";
import AdminLayout from "./AdminLayout/AdminLayout";
import UserLayout from "./UserLayout/UserLayout";
import { useNavigate } from "react-router-dom";
import { moduleName } from "../../GlobalVariables";

const ModuleLayout = () => {
  let isLoggedIn: boolean = true;
  let userRole: string = "admin";
  let navigate = useNavigate();
  return <>{userRole === "user" ? <UserLayout /> : <AdminLayout />}</>;
};

export default ModuleLayout;
