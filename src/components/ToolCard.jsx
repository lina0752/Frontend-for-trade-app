
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const ToolCard = ({ id, title, image, tradeFor, onExchangeSent }) => {
  const [isExchangeSent, setIsExchangeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);  
  const [userProducts, setUserProducts] = useState([]);  
  const [selectedProduct, setSelectedProduct] = useState('');  
  const navigate = useNavigate();

  // Получаем товары пользователя при  монтировании компонента
  useEffect(() => {
    const fetchUserProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user/products/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        setUserProducts(response.data);  // Устанавливаем товары пользователя
      } catch (error) {
        console.error("Ошибка при получении товаров пользователя:", error);
      }
    };

    fetchUserProducts();
  }, []);

  // Открытие модального окна для выбора товара
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Закрытие модального окна
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);  // Сбрасываем выбранный товар
  };

  // Обработчик отправки запроса на обмен
  // В компоненте, где происходит выбор товара для обмена
  const handleExchange = async () => {
    try {
      setIsLoading(true);  // Запускаем индикатор загрузки
  
      // Проверка, выбран ли товар для обмена
      if (!selectedProduct) {
        alert("Пожалуйста, выберите товар для обмена.");
        return;
      }
      const token = localStorage.getItem("access_token");
    if (!token) {
      alert("Пожалуйста, войдите в систему.");
      return;
    }
    const userId = localStorage.getItem("user_id");
 
    const API_URL = "http://127.0.0.1:8000/api/";  

  
      // Отправляем запрос на обмен
      await axios.post(`${API_URL}exchanges/`, {
        product_offered: selectedProduct, 
        product_requested: id,  
        user_requested: parseInt(userId, 10), 

      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,  
        },
      });
  
      setIsExchangeSent(true);  // Запрос отправлен успешно
      onExchangeSent(id);  // Уведомляем родительский компонент, что обмен был отправлен
      navigate('/success-request');
    } catch (error) {
      console.error("Ошибка при отправке запроса на обмен:", error);
      alert("Ошибка при отправке запроса на обмен. Попробуйте снова.");
    } finally {
      setIsLoading(false);  
    }
  };
  
  

  return (
    <div className="border border-gray-300 rounded-lg w-48 h-72 flex flex-col justify-between items-center p-4 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Контейнер для изображения */}
      <div className="w-full h-36 overflow-hidden rounded-md">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Заголовок */}
      <h3 className="text-lg font-semibold mt-4">{title}</h3>

      {/* Текст */}
      <p className="text-sm text-gray-500">Обмен на: {tradeFor}</p>

      {/* Кнопка Обменять */}
      {!isExchangeSent ? (
        <button
          onClick={handleOpenModal}
          className={`mt-4 py-2 px-4 ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500"} text-white rounded-md hover:bg-green-600 transition-colors duration-300`}
          disabled={isLoading} // Делаем кнопку недоступной при загрузке
        >
          {isLoading ? "Отправка..." : "Обменять"}
        </button>
      ) : (
        <p className="mt-4 text-green-500">Запрос отправлен, ожидайте ответа</p>
      )}

      {/* Модальное окно выбора товара */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Выберите товар для обмена</h3>
            <div className="space-y-4">
              {userProducts.map((product) => (
                <div key={product.id} className="flex items-center">
                  <input
                      type="radio"
                      id={`product-${product.id}`}
                      name="selectedProduct"
                      value={product.id}
                      checked={selectedProduct === product.id}
                      onChange={() => setSelectedProduct(product.id)}  
                      className="mr-2"
                    />


                  <label htmlFor={`product-${product.id}`} className="text-sm">{product.title}</label>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between">
              <button
                onClick={handleCloseModal}
                className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md"
              >
                Отмена
              </button>
              <button
                onClick={handleExchange}
                className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Send a request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolCard;
