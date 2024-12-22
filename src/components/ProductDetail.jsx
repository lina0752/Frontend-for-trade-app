import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Space } from 'antd';
import axios from "axios";

function ProductDetail() {
    const { id } = useParams(); 
    const [product, setProduct] = useState(null);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}/`);
            setProduct(response.data); 
        } catch (error) {
            console.error("Ошибка при загрузке деталей продукта:", error);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    if (!product) return <div>Загрузка...</div>;

    return (
        <div style={{ display: "flex", alignItems: "flex-start", padding: "16px" }}>
            <div style={{ flex: "1 1 50%", padding: "16px" }}>
                <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                />
            </div>
            <div style={{ flex: "1 1 50%", padding: "16px" }}>
                <h1>{product.title}</h1>
                <p>{product.description}</p>
                <p><strong>Обмен на:</strong> {product.trade_for}</p>
                <p><strong>Адрес:</strong> {product.address}</p>
    
                <Space size="middle">
                    <Button type="primary">Обменять</Button>
                </Space>
            </div>
            
        </div>
        
    );
}

export default ProductDetail;
