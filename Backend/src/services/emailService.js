const nodemailer = require('nodemailer');
require("dotenv").config();

// Configure and send an email
const configureCredentialsAndSendEmail = async (name, email, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    text: message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { configureCredentialsAndSendEmail };
