const Coupon = require("../models/couponModel");
const asyncHandler = require("express-async-handler");
const createNewCoupon = asyncHandler(async (req, res) => {
  const { name, discount, expiry } = req.body;
  if (!name || !discount || !expiry) {
    throw new Error("Missing inputs");
  }
  const response = await Coupon.create({
    ...req.body,
    expiry: Date.now() + +expiry * 24 * 60 * 60 * 1000,
  });
  return res.status(200).json({
    success: response ? true : false,
    createdCoupon: response || "Cannot create new Coupon",
  });
});
const getCoupons = asyncHandler(async (req, res) => {
  const response = await Coupon.find().select("-createdAt -updatedAt");
  return res.status(200).json({
    success: response ? true : false,
    response: response || "Cannot get Coupons",
  });
});
const updateCoupon = asyncHandler(async (req, res) => {
  const { couponId } = req.params;
  if (Object.keys(req.body).length === 0) {
    throw new Error("Missing inputs");
  }
  if (req.body.expiry) {
    req.body.expiry = Date.now() + +req.body.expiry * 24 * 60 * 60 * 1000;
  }
  const response = await Coupon.findByIdAndUpdate(couponId, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: response ? true : false,
    updatedCoupon: response || "Cannot update coupon",
  });
});
const deleteCoupon = asyncHandler(async (req, res) => {
  const { couponId } = req.params;

  const response = await Coupon.findByIdAndDelete(couponId);
  return res.status(200).json({
    success: response ? true : false,
    deletedCoupon: response || "Cannot delete coupon",
  });
});
module.exports = {
  createNewCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon,
};
