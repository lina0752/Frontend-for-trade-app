import React from "react";
import { Layout } from "antd";
import AppHeader from "./components/appHeader";
import PromoSection from "./components/promoData";

const { Content } = Layout;

const App = () => {
  return (
    <Layout>
      <AppHeader/>
      <PromoSection/>
    
    </Layout>
  );
};

export default App;
