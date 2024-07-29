import React, { useState } from "react";
import "./SignUpComponent.scss";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

interface FormState {
  [key: string]: string;
}

const SignUpComponent = () => {
  const [formState, setFormState] = useState<FormState>({});
  const [errors, setErrors] = useState<FormState>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormState((prev: any) => ({ ...prev, [id]: value }));
    setErrors((prev: any) => ({ ...prev, [id]: "" }));
  };

  const validate = () => {
    const newErrors: FormState = {};
    if (!formState.username) {
      newErrors.username = "Username is required.";
    }
    if (!formState.password) {
      newErrors.password = "Password is required.";
    }
    if (!formState.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = "Email is invalid.";
    }
    // Add validation for other fields as necessary
    return newErrors;
  };

  const validateAndSignUp = (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Handle signup logic here
    }
  };

  return (
    <div className="layout-wrapper ">
      <div className="title">
        <h2>Sign Up</h2>
      </div>
      <div>
        <form onSubmit={validateAndSignUp}>
          <div className="input-wrapper">
            <label htmlFor="username">Username* :</label>
            <input
              type="text"
              id="username"
              value={formState.username || ""}
              onChange={handleChange}
              placeholder="Type your username"
            />
            {errors.username && (
              <p style={{ color: "red" }}>{errors.username}</p>
            )}
          </div>
          <div className="input-wrapper">
            <label htmlFor="email">Email* :</label>
            <input
              type="text"
              id="email"
              value={formState.email || ""}
              onChange={handleChange}
              placeholder="Type your email"
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          </div>
          <div className="input-wrapper">
            <label htmlFor="confirmPassword">Confirm Password* :</label>
            <input
              type="confirmPassword"
              id="confirmPassword"
              value={formState.confirmPassword || ""}
              onChange={handleChange}
              placeholder="Re type your password"
            />
            {errors.confirmPassword && (
              <p style={{ color: "red" }}>{errors.confirmPassword}</p>
            )}
          </div>

          <button className="my-3 auth-btns" type="submit">
            Sign Up
          </button>

          <hr />

          <button
            className="my-3 auth-btns"
            type="button"
            style={{ background: "#e4d9c8", color: "white" }}
          >
            Sign up with Google
          </button>

          <hr />

          <div className="d-flex flex-column align-items-center">
            <span>
              <Link
                to="/auth/login"
                className="d-flex gap-2 align-items-center"
              >
                <IoMdArrowBack /> Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpComponent;
