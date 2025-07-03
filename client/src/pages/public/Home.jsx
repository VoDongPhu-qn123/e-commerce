import React from "react";
import { Banner, SideBar } from "../../components";

const Home = () => {
  return (
    <div className="w-main flex">
      <div className="flex flex-col gap-5 w-[20%] flex-auto">
        <SideBar />
        <span>DAILY DEALS</span>
      </div>
      <div className="flex flex-col gap-5 pl-5 w-[80%] flex-auto">
        <Banner />
        <span>BEST SELLER</span>
      </div>
    </div>
  );
};

export default Home;
