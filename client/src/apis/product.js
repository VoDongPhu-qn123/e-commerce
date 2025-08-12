import axios from "../axios";
export const apiGetProducts = async (params) => {
  const response = await axios({
    url: "/product",
    method: "GET",
    params,
  });
  return response;
};
export const apiGetProduct = async (productId) => {
  const response = await axios({
    url: `/product/${productId}`,
    method: "GET",
  });
  return response;
};
