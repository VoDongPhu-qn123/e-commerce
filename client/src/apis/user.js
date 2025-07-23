import axios from "../axios";
export const apiRegister = async (data) => {
  const response = await axios({
    url: "/user/register",
    method: "POST",
    data,
  });
  return response;
};
export const apiLogin = async (data) => {
  const response = await axios({
    url: "/user/login",
    method: "POST",
    data,
  });
  return response;
};
