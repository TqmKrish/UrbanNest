const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const emailRoutes = require("./routes/emailRoutes");
const { errorMiddleware } = require("./middleware/errorMiddleware");
const { corsOptions } = require("./config/corsConfig");

const app = express();

app.use(bodyParser.json());
app.use(cors(corsOptions));

// Define routes
app.use("/api", userRoutes);
app.use("/api", emailRoutes);

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;
