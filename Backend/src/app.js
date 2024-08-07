const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const emailRoutes = require("./routes/email");
const { errorMiddleware } = require("./helpers/errorHandler.js");
const { corsOptions } = require("./config/corsConfig");
const { connectMongoDB } = require("./connection.js");
const generateLogReqRes = require("./middleware/generateLogs.js");

const app = express();

connectMongoDB();
app.use(express.urlencoded({ extended: false }));
app.use(generateLogReqRes("log.txt"));

app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", authRoutes);
// app.use(middlewareConfig);

// Define routes
app.use("/api/user", userRoutes);
app.use("/api", emailRoutes);

module.exports = app;
