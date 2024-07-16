import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedModuleRoute = () => {
  let userDetails = JSON.parse(localStorage?.getItem("userDetails") || "{}");
  let content: React.JSX.Element = {} as React.JSX.Element;
  console.log(userDetails);
  userDetails?.token?.length
    ? (content = <Outlet />)
    : (content = <Navigate to="/auth" />);
  return <>{content}</>;
};

export default ProtectedModuleRoute;
