const Brand = require("../models/brandModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const createNewBrand = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw new Error("Missing inputs");
  }
  const newBrand = await Brand.create(req.body);
  return res.status(200).json({
    success: newBrand ? true : false,
    newBrand: newBrand ? newBrand : "Cannot create new Brand ",
  });
});
const getBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find().select("name _id");
  return res.status(200).json({
    success: brands ? true : false,
    brands: brands ? brands : "Cannot get all Brand",
  });
});
const updateBrand = asyncHandler(async (req, res) => {
  const { brandId } = req.params;
  if (Object.keys(req.body).length === 0) {
    throw new Error("Missing inputs");
  }
  const updateBrand = await Brand.findByIdAndUpdate(brandId, req.body, {
    new: true,
  });
  return res.status(200).json({
    success: updateBrand ? true : false,
    updateBrand: updateBrand ? updateBrand : "Cannot update Brand",
  });
});
const deleteBrand = asyncHandler(async (req, res) => {
  const { brandId } = req.params;

  const deleteBrand = await Brand.findByIdAndDelete(brandId);
  return res.status(200).json({
    success: deleteBrand ? true : false,
    deleteBrand: deleteBrand ? deleteBrand : "Cannot update Brand",
  });
});
module.exports = {
  createNewBrand,
  getBrands,
  updateBrand,
  deleteBrand,
};
