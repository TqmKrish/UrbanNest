const express = require("express");
const { logout, login, register } = require("../controllers/authController");
const { errorHandler } = require("../helpers/errorHandler");
const router = express.Router();

router.post("/logout", errorHandler(logout));
router.post("/login", errorHandler(login));
router.post("/register", errorHandler(register));

module.exports = router;
