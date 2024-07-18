import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { appDetails, moduleName } from "../../../../GlobalVariables";
import "./Sidebar.scss";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineSell } from "react-icons/md";
import { MdAddCall } from "react-icons/md";
import AppLogo from "../../../../assets/Logo/AppLogo";

const Sidebar = ({ open }: any) => {
  const navigate = useNavigate();

  const navigation = [
    {
      name: "Buy",
      url: `/${moduleName}/admin/buy`,
      icon: <IoHomeOutline />,
    },
    {
      name: "Sell",
      url: `/${moduleName}/admin/about`,
      icon: <MdOutlineSell />,
    },
    {
      name: "Rent",
      url: `/${moduleName}/admin/projects`,
      icon: <IoHomeOutline />,
    },
    {
      name: "Contact Us",
      url: `/${moduleName}/admin/contact`,
      icon: <MdAddCall />,
    },
  ];

  const handleLogout = () => {
    // Implement your logout functionality here
    localStorage.clear();
    navigate("/auth/login");
    console.log("Logging out...");
  };

  return (
    <div className={`sidebar-wrapper ${open ? "open" : "closed"}`}>
      <div className="brand-wrapper">
        <img
          className="app-logo"
          alt="The house from the offer."
          src={
            appDetails.image ||
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
          }
        />
        {/* <AppLogo /> */}
        {open ? (
          <span className="white-space-nowrap">{appDetails.name}</span>
        ) : (
          ""
        )}
      </div>
      <ul className="nav-list">
        {navigation.map((nav: any) => (
          <li key={nav.name}>
            <NavLink className="nav-link" to={nav.url}>
              {nav.icon}
              {open ? nav.name : ""}
            </NavLink>
          </li>
        ))}
      </ul>
      {/* Logout Button */}
      <div className="logout-button-container">
        <button className="logout-button" onClick={handleLogout}>
          <MdAddCall /> {/* Example icon, replace with your logout icon */}
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
