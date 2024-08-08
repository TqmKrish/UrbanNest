const express = require("express");
const { errorHandler } = require("../helpers/errorHandler.js");
const { handleLogout } = require("../controllers/mongodb/auth-controller.js");
const { handleLogin } = require("../controllers/mongodb/auth-controller.js");
const { handleRegister } = require("../controllers/mongodb/auth-controller.js");
const router = express.Router();

router.post("/logout", errorHandler(handleLogout));
router.post("/login", errorHandler(handleLogin));
router.post("/register", errorHandler(handleRegister));

module.exports = router;
