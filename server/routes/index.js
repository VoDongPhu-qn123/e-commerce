const userRouter = require("./user");
const productRouter = require("./product");
const productCategoryRouter = require("./productCategory");
const blogCategoryRouter = require("./blogCategory");
const blogRouter = require("./blog");
const brandRouter = require("./brand");
const couponRouter = require("./coupon");
const orderRouter = require("./order");
const insertDataRouter = require("./insertData");
const { notFound, errHandler } = require("../middlewares/errHandler");
const initRoutes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
  app.use("/api/productCategory", productCategoryRouter);
  app.use("/api/blogCategory", blogCategoryRouter);
  app.use("/api/blog", blogRouter);
  app.use("/api/brand", brandRouter);
  app.use("/api/coupon", couponRouter);
  app.use("/api/order", orderRouter);
  app.use("/api/insert", insertDataRouter);
  // Middleware xử lí route ko tồn tại
  app.use(notFound);

  // Middleware xử lí lỗi
  app.use(errHandler);
};
module.exports = initRoutes;
