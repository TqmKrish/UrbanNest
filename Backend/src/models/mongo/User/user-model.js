const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
// Common fields for both User and Admin
const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, default: null, required: true },
    email: { type: String, required: true },
    role: { type: String, default: "user" }, // role should be required
    contactNumber: { type: String, required: true },
    address: { type: String, default: null, required: true },
    profilePicture: { type: String, default: null },
    lastLogin: { type: Date, default: null },
    bio: { type: String, default: null },
    propertiesListed: { type: Number, default: 0 },
    verified: { type: Boolean, default: false },
    rating: { type: Number, default: null },
    socialLinks: {
      linkedin: { type: String, default: null },
      facebook: { type: String, default: null },
    },
    permissions: { type: [String], default: [] },
    notificationsEnabled: { type: Boolean, default: true },
    managedPropertiesCount: { type: Number, default: 0 },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Pre-save hook to set the `verified` field based on `role`
userSchema.pre("save", (next) => {
  if (this.isModified("role")) {
    this.verified = this.role === "admin";
  }
  next();
});

// Pre-save hook to hash the password
userSchema.pre("save", async (next) => {
  if (this.isModified("password") || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  if (this.isModified("role")) {
    this.verified = this.role === "admin";
  }

  next();
});

const fetchPassword = async (email) => {
  const user = await User.findOne({ email });
  console.log(user);
  return user.password;
};

// Method to compare password
userSchema.methods.comparePassword = async (email, candidatePassword) => {
  console.log(candidatePassword, fetchPassword(email));
  return bcrypt.compare(candidatePassword, await fetchPassword(email));
};

// Create a schema for the User
// const userSchema = new Schema(
//   {
//     ...commonFields,
//     bio: { type: String, default: null },
//     certifications: { type: [String], default: [] },
//     propertiesListed: { type: Number, default: 0 },
//     verified: { type: Boolean, default: false },
//     rating: { type: Number, default: null },
//     socialLinks: {
//       linkedin: { type: String, default: null },
//       facebook: { type: String, default: null },
//     },
//     preferredContactMethod: { type: String, default: null },
//   },
//   { timestamps: true }
// );

// Create a schema for the Admin
// const adminSchema = new Schema(
//   {
//     ...commonFields,
//     permissions: { type: [String], default: [] },
//     department: { type: String, default: null },
//     assignedTasks: { type: [String], default: [] },
//     notificationsEnabled: { type: Boolean, default: true },
//     managedPropertiesCount: { type: Number, default: 0 },
//     region: { type: String, default: null },
//   },
//   { timestamps: true }
// );

const User = mongoose.model("User", userSchema);
// const Admin = mongoose.model("Admin", adminSchema);

module.exports = { User };
