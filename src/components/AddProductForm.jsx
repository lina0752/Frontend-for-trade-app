import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddProductForm = ({ onClose, onProductAdded }) => {
    const navigate = useNavigate();
    const [product, setProduct] = useState({
      title: "",
      price: "",
      image: null,
      address: "",
      tradeFor: "",
    });
    const [error, setError] = useState("");
  
    const getOwner = () => {
      const token = localStorage.getItem("access_token");
      if (!token) return null;
  
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        return decodedToken.user_id;
      } catch (e) {
        return null;
      }
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setProduct((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleImageChange = (e) => {
      setProduct((prev) => ({ ...prev, image: e.target.files[0] }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const owner = getOwner();
      if (!owner) {
        setError("You must be logged in to add a product.");
        return;
      }
  
      const formData = new FormData();
      formData.append("title", product.title);
      formData.append("price", product.price);
      formData.append("address", product.address);
      formData.append("trade_for", product.tradeFor);
      formData.append("owner", owner);
      if (product.image) {
        formData.append("image", product.image);
      }
  
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.post(
          "http://127.0.0.1:8000/api/products/",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // Передаем только что созданный товар в родительский компонент
        onProductAdded(response.data);
        onClose();
        navigate(`/product-created/${response.data.id}`);
      } catch (err) {
        setError("Failed to add product.");
        console.error("Error adding product", err);
      }
    };
  
    return (
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <h3>Add Product</h3>
          {error && <p className="error">{error}</p>}
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Image:</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div>
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={product.address}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Trade For:</label>
            <input
              type="text"
              name="tradeFor"
              value={product.tradeFor}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Add My Product</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    );
  };
  
export default AddProductForm;
