import React from "react";
import NavbarComponent from "../CommonComponents/Navbar/NavbarComponent";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="row mx-0 w-100">
        user
      <NavbarComponent />
      <div className="content-wrapper">{<Outlet />}</div>
    </div>
  );
};

export default UserLayout;
