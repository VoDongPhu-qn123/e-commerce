const router = require("express").Router();
const blogController = require("../controllers/blogController");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
router.post("", [verifyToken, isAdmin], blogController.createBlog);
router.get("/", blogController.getBlogs);
router.get("/:blogId", blogController.getBlog);
router.put("/likeBlog/:blogId", verifyToken, blogController.likeBlog);
router.put("/disLikeBlog/:blogId", verifyToken, blogController.disLikeBlog);
router.put("/:blogId", [verifyToken, isAdmin], blogController.updateBlog);
router.delete("/:blogId", [verifyToken, isAdmin], blogController.deleteBlog);

module.exports = router;
