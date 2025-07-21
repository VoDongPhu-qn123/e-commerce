import React from "react";
import icons from "../ultils/icons";
const Footer = () => {
  return (
    <div className="w-full">
      <div className="h-[103px]  bg-main flex items-center justify-center">
        <div className="w-main flex items-center justify-between">
          <div className="flex flex-col flex-1">
            <span className="text-[20px] text-white">
              Sign up to Newsletter
            </span>
            <small className="text-[13px] text-white opacity-60">
              Subscribe now and receive weekly newsletter
            </small>
          </div>
          <div className="flex-1 flex items-center">
            <input
              className="rounded-l-full bg-[#ffffff1a] p-4 w-full outline-none text-gray-100 placeholder:text-sm placeholder:opacity-50 placeholder:text-gray-100 "
              type="text"
              placeholder="Email address"
            />
            <div className="bg-[#ffffff1a] p-5 rounded-r-full text-white">
              <icons.IoMail size={18} />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[407px] bg-[#191919] flex items-center justify-center">
        <div className="w-main flex justify-between  text-[13px] text-[#b7b7b7]">
          <div className="flex-2">
            <h3 className="text-[15px] text-white mb-5 font-semibold pl-2 border-l-4 border-main">
              ABOUT US
            </h3>
            <ul>
              <li className="flex items-center gap-2 mb-[10px]">
                <icons.FaLocationDot size={13} className="text-white" />
                <strong className="text-white">Address</strong>: 474 Ontario St
                Toronto, ON M4X 1M7 Canada
              </li>
              <li className="flex items-center gap-2 mb-[10px]">
                <icons.FaPhone size={13} className="text-white" />
                <strong className="text-white">Phone</strong>: (+1234)56789xxx
              </li>
              <li className="flex items-center gap-2 mb-[10px]">
                <icons.IoMail size={13} className="text-white" />
                <strong className="text-white">Mail</strong>:
                tadathemes@gmail.com
              </li>
            </ul>
            <div className="flex mt-[10px]">
              <a
                href=""
                className="w-10 h-10 bg-[#ffffff1a] rounded-[3px] flex items-center justify-center mr-[3px]"
              >
                <icons.FaFacebookF size={15} />
              </a>

              <a
                href=""
                className="w-10 h-10 bg-[#ffffff1a] rounded-[3px] flex items-center justify-center mr-[3px]"
              >
                <icons.FaXTwitter />
              </a>
              <a
                href=""
                className="w-10 h-10 bg-[#ffffff1a] rounded-[3px] flex items-center justify-center mr-[3px]"
              >
                <icons.FaPinterest />
              </a>
              <a
                href=""
                className="w-10 h-10 bg-[#ffffff1a] rounded-[3px] flex items-center justify-center mr-[3px]"
              >
                <icons.IoLogoGoogleplus />
              </a>
              <a
                href=""
                className="w-10 h-10 bg-[#ffffff1a] rounded-[3px] flex items-center justify-center mr-[3px]"
              >
                <icons.FaLinkedinIn />
              </a>
              <a
                href=""
                className="w-10 h-10 bg-[#ffffff1a] rounded-[3px] flex items-center justify-center mr-[3px]"
              >
                <icons.FaFlickr />
              </a>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-[15px] text-white mb-5 font-semibold pl-2 border-l-4 border-main">
              INFORMATION
            </h3>
            <ul>
              <li className="mb-[10px]">Typography</li>
              <li className="mb-[10px]">Gallery</li>
              <li className="mb-[10px]">Store Location</li>
              <li className="mb-[10px]">Today's Deals</li>
              <li className="mb-[10px]">Contact</li>
            </ul>
          </div>
          <div className="flex-1">
            <h3 className="text-[15px] text-white mb-5 font-semibold pl-2 border-l-4 border-main">
              WHO WE ARE
            </h3>
            <ul>
              <li className="mb-[10px]">Help</li>
              <li className="mb-[10px]">Free Shipping</li>
              <li className="mb-[10px]">FAQs</li>
              <li className="mb-[10px]">Return & Exchange</li>
              <li className="mb-[10px]">Testimonials</li>
            </ul>
          </div>
          <div className="flex-1">
            <h3 className="text-[15px] text-white mb-5 font-semibold pl-2 border-l-4 border-main">
              #DIGITALWORLDSTORE
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
