const router = require("express").Router();
const couponController = require("../controllers/couponController");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
router.post("/", [verifyToken, isAdmin], couponController.createNewCoupon);
router.get("/", couponController.getCoupons);
router.put("/:couponId", [verifyToken, isAdmin], couponController.updateCoupon);
router.delete(
  "/:couponId",
  [verifyToken, isAdmin],
  couponController.deleteCoupon
);
module.exports = router;
