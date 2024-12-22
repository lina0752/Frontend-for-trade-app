import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";

import ProfilePage from "./components/ProfilePage";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import ToolCard from "./components/ToolCard"; 
import ProductDetail from "./components/ProductDetail"; 
import UserProducts from "./components/UserProducts"; 

function App() {
  const [user, setUser] = useState(null); 
  const [products, setProducts] = useState([]);

  // Загрузка всех продуктов
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/products/");
      setProducts(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке продуктов:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Авторизация пользователя
  const handleLogin = (userData) => {
    setUser(userData); // Устанавливаем данные пользователя
  };

  const handleLogout = () => {
    setUser(null); // Удаляем пользователя
    localStorage.removeItem("access_token"); // Удаляем токен
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Хедер с кнопкой Log in / Log out */}
        <header className="p-4 bg-white shadow">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">My App</h1>
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-blue-500">My products</span>

                <span>{user.username}</span>
                <button
                  onClick={handleLogout}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Log out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Log in
              </Link>
            )}
          </div>
        </header>

        <main className="flex-grow p-4">
          <Routes>
            {/* Главная страница с отображением всех товаров */}
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
                    <p className="text-center col-span-4">Загрузка продуктов...</p>
                  )}
                </div>
              }
            />

            {/* Детали продукта */}
            <Route path="/product/:id" element={<ProductDetail />} />

            {/* Личный кабинет пользователя */}
            <Route path="/profile" element={<ProfilePage />} />

            {/* Товары пользователя */}
            <Route path="/user-products" element={<UserProducts />} />

            {/* Страница регистрации */}
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Страница авторизации */}
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
