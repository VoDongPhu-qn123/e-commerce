import React, { useState } from "react";
import avatarDefault from "../assets/avatar-default.png";
import moment from "moment";
import { renderStarsFromNumber } from "../ultils/renderStar";
const Comment = ({
  image = avatarDefault,
  name = "Anonymous",
  star,
  updatedAt,
  comment,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const MAX_HEIGHT = 20; // chiều cao khi rút gọn (px)

  return (
    <div className="flex gap-4">
      {/* Avatar */}
      <div>
        <img
          src={image}
          alt="avatar"
          className="w-[25px] h-[25px] object-cover rounded-full"
        />
      </div>

      {/* Nội dung */}
      <div className="flex flex-col gap-2 text-sm w-full">
        {/* Tên và thời gian */}
        <div className="flex justify-between items-center">
          <h3 className="font-medium">{name}</h3>
          <span className="text-gray-500 text-xs">
            {moment(updatedAt)?.fromNow()}
          </span>
        </div>

        {/* Phần nội dung comment */}
        <div className="w-full flex flex-col gap-2 pl-4 bg-slate-100 border border-slate-300 py-4 rounded-lg">
          {/* Hiển thị sao */}
          <span className="flex gap-1">{renderStarsFromNumber(star)}</span>

          {/* Comment + nút */}
          <div
            className={`relative transition-all duration-500 overflow-hidden ${
              isExpanded ? "max-h-[1000px]" : `max-h-[${MAX_HEIGHT}px]`
            }`}
          >
            <span className="flex gap-1 whitespace-pre-line">{comment}</span>
          </div>

          {/* Nút xem thêm / thu gọn */}
          {comment.length > 100 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-500 hover:underline text-xs self-start mt-1"
            >
              {isExpanded ? "Thu gọn" : "Xem thêm"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
