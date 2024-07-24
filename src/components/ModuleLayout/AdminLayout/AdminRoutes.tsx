import React from "react";
import BuyComponent from "./BuyLayout/BuyComponent/BuyComponent";
import SellComponent from "./SellComponent/SellComponent";
import ContactMeComponent from "./ContactUsComponent/ContactUsComponent";
import UserComponent from "./UsersComponent/UsersComponent";
import RentComponent from "./RentComponent/RentComponent";
import ViewComponent from "./BuyLayout/ViewComponent/ViewComponent";
import BuyLayout from "./BuyLayout/BuyLayout";
import { Navigate } from "react-router-dom";

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
        element: <ViewComponent />,
      },
    ],
  },
  {
    path: "about",
    element: <SellComponent />,
  },
  {
    path: "projects",
    element: <RentComponent />,
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
