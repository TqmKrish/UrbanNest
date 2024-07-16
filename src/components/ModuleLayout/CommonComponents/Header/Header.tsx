import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

import React, { useState } from "react";
import "./Header.scss";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarRightCollapse,
} from "react-icons/tb";

const Header = ({ onDrawerToggle, open }: any) => {
  return (
    <header className="d-flex justify-between">
      <div className="d-flex align-items-center gap-2">
        <button className="collapse-icon" onClick={onDrawerToggle}>
          {open ? (
            <TbLayoutSidebarLeftCollapse />
          ) : (
            <TbLayoutSidebarRightCollapse />
          )}
        </button>

        <h2>Title</h2>
      </div>
      <div className="action-wrapper d-flex align-items-center gap-2">
        <button className="header-btn">
          <span>
            <IoMdNotificationsOutline />
          </span>
        </button>
        <button className="header-btn">
          <span>
            <MdOutlineEmail />
          </span>
        </button>
        <div className="d-flex align-items-center gap-2">
          <span className="avatar-wrapper">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
            />
          </span>
          <ul className="px-0 mb-0">
            <li>User Name</li>
            <li>Super Admin</li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
