const BlogCategory = require("../models/blogCategoryModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const createBlogCategory = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw new Error("Missing inputs");
  }
  const newBlogCategory = await BlogCategory.create(req.body);
  return res.status(200).json({
    success: newBlogCategory ? true : false,
    newBlogCategory: newBlogCategory
      ? newBlogCategory
      : "Cannot create new Blog category",
  });
});
const getBlogCategories = asyncHandler(async (req, res) => {
  const blogCategories = await BlogCategory.find().select("name _id");
  return res.status(200).json({
    success: blogCategories ? true : false,
    blogCategories: blogCategories
      ? blogCategories
      : "Cannot get all Blog categories",
  });
});
const updateBlogCategory = asyncHandler(async (req, res) => {
  const { blogCategoryId } = req.params;
  if (Object.keys(req.body).length === 0) {
    throw new Error("Missing inputs");
  }
  const updateBlogCategory = await BlogCategory.findByIdAndUpdate(
    blogCategoryId,
    req.body,
    { new: true }
  );
  return res.status(200).json({
    success: updateBlogCategory ? true : false,
    updateBlogCategory: updateBlogCategory
      ? updateBlogCategory
      : "Cannot update Blog category",
  });
});
const deleteBlogCategory = asyncHandler(async (req, res) => {
  const { blogCategoryId } = req.params;

  const deleteBlogCategory = await BlogCategory.findByIdAndDelete(
    blogCategoryId
  );
  return res.status(200).json({
    success: deleteBlogCategory ? true : false,
    deleteBlogCategory: deleteBlogCategory
      ? deleteBlogCategory
      : "Cannot update Blog category",
  });
});
module.exports = {
  createBlogCategory,
  getBlogCategories,
  updateBlogCategory,
  deleteBlogCategory,
};
