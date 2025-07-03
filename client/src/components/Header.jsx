import React from "react";
import logo from "../assets/logo.png";
import icons from "../ultils/icons";
import { Link } from "react-router-dom";
import PATH from "../ultils/path";
const Header = () => {
  return (
    <div className="w-main flex h-[110px] py-[35px] justify-between">
      <Link to={`/${PATH.HOME}`}>
        <img src={logo} alt="logo" className="w-[234px] object-contain" />
      </Link>
      <div className="flex text-[13px] items-center">
        <div className="flex flex-col items-center border-r px-6">
          <span className="flex gap-4 items-center">
            <icons.FaPhone className="text-main" />
            <span className="font-semibold"> (+1800) 000 8808</span>
          </span>
          <span>Mon-Sat 9:00AM - 8:00PM</span>
        </div>
        <div className="flex flex-col items-center border-r px-6">
          <span className="flex gap-4 items-center">
            <icons.MdEmail className="text-main" />
            <span className="font-semibold">SUPPORT@TADATHEMES.COM</span>
          </span>
          <span>Online Support 24/7</span>
        </div>
        <div className="flex items-center justify-center gap-2 border-r px-6">
          <icons.BsHandbagFill className="text-main" />
          <span>0 items</span>
        </div>
        <div className="flex items-center justify-center  px-6">
          <icons.FaUserCircle size={24} />
        </div>
      </div>
    </div>
  );
};

export default Header;
