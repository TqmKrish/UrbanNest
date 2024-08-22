import React from "react";
import "./UserCard.scss";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { UserInfo } from "../../../../../mockAPI/DB/Users/Users";

interface ParamInterface {
  user: UserInfo;
  index: number;
}

const UserCard: React.FC<ParamInterface> = ({ user, index }) => {
  return (
    <div className="user-card">
      <div className="image-container">
        <img
          src={user.profilePicture}
          alt={`${user.firstName}'s profile`}
          className="profile-picture"
        />
      </div>
      <div className="user-details">
        <h3>{user.firstName + " " + user.lastName}</h3>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
        <p>
          <strong>Verified:</strong>
          {user.verified ? (
            <FaCheckCircle className="verified-icon" />
          ) : (
            <FaTimesCircle className="unverified-icon" />
          )}
        </p>
        <p>
          <strong>Contact:</strong> {user.contactNumber}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>ID:</strong> {user.id}
        </p>
        <p>
          <strong>Created At:</strong> {user.createdAt.toDateString()}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
