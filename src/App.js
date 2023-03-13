import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Shop } from "./pages/shop/shop";
import { Contact } from "./pages/contact";
import { Cart } from "./pages/cart/cart";
import { Admin } from "./pages/admin/admin";

import Login from "./pages/auth/Login";

function App() {
  return (
    <div className="App">
    
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />}>
              <Route path="carrt" element={<Cart />} />
            </Route>
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>
      
    </div>
  );
}

export default App;
