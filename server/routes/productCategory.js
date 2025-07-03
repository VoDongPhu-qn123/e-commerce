const router = require("express").Router();
const productCategoryController = require("../controllers/productCategoryController");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
router.post(
  "/",
  [verifyToken, isAdmin],
  productCategoryController.createProductCategory
);
router.get("/", productCategoryController.getProductCategories);
router.put(
  "/:productCategoryId",
  [verifyToken, isAdmin],
  productCategoryController.updateProductCategory
);
router.delete(
  "/:productCategoryId",
  [verifyToken, isAdmin],
  productCategoryController.deleteProductCategory
);
module.exports = router;
