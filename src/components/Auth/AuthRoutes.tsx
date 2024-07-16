import React from "react";
import LoginComponent from "./Login/LoginComponent";
import SignUpComponent from "./SignUp/SignUpComponent";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import AuthLayout from "./AuthLayout";
// const LoginComponent = lazy(() => import("./Login/LoginComponent"));
// const SignUpComponent = lazy(() => import("./SignUp/SignUpComponent"));
// const ForgotPassword = lazy(() => import("./ForgotPassword/ForgotPassword"));

const AuthRoutes = [
  {
    path: "",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginComponent />,
        index: true,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "sign-up",
        element: <SignUpComponent />,
      },
    ],
  },
];

export default AuthRoutes;
