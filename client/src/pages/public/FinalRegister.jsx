import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import PATH from "../../ultils/path";
import Swal from "sweetalert2";
const FinalRegister = () => {
  const { status } = useParams();
  const navigate = useNavigate();
  if (status === "failed") {
    Swal.fire("Oop!", "Registration Failed!", "error").then(() => {
      navigate(`/${PATH.LOGIN}`);
    });
  }
  if (status === "success") {
    Swal.fire("Congratulation!", "Registered successfully!", "success").then(
      () => {
        navigate(`/${PATH.LOGIN}`);
      }
    );
  }
  return <div className="h-screen w-screen bg-gray-100"></div>;
};

export default FinalRegister;
