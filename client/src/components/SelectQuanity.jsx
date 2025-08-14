import React, { memo } from "react";

const SelectQuanity = ({ quanity, handleQuanity, handleChangeQuanity }) => {
  return (
    <div className="bg-[#f6f6f6]">
      <span
        className=" p-2 border-r border-black cursor-pointer"
        onClick={() => handleChangeQuanity("minus")}
      >
        -
      </span>
      <input
        type="text"
        className="outline-none w-[50px] text-center"
        value={quanity}
        onChange={(e) => handleQuanity(e.target.value)}
      />
      <span
        className=" p-2 border-l border-black cursor-pointer"
        onClick={() => handleChangeQuanity("plus")}
      >
        +
      </span>
    </div>
  );
};

export default memo(SelectQuanity);
