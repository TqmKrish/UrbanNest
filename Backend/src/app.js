const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth-routes.js");
const userRoutes = require("./routes/user-routes.js");
const propertyRoutes = require("./routes/property-routes.js");
const emailRoutes = require("./routes/email-routes.js");
const { errorMiddleware } = require("./helpers/errorHandler.js");
const { corsOptions } = require("./config/corsConfig");
const { connectMongoDB } = require("./connection.js");
const generateLogReqRes = require("./middleware/generate-logs.js");
const { isAuthenticated, restrictRouteTo } = require("./middleware/auth.js");

const app = express();

connectMongoDB();
app.use(express.urlencoded({ extended: false }));
app.use(generateLogReqRes("log.txt"));
app.use(express.static('public'))

app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", authRoutes);
// app.use(middlewareConfig);
app.use(isAuthenticated);

// Define routes
app.use("/api/user", userRoutes);
app.use("/api/property", propertyRoutes);
app.use("/api", emailRoutes);

module.exports = app;
