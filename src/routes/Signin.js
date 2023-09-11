const express = require("express");
const authController = require("../controllers/SigninController");

var router = express.Router();
const { signIn } = authController;

router.post("/signin", signIn);

module.exports = router;