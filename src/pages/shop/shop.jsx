import { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import "../shop/shop.css";
import { FaTrashAlt } from "react-icons/fa"; // import the trash can icon

export const Shop = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // add isLoading state variable
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken"); // get the auth token from local storage

  useEffect(() => {
    axios
      .get("https://moto-car-hub-api.onrender.com/getCars")
      .then((res) => {
        setProducts(res.data.reverse()); // Reverse the order of the products array
        setIsLoading(false); // set isLoading to false once data has been fetched
      })
      .catch((err) => {
        console.log(err);
        // Display error message to user
        setIsLoading(false); // set isLoading to false if an error occurs
      });
  }, []);

  const contactSeller = (sellerId) => {
    navigate("/contact");
  };

  const deleteProduct = (productId) => {
    axios
      .delete(`https://moto-car-hub-api.onrender.com/deleteCar/${productId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`, // pass the auth token as a header
        },
      })
      .then((res) => {
        // Remove the deleted product from the state
        setProducts(products.filter((product) => product._id !== productId));
      })
      .catch((err) => {
        console.log(err);
        // Display error message to user
      });
  };

  return (
    <div>
      {isLoading ? (
        <div className="spinner"></div> // display spinner while data is being fetched
      ) : (
        <div className="products-container">
          {products.map((product) => (
            <div className="product-card" key={product._id}>
              {authToken && ( // show the delete button only if the user is logged in
                <button
                  className="delete-button"
                  onClick={() => deleteProduct(product._id)}
                >
                  <FaTrashAlt />
                </button>
              )}
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <h4 className="price">{product.price.toLocaleString()}</h4>
                <button onClick={() => contactSeller(product.sellerId)}>
                  Contact Seller
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

































































































































