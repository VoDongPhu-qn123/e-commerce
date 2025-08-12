import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PATH from "../ultils/path";
import { getCurrentUser } from "../store/user/asyncAction";
import { logOut } from "../store/user/userSlice";
import icons from "../ultils/icons";
import { apiLogOut } from "../apis/user";
import Swal from "sweetalert2";
const TopHeader = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, currentUser, accessToken } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    dispatch(getCurrentUser(accessToken));
  }, [dispatch, isLoggedIn, accessToken]);
  const handleLogOut = async () => {
    dispatch(logOut());
    const response = await apiLogOut();
    if (response.success) {
      Swal.fire("Success", response.message, "success")
    } else {
      Swal.fire("Error", response.message, "error");
    }
  };
  return (
    <div className="h-[38px] w-full bg-main flex items-center justify-center">
      <div className="w-main flex items-center justify-between text-xs text-white">
        <span>ORDER ONLINE OR CALL US (+1800) 000 8808</span>
        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
              <span>
                Welcome, {currentUser?.lastName} {currentUser?.firstName}
              </span>
              <icons.IoLogOutOutline
                size={20}
                className="cursor-pointer hover:text-main hover hover:rounded-sm hover:bg-gray-200"
                onClick={handleLogOut}
              />
            </>
          ) : (
            <Link
              to={`/${PATH.LOGIN}`}
              className="cursor-pointer hover:text-black"
            >
              Sign In or Create Account
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(TopHeader);
