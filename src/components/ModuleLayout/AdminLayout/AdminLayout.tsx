import React, { useEffect, useState } from "react";
import "./AdminLayout.scss";
// import NavbarComponent from "../CommonComponents/Navbar/NavbarComponent";
import { Outlet } from "react-router-dom";
import Sidebar from "../CommonComponents/Sidebar/Sidebar";
import Header from "../CommonComponents/Header/Header";


const AdminLayout = () => {
  const [open, setOpen] = useState(true);

  const handleDrawerToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  useEffect(() => {
    console.log("Data changed:", open);
  }, [open]);

  return (
    <div className="row mx-0 w-100 module-wrapper">
      <Sidebar open={open} />
      <div className="main">
        <Header onDrawerToggle={handleDrawerToggle} open={open} />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
