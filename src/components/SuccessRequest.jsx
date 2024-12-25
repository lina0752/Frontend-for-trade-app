import React from 'react';
import { useHistory } from 'react-router-dom';

const SuccessRequest = () => {
  const history = useHistory();

  const handleGoHome = () => {
    history.push('/'); 
  };

  return (
    <div className="success-request">
      <h2>Запрос успешно отправлен!</h2>
      <p>Ваш запрос на обмен товара был успешно отправлен. Ожидайте ответа.</p>
      <button onClick={handleGoHome}>Вернуться на главную</button>
    </div>
  );
};

export default SuccessRequest;
    