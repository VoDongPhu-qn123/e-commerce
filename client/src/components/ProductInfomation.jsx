import React, { memo, useState } from "react";
import { productInfoTab } from "../ultils/constants";
const activedStyles = "text-black bg-white border-b-0";
const notActivedStyles = "text-[#505050] bg-[#F1F1F1]";
const ProductInfomation = () => {
  const [isActiveTab, setIsActiveTab] = useState(1);
  return (
    <div>
      <div className="flex items-center gap-1 relative bottom-[-1px]">
        {productInfoTab.map((el) => (
          <span
            className={`px-5 py-2 border text-sm cursor-pointer hover:text-black hover:bg-white ${
              isActiveTab === el.id ? activedStyles : notActivedStyles
            }`}
            key={el.id}
            onClick={() => setIsActiveTab(el.id)}
          >
            {el.title}
          </span>
        ))}
      </div>
      <div className="w-main border p-5">
        {productInfoTab?.find((el) => el.id === isActiveTab)?.content}
      </div>
    </div>
  );
};

export default memo(ProductInfomation);
