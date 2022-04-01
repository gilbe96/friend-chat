import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/ApiRoutes";

function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation) {
      const { password, confirmPassword, username, email } = user;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
    }
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = user;
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password should be same", toastOptions);
      return false;
    } else if (username.length < 4) {
      toast.error("Username should be greater than 3 characters", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password should be greater than 7 characters", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    }
  };

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="Logo"></img>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: rgb(41, 46, 61);
  .brand {
    display: flex;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    img {
      height: 10rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: rgb(20, 30, 60);
    border-radius: 2rem;
    padding: 2rem 3.5rem;
    input {
      background-color: transparent;
      padding: 0.7rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 5px;
      color: whitesmoke;
      width: 100%;
      font-size: 1rem;
      &: focus {
        border: 0.1rem solid #cc00cc;
        outline: none;
      }
    }
    button {
      background-color: #6600ff;
      color: whitesmoke;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 10px;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.3s ease-in-out;
      &:hover {
        background-color: #b380ff;
      }
    }
    span {
      color: whitesmoke;
      text-transform: uppercase;
      a {
        color: #99ccff;
        font-weight: bold;
        transition: 0.3s ease-in-out;
        text-decoration: none;
        &:hover {
          color: #ccccff;
        }
      }
    }
  }
`;

export default Register;