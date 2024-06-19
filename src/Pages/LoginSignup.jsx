import React, { useState } from "react";
import "./CSS/LoginSignup.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      if (formData.email.trim() === "")
        return toast.warning("Please enter your email");
      if (formData.password.trim() === "")
        return toast.warning("Please enter your password");
      const response = await axios.post("/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = response.data;
      if (responseData.success) {
        toast.success("Logged in successfully");
        localStorage.setItem("auth-token", responseData.token);
        window.location.replace("/");
      } else {
        toast.error(responseData.errors);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(
        "An error occurred while logging in. Please try again later."
      );
    }
  };

  const signup = async () => {
    try {
      if (formData.username.trim() === "")
        return toast.warning("Please enter your name");
      if (formData.email.trim() === "")
        return toast.warning("Please enter your email");
      if (formData.password.trim() === "")
        return toast.warning("Please enter your password");
      const response = await axios.post("/signup", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = response.data;
      if (responseData.success) {
        toast.success("Signed up successfully");
        localStorage.setItem("auth-token", responseData.token);
        window.location.replace("/");
      } else {
        toast.error(responseData.errors);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error(
        "An error occurred while signing up. Please try again later."
      );
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" && (
            <input
              name="username"
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder="Your name"
            />
          )}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email address"
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
          />
        </div>
        <button
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
        >
          Continue
        </button>
        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span onClick={() => setState("Login")}>Login here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            New User? Create an account.{" "}
            <span onClick={() => setState("Sign Up")}>Click here</span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
