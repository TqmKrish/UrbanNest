const { User, Admin } = require("../../models/mongo/User/user-model");

const handleGetAllUsers = async (req, res) => {
  const allUsers = await User.find({});
  return res.status(200).json({ data: allUsers, isActionSuccessful: true });
};

const handleCreateNewUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      contactNumber,
      address,
      profilePicture,
      bio,
      propertiesListed,
      rating,
      socialLinks,
      role, // Added role here to determine if it's user or admin
      permissions,
      notificationsEnabled,
      password,
    } = req.body;

    // Create a new user or admin document based on the role
    const newUser = await User.create({
      firstName,
      lastName,
      username,
      email,
      role,
      contactNumber,
      address,
      profilePicture,
      bio: role === "user" ? bio : undefined, // Only for users
      propertiesListed: role === "user" ? propertiesListed : undefined, // Only for users
      rating: role === "user" ? rating : undefined, // Only for users
      socialLinks,
      permissions: role === "admin" ? permissions : undefined, // Only for admins
      notificationsEnabled,
      password,
    });

    return res.status(200).json({ data: newUser, isActionSuccessful: true });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal server error. Something went wrong" });
  }
};

const handleGetUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  return res.status(200).json({ data: user, isActionSuccessful: true });
};

const handleUpdateUserById = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, {}); //update info here
  return res.status(200).json({ data: user, isActionSuccessful: true });
};

const handleDeleteUserById = async (req, res) => {
  await User.findByIdAndDelete(req.params.id); //update info here
  return res.status(200).json({ isActionSuccessful: true });
};

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
