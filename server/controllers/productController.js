const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const createProduct = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw new Error("Missing inputs");
  }
  if (req.body && req.body.name) {
    req.body.slug = slugify(req.body.name);
    const newProduct = await Product.create(req.body);
    return res.status(200).json({
      success: newProduct ? true : false,
      createProduct: newProduct ? newProduct : "Cannot create new product",
    });
  }
});
const getProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);
  return res.status(200).json({
    success: product ? true : false,
    productData: product ? product : "Cannot get product",
  });
});
const getAllProduct = asyncHandler(async (req, res) => {
  const products = await Product.find().select("-slug");
  return res.status(200).json({
    success: products ? true : false,
    productData: products ? products : "Cannot get all product",
  });
});
const updateProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  if (Object.keys(req.body).length === 0) {
    throw new Error("Missing inputs");
  }
  if (req.body && req.body.name) {
    req.body.slug = slugify(req.body.name);
  }
  const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {
    new: true,
  }).select("-slug");
  return res.status(200).json({
    success: updatedProduct ? true : false,
    updatedProduct: updatedProduct ? updatedProduct : "Cannot update product",
  });
});
const deleteProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const deletedProduct = await Product.findByIdAndDelete(productId);
  return res.status(200).json({
    success: deletedProduct ? true : false,
    deletedProduct: deletedProduct ? deleteProduct : "Cannot delete product",
  });
});
module.exports = {
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
};
