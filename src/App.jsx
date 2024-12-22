import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";

import ProfilePage from "./components/ProfilePage";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import ToolCard from "./components/ToolCard";
import ProductDetail from "./components/ProductDetail";
import UserProducts from "./components/UserProducts";
import AddProductForm from "./components/AddProductForm"; 
import ProductCreated from "./components/ProductCreated";

const App = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [userProducts, setUserProducts] = useState([]);

  // Fetch all products, regardless of login status
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/products/");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch user's products when logged in
  const fetchUserProducts = async () => {
    if (user) {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user/products/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        setUserProducts(response.data);
      } catch (error) {
        console.error("Error fetching user products:", error);
      }
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchUserProducts();
  }, [user]); // Refetch products when the user status changes

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("access_token");
  };

  const handleProductAdded = (newProduct) => {
    setUserProducts((prevProducts) => [...prevProducts, newProduct]);
    fetchUserProducts(); // Update user products after adding a new one
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <header className="p-4 bg-white shadow">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">My App</h1>
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-blue-500">Main</Link> {/* Link to all products */}
              <Link to="/profile" className="text-blue-500">Profile</Link>
            
              {user ? (
                <>
                  <Link to="/user-products" className="text-blue-500">My Products</Link>
                  <span>{user.username}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Log in
                </Link>
              )}
            </div>
          </div>
        </header>

        <main className="flex-grow p-4">
          <Routes>
            {/* Main route to display all products */}
            <Route
              path="/"
              element={
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                  {products.length > 0 ? (
                    products.map((product) => (
                      <ToolCard
                        key={product.id}
                        title={product.title}
                        image={product.image}
                        tradeFor={product.trade_for}
                      />
                    ))
                  ) : (
                    <p className="text-center col-span-4">Loading products...</p>
                  )}
                </div>
              }
            />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/user-products" element={<UserProducts products={userProducts} />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/product-created/:id" element={<ProductCreated />} />
            <Route path="/add-product" element={<AddProductForm onProductAdded={handleProductAdded} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;

