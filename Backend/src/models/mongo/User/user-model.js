const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a schema for the User
const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, default: null },
    email: { type: String, required: true }, // email should be required for authentication
    role: { type: String, default: "user", required: true }, // role should be required
    contactNumber: { type: String, default: null, required: true },
    address: { type: String, default: null },
    profilePicture: { type: String, default: null },
    verified: { type: Boolean, default: false },
    lastLogin: { type: Date, default: null },
    socialLinks: {
      linkedin: { type: String, default: null },
      facebook: { type: String, default: null },
    },
    preferredContactMethod: { type: String, default: null },
    bio: { type: String, default: null },
    certifications: { type: [String], default: [] },
    propertiesListed: { type: Number, default: 0 },
    rating: { type: Number, default: null },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
