import React from "react";


const ToolCard = ({ title, image, tradeFor}) => {
    return (
        <div className="border border-gray-300 rounded-lg w-48 h-72 flex flex-col justify-between items-center p-4 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            {/* Контейнер для изображения */}
            <div className="w-full h-36 overflow-hidden rounded-md">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>
            {/* Заголовок */}
            <h3 className="text-lg font-semibold mt-4">{title}</h3>
            {/* Текст */}
            <p className="text-sm text-gray-500">Обмен на: {tradeFor}</p>
   
            
        </div>
    );
};

export default ToolCard;
