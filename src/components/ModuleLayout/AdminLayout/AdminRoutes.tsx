import React from "react";
import BuyComponent from "./BuyLayout/BuyComponent/BuyComponent";
import SellComponent from "./SellComponent/SellComponent";
import ContactMeComponent from "./ContactUsComponent/ContactUsComponent";
import UserComponent from "./UsersComponent/UsersComponent";
import RentComponent from "./RentLayout/RentComponent/RentComponent";
import ViewComponent from "../CommonComponents/ViewComponent/ViewComponent";
import BuyLayout from "./BuyLayout/BuyLayout";
import { Navigate } from "react-router-dom";
import RentLayout from "./RentLayout/RentLayout";

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
    element: <UserComponent />,
  },
];
export default AdminRoutes;
