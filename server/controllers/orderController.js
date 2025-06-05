const Order = require("../models/orderModel");
const User = require("../models/userModel");
const Coupon = require("../models/couponModel");
const asyncHandler = require("express-async-handler");
const createNewOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { couponId } = req.body;
  const user = await User.findById(_id)
    .select("cart")
    .populate("cart.product", "name price");

  if (!user) {
    throw new Error("User not found");
  }
  if (user.cart.length === 0) {
    throw new Error("Cart is empty");
  }
  const products = user.cart.map((el) => ({
    product: el.product._id,
    count: el.quantity,
    color: el.color,
  }));
  let priceTotal = user.cart.reduce(
    (sum, el) => sum + el.product.price * el.quantity,
    0
  );
  if (couponId) {
    const coupon = await Coupon.findById(couponId);
    priceTotal =
      Math.round((priceTotal * (1 - coupon.discount / 100)) / 1000) * 1000;
  }
  const newOrder = await Order.create({
    products,
    total: priceTotal,
    coupon: couponId,
    orderBy: _id,
  });
  const populatedOrder = await Order.findById(newOrder._id).populate([
    { path: "products.product", select: "name price" },
    { path: "coupon", select: "name discount" },
  ]);
  return res.status(200).json({
    success: populatedOrder ? true : false,
    newOrder: populatedOrder || "Something went wrong",
  });
});
const updateOrderStatusByAdmin = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  if (!status) {
    throw new Error("Missing status input");
  }
  const response = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true }
  );
  return res.status(200).json({
    success: response ? true : false,
    response: response || "Cannot update order status",
  });
});
const getUserOrders = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const response = await Order.find({ orderBy: _id }).populate([
    { path: "orderBy", select: "firstName lastName email mobile" },
    { path: "coupon", select: "namme discount" },
  ]);
  return res.status(200).json({
    success: response ? true : false,
    userOrders: response || "Cannot get user orders",
  });
});
const getOrdersByAdmin = asyncHandler(async (req, res) => {
  const response = await Order.find();
  return res.status(200).json({
    success: response ? true : false,
    userOrders: response || "Cannot get user orders",
  });
});
module.exports = {
  createNewOrder,
  updateOrderStatusByAdmin,
  getUserOrders,
  getOrdersByAdmin,
};
