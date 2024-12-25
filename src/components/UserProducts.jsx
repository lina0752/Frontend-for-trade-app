import React from "react";
import ToolCard from "./ToolCard";

const UserProducts = ({ products }) => {
  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold">My Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products && products.length > 0 ? (
          products.map((product) => (
            <ToolCard
              key={product.id}
              title={product.title}
              image={product.image}
              tradeFor={product.tradeFor}
            />
          ))
        ) : (
          <p className="text-center col-span-4">You have no products.</p>
        )}
      </div>
    </div>
  );
};

export default UserProducts;
