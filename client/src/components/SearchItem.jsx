import React, { memo, useEffect, useRef, useState, useCallback } from "react";
import icons from "../ultils/icons";
import { colors } from "../ultils/constants";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import { apiGetProducts } from "../apis";
import { formatPrice, formatMoney } from "../ultils/helpers";
import useDebounce from "../hooks/useDebounce";
import Swal from "sweetalert2";
const SearchItem = ({
  name,
  activeClick,
  handleActiveClick,
  type = "checkbox",
}) => {
  const filterRef = useRef(null);
  const buttonRef = useRef(null);

  const navigate = useNavigate();
  const { category } = useParams();

  const [selected, setSelected] = useState([]);
  const [highestPrice, setHighestPrice] = useState(null);
  const [price, setPrice] = useState({ from: "", to: "" });

  const handleSelected = useCallback(
    (e) => {
      const alreadyEl = selected.find((el) => el === e.target.value);
      if (alreadyEl) {
        setSelected((prev) => prev.filter((el) => el !== e.target.value));
      } else {
        setSelected((prev) => [...prev, e.target.value]);
        handleActiveClick(null);
      }
    },
    [selected, handleActiveClick]
  );

  const handleButtonClick = useCallback(
    (e) => {
      e.stopPropagation();
      handleActiveClick(name);
    },
    [handleActiveClick, name]
  );

  useEffect(() => {
    if (selected.length > 0) {
      navigate({
        pathname: `/${category}`,
        search: createSearchParams({
          color: selected.join(","),
        }).toString(),
      });
    } else {
      navigate({
        pathname: `/${category}`,
      });
    }
  }, [selected, navigate, category]);
  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        handleActiveClick(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [handleActiveClick]);
  useEffect(() => {
    const fetchHighestPriceProduct = async () => {
      const response = await apiGetProducts({ sort: "-price", limit: 1 });
      if (response.success) {
        setHighestPrice(formatPrice(response.productData[0].price));
      }
    };
    fetchHighestPriceProduct();
  }, [type]);
  const debouncePriceFrom = useDebounce(price.from, 2000);
  const debouncePriceTo = useDebounce(price.to, 2000);

  useEffect(() => {
    if (
      Number(debouncePriceFrom) > Number(debouncePriceTo) &&
      Number(debouncePriceTo) !== 0
    ) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "From price cannot greater than To price",
        confirmButtonText: "OK",
        confirmButtonColor: "#d33",
      });
    } else {
      const data = {};
      if (Number(price.from) > 0) {
        data.from = price.from;
      }
      if (Number(price.to) > 0) {
        data.to = price.to;
      }
      navigate({
        pathname: `/${category}`,
        search: createSearchParams(data).toString(),
      });
    }
  }, [debouncePriceFrom, debouncePriceTo]);
  return (
    <div
      className="relative px-4 border border-gray-400  flex items-center justify-between gap-5 cursor-pointer hover:border hover:border-gray-800"
      onClick={handleButtonClick}
      ref={buttonRef}
    >
      <span className="text-sm text-gray-500 leading-[45px]">{name}</span>
      <icons.RxCaretDown />
      {activeClick === name && (
        <div
          ref={filterRef}
          className="absolute left-0 top-[110%] z-50  border bg-white w-fit text-sm text-[#505050]"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {type === "checkbox" && (
            <div>
              <div className="flex justify-between items-center  py-[15px] px-[20px] gap-[200px] border-b ">
                <span className="whitespace-nowrap ">{`${selected.length} selected`}</span>
                <span
                  className="underline cursor-pointer text-black "
                  onClick={() => setSelected([])}
                >
                  Reset
                </span>
              </div>
              <div className="py-[5px] px-[20px]">
                {colors.map((el, index) => (
                  <div key={index}>
                    <input
                      className="mr-3"
                      type="checkbox"
                      onClick={handleSelected}
                      value={el}
                      defaultChecked={selected.some(
                        (selectedItem) => selectedItem === el
                      )}
                    />
                    <label className="capitalize leading-[2.5em]" htmlFor={el}>
                      {el}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          {type === "input" && (
            <div>
              <div className="flex justify-between items-center  py-[15px] px-[20px] gap-[200px] border-b ">
                <span className="whitespace-nowrap ">
                  {`The highest price is ${formatMoney(highestPrice)}`}
                </span>
                <span
                  className="underline cursor-pointer text-black "
                  onClick={() => setPrice({ from: "", to: "" })}
                >
                  Reset
                </span>
              </div>
              <div className="flex gap-2 items-center p-7">
                <div className="flex items-center gap-2">
                  <label htmlFor="from">From</label>
                  <input
                    className="form-input"
                    type="number"
                    id="from"
                    value={price.from}
                    onChange={(e) =>
                      setPrice((prev) => ({ ...prev, from: e.target.value }))
                    }
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="to">To</label>
                  <input
                    className="form-input"
                    type="number"
                    id="to"
                    value={price.to}
                    onChange={(e) =>
                      setPrice((prev) => ({ ...prev, to: e.target.value }))
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(SearchItem);
