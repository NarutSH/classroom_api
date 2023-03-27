var express = require("express");
var router = express.Router();
const accountController = require("../controllers/accountController");

router.post("/register", accountController.register);
router.post("/login", accountController.login);

module.exports = router;
