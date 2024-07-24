const nodemailer = require("nodemailer");
require("dotenv").config();

const serverEmail = "gkrish@teqmavens.com";

const sendFeedbackEmail = async (userEmail, serverEmail, subject, message) => {
  const generateFeedbackMessage = (email, message) => {
    return `User's Email = ${email},
    Message = ${message}
    `;
  };

  const mailOptions = {
    form: userEmail,
    to: serverEmail,
    subject: subject,
    text: generateFeedbackMessage(userEmail, message),
  };

  try {
    await sendEmail(mailOptions);
    console.log("Feedback email sent successfully.");
  } catch (error) {
    console.error("Error sending feedback email:", error);
    throw new Error(`Failed to send feedback email: ${error.message}`);
  }
};

const sendThankyouEmail = async (serverEmail, userEmail, name) => {
  const generateSubject = () => "Thank You for Your Feedback!";

  const generateMessage = (name) => `
Hi ${name},

Thank you for taking the time to provide your feedback. We appreciate your insights and are glad to hear your thoughts. Your input helps us improve and serve you better.

Best regards,
Krish Goyal
Team UrbanNest`;

  const mailOptions = {
    from: serverEmail,
    to: userEmail,
    subject: generateSubject(),
    text: generateMessage(name),
  };

  try {
    await sendEmail(mailOptions);
    console.log("Thank you email sent successfully.");
  } catch (error) {
    console.error("Error sending thank you email:", error);
    throw new Error(`Failed to send thank you email: ${error.message}`);
  }
};

const initiateEmailFlow = async (name, email, subject, message) => {
  try {
    await sendFeedbackEmail(email, serverEmail, subject, message);
    await sendThankyouEmail(serverEmail, email, name);
  } catch (error) {
    console.error("Error in email flow:", error);
    throw new Error(`Failed to complete email flow: ${error.message}`);
  }
};

const configureCredentialsAndSendEmail = async (
  name,
  email,
  subject,
  message
) => {
  try {
    await initiateEmailFlow(name, email, subject, message);
  } catch (error) {
    console.error("Error configuring credentials and sending email:", error);
    throw new Error(
      `Failed to configure credentials and send email: ${error.message}`
    );
  }
};

const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

const sendEmail = (mailOptions) => {
  const transporter = createTransporter();
  return transporter.sendMail(mailOptions);
};

module.exports = configureCredentialsAndSendEmail;
