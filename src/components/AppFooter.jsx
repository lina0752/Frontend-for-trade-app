import React from "react";
import { Layout } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  GithubOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;

function AppFooter() {
  return (
    <Footer
      style={{
        textAlign: "center",
        backgroundColor: "#f0f2f5",
        padding: "20px",
        marginTop: "auto",
      }}
    >
      {/* Основная информация */}
      <div style={{ marginBottom: "16px" }}>
        <span style={{ fontSize: "16px", fontWeight: "bold" }}>TradeApp</span>
        <p style={{ margin: "4px 0", color: "gray" }}>
          © {new Date().getFullYear()} Все права защищены.
        </p>
      </div>

      {/* Полезные ссылки */}
      <div style={{ marginBottom: "16px" }}>
        <a href="/about" style={{ margin: "0 12px", color: "#007bff" }}>
          О нас
        </a>
        <a href="/contact" style={{ margin: "0 12px", color: "#007bff" }}>
          Контакты
        </a>
        <a href="/terms" style={{ margin: "0 12px", color: "#007bff" }}>
          Условия использования
        </a>
        <a href="/privacy" style={{ margin: "0 12px", color: "#007bff" }}>
          Политика конфиденциальности
        </a>
      </div>

      {/* Социальные иконки */}
      <div style={{ fontSize: "18px" }}>
        <a
          href="https://www.facebook.com/profile.php?id=100017703761343"
          target="_blank"
          rel="noopener noreferrer"
          style={{ margin: "0 8px", color: "gray" }}
        >
          <FacebookOutlined />
        </a>
        <a
          href="https://www.instagram.com/k237m12/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ margin: "0 8px", color: "gray" }}
        >
          <InstagramOutlined />
        </a>
        <a
          href="https://github.com/lina0752/Frontend-for-trade-app/branches"
          target="_blank"
          rel="noopener noreferrer"
          style={{ margin: "0 8px", color: "gray" }}
        >
          <GithubOutlined />
        </a>
        <a
          href="https://github.com/kamila-12/website_trade"
          target="_blank"
          rel="noopener noreferrer"
          style={{ margin: "0 8px", color: "gray" }}
        >
          <GithubOutlined />
        </a>
      </div>
    </Footer>
  );
}

export default AppFooter;