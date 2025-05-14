const userRouter = require("./user");
const productRouter = require("./product");
const productCategoryRouter = require("./productCategory");
const { notFound, errHandler } = require("../middlewares/errHandler");
const initRoutes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
  app.use("/api/productCategory", productCategoryRouter);

  // Middleware xử lí route ko tồn tại
  app.use(notFound);

  // Middleware xử lí lỗi
  app.use(errHandler);
};
module.exports = initRoutes;
