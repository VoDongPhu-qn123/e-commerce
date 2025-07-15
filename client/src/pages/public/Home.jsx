import React from "react";
import {
  Banner,
  SideBar,
  BestSeller,
  DailyDeal,
  FeaturedProducts,
} from "../../components";

const Home = () => {
  return (
    <>
      <div className="w-main flex">
        <div className="flex flex-col gap-5 w-[25%] flex-auto">
          <SideBar />
          <DailyDeal />
        </div>
        <div className="flex flex-col gap-5 pl-5 w-[75%] flex-auto">
          <Banner />
          <BestSeller />
        </div>
      </div>
      <div className="mt-8">
        <FeaturedProducts />
      </div>
      <div className="w-full h-[500px]"></div>
    </>
  );
};

export default Home;
