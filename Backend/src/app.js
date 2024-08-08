const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth-routes.js");
const userRoutes = require("./routes/user-routes.js");
const adminRoutes = require("./routes/admin-routes.js");
const emailRoutes = require("./routes/email-routes.js");
const { errorMiddleware } = require("./helpers/errorHandler.js");
const { corsOptions } = require("./config/corsConfig");
const { connectMongoDB } = require("./connection.js");
const generateLogReqRes = require("./middleware/generate-logs.js");

const app = express();

connectMongoDB();
app.use(express.urlencoded({ extended: false }));
app.use(generateLogReqRes("log.txt"));

app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", authRoutes);
// app.use(middlewareConfig);

// Define routes
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api", emailRoutes);

module.exports = app;
