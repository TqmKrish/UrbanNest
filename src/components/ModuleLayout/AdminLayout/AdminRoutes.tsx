import React from "react";
import HomeComponent from "./HomeLayoutComponent/HomeComponent/HomeComponent";
import AboutComponent from "./AboutComponent/AboutComponent";
import ContactMeComponent from "./ContactMeComponent/ContactMeComponent";
import UserComponent from "./UsersComponent/UsersComponent";
import ProjectsComponent from "./ProjectsComponent/ProjectsComponent";
import ViewComponent from "./HomeLayoutComponent/ViewComponent/ViewComponent";
import HomeLayout from "./HomeLayoutComponent/HomeLayout";
import { Navigate } from "react-router-dom";

const AdminRoutes = [
  {
    path: "",
    element: <Navigate to="buy" />,
  },
  {
    path: "buy",
    element: <HomeLayout />,
    children: [
      {
        path: "",
        element: <HomeComponent />,
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
    element: <AboutComponent />,
  },
  {
    path: "projects",
    element: <ProjectsComponent />,
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
