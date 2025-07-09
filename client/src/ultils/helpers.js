export const createSlug = (string) => string.toLowerCase().split(" ").join("-");
export const formatMoney = (number) => {
  return number?.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};
