const Product = require("../models/productModel");
const ProductCategory = require("../models/productCategoryModel");
const asyncHandler = require("express-async-handler");
const productData = require("../data/ecommerce.json");
const categoryData = require("../data/category-brand");
const slugify = require("slugify");

const fnProduct = async (product) => {
  await Product.create({
    name: product?.name,
    slug: slugify(product?.name) + Math.round(Math.random() * 100) + "",
    description: product?.description.join("/n"),
    brand: product?.brand,
    price: Math.round(Number(product?.price?.match(/\d/g).join("")) / 100),
    category: product?.category[1],
    quanity: Math.round(Math.random() * 1000),
    sold: Math.round(Math.random() * 100),
    images: product?.images,
    color: product?.variants?.find((el) => el.label === "Color")?.variants[0],
    storage: product?.variants?.find((el) => el.label === "Internal")
      ?.variants[0],
    ram: product?.variants?.find((el) => el.label === "Ram")?.variants[0],
  });
};
const fnCategory = async (category) => {
  await ProductCategory.create({
    name: category?.category,
    brand: category?.brand,
  });
};
const insertProduct = asyncHandler(async (req, res) => {
  const promises = [];
  for (let product of productData) {
    promises.push(fnProduct(product));
  }
  await Promise.all(promises);
  return res.json("Done");
});
const insertCategory = asyncHandler(async (req, res) => {
  const promises = [];
  for (let category of categoryData) {
    promises.push(fnCategory(category));
  }
  await Promise.all(promises);
  return res.json("Done");
});
module.exports = {
  insertProduct,
  insertCategory,
};
