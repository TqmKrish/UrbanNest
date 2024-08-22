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
  // Process the file if it's present
  let profilePicturePath = null;
  if (req.files.length) {
    profilePicturePath = req.files[0].filename;
  }

  // Extract the other fields from the request body
  const {
    id,
    firstName,
    lastName,
    username,
    email,
    contactNumber,
    address,
    linkedin,
    facebook,
    notificationsEnabled,
  } = req.body;

  // Find the user and update fields
  const user = await User.findById(id);
  if (!user) {
    return res
      .status(404)
      .json({ isActionSuccessful: false, message: "User not found" });
  }

  user.firstName = firstName || user.firstName;
  user.lastName = lastName || user.lastName;
  user.username = username || user.username;
  user.email = email || user.email;
  user.contactNumber = contactNumber || user.contactNumber;
  user.address = address || user.address;
  user.socialLinks.linkedin = linkedin || user.socialLinks.linkedin;
  user.socialLinks.facebook = facebook || user.socialLinks.facebook;
  user.notificationsEnabled =
    notificationsEnabled !== undefined
      ? notificationsEnabled
      : user.notificationsEnabled;

  if (profilePicturePath) {
    user.profilePicture = profilePicturePath;
  }

  await user.save();
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
    bio: user.role === "user" ? user.bio : undefined,
    propertiesListed: user.role === "user" ? user.propertiesListed : undefined,
    verified: user.verified,
    rating: user.role === "user" ? user.rating : undefined,
    socialLinks: user.socialLinks,
    permissions: user.role === "admin" ? user.permissions : undefined,
    notificationsEnabled: user.notificationsEnabled,
    managedPropertiesCount:
      user.role === "admin" ? user.managedPropertiesCount : undefined,
  };
  return res.status(200).json({ user: userData, isActionSuccessful: true });
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
