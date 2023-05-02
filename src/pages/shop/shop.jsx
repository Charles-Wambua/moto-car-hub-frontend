import { useState, useEffect } from "react";
import axios from "axios";
// import "../../App.css";
import { useNavigate } from "react-router-dom";
import "../shop/shop.css";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
export const Shop = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");
  const [isAdmin, setIsAdmin] = useState(false);

  

  useEffect(() => {
    const isAdminFromLocalStorage = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(isAdminFromLocalStorage);
    
    
    if (!authToken) { // check if the user is not logged in
      navigate("/login"); // redirect to login page
      return;
    }
    
   
    axios
      .get("https://moto-car-hub-api.onrender.com/getCars")
      .then((res) => {
        setProducts(res.data.reverse());
        setIsLoading(false);
       
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
     
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
      <div class="lds-ripple"><div></div><div></div></div>
      ) : (
        <div className="products-container">
          {products.map((product) => (
            <div className="product-card" key={product._id}>
              {authToken && isAdmin && ( // show the delete button only if the user is logged in
                <button
                  className="delete-button"
                  onClick={() => deleteProduct(product._id)}
                >
                  <FaTrashAlt />
                </button>
              )}
              <div className="product-image">
              {product.images.map((image) => (
                <img key={image} src={image} alt={product.name} />
                 ))}
                </div>

              <div className="product-info">
              {/* <Link to="/viewmore" >View more about this ride</Link> <br />
              <Link to={`/addMore/${product._id}`} >Add Details</Link> */}
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
