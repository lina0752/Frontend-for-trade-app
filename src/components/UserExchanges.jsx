import React from "react";

const UserExchanges = ({ exchanges }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold">Мои обмены</h2>
      <div className="space-y-4 mt-4">
        {exchanges.length === 0 ? (
          <p>У вас нет активных обменов.</p>
        ) : (
          exchanges.map((exchange) => (
            <div key={exchange.id} className="border border-gray-300 p-4 rounded-md">
              <p><strong>Предложенный товар:</strong> {exchange.product_offered.title}</p>
              <p><strong>Желаемый товар:</strong> {exchange.product_requested.title}</p>
              <p><strong>Статус обмена:</strong> {exchange.status}</p>
              <p><strong>Дата запроса:</strong> {new Date(exchange.date_created).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserExchanges;
