import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiGetProduct } from "../../apis";
import { useCallback } from "react";
import { BreadCrumbs } from "../../components";
const DetailProduct = () => {
  const { productId, name, category } = useParams();
  console.log({ productId, name });
  const fetchProduct = useCallback(async () => {
    const response = await apiGetProduct(productId);
    console.log(response);
  }, [productId]);

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId, fetchProduct]);
  return (
    <div className="w-full">
      <div className="h-[81px] bg-[#f7f7f7] -mt-6 flex flex-col justify-center">
        <h3 className="font-bold">VIVO V5</h3>
        <BreadCrumbs name={name} category={category} />
      </div>
    </div>
  );
};

export default DetailProduct;
