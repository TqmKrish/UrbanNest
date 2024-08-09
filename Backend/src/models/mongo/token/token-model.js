const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: { type: String, required: true },
    token: { type: String, required: true },
    tokenExpiresAt: { type: Date, required: true },
    tokenType: { type: String, required: true, default: "auth" }, // Default type is "auth"
  },
  { timestamps: true }
);

const Token = mongoose.model("Token", tokenSchema);

module.exports = { Token };
