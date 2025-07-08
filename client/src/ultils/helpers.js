export const createSlug = (string) => string.toLowerCase().split(" ").join("-");
export const formatMoney = (number) =>
  number.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
