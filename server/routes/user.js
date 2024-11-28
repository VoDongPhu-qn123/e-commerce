const router = require("express").Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../middlewares/verifyToken");
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/currentUser", verifyToken, userController.getCurrentUser);
router.post("/refreshToken", userController.refreshAccessToken);
router.get("/logout", userController.logOut);
router.get("/forgotpassword", userController.forgotPassword);
router.put("/resetpassword", userController.resetPassword);
module.exports = router;
