import React, { useEffect, useState } from "react";

const useDebounce = (value, ms) => {
  const [decouneValue, setDecouneValue] = useState("");
  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      setDecouneValue(value);
    }, ms);
    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [value, ms]);
  return decouneValue;
};

export default useDebounce;

// muốn: khi mà nhập thay đổi giá trị thì sẽ gọi api
// vấn đề: gọi api liên tục theo mỗi lần nhập
// resolve: chỉ call api khi mà người dùng nhập xong
// thời gian onchange

// tách price thành 2 biến
// 1. biến để phục vụ UI, gõ tới đâu thì lưu tới đó => UI render
// 2. biến dùng để quyết định call api => setTimeout => biến sẽ gán sau một khoảng thời gian
