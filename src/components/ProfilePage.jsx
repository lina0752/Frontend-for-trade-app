import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ToolCard from "./ToolCard";
import AddProductForm from "./AddProductForm";  

const ProfilePage = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [showAddProductForm, setShowAddProductForm] = useState(false); 
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setError("You need to be logged in.");
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfileData(response.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError("Unauthorized. Please login again.");
        } else {
          setError("Failed to load profile data.");
        }
        console.error("Error fetching profile data", err);
      }
    };

    fetchProfileData();
  }, []);

  const handleProductAdded = (newProduct) => {
    setProfileData((prev) => ({
      ...prev,
      products: [...prev.products, newProduct],
    }));
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="profile-page p-4">
      {profileData && (
        <div>
          <h3 className="mt-8 text-xl font-semibold">My Products</h3>
          <button
            onClick={() => setShowAddProductForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Product
          </button>
          {showAddProductForm && (
            <AddProductForm onClose={() => setShowAddProductForm(false)} onProductAdded={handleProductAdded} />
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {profileData.products && profileData.products.length > 0 ? (
              profileData.products.map((product) => (
                <ToolCard
                  key={product.id}
                  title={product.title}
                  image={product.image}
                  tradeFor={product.tradeFor}
                />
              ))
            ) : (
              <p className="text-center col-span-4">No products available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
