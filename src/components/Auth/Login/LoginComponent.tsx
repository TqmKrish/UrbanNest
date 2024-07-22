import React, { useState } from "react";
import "./LoginComponent.scss";
import { Link, useNavigate } from "react-router-dom";
import { moduleName } from "../../../GlobalVariables";
import Snackbar from "@mui/material/Snackbar";
import SnackbarComponent from "../../ModuleLayout/CommonComponents/Snackbar/SnackbarComponent";

interface FormState {
  [key: string]: string;
}

const LoginComponent: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({});
  const [errors, setErrors] = useState<FormState>({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarConfig, setSnackbarConfig] = useState({
    type: "",
    content: "",
    autoHideDuration: 0,
  });
  const navigate = useNavigate();

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showSuccessSnackbar = () => {
    setSnackbarConfig({
      type: "success",
      content: "Logged In Successfully",
      autoHideDuration: 6000,
    });
    setSnackbarOpen(true);
  };

  const showErrorSnackbar = () => {
    setSnackbarConfig({
      type: "error",
      content: "Login Failed",
      autoHideDuration: 6000,
    });
    setSnackbarOpen(true);
  };

  let userDetails = {
    name: "Krish Goyal",
    role: "admin",
    isLoggedIn: "true",
    token: "1234567890",
    tokenExpiryDateTime: new Date(new Date().getTime() + 15 * 60000),
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors: FormState = {};
    if (!formState.username) {
      newErrors.username = "Username is required.";
    }
    if (!formState.password) {
      newErrors.password = "Password is required.";
    }
    // Add validation for other fields as necessary
    return newErrors;
  };

  const validateAndLogin = (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showErrorSnackbar();
    } else {
      // Handle login logic here
      showSuccessSnackbar();
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
      navigate(`/${moduleName}/${userDetails.role}`);
    }
  };

  return (
    <div className="layout-wrapper ">
      <div className="title">
        <h2>Login</h2>
      </div>
      <div>
        <form onSubmit={validateAndLogin}>
          <div className="input-wrapper">
            <label htmlFor="username">Username* :</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formState.username || ""}
              onChange={handleChange}
              placeholder="Type your email"
            />
            {errors.username && (
              <p style={{ color: "red" }}>{errors.username}</p>
            )}
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password* :</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formState.password || ""}
              onChange={handleChange}
              placeholder="Type your password"
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password}</p>
            )}
          </div>
          <div className="d-flex justify-content-between">
            <span className="d-flex align-items-center">
              <input type="checkbox" id="remember-me" />
              <label className="mb-0 ms-1" htmlFor="password">
                Remember Me
              </label>
            </span>
            <span>
              <Link to="/auth/forgot-password">Forgot Password</Link>
            </span>
          </div>

          <button className="my-3 auth-btns" type="submit">
            Login
          </button>
          <SnackbarComponent
            open={snackbarOpen}
            onClose={handleSnackbarClose}
            type={snackbarConfig.type}
            content={snackbarConfig.content}
            autoHideDuration={snackbarConfig.autoHideDuration}
          />
          <hr />

          <button
            className="my-3 auth-btns"
            type="submit"
            style={{ background: "#e4d9c8", color: "white" }}
          >
            Sign in with Google
          </button>

          <hr />

          <div className="d-flex flex-column align-items-center">
            <span>
              <Link to="/auth/sign-up">New User? Signup Here.</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
