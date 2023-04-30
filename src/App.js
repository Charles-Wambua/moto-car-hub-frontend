import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Shop } from "./pages/shop/shop";
import { Contact } from "./pages/contact";
import { Cart } from "./pages/cart/cart";
import { Admin } from "./pages/admin/admin";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import { ViewMore } from "./pages/shop/ViewMore";
import { Logout } from "./pages/auth/Logout";
import { AddMore } from "./pages/admin/UpdateProduct";
import { UpdateProduct } from "./pages/admin/UpdateProduct";
import { RegisteredUsers } from "./pages/auth/RegisteredUsers";

function App() {
  // const token = localStorage.getItem("token");
  // const isLoggedIn = token ? true : false;
  const authToken = localStorage.getItem("authToken"); // get the auth token from local storage

  return (
    <div className="App">
    
        <Router>
          <Navbar  />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
          {/* {authToken && ( */}
            <Route path="/logout" element={<Logout />} />
          {/* )} */}
          {/* {!authToken &&( */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/viewmore" element={<ViewMore />} />
              <Route path="/addmore/:id" element={<UpdateProduct />} />
              <Route path="/users" element={<RegisteredUsers />} />

            {/* )} */}
            <Route path="/admin" element={<Admin />}>
              <Route path="cart" element={<Cart />} />
            </Route>
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>
      
    </div>
  );
}

export default App;






























