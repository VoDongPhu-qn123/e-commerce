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
//Filtering, sorting, pagination
const getProducts = asyncHandler(async (req, res) => {
  const queries = { ...req.query }; //Sao chép tất cả các thuộc tính của query vào object queries
  // Tách các trường đặc biệt ra khỏi queries

  const excludeFields = ["limit", "sort", "page", "fields"];
  excludeFields.forEach((element) => delete queries[element]);
  // Format lại các operators cho đúng cú pháp mongoose
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(
    /\b(gte|gt|lt|lte)\b/g,
    (matchedEl) => `$${matchedEl}`
  ); // replace chỉ dùng cho string nên phải chuyển queries sang chuỗi JSON
  const formatedQueries = JSON.parse(queryString);
  //Filtering

  // Xử lí tìm kiếm mở cho tên sản phẩm
  if (queries?.name) {
    formatedQueries.name = { $regex: queries.name, $options: "i" };
  } //options tìm mà ko phân biệt chữ hoa hoặc thường
  //console.log(formatedQueries);

  //Sorting
  const sortBy = req.query.sort?.split(",").join(" ");
  console.log(sortBy);
  //Fields limiting
  const fields = req.query.fields?.split(",").join(" ");

  const countQuery = Product.countDocuments(formatedQueries);
  let findQuery = Product.find(formatedQueries);
  if (sortBy) {
    findQuery = findQuery.sort(sortBy);
  }
  if (fields) {
    findQuery = findQuery.select(fields);
  }
  //Pagination
  //limit: số object lấy về 1 lần gọi API
  //skip: số object bỏ qua
  // dấu + để convert string sang number
  // 1 2 3 ... 10
  // limit: 2 => lấy 1 và 2
  // skip: 2 => bỏ 1 và 2
  // kết hợp limit và skip => lấy 3 và 4
  const page = req.query.page || 1;
  const limit = req.query.limit || process.env.LIMIT_PRODUCTS;
  const skip = (page - 1) * limit;
  findQuery.skip(skip).limit(limit);

  Promise.all([findQuery, countQuery])
    .then(([response, counts]) => {
      if (!response) {
        return res.status(401).json({
          success: false,
          productData: "Cannot get product",
        });
      }

      return res.status(200).json({
        success: true,
        productData: response,
        counts,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
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

//Ratings
const ratings = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, comment, productId } = req.body;
  if (!star || !comment) {
    throw new Error("Missing input");
  }
  const ratingProduct = await Product.findById(productId);
  const alreadyRatingindex = ratingProduct?.ratings?.findIndex(
    (el) => el.postedBy.toString() === _id
  );
  if (alreadyRatingindex !== -1) {
    // update star & comment (đã đánh giá trước đó rồi)
    // await Product.findOneAndUpdate(
    //   {
    //     _id: productId,
    //     "ratings.postedBy": alreadyRating.postedBy, //tìm một phần tử trong mảng ratings thỏa điều kiện alreadyRating
    //   },
    //   {
    //     $set: {
    //       "ratings.$.star": star,
    //       "ratings.$.comment": comment,
    //     },
    //   },
    //   { new: true }
    // );
    ratingProduct.ratings[alreadyRatingindex].star = star;
    ratingProduct.ratings[alreadyRatingindex].comment = comment;
  } else {
    // add star & comment (lần đầu đánh giá)
    // await Product.findByIdAndUpdate(
    //   productId,
    //   {
    //     $push: { ratings: { star, comment, postedBy: _id } },
    //   },
    //   { new: true }
    // );
    ratingProduct.ratings.push({ star, comment, postedBy: _id });
  }
  //avgRatings
  //const updatedProduct = await Product.findById(productId);
  const ratingsCount = ratingProduct.ratings.length;
  const totalRatings = ratingProduct.ratings.reduce(
    (sum, item) => sum + item.star,
    0
  );
  ratingProduct.totalRatings =
    Math.round((totalRatings * 10) / ratingsCount) / 10;
  ratingProduct.save();
  return res.status(200).json({
    success: true,
    ratingProduct,
  });
});
const uploadProductImages = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  if (!req.files) throw new Error("Mising inputs");
  const imageURLs = req.files.map((file) => file.path);
  const response = await Product.findByIdAndUpdate(
    productId,
    {
      $push: { images: { $each: imageURLs } },
    },
    { new: true }
  );
  res.status(200).json({
    success: response ? true : false,
    response: response || "Cannot upload product images",
  });
});
module.exports = {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  ratings,
  uploadProductImages,
};
