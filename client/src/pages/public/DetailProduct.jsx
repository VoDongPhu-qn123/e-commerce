import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGetProduct, apiGetProducts } from "../../apis";
import { useCallback } from "react";
import {
  BreadCrumbs,
  Button,
  CustomSlider,
  ExtraProductInfo,
  ProductInfomation,
  SelectQuanity,
} from "../../components";
import Slider from "react-slick";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import { formatMoney, formatPrice } from "../../ultils/helpers";
import { renderStarsFromNumber } from "../../ultils/renderStar";
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};
const DetailProduct = () => {
  const { productId, name, category } = useParams();
  const [productData, setProductData] = useState(null);
  const [productsByCategory, setProductsByCategory] = useState(null);
  const [indexImage, setIndexImage] = useState(null);
  const [quanity, setQuanity] = useState("1");
  const [update, setUpdate] = useState(false);
  const fetchProduct = async () => {
    const response = await apiGetProduct(productId);
    if (response.success) {
      setProductData(response.productData);
    }
  };
  const fetchProducts = async () => {
    const response = await apiGetProducts({ category });
    if (response.success) {
      setProductsByCategory(response.productData);
    }
  };
  const handleQuanity = useCallback((number) => {
    if (number === "") {
      setQuanity("");
      return;
    }
    if (!Number(number) || Number(number) < 1) {
      return;
    }
    setQuanity(number);
  }, []);
  const handleChangeQuanity = useCallback(
    (flag) => {
      if (flag === "minus") {
        if (quanity > 1) {
          setQuanity((prev) => +prev - 1);
        } else {
          return;
        }
      } else if (flag === "plus") {
        setQuanity((prev) => +prev + 1);
      }
    },
    [quanity]
  );
  const reRender = useCallback(() => {
    setUpdate(!update);
  }, [update]);
  useEffect(() => {
    if (productId) {
      Promise.all([fetchProduct(), fetchProducts()]).catch((err) =>
        console.log(err)
      );
    }
    window.scroll(0, 0);
  }, [productId]);
  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [update]);
  return (
    <div className="w-full">
      <div className="h-[81px] bg-[#f7f7f7] -mt-6 flex flex-col justify-center">
        <h3 className="font-bold">{name}</h3>
        <BreadCrumbs name={name} category={category} />
      </div>
      <div className="mt-5 flex">
        <div className="w-2/5 flex flex-col gap-4 ">
          <InnerImageZoom
            src={
              indexImage
                ? productData?.images[indexImage]
                : productData?.thumbnail
            }
            alt="product"
            className="h-[458px] w-[458px] object-cover border"
            zoomType="hover"
            zoomPreload={true}
          />
          <div className="w-[458px]">
            <Slider {...settings} className="product-image-slider">
              {productData?.images?.map((el, index) => (
                <div key={index} className="p-10px">
                  <img
                    src={el}
                    className="h-[143px] w-[143px] p-[10px] border object-contain cursor-pointer"
                    onClick={() => setIndexImage(index)}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="w-2/5 flex flex-col gap-3 pl-2">
          <div className="flex items-center gap-20">
            <h2 className="text-[30px] font-semibold">
              {formatMoney(formatPrice(productData?.price))}
            </h2>
            <span className="text-gray-500">{`In Stock: ${productData?.quanity}`}</span>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex">
              {renderStarsFromNumber(productData?.totalRatings)}
            </div>
            <span className="text-main">{`Sold: ${productData?.sold}`}</span>
          </div>
          <ul className=" text-sm list-disc pl-5">
            {productData?.description.split("/n").map((el, index) => (
              <li key={index} className="leading-6">
                {el}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-5 mt-3">
            <div className="flex gap-5">
              <h3 className="font-semibold">Quanity</h3>
              <SelectQuanity
                quanity={quanity}
                handleQuanity={handleQuanity}
                handleChangeQuanity={handleChangeQuanity}
              />
            </div>
            <Button name="ADD TO CART" widthFull></Button>
          </div>
        </div>
        <div className="w-1/5">
          <ExtraProductInfo />
        </div>
      </div>
      <div className="w-main mt-8">
        <ProductInfomation
          avgRatings={productData?.totalRatings}
          ratings={productData?.ratings}
          nameProduct={productData?.name}
          productId={productId}
          reRender={reRender}
        />
      </div>
      <h3 className=" font-semibold text-[20px] py-[15px] border-b-2 border-main mt-4 mb-12">
        Other Customers also buy:
      </h3>
      <div className=" mx-[-10px]">
        <CustomSlider products={productsByCategory} normal />
      </div>
      <div className="h-[300px]"></div>
    </div>
  );
};

export default DetailProduct;
