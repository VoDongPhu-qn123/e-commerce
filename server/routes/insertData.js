const router = require("express").Router();
const insertData = require("../controllers/insertData");
router.post("/product", insertData.insertProduct);
router.post("/category", insertData.insertCategory);
module.exports = router;
