const router = require("express").Router();
const productController = require("../controllers/productController");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
const uploader = require("../config/cloudinary.config");
router.post("/", [verifyToken, isAdmin], productController.createProduct);
router.get("/", productController.getProducts);
router.put("/ratings", verifyToken, productController.ratings);
router.put(
  "/uploadImage/:productId",
  [verifyToken, isAdmin],
  uploader.array("images", 10),
  productController.uploadProductImages
);
router.put(
  "/:productId",
  [verifyToken, isAdmin],
  productController.updateProduct
);
router.delete(
  "/:productId",
  [verifyToken, isAdmin],
  productController.deleteProduct
);
router.get("/:productId", productController.getProduct);
module.exports = router;
