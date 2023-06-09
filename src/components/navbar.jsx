import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Car } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./navbar.css";

export const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate= useNavigate()

  useEffect(() => {
    const isAdminFromLocalStorage = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(isAdminFromLocalStorage);
    const authToken = localStorage.getItem("authToken");
    setIsAuthenticated(authToken)
    
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  return (
    <div className="container">
      <h2>
      DrivewayAuto.com <hr /> <Car />
        <Car />
        <Car />
        <Car />
        <Car />
        <Car />
        <Car />
        <Car />
      </h2>
      <div className="navbar">
        <div className="links">
          <Link to="/">Home</Link>
          {!isAuthenticated  && <Link to="/login">Sign in</Link>}
          {isAuthenticated && isAdmin && <Link to="/admin">Admin</Link>}
          {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
          
         
        </div>
      </div>
    </div>
  );
};
