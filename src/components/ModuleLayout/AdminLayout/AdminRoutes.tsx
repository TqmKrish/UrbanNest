import React from "react";
import { Navigate } from "react-router-dom";
import HomeComponent from "./HomeComponent/HomeComponent";
import AboutComponent from "./AboutComponent/AboutComponent";
import ContactMeComponent from "./ContactMeComponent/ContactMeComponent";
import UserComponent from "./UsersComponent/UsersComponent";
import ProjectsComponent from "./ProjectsComponent/ProjectsComponent";

const AdminRoutes = [
  {
    path: "home",
    element: <HomeComponent />,
    index: true,
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
    path: "users/:userName",
    element: <UserComponent />,
  },
];
export default AdminRoutes;
