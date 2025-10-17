import React from "react";

const SelectOption = ({ icon }) => {
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Thêm logic xử lý cho từng icon ở đây
    console.log("Icon clicked:", icon);
  };

  return (
    <div
      className="w-10 h-10 bg-white rounded-full border shadow-md flex items-center justify-center hover:bg-gray-800 hover:text-white hover:border-gray-800 cursor-pointer"
      onClick={handleClick}
    >
      {icon}
    </div>
  );
};

export default SelectOption;
