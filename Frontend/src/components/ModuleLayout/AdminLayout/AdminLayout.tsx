import React, { useState } from "react";
import "./AdminLayout.scss";
// import NavbarComponent from "../CommonComponents/Navbar/NavbarComponent";
import { Outlet } from "react-router-dom";
import Sidebar from "../CommonComponents/Sidebar/Sidebar";
import Header from "../CommonComponents/Header/Header";
import Chatbot from "../../CommonComponents/Chatbot/Chatbot";

const AdminLayout: React.FC = () => {
  const [open, setOpen] = useState(true);

  const handleDrawerToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <div className="module-wrapper">
      <div className={`sidebar ${open ? "expanded" : "collapsed"}`}>
        <Sidebar open={open} />
      </div>
      <div className="main">
        <div className="header">
          <Header onDrawerToggle={handleDrawerToggle} open={open} />
        </div>
        <div className="content">
          <Outlet />
        </div>
        <div className="chatbot">
          <Chatbot />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
