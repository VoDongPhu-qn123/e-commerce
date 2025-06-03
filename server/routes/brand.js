const router = require("express").Router();
const brandController = require("../controllers/brandController");
const { verifyToken, isAdmin } = require("../middlewares/verifyToken");
router.post("/", [verifyToken, isAdmin], brandController.createNewBrand);
router.get("/", [verifyToken, isAdmin], brandController.getBrands);
router.put("/:brandId", [verifyToken, isAdmin], brandController.updateBrand);
router.delete("/:brandId", [verifyToken, isAdmin], brandController.deleteBrand);
module.exports = router;
