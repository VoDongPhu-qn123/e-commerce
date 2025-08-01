import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import { createSlug } from "../ultils/helpers";

const SideBar = () => {
  const categories = useSelector((state) => state.app.categories);
  return (
    <div className="flex flex-col border">
      {categories?.map((el) => (
        <NavLink
          key={el._id}
          to={createSlug(el.name)}
          className={({ isActive }) =>
            isActive
              ? "bg-main text-white px-5, pt-[15px] pb-[14px] text-sm hover:text-main"
              : "px-5, pt-[15px] pb-[14px] text-sm hover:text-main"
          }
        >
          {el.name}
        </NavLink>
      ))}
    </div>
  );
};

export default SideBar;
