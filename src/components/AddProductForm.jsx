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
  <div className="modal flex items-center justify-center fixed inset-0 bg-gray-600 bg-opacity-50">
    <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-8">
      <h3 className="text-2xl font-semibold text-center mb-4">Add Product</h3>
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title:</label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Price:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Image:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Address:</label>
          <input
            type="text"
            name="address"
            value={product.address}
            onChange={handleChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Trade For:</label>
          <input
            type="text"
            name="tradeFor"
            value={product.tradeFor}
            onChange={handleChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div className="space-y-4">
          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            Add My Product
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 px-6 bg-gray-500 text-white rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
);
};

export default AddProductForm;

