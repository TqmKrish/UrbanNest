import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedModuleRoute: React.FC = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails") || "null");

  if (userDetails) {
    return <Outlet />;
  }

  return <Navigate to="/auth" replace />;
};

export default ProtectedModuleRoute;
