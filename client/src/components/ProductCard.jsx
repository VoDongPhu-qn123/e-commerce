import React from "react";
import { renderStarsFromNumber } from "../ultils/renderStar";
import { formatMoney } from "../ultils/helpers";
const ProductCard = ({ productData }) => {
  return (
    <div className="w-1/3 flex flex-auto mb-5 px-[10px]">
      <div className="w-full flex border gap-5 p-4 ">
        <img
          src={productData.thumbnail}
          alt=""
          className="w-[108px] h-[108px]  "
        />
        <div className="flex flex-col gap-1 mt-[15px] items-start w-full text-sm ">
          <span className="flex">
            {renderStarsFromNumber(productData?.totalRatings)}
          </span>
          <span>{productData?.name}</span>
          <span className="text-main">{formatMoney(productData?.price)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
