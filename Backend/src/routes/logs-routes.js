const express = require("express");
const { errorHandler } = require("../helpers/errorHandler");
const router = express.Router();

// Route to send an email
router.post("/create-log", errorHandler(createLog));

module.exports = router;
