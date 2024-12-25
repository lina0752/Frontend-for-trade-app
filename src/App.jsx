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
import UserExchanges from "./components/ExchangeRequestsList";
import AppFooter from "./components/AppFooter";

const App = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [userProducts, setUserProducts] = useState([]);
  const [exchangeStatus, setExchangeStatus] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/products/");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

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

  const handleExchangeSent = (productId) => {
    setExchangeStatus(`Запрос на обмен товара с ID ${productId} был отправлен!`);
  };

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      setUser({ id: userId });
      fetchUserProducts();
    }
    fetchProducts();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("access_token");
  };

  const handleProductAdded = (newProduct) => {
    setUserProducts((prevProducts) => [...prevProducts, newProduct]);
    fetchUserProducts();
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <header className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 shadow text-white">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              <Link to="/" className="hover:underline">
                TradeApp
              </Link>
            </h1>
            <nav className="flex items-center space-x-4">
              {user ? (
                <>
                  <Link to="/" className="hover:underline">Main</Link>
                  <Link to="/user-products" className="hover:underline">My Products</Link>
                  <Link to="/profile" className="hover:underline">Profile</Link>
                  <Link to="/user-exchanges" className="hover:underline">My Exchanges</Link>
                  <span>{user.username}</span>
                  <button
                    onClick={handleLogout}
                    className="ml-4 bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-100"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <Link
                  to="/register"
                  className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-100"
                >
                  Sign Up
                </Link>
              )}
            </nav>
          </div>
        </header>

        <main className="flex-grow p-4">
          {exchangeStatus && (
            <div className="bg-yellow-300 text-yellow-900 p-4 rounded-md mb-4">
              {exchangeStatus}
            </div>
          )}

          <Routes>
            <Route
              path="/"
              element={
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                  {products.length > 0 ? (
                    products.map((product) => (
                      <ToolCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        image={product.image}
                        tradeFor={product.trade_for}
                        onExchangeSent={handleExchangeSent}
                        //isPending={pendingExchanges.includes(product.id)} 
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
            <Route path="/user-exchanges" element={<UserExchanges />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/product-created/:id" element={<ProductCreated />} />
            <Route path="/add-product" element={<AddProductForm onProductAdded={handleProductAdded} />} />
          </Routes>
        </main>

        <AppFooter />
      </div>
    </Router>
  );
};

export default App;
