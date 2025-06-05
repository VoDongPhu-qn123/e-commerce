const router = require("express").Router();
const userController = require("../controllers/userController");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/currentUser", verifyToken, userController.getCurrentUser);
router.post("/refreshToken", userController.refreshAccessToken);
router.get("/logout", userController.logOut);
router.get("/forgotpassword", userController.forgotPassword);
router.put("/resetpassword", userController.resetPassword);
router.get(
  "/get-all-users",
  [verifyToken, isAdmin],
  userController.getAllUsers
);
router.delete(
  "/delete-user-by-admin",
  [verifyToken, isAdmin],
  userController.deleteUserByAdmin
);
router.put("/update-user", verifyToken, userController.updateUser);
router.put(
  "/update-user-by-admin/:userId",
  [verifyToken, isAdmin],
  userController.updateUserByAdmin
);
router.put("/address", verifyToken, userController.updateUserAddress);
router.put("/cart", verifyToken, userController.updateCart);
module.exports = router;
