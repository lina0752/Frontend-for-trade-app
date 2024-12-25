import React, { useEffect, useState } from "react";
import { List, Button, Card, Avatar, Spin, message } from "antd";
import { SwapOutlined } from "@ant-design/icons";
// import jwt_decode from "jwt-decode"; // Для декодирования токена
import axios from "axios";

const ExchangeRequestsList = () => {
  const [requests, setRequests] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExchangeRequests = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        message.error("You must be logged in to view your exchanges.");
        return;
      }

      try {


        const response = await axios.get("http://127.0.0.1:8000/api/user/exchanges/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRequests(response.data);
      } catch (error) {
        console.error("Failed to fetch exchange requests:", error);
        message.error("Error loading exchange requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchExchangeRequests();
  }, []);

  const API_URL = "http://127.0.0.1:8000/api/";

  const updateExchangeStatus = async (id, newStatus) => {
    try {
      await axios.post(
        `${API_URL}exchange/${id}/update_status/`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      message.success(`Exchange #${id} updated to ${newStatus}.`);
      setRequests((prev) => prev.filter((request) => request.id !== id));
    } catch (error) {
      console.error("Failed to update status:", error);
      message.error("Error updating exchange status.");
    }
  };

  if (loading) {
    return (
      <Spin tip="Loading exchange requests..." style={{ display: "block", marginTop: "20px" }} />
    );
  }

  return (
    <Card
      title="Exchange Requests"
      style={{ margin: "20px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
    >
      <List
        itemLayout="horizontal"
        dataSource={requests}
        renderItem={(request) => (
          <List.Item
            actions={
              request.receiver?.id === userId // Отображаем кнопки только для тех запросов, которые направлены текущему пользователю
                ? [
                    <Button
                      type="primary"
                      onClick={() => updateExchangeStatus(request.id, "accepted")}
                      key="accept"
                    >
                      Accept
                    </Button>,
                    <Button
                      danger
                      onClick={() => updateExchangeStatus(request.id, "declined")}
                      key="reject"
                    >
                      Reject
                    </Button>,
                  ]
                : []
            }
          >
            <List.Item.Meta
              avatar={<Avatar icon={<SwapOutlined />} />}
              title={`From: ${request.sender || "Unknown"} to: ${request.receiver || "Unknown"}`}
              description={`Offered: ${request.product_offered?.title || "Unknown"} | Requested: ${request.product_requested?.title || "Unknown"}`}

            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default ExchangeRequestsList;
