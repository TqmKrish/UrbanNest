import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { MockAPI } from "../../../../../mockAPI/mockProvider";
import { PropertyDetails } from "../../../../../mockAPI/DB/Properties/PropertiesForBuy";
import PropertyCard from "../../../CommonComponents/PropertyCard/PropertyCard";
import UserCard from "../UserCard/UserCard";
import { UserInfo } from "../../../../../mockAPI/DB/Users/Users";

const UsersComponent = () => {
  const axiosInstance = axios.create();
  MockAPI(axiosInstance);

  let [users, setUsers] = useState<UserInfo[]>([]);

  useEffect(() => {
    axiosInstance
      .get("/getAllProperties/buy")

      .catch((error: any) => {
        console.log("error", error);
      });
  }, []);

  // useEffect(() => {
  //   axiosInstance
  //     .get(`/filterProperties/${searchValue}`)
  //     .then((res: any) => {
  //       setProperties(res.data.properties);
  //     })
  //     .catch((error: any) => {
  //       console.log("error", error);
  //     });
  // }, [searchValue]);

  return (
    <div className="property-container">
      {users.map((user: UserInfo, index) => (
        <UserCard user={user} index={index} key={user.id} />
      ))}
    </div>
  );
};

export default UsersComponent;
