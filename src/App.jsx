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
  import UserExchanges from "./components/UserExchanges";  
  import Notifications from "./components/Notifications";  
  
  const App = () => {
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [userProducts, setUserProducts] = useState([]);
    const [exchangeStatus, setExchangeStatus] = useState(null); 
    
    // Функция для получения списка всех продуктов
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/products/");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    // Функция для получения продуктов пользователя
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
  
    // Функция для обработки обмена товара
    const handleExchangeSent = (productId) => {
      setExchangeStatus(`Запрос на обмен товара с ID ${productId} был отправлен!`);
    };
    useEffect(() => {
      const userId = localStorage.getItem('user_id');
      if (userId) {
        setUser({ id: userId });
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
      fetchUserProducts(); // Обновляем продукты пользователя после добавления нового
    };
  
    return (
      <Router>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <header className="p-4 bg-white shadow">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-xl font-bold">My App</h1>
              <div className="flex items-center space-x-4">
                {user ? (
                  <>
                    <Link to="/" className="text-blue-500">Main</Link> {/* Visible for authorized users */}
                    <Link to="/user-products" className="text-blue-500">My Products</Link>
                    <Link to="/profile" className="text-blue-500">Profile</Link>
                    <Link to="/user-exchanges" className="text-blue-500">My Exchanges</Link>
                    <Link to="/notifications" className="text-blue-500">Notifications</Link>
                    <span>{user.username}</span>
                    <button
                      onClick={handleLogout}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <Link to="/register" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Sign Up
                  </Link>
                )}
              </div>
            </div>
          </header>
  
          <main className="flex-grow p-4">
            {/* Уведомление о статусе обмена */}
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
                          onExchangeSent={handleExchangeSent} // Передаем функцию для обновления статуса обмена
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
              <Route path="/notifications" element={<Notifications />} />
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
  