import axios from "../axios";
export const apiGetProducts = async (params) => {
  const response = await axios({
    url: "/product",
    method: "GET",
    params,
  });
  return response;
};
