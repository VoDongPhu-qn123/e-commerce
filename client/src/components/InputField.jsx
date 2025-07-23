import React, { memo } from "react";
import { formatLabel } from "../ultils/helpers";
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
          className="text-[13px] absolute top-[-2px] left-[12px] px-1 bg-white block animate-slide-top-sm text-main"
          htmlFor={nameKey}
        >
          {formatLabel(nameKey)}
        </label>
      )}

      <input
        type={type || "text"}
        placeholder={formatLabel(nameKey)}
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
