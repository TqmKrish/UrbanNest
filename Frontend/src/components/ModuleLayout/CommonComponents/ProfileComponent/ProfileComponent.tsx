import React, { useState, useRef } from "react";
import { FaCamera, FaEye, FaTrash } from "react-icons/fa";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { FiEdit2 } from "react-icons/fi";
import { envUrl } from "../../../../GlobalVariables";
import axios from "axios";
import "./ProfileComponent.scss";
import { UserInfo } from "../../../../mockAPI/DB/Users/Users";
import axiosInterceptor from "../../../../Interceptor/axiosInterceptor";

const ProfileComponent: React.FC = () => {
  const admin: UserInfo = JSON.parse(
    localStorage.getItem("userDetails") ?? "{}"
  ) as UserInfo;
  const [editableAdmin, setEditableAdmin] = useState<UserInfo>(admin);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(
    envUrl + admin.profilePicture
  );
  const open = Boolean(anchorEl);
  const [isEditing, toggleEditing] = useState<boolean>(false);
  const roleOptions = ["admin", "user", "super admin"];

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

  const handleProfilePictureAction = (action: string) => {
    if (action === "view") {
      window.open(envUrl + editableAdmin.profilePicture, "_blank");
    } else if (action === "remove") {
      setEditableAdmin((prev) => ({ ...prev, profilePicture: "" }));
      setPreviewUrl(""); // Clear preview URL
    } else if (action === "update") {
      fileInputRef.current?.click(); // Trigger file input click
    }
    handleMenuClose();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      // Create a URL for previewing the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string); // Set preview URL
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("id", editableAdmin.id);
    formData.append("firstName", editableAdmin.firstName);
    formData.append("lastName", editableAdmin.lastName);
    formData.append("username", editableAdmin.username);
    formData.append("email", editableAdmin.email);
    formData.append("contactNumber", editableAdmin.contactNumber);
    formData.append("address", editableAdmin.address);
    formData.append("linkedin", editableAdmin.socialLinks.linkedin || "");
    formData.append("facebook", editableAdmin.socialLinks.facebook || "");
    formData.append(
      "notificationsEnabled",
      String(editableAdmin.notificationsEnabled)
    );
    if (selectedFile) {
      formData.append("profilePicture", selectedFile);
    }

    try {
      await axiosInterceptor
        .patch(`${envUrl}api/user/${editableAdmin.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response: any) => {
          console.log(response);
          toggleEditing(false);
          localStorage.setItem(
            "userDetails",
            JSON.stringify(response.data.user)
          );
        });
      // Handle successful save (e.g., show a message, update local storage, etc.)
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error("Error updating profile:", error);
    }
  };

  const handleCancel = () => {
    // Implement cancel logic if necessary
    toggleEditing(false);
    setEditableAdmin(
      JSON.parse(localStorage.getItem("userDetails") ?? "{}") as UserInfo
    );
  };

  const handleEdit = () => {
    toggleEditing(true);
  };

  return (
    <div className="admin-profile-container">
      <div className="admin-profile-header">
        {isEditing && (
          <>
            <button className="admin-profile-btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button className="admin-profile-btn-save" onClick={handleSave}>
              Save
            </button>
          </>
        )}
        {!isEditing && (
          <button className="admin-profile-btn-cancel" onClick={handleEdit}>
            Edit
          </button>
        )}
      </div>
      <div className="admin-profile-picture-container">
        <div className="relative">
          <img
            src={previewUrl}
            alt={`${editableAdmin.firstName}'s profile`}
            className="admin-profile-picture"
          />
          {isEditing && (
            <IconButton
              aria-label="more"
              aria-controls="profile-picture-menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              className="admin-profile-picture-menu-button"
            >
              <FiEdit2 />
            </IconButton>
          )}
          <Menu
            id="profile-picture-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleMenuClose}
          >
            <MenuItem
              className="gap-2"
              onClick={() => handleProfilePictureAction("view")}
            >
              <FaEye /> View
            </MenuItem>
            <MenuItem
              className="gap-2"
              onClick={() => handleProfilePictureAction("remove")}
            >
              <FaTrash /> Remove
            </MenuItem>
            <MenuItem
              className="gap-2"
              onClick={() => handleProfilePictureAction("update")}
            >
              <FaCamera /> Update
            </MenuItem>
          </Menu>
        </div>
      </div>
      <form className="admin-profile-details-form">
        {/* Form fields */}
        <div className="admin-profile-form-row">
          <div className="admin-profile-form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={editableAdmin.firstName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="admin-profile-form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={editableAdmin.lastName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="admin-profile-form-row">
          <div className="admin-profile-form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={editableAdmin.username}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="admin-profile-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={editableAdmin.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="admin-profile-form-row">
          <div className="admin-profile-form-group">
            <label htmlFor="contactNumber">Contact Number</label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={editableAdmin.contactNumber}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
          <div className="admin-profile-form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={editableAdmin.address}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* <div className="admin-profile-form-row">
          <div className="admin-profile-form-group">
            <label htmlFor="linkedin">LinkedIn</label>
            <input
              type="text"
              id="linkedin"
              name="linkedin"
              value={editableAdmin.socialLinks.linkedin || ""}
              onChange={handleChange}
            />
          </div>
          <div className="admin-profile-form-group">
            <label htmlFor="facebook">Facebook</label>
            <input
              type="text"
              id="facebook"
              name="facebook"
              value={editableAdmin.socialLinks.facebook || ""}
              onChange={handleChange}
            />
          </div>
        </div> */}

        <div className="admin-profile-form-row">
          <div className="admin-profile-form-group flex-row align-items-center gap-2">
            <input
              type="checkbox"
              id="notificationsEnabled"
              name="notificationsEnabled"
              checked={editableAdmin.notificationsEnabled}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <label className="mb-0" htmlFor="notificationsEnabled">
              Notifications Enabled
            </label>
          </div>
        </div>
      </form>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        disabled={!isEditing}
      />
    </div>
  );
};

export default ProfileComponent;
