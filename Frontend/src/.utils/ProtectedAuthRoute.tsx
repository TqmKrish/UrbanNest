import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { moduleName } from "../GlobalVariables";

const ProtectedAuthRoute: React.FC = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails") || "null");

  if (userDetails) {
    return <Navigate to={`/${moduleName}/${userDetails.role}`} />;
  }

  return <Outlet />;
};

export default ProtectedAuthRoute;