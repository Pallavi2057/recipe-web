const express = require("express");
const router = express.Router();
const ForgotPassword = require("../controllers/ForgotPasswordController");

router.put("/forgotpassword", ForgotPassword);

module.exports = router;
