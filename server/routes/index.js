const userRouter = require("./user");
const { notFound, errHandler } = require("../middlewares/errHandler");
const initRoutes = (app) => {
  app.use("/api/user", userRouter);

  // Middleware xử lí route ko tồn tại
  app.use(notFound);

  // Middleware xử lí lỗi
  app.use(errHandler);
};
module.exports = initRoutes;
