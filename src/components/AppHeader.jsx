import React from "react";
import { Layout, Input, Menu, Button } from "antd";
import { MenuOutlined, SearchOutlined, HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const { Header } = Layout;

function AppHeader() {
  return (
    <Header
      style={{
        backgroundColor: "#007bff",
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        flexWrap: "wrap",
        justifyContent: "space-between", 
      }}
    >
      {/* Логотип */}
      <div
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: "24px",
          marginRight: "16px",
          flexShrink: 0,
        }}
      >
        TradeApp
      </div>



      <Input
        placeholder="Поиск"
        prefix={<SearchOutlined />}
        style={{
          borderRadius: "20px",
          flex: 1,
          maxWidth: "400px",
          marginRight: "16px",
          minWidth: "150px",
        }}
      />

      <div style={{ display: "flex", alignItems: "center" }}>
        <Menu
          mode="horizontal"
          theme="dark"
          style={{
            backgroundColor: "transparent",
            borderBottom: "none",
            margin: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Кнопка "Войти" */}
          <Menu.Item
            key="login"
            style={{
              color: "white",
              padding: "0 16px",
              flexShrink: 0,
            }}
          >
            <Button
              type="primary"
              style={{
                backgroundColor: "white",
                color: "#007bff",
                borderRadius: "20px",
              }}
            >
              Войти
            </Button>
          </Menu.Item>

          {/* Кнопка "Избранное" */}
          <Menu.Item key="favorites" icon={<HeartOutlined />} style={{ color: "white" }}>
            Избранное
          </Menu.Item>

        </Menu>
      </div>
    </Header>
  );
}

export default AppHeader;
