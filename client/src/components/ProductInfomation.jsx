import React, { memo, useCallback, useState } from "react";
import { productInfoTab } from "../ultils/constants";
import { VoteBar, Button, VoteOption, Comment } from "./";
import { renderStarsFromNumber } from "../ultils/renderStar";
import { apiRatings } from "../apis";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../store/app/appSlice";
import Swal from "sweetalert2";
import PATH from "../ultils/path";
import { useNavigate } from "react-router-dom";
const activedStyles = "text-black bg-white border-b-0";
const notActivedStyles = "text-[#505050] bg-[#F1F1F1]";
const ProductInfomation = ({
  avgRatings,
  ratings,
  nameProduct,
  productId,
  reRender,
}) => {
  const [isActiveTab, setIsActiveTab] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.user);
  const handleSubmitVoteOption = useCallback(
    async ({ comment, score }) => {
      if (!comment || !score || !productId) {
        Swal.fire("Oops", "Please vote when click submit!", "error");
        return;
      }
      const response = await apiRatings({
        star: score,
        comment,
        productId,
        updatedAt: Date.now(),
      });
      if (response.success) {
        Swal.fire("Congratulation", "Submit successfully!", "success").then(
          () => {
            dispatch(showModal({ isShowModal: false, modalChildren: null }));
            reRender();
          }
        );
      }
    },
    [reRender, productId, dispatch]
  );
  const handleWriteReview = () => {
    if (!isLoggedIn) {
      Swal.fire({
        text: "Login to write a review",
        showCancelButton: true,
        confirmButtonText: "Go login",
        title: "Oops",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/${PATH.LOGIN}`);
        }
      });
    } else {
      dispatch(
        showModal({
          isShowModal: true,
          modalChildren: (
            <VoteOption
              nameProduct={nameProduct}
              handleSubmitVoteOption={handleSubmitVoteOption}
            />
          ),
        })
      );
    }
  };
  return (
    <div className>
      <div className="flex items-center gap-1 relative bottom-[-1px]">
        {productInfoTab.map((el) => (
          <span
            className={`px-5 py-2 border text-sm cursor-pointer hover:text-black hover:bg-white ${
              isActiveTab === el.id ? activedStyles : notActivedStyles
            }`}
            key={el.id}
            onClick={() => setIsActiveTab(el.id)}
          >
            {el.title}
          </span>
        ))}
        <span
          className={`px-5 py-2 border text-sm cursor-pointer hover:text-black hover:bg-white ${
            isActiveTab === 5 ? activedStyles : notActivedStyles
          }`}
          onClick={() => setIsActiveTab(5)}
        >
          CUSTOMER REVIEW
        </span>
      </div>
      <div className="w-main border p-5">
        {productInfoTab?.find((el) => el.id === isActiveTab)?.content}
        {isActiveTab === 5 && (
          <>
            <div className="flex p-4">
              <div className="flex flex-col flex-4 justify-center items-center">
                <span>{`${avgRatings}/5`}</span>
                <span className="flex gap-1">
                  {renderStarsFromNumber(avgRatings)}
                </span>
                <span className="text-base">{`${ratings?.length} reviews and comments`}</span>
                <Button
                  handleOnClick={handleWriteReview}
                  name="Write a review"
                />
              </div>
              <div className="flex flex-col flex-6 gap-1">
                {Array.from(Array(5).keys())
                  .reverse()
                  .map((el) => (
                    <VoteBar
                      key={el}
                      number={el + 1}
                      ratingsTotal={ratings?.length}
                      ratingsCount={
                        ratings?.filter((item) => item.star === el + 1)?.length
                      }
                    />
                  ))}
              </div>
            </div>
            <div className="flex flex-col gap-5">
              {ratings?.map((el) => (
                <Comment
                  key={el._id}
                  star={el.star}
                  updatedAt={el.updatedAt}
                  comment={el.comment}
                  name={`${el.postedBy?.lastName} ${el.postedBy?.firstName}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default memo(ProductInfomation);
