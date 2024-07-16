import React from "react";
import { NavLink } from "react-router-dom";
import { appDetails, moduleName } from "../../../../GlobalVariables";
import "./Sidebar.scss";

const Sidebar = ({ open }: any) => {
  const navigation = [
    { name: "Home", url: `/${moduleName}/admin`, current: true },
    { name: "About", url: `/${moduleName}/admin/about`, current: false },
    { name: "Projects", url: `/${moduleName}/admin/projects`, current: false },
    { name: "Contact Us", url: `/${moduleName}/admin/contact`, current: false },
    { name: "Users", url: `/${moduleName}/admin/users`, current: false },
  ];

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
        {open ? <span>{appDetails.name}</span> : ""}
      </div>
      <ul className="nav-list">
        {navigation.map((nav: any) => (
          <NavLink className="nav-link" to={nav.url} key={nav.name}>
            <li>
              {nav.icon}
              {open ? nav.name : ""}
            </li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
