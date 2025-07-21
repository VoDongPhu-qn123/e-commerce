import React from "react";
import { useSelector } from "react-redux";
import {
  Banner,
  SideBar,
  BestSeller,
  DailyDeal,
  FeaturedProducts,
  CustomSlider,
  CategoryTag,
} from "../../components";

const Home = () => {
  const { newProducts } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.app);
  console.log(categories);
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
      <div className="mt-8">
        <h3 className=" font-semibold text-[20px] py-[15px] border-b-2 border-main">
          NEW ARRIVALS
        </h3>
        <div className=" mt-4 mx-[-10px]">
          <CustomSlider products={newProducts}></CustomSlider>
        </div>
      </div>
      <div className="mt-8">
        <h3 className=" font-semibold text-[20px] py-[15px] border-b-2 border-main">
          HOT COLLECTIONS
        </h3>
        <div className="flex flex-wrap gap-4 mt-4">
          {categories?.map((el) => (
            <CategoryTag key={el._id} category={el} />
          ))}
        </div>
      </div>
      <div className="mt-8">
        <h3 className=" font-semibold text-[20px] py-[15px] border-b-2 border-main">
          BLOG POSTS
        </h3>
      </div>
      <div className="w-full h-[500px]"></div>
    </>
  );
};

export default Home;
