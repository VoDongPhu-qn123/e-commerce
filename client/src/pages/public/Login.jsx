import React, { useState, useCallback } from "react";
import { InputField, Button } from "../../components";
const Login = () => {
  const [payload, setPayLoad] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isRegister, setIsRegister] = useState(false);
  const handleSubmit = useCallback(() => {
    console.log(payload);
  }, [payload]);
  return (
    <div className="flex items-center justify-center mb-10">
      <div className="p-8 min-w-[500px] rounded-md bg-white flex flex-col items-center border shadow-xl border-gray-300">
        <h3 className="text-[28px] font-semibold text-main mb-8">
          {isRegister ? "Register" : "Login"}
        </h3>

        {isRegister && (
          <InputField
            value={payload.name}
            setValue={setPayLoad}
            nameKey="name"
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
  );
};

export default Login;
