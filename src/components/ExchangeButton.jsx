import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';  

const ExchangeButton = ({ productRequestedId, userProducts }) => {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState(false);  
  const handleExchange = async () => {
    if (!selectedProductId) {
      setMessage("Please select a product to offer.");
      return;
    }
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/exchange/request/', {
        product_offered: selectedProductId,
        product_requested: productRequestedId,
      });

      setMessage("Exchange request sent successfully!");
      setRedirect(true);  // Устанавливаем флаг перенаправления

    } catch (error) {
      setMessage("Failed to send exchange request.");
    }
  };

  // Если нужно выполнить перенаправление
  if (redirect) {
    return <Navigate to="/success-request" />;  // Перенаправляем на страницу SuccessRequest
  }

  return (
    <div>
      <select onChange={(e) => setSelectedProductId(e.target.value)}>
        <option value="">Select a product</option>
        {userProducts.map(product => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>
      <button onClick={handleExchange}>Exchange</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ExchangeButton;
