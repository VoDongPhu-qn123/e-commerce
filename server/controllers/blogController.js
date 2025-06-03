const Blog = require("../models/blogModel");
const asyncHandler = require("express-async-handler");
const createBlog = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;
  if (!title || !description || !category) {
    throw new Error("Missing inputs");
  }
  const response = await Blog.create(req.body);
  return res.status(200).json({
    success: response ? true : false,
    createdBlog: response ? response : "Cannot create blog",
  });
});
const updateBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  if (Object.keys(req.body).length === 0) {
    throw new Error("Missing inputs");
  }
  const response = await Blog.findByIdAndUpdate(blogId, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: response ? true : false,
    updatedBlog: response ? response : "Cannot update blog",
  });
});
const getBlogs = asyncHandler(async (req, res) => {
  const response = await Blog.find();
  return res.status(200).json({
    success: response ? true : false,
    response: response ? response : "Cannot get blogs",
  });
});
const getBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const blog = await Blog.findByIdAndUpdate(
    blogId,
    { $inc: { numberViews: 1 } },
    { new: true }
  ).populate([
    { path: "likes", select: "firstName lastName" },
    { path: "disLikes", select: "firstName lastName" },
  ]);
  return res.status(200).json({
    success: blog ? true : false,
    response: blog,
  });
});
const deleteBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const response = await Blog.findByIdAndDelete(blogId);
  return res.status(200).json({
    success: response ? true : false,
    deletedBlog: blog || "Cannot delete Blog",
  });
});
//Like
//DISLIKE
/*
Khi người dùng like một bài blog thì:
1. Check xem người đó trước đó có dislike bài hay ko => bỏ dislike or thêm like
2. Check xem người đó trước đó có like hay ko => có -> bỏ like , ko -> thêm like 
*/
const likeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { blogId } = req.params;
  if (!blogId) {
    throw new Error("Missing inputs");
  }
  const blog = await Blog.findById(blogId);
  if (!blog) {
    return res.status(404).json({ success: false, message: "Blog not found" });
  }
  const alreadyDisliked = blog?.disLikes?.find((el) => el.toString() === _id);
  const alreadyLiked = blog?.likes?.find((el) => el.toString() === _id);
  if (alreadyDisliked) {
    blog.disLikes.pull(_id);
    blog.likes.push(_id);
  } else if (alreadyLiked) {
    blog.likes.pull(_id);
  } else {
    blog.likes.push(_id);
  }
  await blog.save();
  return res.status(200).json({
    success: true,
    blog,
  });
});
const disLikeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { blogId } = req.params;
  if (!blogId) {
    throw new Error("Missing inputs");
  }
  const blog = await Blog.findById(blogId);
  if (!blog) {
    return res.status(404).json({ success: false, message: "Blog not found" });
  }
  const alreadyDisliked = blog?.disLikes?.find((el) => el.toString() === _id);
  const alreadyLiked = blog?.likes?.find((el) => el.toString() === _id);
  if (alreadyLiked) {
    blog.disLikes.push(_id);
    blog.likes.pull(_id);
  } else if (alreadyDisliked) {
    blog.disLikes.pull(_id);
  } else {
    blog.disLikes.push(_id);
  }
  await blog.save();
  return res.status(200).json({
    success: true,
    blog,
  });
});
module.exports = {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlogs,
  getBlog,
  likeBlog,
  disLikeBlog,
};
