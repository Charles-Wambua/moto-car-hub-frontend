import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../shop/shop.css";
import { Link } from "react-router-dom";

export const ViewMore = ({ match }) => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const productId = match.params.id; // Get the ID from the URL parameter
    axios
      .get(`https://moto-car-hub.onrender.com/getCar/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [match.params.id]); // Add the ID as a dependency to re-fetch the data when it changes

  return (
    <div>
      {isLoading ? (
        <div className="spinner"></div>
      ) : (
        <div className="product-container">
          <div className="product-card">
            {authToken && (
              <Link to={`/addMore/${product._id}`}>Edit</Link>
            )}
            <div className="product-image">
              {product.images.map((image) => (
                <img key={image} src={image} alt={product.name} />
              ))}
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <h4 className="price">{product.price.toLocaleString()}</h4>
              <button onClick={() => navigate("/contact")}>
                Contact Seller
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
