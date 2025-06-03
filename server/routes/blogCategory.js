const router = require("express").Router();
const blogCategoryController = require("../controllers/blogCategoryController");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
router.post(
  "/",
  [verifyToken, isAdmin],
  blogCategoryController.createBlogCategory
);
router.get(
  "/",
  [verifyToken, isAdmin],
  blogCategoryController.getBlogCategories
);
router.put(
  "/:blogCategoryId",
  [verifyToken, isAdmin],
  blogCategoryController.updateBlogCategory
);
router.delete(
  "/:blogCategoryId",
  [verifyToken, isAdmin],
  blogCategoryController.deleteBlogCategory
);
module.exports = router;
