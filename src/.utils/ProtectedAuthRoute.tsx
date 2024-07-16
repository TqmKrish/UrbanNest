import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { moduleName } from "../GlobalVariables";

const ProtectedAuthRoute = () => {
  let userDetails = JSON.parse(localStorage?.getItem("userDetails") || "{}");
  let content: React.JSX.Element = {} as React.JSX.Element;
  console.log(userDetails);
  userDetails?.token?.length
    ? (content = <Navigate to={`/${moduleName}/${userDetails.role}`} />)
    : (content = <Outlet />);
  return <>{content}</>;
};

export default ProtectedAuthRoute;
