const { configureCredentialsAndSendEmail } = require('../services/emailService');

// Send an email
const sendEmail = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    await configureCredentialsAndSendEmail(name, email, subject, message);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send email');
  }
};

module.exports = { sendEmail };
