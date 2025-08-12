import React, { memo, forwardRef } from "react";
import { formatLabel } from "../ultils/helpers";
const InputField = forwardRef(
  (
    { type, value, setValue, nameKey, invalidFields, setInvalidFields, style },
    ref
  ) => {
    const handleOnFocus = () => {
      if (
        invalidFields?.some(
          (el) => formatLabel(el.name) === ref?.current?.placeholder
        )
      ) {
        const newInvalidFields = invalidFields.filter(
          (el) => formatLabel(el.name) !== ref?.current?.placeholder
        );
        setInvalidFields(newInvalidFields);
      }
    };
    return (
      <div className="w-full flex flex-col mb-2 relative">
        {value.trim() !== "" && (
          <label
            className="text-[13px] absolute top-[-2px] left-[12px] px-1 bg-white block animate-slide-top-sm text-main"
            htmlFor={nameKey}
          >
            {formatLabel(nameKey)}
          </label>
        )}

        <input
          ref={ref}
          type={type || "text"}
          placeholder={formatLabel(nameKey)}
          value={value}
          onChange={(e) =>
            setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
          }
          onFocus={handleOnFocus}
          className={
            style ||
            "px-4 py-2 rounded-md border w-full mt-2 text-sm placeholder:text-sm"
          }
        />

        {invalidFields?.some((el) => el.name === nameKey) && (
          <small className="text-main text-[12px] italic">
            {invalidFields?.find((el) => el.name === nameKey)?.message}
          </small>
        )}
      </div>
    );
  }
);

export default memo(InputField);
