const { User } = require("../../models/mongo/User/user-model");
const { comparePassword } = require("../../utils/password-utils");
const { generateJWT, saveTokenInDB } = require("../../utils/token-utils");

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log("email wrong");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      console.log("password wrong");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Prepare user data based on role
    const userData = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      role: user.role,
      contactNumber: user.contactNumber,
      address: user.address,
      profilePicture: user.profilePicture,
      lastLogin: user.lastLogin,
      bio: user.role === "user" ? user.bio : undefined,
      propertiesListed:
        user.role === "user" ? user.propertiesListed : undefined,
      verified: user.verified,
      rating: user.role === "user" ? user.rating : undefined,
      socialLinks: user.socialLinks,
      permissions: user.role === "admin" ? user.permissions : undefined,
      notificationsEnabled: user.notificationsEnabled,
      managedPropertiesCount:
        user.role === "admin" ? user.managedPropertiesCount : undefined,
    };

    // Generate JWT
    const token = await generateJWT(user.email, user.role);
    if (token) {
      const isTokenSaved = await saveTokenInDB(user._id, user.email, token);
      if (!isTokenSaved) {
        return res.status(500).json({ message: "Failed to save token" });
      }
    }

    // Remove undefined fields
    Object.keys(userData).forEach(
      (key) => userData[key] === undefined && delete userData[key]
    );

    return res
      .status(200)
      .json({ user: userData, token: token, isActionSuccessful: true });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal server error. Something went wrong" });
  }
};

const handleLogout = () => {};
const handleRegister = () => {};

module.exports = { handleLogin, handleLogout, handleRegister };
