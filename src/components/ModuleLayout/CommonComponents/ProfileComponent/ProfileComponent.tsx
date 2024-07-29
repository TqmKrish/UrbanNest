import React, { useState } from "react";
import { FaCamera, FaEye, FaTrash } from "react-icons/fa";
import "./ProfileComponent.scss";
import { UserInfo } from "../../../../mockAPI/DB/Users/Users";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { FiEdit2 } from "react-icons/fi";

interface AdminProfileProps {
  admin: UserInfo;
}

const ProfileComponent: React.FC = () => {
  const admin: UserInfo = {} as UserInfo;
  const [editableAdmin, setEditableAdmin] = useState<UserInfo>(admin);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setEditableAdmin((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    // onSave(editableAdmin);
  };

  const handleCancel = () => {};

  const handleProfilePictureAction = (action: string) => {
    if (action === "view") {
      window.open(editableAdmin.profilePicture, "_blank");
    } else if (action === "remove") {
      setEditableAdmin((prev) => ({ ...prev, profilePicture: "" }));
    } else if (action === "update") {
      const newPicture = prompt("Enter the new profile picture URL");
      if (newPicture) {
        setEditableAdmin((prev) => ({ ...prev, profilePicture: newPicture }));
      }
    }
    handleMenuClose();
  };

  return (
    <div className="admin-profile-container">
      <div className="admin-profile-header">
        <button className="admin-profile-btn-cancel" onClick={handleCancel}>
          Cancel
        </button>
        <button className="admin-profile-btn-save" onClick={handleSave}>
          Save
        </button>
      </div>
      <div className="admin-profile-picture-container">
        <div className="relative">
          <img
            src={editableAdmin.profilePicture}
            alt={`${editableAdmin.fullName}'s profile`}
            className="admin-profile-picture"
          />
          <IconButton
            aria-label="more"
            aria-controls="profile-picture-menu"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            className="admin-profile-picture-menu-button"
          >
            <FiEdit2 />
          </IconButton>
          <Menu
            id="profile-picture-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleMenuClose}
          >
            <MenuItem className="gap-2" onClick={() => handleProfilePictureAction("view")}>
              <FaEye /> View
            </MenuItem>
            <MenuItem className="gap-2" onClick={() => handleProfilePictureAction("remove")}>
              <FaTrash /> Remove
            </MenuItem>
            <MenuItem className="gap-2" onClick={() => handleProfilePictureAction("update")}>
              <FaCamera /> Update
            </MenuItem>
          </Menu>
        </div>
      </div>
      <form className="admin-profile-details-form">
        <div className="admin-profile-form-row">
          <div className="admin-profile-form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={editableAdmin.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="admin-profile-form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={editableAdmin.username}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="admin-profile-form-row">
          <div className="admin-profile-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={editableAdmin.email}
              onChange={handleChange}
            />
          </div>
          <div className="admin-profile-form-group">
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={editableAdmin.contactNumber}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="admin-profile-form-row">
          <div className="admin-profile-form-group">
            <label htmlFor="status">Status</label>
            <input
              type="text"
              id="status"
              name="status"
              value={editableAdmin.status}
              onChange={handleChange}
            />
          </div>
          <div className="admin-profile-form-group">
            <label htmlFor="department">Department</label>
            <input
              type="text"
              id="department"
              name="department"
              value={editableAdmin.department}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="admin-profile-form-row">
          <div className="admin-profile-form-group">
            <label htmlFor="region">Region</label>
            <input
              type="text"
              id="region"
              name="region"
              value={editableAdmin.region}
              onChange={handleChange}
            />
          </div>
          <div className="admin-profile-form-group">
            <label htmlFor="bio">Bio</label>
            <input
              type="text"
              id="bio"
              name="bio"
              value={editableAdmin.bio}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="admin-profile-form-row">
          <div className="admin-profile-form-group">
            <label htmlFor="managedPropertiesCount">
              Managed Properties Count
            </label>
            <input
              type="number"
              id="managedPropertiesCount"
              name="managedPropertiesCount"
              value={editableAdmin.managedPropertiesCount}
              onChange={handleChange}
            />
          </div>
          <div className="admin-profile-form-group">
            <label htmlFor="assignedTasks">Assigned Tasks</label>
            <input
              type="text"
              id="assignedTasks"
              name="assignedTasks"
              value={editableAdmin?.assignedTasks?.join(", ")}
            />
          </div>
        </div>
        <div className="admin-profile-form-row">
          <div className="admin-profile-form-group flex-row align-items-center gap-2">
            <input
              type="checkbox"
              id="notificationsEnabled"
              name="notificationsEnabled"
              checked={editableAdmin.notificationsEnabled}
              onChange={handleChange}
            />
            <label className="mb-0" htmlFor="notificationsEnabled">Notifications Enabled</label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileComponent;
