const express = require('express');
const { sendEmail } = require('../controllers/emailController');

const router = express.Router();

// Route to send an email
router.post('/send-email', sendEmail);

module.exports = router;
