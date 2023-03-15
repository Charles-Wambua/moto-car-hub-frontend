import { useState } from "react";
import axios from "axios";
import "../../App.css";
import { useNavigate } from "react-router-dom";

export const Admin = () => {
  const [listOfCars, setListOfCars] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
    setImageUrl(URL.createObjectURL(event.target.files[0]));
  };

  const createPost = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image, image.name);

    try {
      const res = await axios.post("https://moto-car-hub-api.onrender.com/addCar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Product created successfully!");
      setListOfCars([...listOfCars, res.data]);
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="admin">
      <h3>Create Product</h3>
      <div className="admin">
        <form onSubmit={createPost}>
          <label htmlFor="">Car Model </label>
          <input
            type="text"
            onChange={(event) => setName(event.target.value)}
            required
          />{" "}
          <br />
          <label htmlFor="">Description</label>
          <input
            type="textarea"
            onChange={(event) => setDescription(event.target.value)}
            required
          />
          <br />
          <label htmlFor="">Price</label>
          <input
            type="number"
            onChange={(event) => setPrice(event.target.value)}
            required
          />{" "}
          <br />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="product preview"
              width="150"
              height="150"
            />
          )}
          <button type="submit">Click to upload</button>
        </form>
      </div>
    </div>
  );
};
