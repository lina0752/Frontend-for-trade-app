
//   );
// };

// export default ProfilePage;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ToolCard from "./ToolCard";
import AddProductForm from "./AddProductForm";
import { FaPlus } from "react-icons/fa";

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
        navigate("/login"); // Перенаправляем неавторизованного пользователя
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
          navigate("/login"); // Перенаправляем при ошибке авторизации
        } else {
          setError("Failed to load profile data.");
          console.error("Error fetching profile data", err);
        }
      }
    };

    fetchProfileData();
  }, [navigate]);

  const handleProductAdded = (newProduct) => {
    setProfileData((prev) => ({
      ...prev,
      products: [...prev.products, newProduct],
    }));
  };

  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {profileData && (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
            Welcome, {profileData.username}!
          </h1>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">My Products</h3>
          <div className="text-center mb-8">
  <button
    onClick={() => setShowAddProductForm(true)}
    className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300 flex items-center justify-center space-x-2"
  >
    <span>Add Product</span>
    <FaPlus className="text-white text-lg" />
  </button>
</div>
          {showAddProductForm && (
            <AddProductForm onClose={() => setShowAddProductForm(false)} onProductAdded={handleProductAdded} />
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
              <p className="col-span-4 text-center text-gray-500">No products available.</p>
            )}
          </div>
          
        </div>
      )}
    
    </div>
    
  );
};

export default ProfilePage;