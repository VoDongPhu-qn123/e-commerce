import React, { useState } from "react";
import { formatMoney } from "../ultils/helpers";
import label from "../assets/label.png";
import labelBlue from "../assets/label-blue.png";
import { renderStarsFromNumber } from "../ultils/renderStar";
import SelectOption from "./SelectOption";
import icons from "../ultils/icons";

const { FaEye, FaHeart, IoMdMenu } = icons;
const Product = ({ productData, isNew }) => {
  const [isShowOption, setIsShowOption] = useState(false);
  return (
    <div className="w-full text-base px-[10px]">
      <div
        className="w-full border p-[15px] flex flex-col items-center"
        onMouseEnter={() => setIsShowOption(true)}
        onMouseLeave={() => setIsShowOption(false)}
      >
        <div className="w-full relative">
          {isShowOption && (
            <div className="absolute flex bottom-[-10px] left-0 right-0 justify-center gap-2 animate-slide-top">
              <SelectOption icon={<FaHeart />} />
              <SelectOption icon={<IoMdMenu />} />
              <SelectOption icon={<FaEye />} />
            </div>
          )}

          <img
            src={productData?.thumbnail}
            alt=""
            className="w-full h-[274px] object-cover"
          />
          <img
            src={isNew ? label : labelBlue}
            alt=""
            className="absolute top-0 left-[-22px] w-[100px] h-[35px] object-cover"
          />
          {isNew ? (
            <span className="font-semibold text-white absolute top-0 left-0 text-[12px]">
              New
            </span>
          ) : (
            <span className="font-semibold text-white absolute top-0 left-0  text-[12px] ">
              Trending
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1 mt-[15px] items-start w-full ">
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

export default Product;
