const ProductCategory = require("../models/productCategoryModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const createProductCategory = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw new Error("Missing inputs");
  }
  const newProductCategory = await ProductCategory.create(req.body);
  return res.status(200).json({
    success: newProductCategory ? true : false,
    newProductCategory: newProductCategory
      ? newProductCategory
      : "Cannot create new product category",
  });
});
const getProductCategories = asyncHandler(async (req, res) => {
  const productCategories = await ProductCategory.find().select("name _id");
  return res.status(200).json({
    success: productCategories ? true : false,
    productCategories: productCategories
      ? productCategories
      : "Cannot get all product categories",
  });
});
const updateProductCategory = asyncHandler(async (req, res) => {
  const { productCategoryId } = req.params;
  if (Object.keys(req.body).length === 0) {
    throw new Error("Missing inputs");
  }
  const updateProductCategory = await ProductCategory.findByIdAndUpdate(
    productCategoryId,
    req.body,
    { new: true }
  );
  return res.status(200).json({
    success: updateProductCategory ? true : false,
    updateProductCategory: updateProductCategory
      ? updateProductCategory
      : "Cannot update product category",
  });
});
const deleteProductCategory = asyncHandler(async (req, res) => {
  const { productCategoryId } = req.params;

  const deleteProductCategory = await ProductCategory.findByIdAndDelete(
    productCategoryId
  );
  return res.status(200).json({
    success: deleteProductCategory ? true : false,
    deleteProductCategory: deleteProductCategory
      ? deleteProductCategory
      : "Cannot update product category",
  });
});
module.exports = {
  createProductCategory,
  getProductCategories,
  updateProductCategory,
  deleteProductCategory,
};
