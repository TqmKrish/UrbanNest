const express = require("express");
const { errorHandler } = require("../helpers/errorHandler.js");
const { logout } = require("../controllers/auth-controller.js");
const { login } = require("../controllers/auth-controller.js");
const { register } = require("../controllers/auth-controller.js");
const router = express.Router();

router.post("/logout", errorHandler(logout));
router.post("/login", errorHandler(login));
router.post("/register", errorHandler(register));

module.exports = router;
