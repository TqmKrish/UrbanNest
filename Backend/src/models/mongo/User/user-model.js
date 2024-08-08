const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Common fields for both User and Admin
const commonFields = {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, default: null },
  email: { type: String, required: true },
  role: { type: String, required: true }, // role should be required
  contactNumber: { type: String, required: true },
  address: { type: String, default: null },
  profilePicture: { type: String, default: null },
  lastLogin: { type: Date, default: null },
};

// Create a schema for the User
const userSchema = new Schema(
  {
    ...commonFields,
    bio: { type: String, default: null },
    certifications: { type: [String], default: [] },
    propertiesListed: { type: Number, default: 0 },
    verified: { type: Boolean, default: false },
    rating: { type: Number, default: null },
    socialLinks: {
      linkedin: { type: String, default: null },
      facebook: { type: String, default: null },
    },
    preferredContactMethod: { type: String, default: null },
  },
  { timestamps: true }
);

// Create a schema for the Admin
const adminSchema = new Schema(
  {
    ...commonFields,
    permissions: { type: [String], default: [] },
    department: { type: String, default: null },
    assignedTasks: { type: [String], default: [] },
    notificationsEnabled: { type: Boolean, default: true },
    managedPropertiesCount: { type: Number, default: 0 },
    region: { type: String, default: null },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);

module.exports = { User, Admin };
