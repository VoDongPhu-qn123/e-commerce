import React, { memo } from "react";
import { extraProductInfo } from "../ultils/constants";
const ExtraProductInfo = () => {
  return (
    <ul className="flex flex-col gap-[10px]">
      {extraProductInfo.map((el) => (
        <li key={el.id} className="border p-[10px] flex items-center gap-4">
          <div className="rounded-full bg-gray-400 p-2">
            <el.icon />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-[#505050]">{el.title}</span>
            <span className="text-xs text-[#999]">{el.sub}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default memo(ExtraProductInfo);
