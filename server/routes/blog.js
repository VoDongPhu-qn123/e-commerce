const router = require("express").Router();
const blogController = require("../controllers/blogController");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
const uploader = require("../config/cloudinary.config");
router.post("", [verifyToken, isAdmin], blogController.createBlog);
router.get("/", blogController.getBlogs);
router.get("/:blogId", blogController.getBlog);
router.put(
  "/uploadImage/:blogId",
  [verifyToken, isAdmin],
  uploader.single("image"),
  blogController.uploadBlogImage
);
router.put("/likeBlog/:blogId", verifyToken, blogController.likeBlog);
router.put("/disLikeBlog/:blogId", verifyToken, blogController.disLikeBlog);
router.put("/:blogId", [verifyToken, isAdmin], blogController.updateBlog);
router.delete("/:blogId", [verifyToken, isAdmin], blogController.deleteBlog);

module.exports = router;
