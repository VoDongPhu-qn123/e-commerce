import axios from "../axios";
export const apiGetCategories = async () => {
  const response = await axios({
    url: "/productCategory",
    method: "GET",
  });
  return response.data;
};
