import React, { memo } from "react";

const InputField = ({
  type,
  value,
  setValue,
  nameKey,
  invalidFields,
  setInvalidFields,
}) => {
  return (
    <div className="w-full relative">
      {value.trim() !== "" && (
        <label
          className="text-[13px] absolute top-[-2px] left-[12px] px-1 bg-white block animate-slide-top-sm"
          htmlFor={nameKey}
        >
          {nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)}
        </label>
      )}

      <input
        type={type || "text"}
        placeholder={nameKey.slice(0, 1).toUpperCase() + nameKey.slice(1)}
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
        className="px-4 py-2 rounded-md border w-full my-2 text-sm placeholder:text-sm"
      />
    </div>
  );
};

export default memo(InputField);
