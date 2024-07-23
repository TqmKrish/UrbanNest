import React, { useState } from "react";
import "./LoginComponent.scss";
import { Link, useNavigate } from "react-router-dom";
import { moduleName } from "../../../GlobalVariables";
import axios from "axios";
import { MockAPI } from "../../../mockAPI/mockProvider";

interface FormState {
  [key: string]: string;
}

const LoginComponent: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({});
  const [errors, setErrors] = useState<FormState>({});
  const navigate = useNavigate();
  const axiosInstance = axios.create();
  MockAPI(axiosInstance);

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
    } else {
      // Handle login logic here
      axiosInstance
        .post("/login", formState)
        .then((response: any) => {
          if (response?.data?.isLoginSuccessful) {
            localStorage.setItem(
              "userDetails",
              JSON.stringify(response?.data?.user)
            );
            let role: string =
              response?.data?.user?.role === "admin" ? "admin" : "user";
            navigate(`/${moduleName}/${role}`);
          } else {
            setFormState({});
          }
        })
        .catch((error: any) => {
          console.error(error);
        });
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
