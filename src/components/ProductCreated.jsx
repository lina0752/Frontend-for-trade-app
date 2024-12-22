import React from "react";
import { useParams, Link } from "react-router-dom";

const ProductCreated = () => {
  const { id } = useParams(); 

  return (
    <div>
      <h1>Product Created Successfully!</h1>
      <Link to="/user-products">Go to My Products</Link>
    </div>
  );
};

export default ProductCreated;


