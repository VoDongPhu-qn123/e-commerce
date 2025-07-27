import React, { useState, useCallback } from "react";
import { InputField, Button } from "../../components";
import { apiRegister, apiLogin, apiForgotPassword } from "../../apis";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import PATH from "../../ultils/path";
import { logInSuccess } from "../../store/user/userSlice";
import { useDispatch } from "react-redux";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location);
  const [payload, setPayLoad] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });

  const resetPayload = () => {
    setPayLoad({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
    });
  };
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [isForGotPassword, setIsForGotPassword] = useState(false);
  const handleForgotPassword = async () => {
    const response = await apiForgotPassword({ email });
    console.log(response);
  };
  const handleSubmit = useCallback(async () => {
    const { firstName, lastName, phoneNumber, ...data } = payload;
    if (isRegister) {
      const response = await apiRegister(payload);
      if (response.success) {
        Swal.fire("Congratulation", response.message, "success").then(() => {
          setIsRegister(false);
          resetPayload();
        });
      } else {
        Swal.fire("Oops", response.message, "error");
      }
    } else {
      const response = await apiLogin(data);
      if (response.success) {
        dispatch(
          logInSuccess({
            isLoggedIn: true,
            currentUser: response.userData,
            accessToken: response.accessToken,
          })
        );
        navigate(`/${PATH.HOME}`);
      } else {
        Swal.fire("Oops", response.message, "error");
      }
    }
  }, [payload, isRegister, navigate, dispatch]);
  return (
    <>
      <div className="flex items-center justify-center mb-10">
        <div className="p-8 min-w-[500px] rounded-md bg-white flex flex-col items-center border shadow-xl border-gray-300">
          <h3 className="text-[28px] font-semibold text-main mb-8">
            {isRegister ? "Register" : "Login"}
          </h3>

          {isRegister && (
            <div className="flex items-center gap-2">
              <InputField
                value={payload.firstName}
                setValue={setPayLoad}
                nameKey="firstName"
              />
              <InputField
                value={payload.lastName}
                setValue={setPayLoad}
                nameKey="lastName"
              />
            </div>
          )}
          {isRegister && (
            <InputField
              value={payload.phoneNumber}
              setValue={setPayLoad}
              nameKey="phoneNumber"
            />
          )}
          <InputField
            value={payload.email}
            setValue={setPayLoad}
            nameKey="email"
          />
          <InputField
            value={payload.password}
            setValue={setPayLoad}
            nameKey="password"
            type="password"
          />
          <Button
            name={isRegister ? "Register" : "Sign in"}
            widthFull
            handleOnClick={handleSubmit}
          />
          <div className="flex items-center justify-between w-full my-2 test-sm">
            {!isRegister && (
              <span className="text-blue-500 hover:underline cursor-pointer">
                Forgot your password?
              </span>
            )}
            {!isRegister && (
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => setIsRegister(true)}
              >
                Create account
              </span>
            )}
            {isRegister && (
              <span
                className="text-blue-500 hover:underline cursor-pointer text-center w-full"
                onClick={() => setIsRegister(false)}
              >
                Go to back Login
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="fixed inset-0 bg-overlay flex items-center justify-center">
        <div className="flex flex-col gap-4 bg-white p-5 rounded-sm ">
          <label htmlFor="email" className="text-main font-semibold">
            Enter your email:
          </label>
          <input
            id="email"
            type="text"
            className="w-[500px] border p-2 outline-none placeholder:text-sm"
            placeholder="example: email@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex justify-end">
            <Button name="Submit" handleOnClick={handleForgotPassword} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
