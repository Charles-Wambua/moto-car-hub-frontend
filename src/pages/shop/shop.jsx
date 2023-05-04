import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./shop.css";

export const Shop = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const isAdminFromLocalStorage = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(isAdminFromLocalStorage);

    if (!authToken) {
      navigate("/login");
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
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setProducts(products.filter((product) => product._id !== productId));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleImageClick = (event, productIndex, imageIndex) => {
    event.stopPropagation();
    setProducts((prevProducts) =>
      prevProducts.map((product, index) => {
        if (index === productIndex) {
          return {
            ...product,
            activeImageIndex: imageIndex,
          };
        }
        return product;
      })
    );
  };

  return (
    <div>
      {isLoading ? (
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      ) : (
        <div className="products-container">
          {products.map((product, productIndex) => (
            <div className="product-card" key={product._id}>
              {authToken && isAdmin && (
                <button
                  className="delete-button"
                  onClick={() => deleteProduct(product._id)}
                >
                  <FaTrashAlt />
                </button>
              )}
              <div className="product-image">
                <Carousel
                  activeIndex={product.activeImageIndex || 0}
                  onSelect={(selectedIndex) =>
                    setProducts((prevProducts) =>
                      prevProducts.map((prevProduct, index) => {
                        if (index === productIndex) {
                          return {
                            ...prevProduct,
                            activeImageIndex: selectedIndex,
                          };
                        }
                        return prevProduct;
                      })
                    )
                  }
                >
                  {product.images.map((image, imageIndex) => (
                    <Carousel.Item key={image}>
                      <img
                        src={image}
                        alt={product.name}
                        onClick={(event) =>
                          handleImageClick(event, productIndex, imageIndex)
                        }
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
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
