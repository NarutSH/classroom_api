var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");

/* GET users listing. */
router.get("/", userController.index);
router.get("/:id", userController.show);
router.post("/", userController.insert);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

module.exports = router;
