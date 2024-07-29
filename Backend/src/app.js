const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const configureCredentialsAndSendEmail = require("./EmailService/send-email");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    await configureCredentialsAndSendEmail(name, email, subject, message);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send email");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
