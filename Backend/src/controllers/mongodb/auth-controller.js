const { User } = require("../../models/mongo/User/user-model");

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    console.log("a", email);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await user.comparePassword(email, password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
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

    // Remove undefined fields
    Object.keys(userData).forEach(
      (key) => userData[key] === undefined && delete userData[key]
    );

    return res.status(200).json({ data: userData, isActionSuccessful: true });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error. Something went wrong" });
  }
};

const handleLogout = () => {};
const handleRegister = () => {};

module.exports = { handleLogin, handleLogout, handleRegister };
