import React from "react";
import { useParams } from "react-router-dom";

const UserComponent = () => {
  const params = useParams();
  return <div>UserComponent. Hii, {params.userName}</div>;
};

export default UserComponent;
