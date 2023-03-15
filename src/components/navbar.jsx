import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import { Car } from "phosphor-react";
import { useNavigate } from "react-router-dom";

import "./navbar.css";

export const Navbar = () => {
  const authToken = localStorage.getItem("authToken"); // get the auth token from local storage
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the user's authentication token or userID from localStorage
    localStorage.removeItem("token"); // or localStorage.removeItem("userID")
    navigate("/login");
  };

  return (
    <div className="container">
      <h2>
        MOTO CAR HUB <Car />
        <Car />
        <Car />{" "}
      </h2>
      <div className="navbar">
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/contact">ContactMe</Link>
          {/* Show Login or Logout link based on whether user is logged in */}

          {!authToken && <Link to="/login">Login</Link>}
          {/* Show Admin link only when user is logged in */}
          {authToken && <Link to="/admin">Admin</Link>}
          <Link to="/cart">
            <ShoppingCart size={32} />
          </Link>
        </div>
      </div>
    </div>
  );
};
