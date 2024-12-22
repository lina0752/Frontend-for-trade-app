import React, { useEffect, useState } from "react";
import axios from "axios";

const UserProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await axios.get("http://127.0.0.1:8000/api/products/", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setProducts(response.data);
                } catch (err) {
                    console.error("Ошибка при загрузке продуктов:", err);
                }
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Мои продукты</h1>
            <div className="grid grid-cols-4 gap-4">
                {products.map((product) => (
                    <div key={product.id} className="border p-4 rounded shadow">
                        <h2 className="text-lg font-semibold">{product.title}</h2>
                        <p>{product.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserProducts;
