import React, { useEffect, useState, memo, useRef } from "react";
import icons from "../ultils/icons";
import { apiGetProducts } from "../apis";
import { renderStarsFromNumber } from "../ultils/renderStar";
import { formatMoney } from "../ultils/helpers";
import CountDown from "./CountDown";
const { FaStar, IoMdMenu } = icons;

const DAILY_DEAL_KEY = "dailyDeal";
const DAILY_DEAL_EXPIRE_KEY = "dailyDealExpireAt";
const DEAL_DURATION = 24 * 60 * 60 * 1000; // 24 tiếng

const DailyDeal = () => {
  const [dailyDeal, setDailyDeal] = useState(null);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [loading, setLoading] = useState(true);
  const idInterval = useRef(null);

  // Tính thời gian còn lại
  const updateCountDown = (expireAt) => {
    const remaining = expireAt - Date.now();
    if (remaining <= 0) {
      setHours(0);
      setMinutes(0);
      setSeconds(0);
      return false;
    } else {
      const h = Math.floor(remaining / (1000 * 60 * 60));
      const m = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((remaining % (1000 * 60)) / 1000);
      setHours(h);
      setMinutes(m);
      setSeconds(s);
      return true;
    }
  };

  // Lấy dailyDeal mới và lưu vào localStorage
  const fetchAndSetDailyDeal = async () => {
    setLoading(true);
    const response = await apiGetProducts({
      limit: 1,
      page: Math.max(1, Math.round(Math.random() * 5)),
      totalRatings: 5,
    });
    if (response.success && response.productData && response.productData[0]) {
      const deal = response.productData[0];
      setDailyDeal(deal);
      localStorage.setItem(DAILY_DEAL_KEY, JSON.stringify(deal));
      const expireAt = Date.now() + DEAL_DURATION;
      localStorage.setItem(DAILY_DEAL_EXPIRE_KEY, expireAt);
      updateCountDown(expireAt);
    } else {
      setDailyDeal(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Khi mount, kiểm tra localStorage
    const expireAt = +localStorage.getItem(DAILY_DEAL_EXPIRE_KEY);
    const dealStr = localStorage.getItem(DAILY_DEAL_KEY);
    if (expireAt && dealStr && expireAt > Date.now()) {
      try {
        const deal = JSON.parse(dealStr);
        setDailyDeal(deal);
        updateCountDown(expireAt);
        setLoading(false);
      } catch {
        fetchAndSetDailyDeal();
      }
    } else {
      fetchAndSetDailyDeal();
    }
    // Đếm ngược
    idInterval.current = setInterval(() => {
      const expireAt = +localStorage.getItem(DAILY_DEAL_EXPIRE_KEY);
      if (expireAt && updateCountDown(expireAt)) {
        // còn thời gian
      } else {
        // hết thời gian, lấy deal mới
        fetchAndSetDailyDeal();
      }
    }, 1000);
    return () => clearInterval(idInterval.current);
  }, []);

  return (
    <div className="w-full border flex-auto">
      <div className="flex justify-between p-4">
        <span className="flex-1 flex items-center">
          <FaStar size={20} color="#d11" />
        </span>
        <span className="flex-8 font-semibold text-[20px] text-center items-center text-gray-700">
          DAILY DEALS
        </span>
        <span className="flex-1"></span>
      </div>
      {loading ? (
        <div className="w-full flex flex-col px-5 pt-8 items-center gap-2 text-gray-500">Đang tải...</div>
      ) : dailyDeal ? (
        <>
          <div className="w-full flex flex-col px-5 pt-8 items-center gap-2">
            <img src={dailyDeal.thumbnail} alt="" />
            <span className="flex">
              {renderStarsFromNumber(dailyDeal.totalRatings)}
            </span>
            <span>{dailyDeal.name}</span>
            <span className="text-main">{formatMoney(dailyDeal.price)}</span>
          </div>
          <div className="w-full px-5 mt-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <CountDown unit="Hours" number={hours} />
              <CountDown unit="Minutes" number={minutes} />
              <CountDown unit="Seconds" number={seconds} />
            </div>
            <button className="w-full bg-[#ee3131] h-10 flex justify-center items-center gap-2 text-[16px] text-white hover:bg-[#333]">
              <IoMdMenu />
              <span>OPTIONS</span>
            </button>
          </div>
        </>
      ) : (
        <div className="w-full flex flex-col px-5 pt-8 items-center gap-2 text-red-500">Không có daily deal nào!</div>
      )}
    </div>
  );
};

export default memo(DailyDeal);
