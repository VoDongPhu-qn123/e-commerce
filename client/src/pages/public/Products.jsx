import React, { useCallback, useEffect, useState } from "react";
import {
  useParams,
  useSearchParams,
  useNavigate,
  createSearchParams,
} from "react-router-dom";
import {
  BreadCrumbs,
  Product,
  SearchItem,
  InputSelect,
} from "../../components";
import { apiGetProducts } from "../../apis";
import Masonry from "react-masonry-css";
import { sorts } from "../../ultils/constants";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};
const Products = () => {
  const { category } = useParams();
  const [productData, setProductData] = useState(null);
  const [activeClick, setActiveClick] = useState(null);
  const [sort, setSort] = useState("");
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const handleActiveClick = useCallback(
    (name) => {
      if (name === null) {
        setActiveClick(null);
        return;
      }
      if (activeClick === name) {
        setActiveClick(null);
      } else {
        setActiveClick(name);
      }
    },
    [activeClick]
  );
  const fetchProductsByCategory = async (queries) => {
    const response = await apiGetProducts(queries);
    if (response.success) {
      setProductData(response.productData);
    }
  };
  const changeValue = useCallback(
    (value) => {
      setSort(value);
    },
    [sort]
  );
  useEffect(() => {
    navigate({
      pathname: `/${category}`,
      search: createSearchParams({
        sort,
      }).toString(),
    });
  }, [sort]);
  useEffect(() => {
    // let param = [];
    // for (let i of params.entries()) {
    //   param.push(i);
    // }
    // const queries = {};
    // for (let i of param) {
    //   queries[i[0]] = i[1].toUpperCase();
    // }
    //  // Biến params (URLSearchParams) thành object JS
    const queries = Object.fromEntries(params.entries()); // chuyển queries ở dạng URLSearchParams thành object thật sự
    if (queries.from && queries.to) {
      queries.price = {
        gte: queries.from,
        lte: queries.to,
      };
      delete queries.from;
      delete queries.to;
    }
    if (queries.from) {
      queries.price = { gte: queries.from };
      delete queries.from;
    }
    if (queries.to) {
      queries.price = { lte: queries.to };
      delete queries.to;
    }
    fetchProductsByCategory({ category, ...queries });
  }, [category, params]);

  return (
    <div>
      <div className="h-[81px] bg-[#f7f7f7] -mt-6 flex flex-col justify-center">
        <h3 className="font-bold uppercase">{category}</h3>
        <BreadCrumbs category={category} />
      </div>
      <div className="w-main border p-4 flex mt-9">
        <div className="w-4/5 flex flex-col">
          <span className="font-semibold mb-[10px]">Filter by</span>
          <div className="flex items-center gap-1 ">
            <SearchItem
              name="Price"
              activeClick={activeClick}
              handleActiveClick={handleActiveClick}
              type="input"
              setActiveClick={setActiveClick}
            />
            <SearchItem
              name="Color"
              activeClick={activeClick}
              handleActiveClick={handleActiveClick}
            />
          </div>
        </div>
        <div className="w-1/5 flex flex-col">
          <span className="font-semibold mb-[10px]">Sort by</span>
          <InputSelect value={sort} options={sorts} changeValue={changeValue} />
        </div>
      </div>
      <div className="mt-4">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {productData?.map((el) => (
            <Product key={el._id} productData={el} normal />
          ))}
        </Masonry>
      </div>
      <div className="w-full h-[500px]"></div>
    </div>
  );
};

export default Products;
