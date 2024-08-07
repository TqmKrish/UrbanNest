const express = require("express");
const { initiateEmailSending } = require("../controllers/emailController");

const router = express.Router();

// Route to send an email
router.post("/send-email", initiateEmailSending);

module.exports = router;
