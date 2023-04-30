import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/shop-context";
import { useEffect } from "react";
import axios from "axios";

export const Product = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { addToCart, cartItems } = useContext(ShopContext);
  const [listOfCars, setListOfCars] = useState([]);

  const cartItemCount = cartItems[id];

  useEffect(() => {
    axios.get("https://moto-car-hub-api.onrender.com/getCars").then((res) => {
      setListOfCars(res.data);
    });
  }, []);

  return (
    <div className="product">
      <img src={productImage} />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p> ${price}</p>
        <></>
        <div>{listOfCars.map((car => {
          <div>
            <h1>name:{car.name }</h1>
            <h1>name:{car.description }</h1>
            <h1>name:{car.price }</h1>
          </div>
        }))}</div>
      </div>
      <button className="addToCartBttn" onClick={() => addToCart(id)}>
        Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
      </button>
    </div>
  );
};
