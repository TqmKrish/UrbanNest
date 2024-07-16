import React from "react";
import "./AuthLayout.scss";
// import LoginComponent from "./Login/LoginComponent";
import logo from "../../assets/auth-images/da-guojing-6888603_1920.jpg";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="container component-layout">
      <div className="content-wrapper">
        <div>{<Outlet />}</div>
        <div>
          <img
            src={logo}
            alt="furniture-image"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
