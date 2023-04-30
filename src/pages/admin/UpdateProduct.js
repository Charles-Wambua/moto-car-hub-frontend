import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { showSpinner } from "../../components/Spinner";
import { hideSpinner } from "../../components/Spinner";

export const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://moto-car-hub.onrender.com/updateCar/${id}`);
        const { name, description, price, images } = res.data;
        setName(name);
        setDescription(description);
        setPrice(price);
        setImageUrls(images);
      } catch (err) {
        alert(err.message);
      }
    };
    fetchProduct();
  }, [id]);

  const handleImageChange = (event) => {
    const selectedImages = Array.from(event.target.files);
    setImages(selectedImages);
    const selectedImageUrls = selectedImages.map((image) =>
      URL.createObjectURL(image)
    );
    setImageUrls(selectedImageUrls);
  };

  const updateProduct = async (event) => {
    event.preventDefault();
    showSpinner(); // Show spinner before sending the request
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    images.forEach((image) => {
      formData.append("images", image, image.name);
    });

    try {
      await axios.put(`https://moto-car-hub.onrender.com/updateCar/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Product updated successfully!");
      navigate("/");
    } catch (err) {
      alert(err.message);
    } finally {
      hideSpinner(); // Hide spinner after request completes (whether successful or not)
    }
  };

  return (
    <div className="admin">
      <h3>Update Product</h3>
      <div className="admin">
        <form onSubmit={updateProduct}>
          <label htmlFor="">Car Model </label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />{" "}
          <br />
          <label htmlFor="">Description</label>
          <input
            type="textarea"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
          <br />
          <label htmlFor="">Price</label>
          <input
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            required
          />{" "}
          <br />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            multiple
          />
          {imageUrls.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`product preview ${index}`}
              width="150"
              height="150"
            />
          ))}
          <button type="submit">Click to update</button>
        </form>
      </div>
    </div>
  );
};
