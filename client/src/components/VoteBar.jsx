import React, { useEffect, useRef } from "react";
import icons from "../ultils/icons";
const VoteBar = ({ number, ratingsCount, ratingsTotal }) => {
  const percentRef = useRef();
  const percent = Math.round((ratingsCount * 100) / ratingsTotal) || 0;
  useEffect(() => {
    percentRef.current.style.cssText = `right: ${100 - percent}%`;
  }, [ratingsCount, ratingsTotal]);
  return (
    <div className="flex items-center gap-2 text-xs text-gray-500">
      <div className="flex flex-1 gap-1 text-sm ">
        <span>{number}</span>
        {<icons.FaStar color="yellow" />}
      </div>
      <div className="flex-7">
        <div className="relative w-full h-2 rounded-[5px] bg-gray-200">
          <div ref={percentRef} className="absolute inset-0 bg-red-500"></div>
        </div>
      </div>
      <div className="flex-2">{`${ratingsCount || 0} reviews`}</div>
    </div>
  );
};

export default VoteBar;
