import React, { memo } from "react";

const Button = ({
  name,
  handleOnClick,
  style,
  iconsBefore,
  iconsAfter,
  widthFull,
}) => {
  return (
    <button
      onClick={() => {
        handleOnClick && handleOnClick();
      }}
      className={
        style ||
        `px-4 py-2 rounded-md text-white bg-main text-semibold my-2 ${
          widthFull ? "w-full" : "w-fit"
        }`
      }
    >
      {iconsBefore}
      <span>{name}</span>
      {iconsAfter}
    </button>
  );
};

export default memo(Button);
