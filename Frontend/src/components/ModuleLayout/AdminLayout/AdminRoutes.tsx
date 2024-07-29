import React from "react";
import BuyComponent from "./BuyLayout/BuyComponent/BuyComponent";
import SellComponent from "./SellComponent/SellComponent";
import ContactMeComponent from "./ContactUsComponent/ContactUsComponent";
import UsersComponent from "./UsersLayout/UsersComponent/UsersComponent";
import RentComponent from "./RentLayout/RentComponent/RentComponent";
import ViewComponent from "../CommonComponents/ViewComponent/ViewComponent";
import BuyLayout from "./BuyLayout/BuyLayout";
import { Navigate } from "react-router-dom";
import RentLayout from "./RentLayout/RentLayout";
import ProfileComponent from "../CommonComponents/ProfileComponent/ProfileComponent";
import UsersLayout from "./UsersLayout/UsersLayout";

const AdminRoutes = [
  {
    path: "",
    element: <Navigate to="buy" />,
  },
  {
    path: "buy",
    element: <BuyLayout />,
    children: [
      {
        path: "",
        element: <BuyComponent />,
        index: true,
      },
      {
        path: ":id",
        element: <ViewComponent propertyType="buy" />,
      },
    ],
  },
  {
    path: "sell",
    element: <SellComponent />,
  },
  {
    path: "rent",
    element: <RentLayout />,
    children: [
      {
        path: "",
        element: <RentComponent />,
        index: true,
      },
      {
        path: ":id",
        element: <ViewComponent propertyType="rent" />,
      },
    ],
  },
  {
    path: "contact",
    element: <ContactMeComponent />,
  },
  {
    path: "users",
    element: <UsersLayout />,
    children: [
      {
        path: "",
        element: <UsersComponent />,
        index: true,
      },
      {
        path: ":id",
        element: <ViewComponent propertyType="rent" />,
      },
    ],
  },
  {
    path: "profile",
    element: <ProfileComponent />,
  },
];
export default AdminRoutes;
