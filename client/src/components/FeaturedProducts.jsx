import React, { useEffect, useState } from "react";
import { apiGetProducts } from "../apis";
import ProductCard from "./ProductCard";
const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState(null);
  const fetchFeaturedProducts = async () => {
    const response = await apiGetProducts({ limit: 9, totalRatings: 5 });
    if (response.success) {
      setFeaturedProducts(response.productData);
    }
  };
  useEffect(() => {
    fetchFeaturedProducts();
  }, []);
  return (
    <div className="w-full">
      <h3 className=" font-semibold text-[20px] py-[15px] border-b-2 border-main">
        Featured Products
      </h3>
      <div className="flex flex-wrap mt-[15px] mx-[-10px]">
        {featuredProducts?.map((el) => (
          <ProductCard key={el._id} productData={el} />
        ))}
      </div>
      <div className="flex justify-between">
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/Blue_And_Yellow_Modern_Electronic_Sale_Instagram_Post_580_x_655_px_1_600x.png?v=1750860746"
          alt=""
          className=""
        />
        <div className="flex flex-col gap-5">
          <img
            src="https://digital-world-2.myshopify.com/cdn/shop/files/Orange_Colorful_Juicer_Photo_Instagram_Post_280_x_338_px_1_400x.png?v=1750860819"
            alt=""
          />
          <img
            src="https://digital-world-2.myshopify.com/cdn/shop/files/Red_and_Yellow_Classic_Neutrals_Cooking_Set_Product_Summer_Instagram_Post_280_x_338_px_1_cd2b3108-c6f2-4ee5-9597-8a501c61f0d6_400x.png?v=1750861662"
            className=""
          />
        </div>
        <img
          src="https://digital-world-2.myshopify.com/cdn/shop/files/Blue_Yellow_Simple_Mega_Sale_Electronic_Instagram_Post_280_x_655_px_1_400x.png?v=1750862046"
          alt=""
          className=""
        />
      </div>
    </div>
  );
};

export default FeaturedProducts;
