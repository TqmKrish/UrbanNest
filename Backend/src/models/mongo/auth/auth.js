const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a schema for Auth
const authSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" }, // Reference to the user
    token: String,
    tokenExpiresAt: Date,
  },
  { timestamps: true }
);

const Auth = mongoose.model("Auth", authSchema);

module.exports = Auth;
