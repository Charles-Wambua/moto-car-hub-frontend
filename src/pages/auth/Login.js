import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { Admin } from "../admin/admin";
import { Shop } from "../shop/shop";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`email: ${email}, password: ${password}`);
    fetch("https://moto-car-hub-api.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Invalid credentials");
        }
      })
      .then((data) => {
        localStorage.setItem("authToken", data.token); // store the token in localStorage
        setIsAuthenticated(true);
        localStorage.setItem("isAdmin", data.isAdmin); // store isAdmin status in localStorage
        // navigate("/admin");
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);
      });
  };

  


  return isAuthenticated ? (
    <div>
      
      {<Shop />}
    </div>
  ) : (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-header">Login</h2>
        <div className="form-group">
          <label htmlFor="username">Email:</label>
          <input
            type="text"
            id="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
          </button>
          <div className="register-link">
        You do not have an account? <a href="/register">Register here</a>
      </div>
        </form>
       
    </div>
  );
};

export default Login;








































































