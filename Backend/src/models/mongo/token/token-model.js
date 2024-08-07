const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a schema for Auth
const tokenSchema = new Schema(
  {
    userId: String,
    email: String,
    token: String,
    tokenExpiresAt: Date,
    tokenType: String,
  },
  { timestamps: true }
);

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
