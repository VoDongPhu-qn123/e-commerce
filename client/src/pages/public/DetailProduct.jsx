import React from "react";
import { useParams } from "react-router-dom";
const DetailProduct = () => {
  const { productId, name } = useParams();
  console.log({ productId, name });
  return <div>Detail Product</div>;
};

export default DetailProduct;
