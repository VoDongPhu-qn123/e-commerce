export const createSlug = (string) => string.toLowerCase().split(" ").join("-");
export const formatMoney = (number) => {
  return number?.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};
export const formatLabel = (str) => {
  return str.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
};
