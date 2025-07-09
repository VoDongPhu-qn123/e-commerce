import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import * as apis from "../apis";
import { Product } from "./index";
const tabs = [
  { id: 1, name: "Best sellers" },
  { id: 2, name: "New arrivals" },
];
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};
const BestSeller = () => {
  const [bestSellers, setBestSellers] = useState(null);
  const [newProducts, setNewProducts] = useState(null);
  const [isActive, setIsActive] = useState(1);
  const [products, setProducts] = useState(null);
  const fetchProducts = async () => {
    const response = await Promise.all([
      apis.apiGetProducts({ sort: "-sold" }),
      apis.apiGetProducts({ sort: "-createdAt" }),
    ]);
    if (response[0]?.success) {
      setBestSellers(response[0].productData);
    }
    if (response[1]?.success) {
      setNewProducts(response[1].productData);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  useEffect(() => {
    if (isActive === 1) {
      setProducts(bestSellers);
    }
    if (isActive === 2) {
      setProducts(newProducts);
    }
  }, [isActive, bestSellers, newProducts]);
  return (
    <div>
      <div className="flex pb-4 border-b-2 border-main">
        {tabs.map((el, index) => (
          <span
            key={el.id}
            className={`font-semibold uppercase text-[20px] cursor-pointer text-gray-400 ${
              index !== tabs.length - 1 ? "border-r" : ""
            } ${index === 0 ? "pr-5" : "px-5"} ${
              isActive === el.id ? "text-gray-900" : ""
            }`}
            onClick={() => setIsActive(el.id)}
          >
            {el.name}
          </span>
        ))}
      </div>
      <div className="mt-4 mx-[-10px]">
        <Slider {...settings}>
          {products?.map((el) => (
            <Product
              key={el._id}
              productData={el}
              isNew={isActive === 1 ? false : true}
            />
          ))}
        </Slider>
      </div>
      <div className="w-full mt-4 flex gap-4">
        <img
          className="flex-1 object-contain"
          src="https://digital-world-2.myshopify.com/cdn/shop/files/promo-23_2000x_crop_center.png?v=1750842393"
          alt=""
        />
        <img
          className="flex-1 object-contain"
          src="https://digital-world-2.myshopify.com/cdn/shop/files/promo-24_2000x_crop_center.png?v=1750842410"
          alt=""
        />
      </div>
    </div>
  );
};

export default BestSeller;
