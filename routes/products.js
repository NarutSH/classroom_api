var express = require("express");
var router = express.Router();
const productController = require("../controllers/productController");

/* GET users listing. */
router.get("/", productController.index);
router.post("/", productController.insert);
router.put("/:id", productController.update);
router.delete("/:id", productController.delete);

module.exports = router;
