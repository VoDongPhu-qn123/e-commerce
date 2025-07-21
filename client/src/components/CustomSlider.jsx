import React, { memo } from "react";
import Slider from "react-slick"
import { Product } from "./index"
const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
};
const CustomSlider = ({ products, isActive }) => {
    return (
        <>
            {products && (<Slider {...settings}>
                {products?.map((el) => (
                    <Product
                        key={el._id}
                        productData={el}
                        isNew={isActive === 1 ? false : true}
                    />
                ))}
            </Slider>)}
        </>
    )
}
export default memo(CustomSlider)