import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./AppRouting";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AuthLayout from "./components/Auth/AuthLayout";
// import LoginComponent from "./components/Auth/Login/LoginComponent";
// import SignUpComponent from "./components/Auth/SignUp/SignUpComponent";
// import ForgotPassword from "./components/Auth/ForgotPassword/ForgotPassword";

const App = () => {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Navigate to="/auth/login" />} />
    //     <Route path="auth" element={<AuthLayout />}>
    //       <Route path="login" element={<LoginComponent />} />
    //       <Route path="sign-up" element={<SignUpComponent />} />
    //       <Route path="forgot-password" element={<ForgotPassword />} />
    //     </Route>
    //   </Routes>
    // </Router>
    <div className="container-fluid px-0 w-100">
      <RouterProvider router={routes} />
    </div>
  );
};

export default App;
