
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ProductDetail() {
    const { id } = useParams(); // Извлекаем id из URL
    const [product, setProduct] = useState(null);

    const fetchProduct = async () => {
        if (!id) {
            console.error("ID не найден!");
            return;
        }
        try {
            console.log(`Запрос по URL: http://127.0.0.1:8000/api/products/${id}/`);
            const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}/`);
            console.log("Полученные данные:", response.data);
            setProduct(response.data);
        } catch (error) {
            console.error("Ошибка при загрузке деталей продукта:", error);
            alert("Ошибка загрузки. Попробуйте еще раз!");
        }
    };
    
    

    // Используем useEffect, чтобы загрузить продукт при изменении id
    useEffect(() => {
        console.log("ID продукта: ", id);
        fetchProduct();
    }, [id]);

    // Если данные не загружены, показываем сообщение о загрузке
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
            </div>
        </div>
    );
}

export default ProductDetail;
