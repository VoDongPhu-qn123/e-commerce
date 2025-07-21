import { memo } from "react";
const CategoryTag = ({ category }) => {
  return (
    <div>
      <div className="w-[396px]">
        <div className="border m-h-[202px] flex p-4 gap-4">
          <img
            src={category?.image}
            alt=""
            className="w-[144px] h-[129px] object-contain"
          />
          <div className="flex flex-col text-gray-700">
            <h4 className="font-semibold uppercase">{category?.name}</h4>
            {category?.brand?.map((el, index) => (
              <span
                key={index}
                className="text-[14px] text-gray-500 cursor-pointer hover:text-main"
              >
                &gt; {el}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(CategoryTag);
