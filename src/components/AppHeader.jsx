import React from "react";
import { Layout, Input, Menu, Button } from "antd";
import { MenuOutlined, SearchOutlined, HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const { Header } = Layout;

function AppHeader (){
  return (
    <Header
      style={{
        backgroundColor: "#007bff",
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        flexWrap: "wrap",
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

      {/* Кнопка меню */}
      <MenuOutlined
        style={{
          fontSize: "20px",
          color: "white",
          marginRight: "16px",
          flexShrink: 0,
        }}
      />

      {/* Поле поиска */}
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

      {/* Меню иконок */}
      <Menu
        mode="horizontal"
        theme="dark"
        style={{
          backgroundColor: "transparent",
          borderBottom: "none",
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
        <Menu.Item key="favorites" icon={<HeartOutlined />} style={{ color: "white" }}>
          Избранное
        </Menu.Item>
        <Menu.Item key="cart" icon={<ShoppingCartOutlined />} style={{ color: "white" }}>
          Корзина
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default AppHeader;
