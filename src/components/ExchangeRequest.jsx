import React from 'react';
import axios from 'axios';

const ExchangeRequests = ({ requests }) => {
  const handleAction = async (id, status) => {
    try {
      await axios.post(`/api/exchange/${id}/update-status/`, { status });
      alert(`Exchange request ${status}.`);
    } catch (error) {
      alert("Failed to update status.");
    }
  };

  return (
    <div>
      <h3>Exchange Requests</h3>
      {requests.map(request => (
        <div key={request.id}>
          <p>
            Requested Product: {request.product_requested.name} <br />
            Offered Product: {request.product_offered.name} <br />
            Status: {request.status}
          </p>
          {request.status === 'pending' && (
            <>
              <button onClick={() => handleAction(request.id, 'accepted')}>Accept</button>
              <button onClick={() => handleAction(request.id, 'declined')}>Decline</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ExchangeRequests;
