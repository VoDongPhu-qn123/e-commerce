import React, { memo, useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";
import { voteOptions } from "../ultils/constants";
import icons from "../ultils/icons";
import Button from "./Button";
const VoteOption = ({ nameProduct, handleSubmitVoteOption }) => {
  const modalRef = useRef();
  const [chosenScore, setChosenScore] = useState(null);
  const [comment, setComment] = useState("");
  useEffect(() => {
    modalRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
  }, []);
  return (
    <div
      ref={modalRef}
      className="bg-white w-[700px] p-4 flex flex-col gap-4 items-center justify-center"
      onClick={(e) => e.stopPropagation()}
    >
      <img src={logo} alt="logo" className="w-[300px] object-contain" />
      <h2 className="text-center text-main text-lg">{`Review the product ${nameProduct}`}</h2>
      <textarea
        className="form-textarea w-full rounded-lg placeholder:italic text-sm"
        placeholder="Type something"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <div className="w-full flex flex-col gap-4 items-center">
        <p className=" text-main">How do you feel about this product?</p>
        <div className="flex gap-5 items-center">
          {voteOptions.map((el) => (
            <div
              key={el.id}
              className="w-[100px] bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-lg p-4 flex flex-col justify-center items-center"
              onClick={() => setChosenScore(el.id)}
            >
              {Number(chosenScore) && chosenScore >= el.id ? (
                <icons.FaStar color="orange" />
              ) : (
                <icons.FaRegStar color="gray" />
              )}

              <span>{el.text}</span>
            </div>
          ))}
        </div>
      </div>
      <Button
        widthFull
        name="Submit"
        handleOnClick={() =>
          handleSubmitVoteOption({
            comment,
            score: chosenScore,
          })
        }
      />
    </div>
  );
};

export default memo(VoteOption);
