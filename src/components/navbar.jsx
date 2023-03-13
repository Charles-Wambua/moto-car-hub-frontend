import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import { Car} from "phosphor-react";

import "./navbar.css";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    // Clear the user's authentication token or userID from localStorage
    localStorage.removeItem("token"); // or localStorage.removeItem("userID")
    setIsLoggedIn(false);
  };

  return (
    <div className="container">
      <h3>MOTO CAR HUB   <Car/><Car/><Car/>  </h3>
      <div className="navbar">
        <div className="links">
          <Link to="/">Home</Link>
          <Link to="/contact">ContactMe</Link>

          {/* Show Login or Logout link based on whether user is logged in */}
          {isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}

          {/* Show Admin link only when user is logged in */}
          {isLoggedIn && <Link to="/admin">Admin</Link>}

          <Link to="/cart">
            <ShoppingCart size={32} />
          </Link>
        </div>
      </div>
    </div>
  );
};





















