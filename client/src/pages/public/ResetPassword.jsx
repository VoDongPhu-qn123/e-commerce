import React, { useState } from "react";
import { Button } from "../../components";
import { useParams, useNavigate } from "react-router-dom";
import { apiResetPassword } from "../../apis";
import { toast } from "react-toastify";
import PATH from "../../ultils/path";
import Swal from "sweetalert2";
const ResetPassword = () => {
  const [newPassword, setNewPassWord] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();
  const handleResetPassword = async () => {
    const response = await apiResetPassword({ password: newPassword, token });
    if (response.success) {
      Swal.fire("Congratulation", response.message, "success").then(() => {
        navigate(`/${PATH.LOGIN}`);
      });
    } else {
      toast.error(response.message);
    }
  };
  return (
    <div className="fixed inset-0 bg-white flex  justify-center">
      <div className="flex flex-col gap-4 bg-white p-5 rounded-sm animate-fade-in-scale">
        <label htmlFor="password" className="text-main font-semibold">
          Enter new password:
        </label>
        <div className="flex gap-5">
          <input
            id="password"
            type="password"
            className="w-[500px] border-2 p-2 outline-none placeholder:text-sm"
            placeholder="Type here"
            value={newPassword}
            onChange={(e) => setNewPassWord(e.target.value)}
          />
          <Button name="Submit" handleOnClick={handleResetPassword} />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
