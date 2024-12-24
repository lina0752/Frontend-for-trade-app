import React from "react";

const Notifications = ({ notifications }) => {
  return (
    <div className="space-y-4">
      {notifications.length === 0 ? (
        <p>Нет новых уведомлений.</p>
      ) : (
        notifications.map((notification) => (
          <div key={notification.id} className="p-4 border rounded-md bg-gray-100">
            <p>{notification.message}</p>
            <Link to={`/exchange/${notification.exchangeId}`} className="text-blue-500">
              Перейти к обмену
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Notifications;
