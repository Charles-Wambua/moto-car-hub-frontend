import { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import "../shop/shop.css";

export const Shop = () => {
  const [products, setProducts] = useState([]);
  const navigate=useNavigate()

  useEffect(() => {
    axios.get("https://moto-car-hub-api.onrender.com/getCars").then((res) => {
      setProducts(res.data);
    });
  }, []);

  const contactSeller = (sellerId) => {
    navigate("/contact")
  };

  return (
    <div className="products-container">
      {products.map((product) => (
        <div className="product-card" key={product._id}>
          <div className="product-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-info">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <h4>Ksh: {product.price}</h4>
            <button onClick={() => contactSeller(product.sellerId)}>
              Contact Seller
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};



















































