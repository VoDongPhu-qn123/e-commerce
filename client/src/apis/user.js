import axios from "../axios";
export const apiRegister = async (data) => {
  const response = await axios({
    url: "/user/register",
    method: "POST",
    data,
    withCredentials: true,
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
export const apiForgotPassword = async (data) => {
  const response = await axios({
    url: "/user/forgotpassword",
    method: "POST",
    data,
  });
  return response;
};
export const apiResetPassword = async (data) => {
  const response = await axios({
    url: "/user/resetpassword",
    method: "PUT",
    data,
  });
  return response;
};
