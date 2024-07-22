import React, { useEffect, useState } from "react";
import "./Header.scss";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarRightCollapse,
} from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateSearch } from "../../../../Redux/Searchbar/Searchbar";
import { updateTabName } from "../../../../Redux/Name/Name";
import { Popover, Typography } from "@mui/material";

const Header = ({ onDrawerToggle, open }: any) => {
  const [value, setValue] = useState<string>("");
  const searchValue = useSelector((state: any) => state.search.value);
  const tabName = useSelector((state: any) => state.name.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updateValue = (event: any) => {
    setValue(event?.target.value);
    if (event.target.value === "" && searchValue !== "") {
      dispatch(updateSearch(value));
    }
  };

  const search = () => {
    dispatch(updateSearch(value));
    dispatch(updateTabName("Buy"));
    navigate("buy");
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handlePopoverClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPopover: boolean = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;

  return (
    <header className="d-flex justify-between align-items-center">
      <div className="d-flex align-items-center gap-2">
        <button className="collapse-icon" onClick={onDrawerToggle}>
          {open ? (
            <TbLayoutSidebarLeftCollapse />
          ) : (
            <TbLayoutSidebarRightCollapse />
          )}
        </button>

        <h2 className="mb-0">{tabName}</h2>
      </div>
      <div className="search-bar">
        <div className="relative">
          <input
            type="text"
            id="search-bar"
            value={value}
            onChange={updateValue}
            className="block w-ful pe-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Apartments,Homes..."
          />
          <div
            className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
            onClick={search}
          >
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="action-wrapper d-flex align-items-center gap-2">
        <button
          className="header-btn"
          aria-describedby={id}
          onClick={handlePopoverClick}
        >
          <span>
            <IoMdNotificationsOutline />
          </span>
        </button>
        <Popover
          id={id}
          open={openPopover}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Typography sx={{ p: 2 }}>No new notifications</Typography>
        </Popover>
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
