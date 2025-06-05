const router = require("express").Router();
const orderController = require("../controllers/orderController");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
router.post("/", verifyToken, orderController.createNewOrder);
router.get("/", verifyToken, orderController.getUserOrders);
router.get("/admin", [verifyToken, isAdmin], orderController.getOrdersByAdmin);
router.put(
  "/status/:orderId",
  [verifyToken, isAdmin],
  orderController.updateOrderStatusByAdmin
);
module.exports = router;
